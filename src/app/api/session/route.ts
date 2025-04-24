import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { session: null },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { session },
    { status: 200 }
  );
}