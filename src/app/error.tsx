'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react';
import Image from 'next/image';
import WrapperDiv from '@/components/shared/WrapperDiv';
import HeaderBanner from '@/components/shared/HeaderBanner';
import Button from '@/components/shared/Button';
import fireTroll from '@/assets/fire-troll.webp';

export default function Error({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <WrapperDiv>
          <HeaderBanner text='Whoops! Something went wrong.' />
          <div className='flex flex-row gap-4'>
            <Image
              src={fireTroll}
              alt="fire troll"
              width={100}
              height={100}
              className="size-28"
              priority
            />
            <div>
              <p className='mb-5'>A flaming troll came tearing through the site!</p>
              <p>Hopefully the troll is gone on the next go-around.</p>
              <Button
                text="Try Again"
                type="button"
                cssMargin='mt-5'
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
                }
              />
            </div>
          </div>
        </WrapperDiv>
      </div>
    </main>
  )
}