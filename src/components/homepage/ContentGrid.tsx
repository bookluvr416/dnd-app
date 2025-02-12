import ContentCard from './ContentCard';
import diceImg from '@/assets/dnddice.webp';
import elfImg from '@/assets/elf.webp';
import bardImg from '@/assets/bard.webp';

const ContentGrid = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 ml-10 mr-10 lg:ml20 lg:mr20 place-items-center'>
      <div className="max-w-80 md:max-w-96">
        <ContentCard
          title="Character Management"
          description="For all your character sheet needs! View a list of all characters, add a new character, modify or delete an existing character."
          imageSrc={elfImg}
          alt="A warrior holding up a sword"
          orderNum={1}
          href="/characters"
        />
      </div>
      <div className="max-w-80 md:max-w-96">
        <ContentCard
          title="Dice Roller"
          description="Roll the dice and see what your future holds! Dice rolls for d4 up to d20."
          imageSrc={diceImg}
          alt="D&D dice"
          orderNum={2}
          href="/dice-roller"
        />
      </div>
      <div className="max-w-80 md:max-w-96">
        <ContentCard
          title="A Day in the Life: An Adventurer's Blog"
          description="Read all about the daily adventures of our favorite heroes."
          imageSrc={bardImg}
          alt="Adventurers exploring a seal"
          orderNum={3}
          href="/"
        />
      </div>
    </div>
  );
};

export default ContentGrid;
