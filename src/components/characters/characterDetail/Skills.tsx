import { CharacterSkill } from '@/generated/graphql/graphql';
import Skill from './Skill';

interface Props {
  skills: CharacterSkill[];
}

const Skills: React.FC<Props> = ({ skills }) => {
  return (
    <div className="ring-1 ring-indigo-400 bg-indigo-950 text-indigo-200 rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-lg pb-4">
        Skills
      </h2>
      {skills.map((skill) => (
        <div className="pb-1" key={skill.id}>
          <Skill skill={skill} />
        </div>
      ))}
    </div>
  );
}

export default Skills;