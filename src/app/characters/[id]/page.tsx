import { Suspense } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { notFound } from 'next/navigation'
import CharacterDetail from '@/components/characters/characterDetail/CharacterDetail';

const SkeletonComponent = () => (
  <SkeletonTheme baseColor="#211b4b" highlightColor="#310e5a">
    <Skeleton count={1} className='h-12 w-full' />
  </SkeletonTheme>
);

interface Props {
  params: Promise<{ id: string; }>;
}

const Character: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const numericId = +id;
  if (isNaN(numericId)) notFound();

  return (
    <div className="bg-violet-950/70 p-2 pt-4 pb-4 md:p-10 rounded-3xl max-w-4xl m-auto">
      <Suspense fallback={<div><SkeletonComponent /></div>}>
        <CharacterDetail id={numericId} />
      </Suspense>
    </div>
  )
};

export default Character;
