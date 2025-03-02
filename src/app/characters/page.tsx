import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import CharacterList from '@/components/characters/CharacterList';
import HeaderBanner from '@/components/shared/HeaderBanner';
import WrapperDiv from '@/components/shared/WrapperDiv';
import femaleCleric from '@/assets/female-cleric.webp';
import elf from '@/assets/archer-elf.webp';
import cleric from '@/assets/male-cleric.webp';
import paladin from '@/assets/male-paladin.webp';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonComponent = () => (
  <SkeletonTheme baseColor="#211b4b" highlightColor="#310e5a">
    <section>
      <Skeleton count={1} className='h-28 ring-1 ring-blue-700/50' />
    </section>
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-7'>
      <Skeleton className='h-48 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50' />
      <Skeleton className='h-48 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50' />
      <Skeleton className='h-48 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50' />
      <Skeleton className='h-48 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50' />
      <Skeleton className='h-48 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50' />
      <Skeleton className='h-48 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50' />
    </section>
  </SkeletonTheme>
);

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
          className="size-14 md:size-16 lg:size-20"
          priority
        />
        <Image
          src={paladin}
          alt="male paladin"
          width={100}
          height={100}
          className="hidden md:block md:size-16 lg:size-20"
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
          className="hidden md:block md:size-16 lg:size-20"
          priority
        />
        <Image
          src={cleric}
          alt="male human cleric"
          width={100}
          height={100}
          className="size-14 md:size-16 lg:size-20"
          priority
        />
      </div>
      <Suspense fallback={<div><SkeletonComponent /></div>}>
        <CharacterList />
      </Suspense>
    </WrapperDiv>
  );
}
