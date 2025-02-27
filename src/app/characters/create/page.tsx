import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import CharacterForm from '@/components/characters/createCharacter/CharacterForm';

export default async function CreateCharacter() {
  const user = await getServerSession(authOptions);
  if (!user) return (
    <div className="bg-blue-950/80 p-8 md:p-20 rounded-3xl max-w-7xl m-auto">
      <h1 className='text-xl pb-5'>Log in required!</h1>
      <div className=''>
        This page can only be accessed by logged in users. Please <Link href="/login" className='text-violet-300 hover:text-violet-400'>log in</Link>.
      </div>
    </div>
  );

  return (
    <div className="bg-blue-950/80 p-8 md:p-20 rounded-3xl max-w-5xl m-auto">
      <h1 className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl text-center font-quintessential items-center mb-6 md:mb-12 p-4 sm:p-6 text-large sm:text-2xl text-fuchsia-200">
        Create Your Character
      </h1>

      <CharacterForm />
    </div>
  )
}