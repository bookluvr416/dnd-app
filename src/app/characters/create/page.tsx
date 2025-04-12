import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Suspense } from 'react';
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

export default async function CreateCharacter() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <WrapperDiv>
      <HeaderBanner
        text="Create Your Character"
        outerLeft={goldCoins}
        outerRight={manaPotion}
        innerLeft={blueAmulet}
        innerRight={cauldron}
      />
      <Suspense fallback={<div><FormFrame /></div>}>
        <CharacterForm />
      </Suspense>
    </WrapperDiv>
  )
}
