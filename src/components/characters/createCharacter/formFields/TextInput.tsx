interface Props {
  id: string;
  label: string;
  name: string;
  htmlFor: string;
}

const TextInput: React.FC<Props> = ({ id, label, name, htmlFor }) => {
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
        id={`${id}-input`}
        name={name}
        className='w-full px-3 py-2 bg-purple-950/30 border border-violet-800 rounded-md shadow-sm text-indigo-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800'
      />
    </div>
  )
};

export default TextInput;
