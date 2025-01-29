import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import SignOutButton from '@/components/auth/SignOutButton';

export default async function ProtectedPage() {
  const user = await getServerSession(authOptions)
  if (!user) return notFound()

  return (
    <>
      <SignOutButton />
      <h1>Protected</h1>
    </>
  );
}