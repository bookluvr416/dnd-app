import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json() as HandleUploadBody;

    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Optional validation logic here
        return {
          allowWrite: true,
          // Additional options
          addRandomSuffix: true,
          maximumSizeInBytes: 5 * 1024 * 1024, // 5MB
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // This callback is called after the upload is complete
        // You can perform additional actions here, like saving to a database
        console.log('Upload completed for', blob.url);
      },
    });
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating upload URL' },
      { status: 500 }
    );
  }
}