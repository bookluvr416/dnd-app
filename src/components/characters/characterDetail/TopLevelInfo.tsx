import Image from 'next/image';
import ghostMage from '@/assets/ghost-mage.webp';
import scrollBanner from '@/assets/scroll-banner2.webp';

interface Props {
  name: string;
  alignment: string;
  race: string;
  className: string;
  level: number;
  imageLink: string | null | undefined;
}

const TopLevelInfo: React.FC<Props> = ({ name, alignment, race, className, level, imageLink }) => {
  const src = imageLink ?? ghostMage;

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="bg-contain bg-center bg-no-repeat relative w-60 sm:w-96 flex flex-col items-center 
                      p-2 sm:p-8 rounded-md text-center font-serif text-purple-950"
        style={{ backgroundImage: `url(${scrollBanner.src})` }}>

        {/* Scroll Content */}
        <h2 className="text-lg sm:text-3xl font-bold mb-2">{name}</h2>
      </div>
      <Image
        src={src}
        alt=''
        width={160}
        height={240}
        style={{ objectFit: 'contain' }}
        className="ring-1 rounded-full w-32 sm:w-52"
        priority={true}
      />
      <div className="flex flex-row flex-wrap items-center align-middle"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4
                        ring-1 ring-indigo-400 bg-indigo-950 text-indigo-200
                        rounded-xl p-4 shadow-md"
        >
          <div className="pr-5">
            <h2 className="text-lg border-b-1 w-16 mb-2">Level</h2>
            {level}
          </div>
          <div className="pr-5">
            <h2 className="text-lg border-b-1 w-16 mb-2">Race</h2>
            {race}
          </div>
          <div className="pr-5">
            <h2 className="text-lg border-b-1 w-16 mb-2">Class</h2>
            {className}
          </div>
          <div>
            <h2 className="text-lg border-b-1 w-24 mb-2">Alignment</h2>
            {alignment}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopLevelInfo;