'use client'

import Image, { StaticImageData } from 'next/image';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';

interface Props {
  description: string;
  title: string;
  alt: string;
  imageSrc: StaticImageData;
  orderNum: number;
  href: string;
}

const ContentCard: React.FC<Props> = ({ description, imageSrc, title, alt, orderNum, href }) => {
  const isTinyScreen = useMediaQuery('(max-width: 639px)');
  const isSmallScreen = useMediaQuery('(max-width: 1023px)');

  let isPriority;

  switch (orderNum) {
    case 1:
      isPriority = true;
      break;
    case 2:
      isPriority = !isSmallScreen;
      break;
    case 3:
      isPriority = !isTinyScreen && !isSmallScreen ? true : false;
      break;
    default:
      isPriority = false;
      break;
  }

  const width = isTinyScreen ? 400 : 510;

  return (
    <section className="bg-gradient-to-r from-indigo-950 to-purple-950 m-6 rounded-lg shadow-2xl ring-4 ring-indigo-900 shadow-indigo-950 inset-shadow-2xl inset-shadow-indigo-950">
      <div>
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={0}
          className="rounded"
          priority={isPriority}
        />
      </div>
      <div className="p-6 pt-0 h-[14rem] md:h-[12rem] overflow-auto scrollbar-light">
        <h2 className="text-lg pb-6 font-quintessential">
          <Link href={href} className='text-indigo-200 hover:text-fuchsia-200 underline'>
            {title}
          </Link>
        </h2>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default ContentCard;
