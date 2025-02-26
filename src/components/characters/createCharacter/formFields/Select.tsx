import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "@/lib/formSchema/zodSchema";

interface Props {
  id: string;
  label: string;
  name: keyof FormData;
  htmlFor: string;
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
  options: { id: number; description: string; }[];
}

const Select: React.FC<Props> = ({ id, label, name, htmlFor, options, errors, register }) => {
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
      <select
        id={`${id}-select`}
        defaultValue={0}
        {...register(name, { valueAsNumber: true })}
        className='w-full px-3 py-2 bg-purple-950/30 border border-violet-800 rounded-md shadow-sm text-indigo-50 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800 focus:bg-violet-950/50'
      >
        <option value={0}></option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.description}</option>
        ))}
      </select>
      {errors[name]?.message && <p>{errors[name]?.message}</p>}
    </div>
  )
};

export default Select;
