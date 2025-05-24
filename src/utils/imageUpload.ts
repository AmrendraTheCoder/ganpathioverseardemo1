import { createClient } from '../supabase/client';

export class ImageUploadService {
  private supabase = createClient();

  /**
   * Upload image to Supabase storage
   * @param file - File object to upload
   * @param bucket - Storage bucket name
   * @param folder - Folder within bucket (optional)
   * @returns Promise with public URL or error
   */
  async uploadImage(
    file: File, 
    bucket: 'blog-images' | 'gallery' | 'uploads',
    folder?: string
  ): Promise<{ url?: string; error?: string }> {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload file
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return { url: publicUrl };
    } catch (error: any) {
      console.error('Error uploading image:', error);
      return { error: error.message };
    }
  }

  /**
   * Delete image from Supabase storage
   * @param bucket - Storage bucket name
   * @param path - File path within bucket
   */
  async deleteImage(
    bucket: 'blog-images' | 'gallery' | 'uploads',
    path: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting image:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get optimized image URL with transformations
   * @param url - Original image URL
   * @param width - Desired width
   * @param height - Desired height
   * @param quality - Image quality (1-100)
   */
  getOptimizedUrl(
    url: string, 
    width?: number, 
    height?: number, 
    quality: number = 80
  ): string {
    if (!url.includes('supabase')) {
      return url; // Return as-is for non-Supabase URLs
    }

    const params = new URLSearchParams();
    if (width) params.set('width', width.toString());
    if (height) params.set('height', height.toString());
    params.set('quality', quality.toString());
    params.set('format', 'webp'); // Modern format for better compression

    return `${url}?${params.toString()}`;
  }
}

// Export singleton instance
export const imageUploadService = new ImageUploadService();

// Utility function for image validation
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Please upload a valid image file (JPEG, PNG, or WebP)' 
    };
  }

  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'Image size must be less than 5MB' 
    };
  }

  return { valid: true };
};

// Utility to extract file path from Supabase URL
export const getFilePathFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const bucketIndex = pathSegments.findIndex(segment => 
      ['blog-images', 'gallery', 'uploads'].includes(segment)
    );
    
    if (bucketIndex !== -1 && bucketIndex < pathSegments.length - 1) {
      return pathSegments.slice(bucketIndex + 1).join('/');
    }
    
    return null;
  } catch {
    return null;
  }
};