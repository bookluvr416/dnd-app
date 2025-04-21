import { CharacterAbility } from '@/generated/graphql/graphql';

interface Props {
  ability: CharacterAbility;
}

const convertProficiencyDisplay = (proficiencyBonus: number | null | undefined) => {
  if (!proficiencyBonus) return '+0';
  if (proficiencyBonus >= 0) return `+${proficiencyBonus}`;
  return proficiencyBonus;
}

const Ability: React.FC<Props> = ({ ability }) => {
  return (
    <div className='w-28 flex flex-col items-center'>
      <div className="flex flex-col items-center justify-center
                      ring-2 ring-indigo-400 bg-indigo-950 text-indigo-200
                      rounded-xl p-4 pb-6 w-28 shadow-md"
      >
        <div>
          {ability.ability?.ability}
        </div>
        <div className='text-lg'>
          {ability.abilityScore}
        </div>
      </div>
      <div className="flex items-center justify-center
                      ring-2 ring-indigo-400 bg-indigo-200 text-indigo-700 font-semibold
                      rounded-full w-10 h-10 -mt-5 shadow-md"
      >
        {convertProficiencyDisplay(ability.proficiencyBonus)}
      </div>
    </div>
  )
}

export default Ability;