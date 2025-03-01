import Image from 'next/image';
import Link from 'next/link';
import CharacterList from '@/components/characters/CharacterList';
import HeaderBanner from '@/components/shared/HeaderBanner';
import WrapperDiv from '@/components/shared/WrapperDiv';
import femaleCleric from '@/assets/female-cleric.webp';
import elf from '@/assets/archer-elf.webp';
import cleric from '@/assets/male-cleric.webp';
import paladin from '@/assets/male-paladin.webp';

export default function CharactersPage() {
  return (
    <WrapperDiv>
      <HeaderBanner text="Characters" />
      <div className="flex flex-row gap-2 sm:gap-4 pb-5 justify-between items-center">
        <Image
          src={femaleCleric}
          alt="female human cleric"
          width={100}
          height={100}
          className="size-20 md:size-24 lg:size-28"
          priority
        />
        <Image
          src={paladin}
          alt="male paladin"
          width={100}
          height={100}
          className="hidden md:block md:size-24 lg:size-28"
          priority
        />
        <Link
          href="/characters/create"
          className="rounded-lg p-4 mb-7 bg-violet-900 hover:bg-violet-800"
        >
          Create Character
        </Link>
        <Image
          src={elf}
          alt="female elf archer"
          width={100}
          height={100}
          className="hidden md:block md:size-24 lg:size-28"
          priority
        />
        <Image
          src={cleric}
          alt="male human cleric"
          width={100}
          height={100}
          className="size-20 md:size-24 lg:size-28"
          priority
        />
      </div>
      <CharacterList />
    </WrapperDiv>
  );
}
