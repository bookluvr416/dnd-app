import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormType } from '@/lib/formSchema/zodSchema';
import { Ability } from '@/generated/graphql/graphql';
import NumericInput from './NumericInput';

interface Props {
  abilities: Ability[];
  errors: FieldErrors<FormType>;
  register: UseFormRegister<FormType>;
}

const AbilitiesList: React.FC<Props> = ({ abilities, errors, register }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {abilities.map((ability) => {
        const standardizedAbility = ability.ability!.toLowerCase().replace(' ', '');

        return (
          <div
            key={standardizedAbility}
            className="bg-purple-950/20 rounded-lg p-4 border border-violet-800"
          >
            <div className="text-center mb-2">
              <h3 className="font-medium text-indigo-300">
                {ability.ability}
              </h3>
            </div>
            <div className="flex flex-col space-y-3">
              <NumericInput 
                id={`${standardizedAbility}-score`}
                label="Ability Score"
                name={`abilityScore${ability.id}`}
                min={1}
                max={30}
                register={register}
                errors={errors}
              />

              <NumericInput 
                id={`${standardizedAbility}-proficiency-bonus`}
                label="Proficiency Bonus"
                name={`abilityBonus${ability.id}`}
                min={-20}
                max={20}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default AbilitiesList;
