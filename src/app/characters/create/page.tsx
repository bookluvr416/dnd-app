import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import HeaderBanner from '@/components/shared/HeaderBanner';
import WrapperDiv from '@/components/shared/WrapperDiv';
import CharacterForm from '@/components/characters/createCharacter/CharacterForm';
import cauldron from '@/assets/Cauldron.png';
import blueAmulet from '@/assets/blue-amulet.png';
import goldCoins from '@/assets/gold-coins.png';
import manaPotion from '@/assets/mana-potion.png';

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
    <WrapperDiv>
      <HeaderBanner text="Create Your Character" />
      <div className="flex flex-row gap-2 sm:gap-4 pb-5 pl-8 pr-8 justify-between items-center">
        <Image
          src={goldCoins}
          alt="gold coins"
          width={75}
          height={100}
          className="size-16 md:size-20"
          priority
        />
        <Image
          src={blueAmulet}
          alt="blue amulet"
          width={100}
          height={100}
          className="hidden md:block md:size-24"
          priority
        />
        <Image
          src={cauldron}
          alt="cauldron"
          width={100}
          height={100}
          className="hidden md:block md:size-24"
          priority
        />
        <Image
          src={manaPotion}
          alt="mana potion"
          width={100}
          height={100}
          className="size-16 md:size-24"
          priority
        />
      </div>
      <CharacterForm />
    </WrapperDiv>
  )
}
