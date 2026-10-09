import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { getStorage } from 'firebase-admin/storage';
import { getServerFirestore } from './firebaseServer';

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
  getProviderName(): 'local' | 'firebase';
}

export class LocalMediaStorageProvider implements MediaStorageProvider {
  private uploadsDir: string;

  constructor(uploadsDir?: string) {
    this.uploadsDir = uploadsDir || path.resolve(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
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
    if (!this.bucketName && process.env.NODE_ENV === 'production') {
      throw new Error('[FirebaseMediaStorage] FIREBASE_STORAGE_BUCKET is required when MEDIA_STORAGE_PROVIDER=firebase');
    }
  }

  getProviderName(): 'firebase' {
    return 'firebase';
  }

  async uploadImage(
    buffer: Buffer,
    mimetype: string,
    originalName: string,
    prefix = 'media'
  ): Promise<StorageUploadResult> {
    // Ensure Firebase Admin is initialized
    getServerFirestore();

    const bucket = getStorage().bucket(this.bucketName || undefined);
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
      getServerFirestore();
      const bucket = getStorage().bucket(this.bucketName || undefined);
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

let activeProvider: MediaStorageProvider | null = null;

export function getMediaStorageProvider(): MediaStorageProvider {
  if (activeProvider) return activeProvider;

  const providerType = (process.env.MEDIA_STORAGE_PROVIDER || 'local').toLowerCase().trim();

  if (providerType === 'firebase') {
    activeProvider = new FirebaseMediaStorageProvider(process.env.FIREBASE_STORAGE_BUCKET);
  } else {
    activeProvider = new LocalMediaStorageProvider();
  }

  return activeProvider;
}
