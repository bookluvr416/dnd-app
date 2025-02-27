import DiceRoller from '@/components/diceroller/DiceRoller';
import HeaderBanner from '@/components/shared/HeaderBanner';
import WrapperDiv from '@/components/shared/WrapperDiv';

export default function DiceRollerPage() {
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <WrapperDiv>
          <HeaderBanner text="Dice Roller" />
          <DiceRoller />
        </WrapperDiv>
      </div>
    </main>
  );
}
