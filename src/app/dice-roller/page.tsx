import DiceRoller from '@/components/diceroller/DiceRoller';
import HeaderBanner from '@/components/shared/HeaderBanner';
import WrapperDiv from '@/components/shared/WrapperDiv';
import natureOrb from '@/assets/nature-orb.webp';
import fireOrb from '@/assets/fire-orb.webp';
import darkOrb from '@/assets/dark-orb.webp';
import electroOrb from '@/assets/electro-orb.webp';

export default function DiceRollerPage() {
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <WrapperDiv>
          <HeaderBanner
            text="Dice Roller"
            outerLeft={natureOrb}
            outerRight={fireOrb}
            innerLeft={electroOrb}
            innerRight={darkOrb}
          />
          <DiceRoller />
        </WrapperDiv>
      </div>
    </main>
  );
}
