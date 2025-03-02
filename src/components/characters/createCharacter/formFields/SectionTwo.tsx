import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormType } from '@/lib/formSchema/zodSchema';
import Select from './Select';
import { Alignment, Class, Race } from '@/generated/graphql/graphql';

interface Props {
  errors: FieldErrors<FormType>;
  register: UseFormRegister<FormType>;
  races: Race[];
  alignments: Alignment[];
}

const SectionTwo: React.FC<Props> = ({ errors, register, races, alignments }) => {
  return (
    <div className='md:grid md:grid-cols-2 md:w-full md:gap-4'>
      {/* Race Selection */}
      <Select
        id="race"
        name="race"
        label="Race"
        register={register}
        errors={errors}
        options={races ? races.map((race: Race) => ({ id: race.id!, description: race.raceName! })) : []}
      />

      {/* Alignment Selection */}
      <div className="pt-6 md:pt-0">
        <Select
          id="alignment"
          name="alignment"
          label="Alignment"
          register={register}
          errors={errors}
          options={alignments ? alignments.map((alignment: Alignment) => ({ id: alignment.id!, description: alignment.alignment! })) : []}
        />
      </div>
    </div>
  )
}

export default SectionTwo;
