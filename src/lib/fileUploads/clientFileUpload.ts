import { upload } from '@vercel/blob/client';

/**
 * uploadFile
 * Calls the api route to upload blob to blob storage
 * @param file File
 * @param pathname string
 * @returns url to uploaded file
 */
export async function uploadFile(file: File, pathname: string) {
  if (!file) return;

  const path = `${pathname}/${file.name}`;

  try {
    const response = await upload(path, file, {
      access: 'public',
      handleUploadUrl: '/api/upload-blob',
    });
      
    return response.url;
  } catch (err) {
    console.error('Upload failed');
    console.log(err);
    throw new Error();
  }
}

