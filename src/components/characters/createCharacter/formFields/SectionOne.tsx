import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormType } from '@/lib/formSchema/zodSchema';
import TextInput from './TextInput';
import NumericInput from './NumericInput';
import Select from './Select';
import { Class } from '@/generated/graphql/graphql';

interface Props {
  errors: FieldErrors<FormType>;
  register: UseFormRegister<FormType>;
  classes: Class[];
}

const SectionOne: React.FC<Props> = ({ errors, register, classes }) => {
  return (
    <>
      {/* Character Name */}
      <TextInput
        id="name"
        label="Character Name"
        name="name"
        register={register}
        errors={errors}
      />

      <div className='md:grid md:grid-cols-2 md:w-full md:gap-4'>
        {/* Class Selection */}
        <Select
          id="class"
          name="class"
          label="Class"
          register={register}
          errors={errors}
          options={classes ? classes.map((singleClass: Class) => ({ id: singleClass.id!, description: singleClass.className! })) : []}
        />

        {/* Level Selection */}
        <div className="pt-6 md:pt-0">
          <NumericInput
            id="level"
            label="Level"
            name="level"
            min={1}
            max={20}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-4'>
        {/* HP */}
        <NumericInput
          id="hp"
          label="HP"
          name="hp"
          min={1}
          max={1000}
          register={register}
          errors={errors}
        />

        {/* AC */}
        <NumericInput
          id="ac"
          label="AC"
          name="ac"
          min={1}
          max={30}
          register={register}
          errors={errors}
        />

        {/* Speed */}
        <div className="pt-4 md:pt-0">
          <NumericInput
            id="speed"
            label="Speed"
            name="speed"
            min={1}
            max={150}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-4'>
        {/* Initiative */}
        <NumericInput
          id="initiative"
          label="Initiative"
          name="initiative"
          min={1}
          max={10}
          register={register}
          errors={errors}
        />

        {/* Proficiency Bonus */}
        <NumericInput
          id="proficiency-bonus"
          label="Proficiency Bonus"
          name="proficiencyBonus"
          min={1}
          max={20}
          register={register}
          errors={errors}
        />
      </div>
    </>
  )
}

export default SectionOne;
