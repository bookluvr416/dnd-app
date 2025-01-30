import ContentCard from './ContentCard';
import diceImg from '@/assets/dnddice.png';
import elfImg from '@/assets/elf.png';
import bardImg from '@/assets/bard.png';

const ContentGrid = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 ml-10 mr-10 lg:ml20 lg:mr20 place-items-center'>
      <div className="max-w-96">
        <ContentCard
          title="Character Management"
          description="For all your character sheet needs! View a list of all characters, add a new character, modify or delete an existing character."
          imageSrc={elfImg}
          alt="A warrior holding up a sword"
        />
      </div>
      <div className="max-w-96">
        <ContentCard
          title="Dice Roller"
          description="Roll the dice and see what your future holds! Dice rolls for d4 up to d20."
          imageSrc={diceImg}
          alt="D&D dice"
        />
      </div>
      <div className="max-w-96">
        <ContentCard
          title="A Life in the Day: An Adventurer's Blog"
          description="Read all about the daily adventures of our favorite heroes."
          imageSrc={bardImg}
          alt="Adventurers exploring a seal"
        />
      </div>
    </div>
  );
};

export default ContentGrid;
