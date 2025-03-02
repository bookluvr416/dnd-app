import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import HeaderBanner from '@/components/shared/HeaderBanner';
import WrapperDiv from '@/components/shared/WrapperDiv';
import FormFrame from '@/components/characters/createCharacter/FormFrame';
import CharacterForm from '@/components/characters/createCharacter/CharacterForm';
import cauldron from '@/assets/Cauldron.webp';
import blueAmulet from '@/assets/blue-amulet.webp';
import goldCoins from '@/assets/gold-coins.webp';
import manaPotion from '@/assets/mana-potion.webp';
import { Suspense } from 'react';

export default async function CreateCharacter() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <WrapperDiv>
      <HeaderBanner text="Create Your Character" />
      <div className="flex flex-row gap-2 sm:gap-4 pb-5 pl-8 pr-8 justify-between items-center">
        <Image
          src={goldCoins}
          alt="gold coins"
          width={75}
          height={100}
          className="size-14 md:size-16 lg:size-20"
          priority
        />
        <Image
          src={blueAmulet}
          alt="blue amulet"
          width={75}
          height={100}
          className="hidden md:block md:size-16 lg:size-20"
          priority
        />
        <Image
          src={cauldron}
          alt="cauldron"
          width={75}
          height={100}
          className="hidden md:block md:size-16 lg:size-20"
          priority
        />
        <Image
          src={manaPotion}
          alt="mana potion"
          width={75}
          height={100}
          className="size-14 md:size-16 lg:size-20"
          priority
        />
      </div>
      <Suspense fallback={<div><FormFrame /></div>}>
        <CharacterForm />
      </Suspense>
    </WrapperDiv>
  )
}
