import { CharacterAbility } from '@/generated/graphql/graphql';
import Ability from './Ability';

interface Props {
  abilities: CharacterAbility[];
}

const Abilities: React.FC<Props> = ({ abilities }) => {
  return (
    <div className="flex flex-row sm:flex-col items-center justify-center flex-wrap gap-4">
      {abilities.map((ability) => (
        <div className="pb-4" key={ability.id}>
          <Ability ability={ability} />
        </div>
      ))}
    </div>
  );
}

export default Abilities;
