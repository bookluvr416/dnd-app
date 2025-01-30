import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function ProtectedPage() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  return (
    <>
      <h1>Protected</h1>
    </>
  );
}