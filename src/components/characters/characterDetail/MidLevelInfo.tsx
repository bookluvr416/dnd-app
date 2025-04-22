interface Props {
  value: string;
  label: string;
}

const MidLevelInfo: React.FC<Props> = ({ value, label }) => {
  return (
    <div className='w-20 flex flex-col items-center text-wrap'>
      <div className="flex flex-col items-center justify-center
                      ring-1 ring-indigo-400 bg-indigo-950 text-indigo-200
                      rounded-xl p-4 pb-6 w-28 shadow-md"
      >
        <div className='text-lg'>
          {value}
        </div>
      </div>
      <div className="flex items-center justify-center text-wrap text-center
                      ring-2 bg-indigo-950 text-indigo-200
                      rounded-full w-24 h-12 -mt-4 shadow-md text-sm"
      >
        {label}
      </div>
    </div>
  )
}

export default MidLevelInfo;