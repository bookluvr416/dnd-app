'use client'

import { notFound } from 'next/navigation'
import ErrorLoading from '@/components/shared/ErrorLoading';
import { useCharacter } from '@/lib/graphql/hooks';
import Abilities from './Abilities';
import Skills from './Skills';
import TopLevelInfo from './TopLevelInfo';
import MidLevelInfo from './MidLevelInfo';

interface Props {
  id: number;
}

const CharacterDetail: React.FC<Props> = ({ id }) => {
  const { data, error, refetch } = useCharacter(id);
  const character = data?.character;

  if (error) {
    return <ErrorLoading refetch={refetch} />
  }

  if (!character) notFound();

  return (
    <div>
      <div className="flex flex-col gap-12 flex-wrap justify-center items-center">
        <div>
          <TopLevelInfo
            name={character.name ?? ''}
            level={character.level ?? 1}
            className={character.class?.className ?? ''}
            race={character.race?.raceName ?? ''}
            alignment={character.alignment?.alignment ?? ''}
            imageLink={character.imageLink}
          />
        </div>
        <div className="flex flex-row gap-12 flex-wrap justify-center">
          <MidLevelInfo value={character.initiative?.toString() ? `+${character.initiative?.toString()}` : ''} label="Initiative" />
          <MidLevelInfo value={character.armorClass?.toString() ?? ''} label="AC" />
          <MidLevelInfo value={character.proficiencyBonus?.toString() ? `+${character.proficiencyBonus?.toString()}` : ''} label="Proficiency Bonus" />
          <MidLevelInfo value={character.speed?.toString() ? `${character.speed?.toString()} ft` : ''} label="Speed" />
        </div>
        <div className='flex flex-row gap-12 flex-wrap justify-center'>
          <div>
            <Abilities abilities={character.abilities?.filter(ability => ability !== null) ?? []} />
          </div>
          <div>
            <Skills skills={character.skills?.filter(skill => skill !== null) ?? []} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail;
