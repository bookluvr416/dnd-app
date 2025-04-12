import CharacterCard from './CharacterCard';
import Paginator from '../shared/Paginator';
import { Character, GetCharactersQuery } from '@/generated/graphql/graphql';

interface Props {
  sortedCharacters: Character[];
  data: GetCharactersQuery | undefined;
  handlePageChange: (pageNumber: number) => void;
}

const CharacterList: React.FC<Props> = ({ data, sortedCharacters, handlePageChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-7">
        {sortedCharacters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            index={index}
          />
        ))}
      </div>
      {data && (
        <div className='mt-10'>
          <Paginator
            totalPages={data.characters.totalPages}
            totalResults={data.characters.totalCount}
            currentPage={data.characters.currentPage}
            pageSize={data.characters.pageSize}
            onPageChange={handlePageChange}
            hasNextPage={data.characters.hasNextPage}
            hasPreviousPage={data.characters.hasPreviousPage}
          />
        </div>
      )}
      
    </>
  );
}

export default CharacterList;
