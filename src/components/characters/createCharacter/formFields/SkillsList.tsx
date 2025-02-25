import { Skill } from "@/generated/graphql/graphql";

interface Props {
  skills: Skill[];
}

const SkillsList: React.FC<Props> = ({ skills }) => {
  return (
    <div className="flex flex-col gap-4">
      {skills.map((skill: Skill) => (
        <div key={skill.skill} className="flex items-center">
          <label
            id={skill.skill!}
            htmlFor={skill.skill!}
            aria-label={skill.skill!}
            className="block font-medium text-indigo-300 w-32"
          >
            {skill.skill}
          </label>
          <input
            type="number"
            id={`${skill.skill!}-input`}
            name={skill.skill!}
            defaultValue={0}
            className="w-14 px-2 py-1 bg-purple-950/30 border border-violet-800 rounded-md shadow-sm text-indigo-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
          />
        </div>
      ))}
    </div>
  )
};

export default SkillsList;
