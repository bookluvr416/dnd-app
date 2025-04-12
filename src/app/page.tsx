import ContentGrid from '@/components/homepage/ContentGrid';
import HeaderBanner from '@/components/shared/HeaderBanner';
import blueDragon from '@/assets/bluedragon.webp';
import sittingBlueDragon from '@/assets/sitting-blue-dragon.webp';

export default function Home() {
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <div className='bg-violet-950/70 p-8 md:p-10 rounded-3xl max-w-5xl m-auto'>
          <HeaderBanner
            text="The Astral Codex: A D&D Playground"
            outerLeft={sittingBlueDragon}
            outerRight={blueDragon}
          />
          <div>
            <ContentGrid />
          </div>
        </div>
      </div>
    </main>
  );
}
