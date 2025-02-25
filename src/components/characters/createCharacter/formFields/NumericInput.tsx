interface Props {
  id: string;
  label: string;
  name: string;
  htmlFor: string;
  min: number;
  max: number;
}

const NumericInput: React.FC<Props> = ({ id, label, name, htmlFor, min, max }) => {
  return (
    <div>
      <label
        id={id}
        htmlFor={htmlFor}
        aria-label={label}
        className="block font-medium text-indigo-300 mb-1"
      >
        {label}
      </label>
      <input
        type="number"
        id={`${id}-input`}
        name={name}
        min={min}
        max={max}
        className='w-full px-3 py-2 bg-purple-950/30 border border-violet-800 rounded-md shadow-sm text-indigo-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800'
      />
    </div>
  )
};

export default NumericInput;
