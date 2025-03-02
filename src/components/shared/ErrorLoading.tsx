import Image from 'next/image';
import skeleton from '@/assets/skeleton.webp';
import Button from '@/components/shared/Button';

interface Props {
  refetch: () => void
}

const ErrorLoading: React.FC<Props> = ({ refetch }) => {
  return (
    <div className='flex flex-row gap-4 bg-indigo-950 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50'>
      <Image
        src={skeleton}
        alt="skeleton sorcerer"
        width={100}
        height={100}
        className="size-28"
        priority
      />
      <div className=''>
        <h2 className='mb-5 text-large'>Error!</h2>
        <p className='mb-5'>A skeleton sorcerer blocked the way and prevented the data from loading!</p>
        <p className='pb-5'>Hopefully the skeleton behaves on the next go-around.</p>
        <p>
          <Button
            text="Try Again"
            onClick={() =>  {
              refetch()
            }}
          />
        </p>
      </div>
    </div>
  )
};

export default ErrorLoading;