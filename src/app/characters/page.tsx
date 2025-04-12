import { Suspense } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Characters from '@/components/characters/Characters';
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
      <HeaderBanner
        text="Characters"
        outerLeft={femaleCleric}
        outerRight={cleric}
        innerLeft={paladin}
        innerRight={elf}
      />
      <Suspense fallback={<div><SkeletonComponent /></div>}>
        <Characters />
      </Suspense>
    </WrapperDiv>
  );
}
