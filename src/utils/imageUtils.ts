/**
 * Compresses an image base64 string to a target size or quality
 */
export async function compressImage(
  base64Str: string,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's not a base64 image, return as is
    if (!base64Str.startsWith('data:image/')) {
      return resolve(base64Str);
    }

    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return resolve(base64Str);
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Get compressed base64
      const compressed = canvas.toDataURL('image/jpeg', quality);
      
      // If compressed is somehow larger than original, return original
      if (compressed.length > base64Str.length) {
        resolve(base64Str);
      } else {
        resolve(compressed);
      }
    };
    img.onerror = (err) => reject(err);
  });
}
