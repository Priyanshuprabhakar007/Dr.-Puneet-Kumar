import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { getStorage } from 'firebase-admin/storage';
import { getServerFirestore } from './firebaseServer.js';

export interface StorageUploadResult {
  publicUrl: string;
  storageRef: string;
  filename: string;
}

export interface MediaStorageProvider {
  uploadImage(
    buffer: Buffer,
    mimetype: string,
    originalName: string,
    prefix?: string
  ): Promise<StorageUploadResult>;
  deleteImage(storageRefOrUrl: string): Promise<boolean>;
  getProviderName(): 'local' | 'firebase' | 'supabase';
}

export class LocalMediaStorageProvider implements MediaStorageProvider {
  private uploadsDir: string;

  constructor(uploadsDir?: string) {
    this.uploadsDir = uploadsDir || path.resolve(process.cwd(), 'uploads');
    // NEVER attempt to create directory on Vercel serverless read-only filesystem
    if (!process.env.VERCEL && !fs.existsSync(this.uploadsDir)) {
      try {
        fs.mkdirSync(this.uploadsDir, { recursive: true });
      } catch (err) {
        console.warn('[LocalMediaStorage] Warning creating uploads directory:', err);
      }
    }
  }

  getProviderName(): 'local' {
    return 'local';
  }

  async uploadImage(
    buffer: Buffer,
    mimetype: string,
    originalName: string
  ): Promise<StorageUploadResult> {
    if (process.env.VERCEL) {
      throw new Error('Persistent image storage is not configured for this deployment.');
    }

    const extMatch = originalName.match(/\.(jpg|jpeg|png|webp)$/i);
    const ext = extMatch
      ? extMatch[1].toLowerCase()
      : mimetype === 'image/png'
      ? 'png'
      : mimetype === 'image/webp'
      ? 'webp'
      : 'jpg';
    const filename = `img-${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
    const filePath = path.join(this.uploadsDir, filename);

    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return {
      publicUrl,
      storageRef: `local:${filename}`,
      filename
    };
  }

  async deleteImage(storageRefOrUrl: string): Promise<boolean> {
    if (process.env.VERCEL) {
      return false;
    }

    try {
      let filename = storageRefOrUrl.startsWith('local:')
        ? storageRefOrUrl.replace('local:', '')
        : storageRefOrUrl;

      filename = path.basename(filename);
      const filePath = path.join(this.uploadsDir, filename);

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[LocalMediaStorage] Error unlinking file:', err);
      return false;
    }
  }
}

export class FirebaseMediaStorageProvider implements MediaStorageProvider {
  private bucketName: string;

  constructor(bucketName?: string) {
    this.bucketName = bucketName || process.env.FIREBASE_STORAGE_BUCKET || '';
  }

  getProviderName(): 'firebase' {
    return 'firebase';
  }

  private getBucket() {
    const bucketName = this.bucketName || process.env.FIREBASE_STORAGE_BUCKET;
    if (!bucketName) {
      throw new Error('[FirebaseMediaStorage] FIREBASE_STORAGE_BUCKET is required when using Firebase Storage.');
    }
    getServerFirestore();
    return getStorage().bucket(bucketName);
  }

  async uploadImage(
    buffer: Buffer,
    mimetype: string,
    originalName: string,
    prefix = 'media'
  ): Promise<StorageUploadResult> {
    const bucket = this.getBucket();
    const extMatch = originalName.match(/\.(jpg|jpeg|png|webp)$/i);
    const ext = extMatch
      ? extMatch[1].toLowerCase()
      : mimetype === 'image/png'
      ? 'png'
      : mimetype === 'image/webp'
      ? 'webp'
      : 'jpg';
    const filename = `img-${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
    const objectPath = `${prefix}/${filename}`;
    const file = bucket.file(objectPath);

    await file.save(buffer, {
      metadata: {
        contentType: mimetype,
        metadata: {
          originalName,
          uploadedAt: new Date().toISOString()
        }
      }
    });

    try {
      await file.makePublic();
    } catch {
      // In case bucket uses uniform bucket-level access
    }

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${objectPath}`;
    return {
      publicUrl,
      storageRef: `firebase:${objectPath}`,
      filename
    };
  }

  async deleteImage(storageRefOrUrl: string): Promise<boolean> {
    try {
      const bucket = this.getBucket();
      let objectPath = storageRefOrUrl;
      if (objectPath.startsWith('firebase:')) {
        objectPath = objectPath.replace('firebase:', '');
      } else if (objectPath.includes(`/${bucket.name}/`)) {
        objectPath = objectPath.split(`/${bucket.name}/`)[1];
      }
      
      const file = bucket.file(objectPath);
      await file.delete({ ignoreNotFound: true });
      return true;
    } catch (err) {
      console.warn('[FirebaseMediaStorage] Error deleting object:', err);
      return false;
    }
  }
}

export class SupabaseMediaStorageProvider implements MediaStorageProvider {
  private supabaseUrl: string;
  private secretKey: string;
  private bucket: string;

  constructor(supabaseUrl?: string, secretKey?: string, bucket?: string) {
    this.supabaseUrl = (supabaseUrl || process.env.SUPABASE_URL || '').replace(/\/+$/, '');
    this.secretKey = secretKey || process.env.SUPABASE_SECRET_KEY || '';
    this.bucket = (bucket || process.env.SUPABASE_STORAGE_BUCKET || '').replace(/^\/+|\/+$/g, '');
  }

  getProviderName(): 'supabase' {
    return 'supabase';
  }

  private checkCredentials() {
    if (!this.supabaseUrl || !this.secretKey || !this.bucket) {
      throw new Error(
        '[SupabaseMediaStorage] Missing required environment variables (SUPABASE_URL, SUPABASE_SECRET_KEY, SUPABASE_STORAGE_BUCKET).'
      );
    }
  }

  async uploadImage(
    buffer: Buffer,
    mimetype: string,
    originalName: string,
    prefix = 'media'
  ): Promise<StorageUploadResult> {
    this.checkCredentials();

    const extMatch = originalName.match(/\.(jpg|jpeg|png|webp)$/i);
    const ext = extMatch
      ? extMatch[1].toLowerCase()
      : mimetype === 'image/png'
      ? 'png'
      : mimetype === 'image/webp'
      ? 'webp'
      : 'jpg';
    const filename = `img-${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;

    const cleanPrefix = prefix
      ? (prefix.startsWith('website/') ? prefix : `website/${prefix}`)
      : 'website/media';
    const normalizedPrefix = cleanPrefix.replace(/^\/+|\/+$/g, '');
    const objectPath = `${normalizedPrefix}/${filename}`;

    const encodedBucket = encodeURIComponent(this.bucket);
    const encodedPath = objectPath.split('/').map(encodeURIComponent).join('/');
    const endpoint = `${this.supabaseUrl}/storage/v1/object/${encodedBucket}/${encodedPath}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'apikey': this.secretKey,
        'Content-Type': mimetype,
        'x-upsert': 'false'
      },
      body: buffer
    });

    if (!res.ok) {
      let errDetail = '';
      try {
        const errJson = await res.json();
        errDetail = errJson.message || errJson.error || JSON.stringify(errJson);
      } catch {
        errDetail = await res.text().catch(() => '');
      }
      throw new Error(`[SupabaseMediaStorage] Upload failed (${res.status}): ${errDetail || 'Unknown error'}`);
    }

    const publicUrl = `${this.supabaseUrl}/storage/v1/object/public/${encodedBucket}/${encodedPath}`;

    return {
      publicUrl,
      storageRef: `supabase:${objectPath}`,
      filename
    };
  }

  async deleteImage(storageRefOrUrl: string): Promise<boolean> {
    try {
      this.checkCredentials();

      let objectPath = '';
      if (storageRefOrUrl.startsWith('supabase:')) {
        objectPath = storageRefOrUrl.slice('supabase:'.length);
      } else {
        const publicPrefix = `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/`;
        const encodedBucketPrefix = `${this.supabaseUrl}/storage/v1/object/public/${encodeURIComponent(this.bucket)}/`;

        if (storageRefOrUrl.startsWith(publicPrefix)) {
          objectPath = storageRefOrUrl.slice(publicPrefix.length);
        } else if (storageRefOrUrl.startsWith(encodedBucketPrefix)) {
          objectPath = storageRefOrUrl.slice(encodedBucketPrefix.length);
        }
      }

      if (!objectPath) {
        return false;
      }

      const cleanPath = objectPath.replace(/^\/+/, '');
      const encodedBucket = encodeURIComponent(this.bucket);
      const encodedPath = cleanPath
        .split('/')
        .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
        .join('/');
      const endpoint = `${this.supabaseUrl}/storage/v1/object/${encodedBucket}/${encodedPath}`;

      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'apikey': this.secretKey
        }
      });

      if (!res.ok && res.status !== 404) {
        const errDetail = await res.text().catch(() => '');
        console.warn(`[SupabaseMediaStorage] Delete failed (${res.status}): ${errDetail}`);
        return false;
      }

      return true;
    } catch (err) {
      console.warn('[SupabaseMediaStorage] Error deleting object:', err);
      return false;
    }
  }
}

let activeProvider: MediaStorageProvider | null = null;

export function getMediaStorageProvider(): MediaStorageProvider {
  if (activeProvider) return activeProvider;

  const providerType = (process.env.MEDIA_STORAGE_PROVIDER || 'local').toLowerCase().trim();

  if (providerType === 'supabase') {
    activeProvider = new SupabaseMediaStorageProvider(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
      process.env.SUPABASE_STORAGE_BUCKET
    );
  } else if (providerType === 'firebase') {
    activeProvider = new FirebaseMediaStorageProvider(process.env.FIREBASE_STORAGE_BUCKET);
  } else {
    activeProvider = new LocalMediaStorageProvider();
  }

  return activeProvider;
}
