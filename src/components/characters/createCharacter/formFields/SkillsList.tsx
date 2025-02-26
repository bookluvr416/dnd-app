import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "@/lib/formSchema/zodSchema";
import { Skill } from "@/generated/graphql/graphql";
import NumericInput from "./NumericInput";

interface Props {
  skills: Skill[];
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
}

const SkillsList: React.FC<Props> = ({ skills, errors, register }) => {
  return (
    <div className="flex flex-col gap-4">
      {skills.map((skill: Skill) => {
        const standardizedSkill = skill.skill!.toLowerCase().replaceAll(' ', '') as keyof FormData;

        return (
          <div key={standardizedSkill} className="flex items-center">
            <label
              id={standardizedSkill}
              htmlFor={standardizedSkill}
              aria-label={skill.skill!}
              className="block font-medium text-indigo-300 w-32"
            >
              {skill.skill}
            </label>
            <input
              type="number"
              id={`${standardizedSkill}-input`}
              {...register(standardizedSkill as keyof FormData, { valueAsNumber: true })}
              min={-20}
              max={20}
              className="w-14 px-2 py-1 bg-purple-950/30 border border-violet-800 rounded-md shadow-sm text-indigo-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
            />
            {errors[standardizedSkill]?.message && <p>{errors[standardizedSkill]?.message}</p>}
          </div>
        )
      })}
    </div>
  )
};

export default SkillsList;
