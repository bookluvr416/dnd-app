import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormType } from '@/lib/formSchema/zodSchema';
import ErrorDisplay from './ErrorDisplay';

interface Props {
  id: string;
  label: string;
  name: string;
  min: number;
  max: number;
  errors: FieldErrors<FormType>;
  register: UseFormRegister<FormType>;
}

const NumericInput: React.FC<Props> = ({ id, label, name, min, max, errors, register }) => {
  return (
    <div>
      <label
        id={id}
        htmlFor={`${id}-input`}
        aria-label={label}
        className="block text-small text-indigo-300 mb-1"
      >
        {label}
      </label>
      <input
        type="number"
        id={`${id}-input`}
        {...register(name, { valueAsNumber: true })}
        min={min}
        max={max}
        aria-invalid={errors[name]?.message ? true : false}
        className='w-full px-3 py-2 bg-purple-950/30 border border-violet-800 rounded-md shadow-sm text-indigo-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800'
      />
      {errors[name]?.message && <ErrorDisplay message={errors[name].message as string} />}
    </div>
  )
};

export default NumericInput;
