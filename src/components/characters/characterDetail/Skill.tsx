import { CharacterSkill } from "@/generated/graphql/graphql";

interface Props {
  skill: CharacterSkill;
}

/**
 * convertProficiencyDisplay
 * @param proficiencyBonus number
 * @returns string for proficiency bonus
 */
const convertProficiencyDisplay = (proficiency: number | null | undefined) => {
  if (!proficiency) return '+0';
  if (proficiency >= 0) return `+${proficiency}`;
  return proficiency;
}

const Skill: React.FC<Props> = ({ skill }) => {
  return (
    <div className="flex flex-row gap-2 w-48
                    rounded-md p-1 pl-4"
    >
      <div className="border-b-1">
        {convertProficiencyDisplay(skill.skillProficiency)}
      </div>
      <div>
        {skill.skill?.skill}
      </div>
    </div>
  )
}

export default Skill;