import { CharacterAbility } from '@/generated/graphql/graphql';
import Ability from './Ability';

interface Props {
  abilities: CharacterAbility[];
}

const Abilities: React.FC<Props> = ({ abilities }) => {
  return (
    <div>
      {abilities.map((ability) => (
        <div className="pb-4" key={ability.id} >
          <Ability ability={ability} />
        </div>
      ))}
    </div>
  );
}

export default Abilities;
