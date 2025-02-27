import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormData } from '@/lib/formSchema/zodSchema';
import { Skill } from '@/generated/graphql/graphql';
import ErrorDisplay from './ErrorDisplay';

interface Props {
  skills: Skill[];
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
}

const SkillsList: React.FC<Props> = ({ skills, errors, register }) => {
  return (
    <div className="flex flex-col">
      {skills.map((skill: Skill) => {
        const standardizedSkill = skill.skill!.toLowerCase().replaceAll(' ', '') as keyof FormData;

        return (
          <div key={standardizedSkill}>
            <div className="flex items-center">
              <label
                id={standardizedSkill}
                htmlFor={`${standardizedSkill}-input`}
                aria-label={skill.skill!}
                className="block text-small text-indigo-300 w-32"
              >
                {skill.skill}
              </label>
              <input
                type="number"
                id={`${standardizedSkill}-input`}
                {...register(standardizedSkill as keyof FormData, { valueAsNumber: true })}
                min={-20}
                max={20}
                aria-invalid={errors[standardizedSkill]?.message ? true : false}
                className="w-14 px-2 py-1 bg-purple-950/30 border border-violet-800 rounded-md shadow-sm text-indigo-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
              />
            </div>
            <div className="pb-4">
              {errors[standardizedSkill]?.message && (
                <p className="text-red-300 pt-1">
                  {`* ${errors[standardizedSkill].message}`}
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
