import Image from 'next/image';
import Link from 'next/link';
import WrapperDiv from '@/components/shared/WrapperDiv';
import HeaderBanner from '@/components/shared/HeaderBanner';
import zombie from '@/assets/zombie.webp';

export default function NotFound() { 
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <WrapperDiv>
          <HeaderBanner text='404! Page not found' />
          <div className='flex flex-row gap-4'>
            <Image
              src={zombie}
              alt="zombie"
              width={100}
              height={100}
              className="size-28"
              priority
            />
            <div>
              <p className='mb-5'>A zombie ate that page and it doesn't exist!</p>
              <p className='mb-5'>Bad zombie. No more eating pages.</p>
              <p>Go to the <Link href="/" className='text-purple-400 hover:text-purple-500'>home page</Link>.</p>
            </div>
          </div>
        </WrapperDiv>
      </div>
    </main>
  )
}