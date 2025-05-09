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

  // sets priority for lazy loading based on if this will show on the first line
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
    <Link
      href={href}
      className="bg-gradient-to-r from-indigo-950 to-purple-950 m-6 rounded-lg block
                ring-4 ring-indigo-900 focus:outline-purple-800 focus-visible:outline-purple-800
                shadow-2xl shadow-indigo-950 inset-shadow-2xl inset-shadow-indigo-950
                hover:ring-indigo-600 hover:cursor-pointer focus-active:ring-indigo-600"
    >
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
      <div className="p-6 pt-0 h-[14rem] overflow-auto scrollbar-light">
        <h2 className="text-lg pb-6 font-quintessential text-indigo-200">
            {title}
        </h2>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
