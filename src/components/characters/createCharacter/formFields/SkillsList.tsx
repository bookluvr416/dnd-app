import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormType } from '@/lib/formSchema/zodSchema';
import { Skill } from '@/generated/graphql/graphql';

interface Props {
  skills: Skill[];
  errors: FieldErrors<FormType>;
  register: UseFormRegister<FormType>;
}

const SkillsList: React.FC<Props> = ({ skills, errors, register }) => {
  return (
    <div className="flex flex-col">
      {skills.map((skill: Skill) => {
        const standardizedSkill = skill.skill!.toLowerCase().replaceAll(' ', '');

        return (
          <div key={`skill${skill.id}`}>
            <div className="flex items-center">
              <label
                id={standardizedSkill}
                htmlFor={`skill${skill.id}-input`}
                aria-label={skill.skill!}
                className="block text-medium text-indigo-300 w-32"
              >
                {skill.skill}
              </label>
              <input
                // type="number"
                type="text"
                inputMode="numeric"
                id={`skill${skill.id}-input`}
                {...register(`skill${skill.id}`, { valueAsNumber: true })}
                min={-20}
                max={20}
                aria-invalid={errors[`skill${skill.id}`]?.message ? true : false}
                className="w-14 px-2 py-1 bg-purple-950/60 border border-violet-800 rounded-md shadow-sm text-indigo-50 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
              />
            </div>
            <div className="pb-4">
              {errors[`skill${skill.id}`]?.message && (
                <p className="text-red-300 pt-1 text-medium">
                  {`* ${errors[`skill${skill.id}`]?.message}`}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default SkillsList;
