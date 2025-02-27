import D4 from './D4';
import OtherDice from './OtherDice';
import { Dice, ShouldRoll } from '@/interfaces/dice-interfaces';

interface Props {
  handleDiceResult: (diceType: keyof Dice, result: number) => void;
  shouldRoll: ShouldRoll
}

/**
 * getRandomFace
 * gets a random dice face between the min and max
 * @param min number
 * @param max number
 * @returns dice face number
 */
const getRandomFace = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * getRandomNumber
 * gets a random number for the dice to land on
 * @param min number
 * @param max number
 * @param avoid array of numbers
 * @returns dice number
 */
const getRandomNumber = (min: number, max: number, avoid: number[]) => {
   const allowedNumbers = Array((max - min) + 1)
    .fill(null)
    .map((_empty, index) => index + min)
    .filter(number => !avoid.includes(number));

  return allowedNumbers[Math.floor(Math.random() * allowedNumbers.length)];
}

const AllDice: React.FC<Props> = ({ shouldRoll, handleDiceResult }) => {
  return (
    <div className="dice-wrapper grid grid-cols-6 place-items-center max-w-xl md:max-w-6xl h-32">
      <D4
        getRandomFace={getRandomFace}
        getRandomNumber={getRandomNumber}
        shouldRoll={shouldRoll.d4}
        handleDiceResult={handleDiceResult}
        animationTime={3}
      />
      <OtherDice
        getRandomFace={getRandomFace}
        getRandomNumber={getRandomNumber}
        shouldRoll={shouldRoll.d6}
        handleDiceResult={handleDiceResult}
        diceType="d6"
        initialNumber={3}
        animationTime={3}
      />
      <OtherDice
        getRandomFace={getRandomFace}
        getRandomNumber={getRandomNumber}
        shouldRoll={shouldRoll.d8}
        handleDiceResult={handleDiceResult}
        diceType="d8"
        initialNumber={2}
        animationTime={3}
      />
      <OtherDice
        getRandomFace={getRandomFace}
        getRandomNumber={getRandomNumber}
        shouldRoll={shouldRoll.d10}
        handleDiceResult={handleDiceResult}
        diceType="d10"
        initialNumber={2}
        animationTime={3}
      />
      <OtherDice
        getRandomFace={getRandomFace}
        getRandomNumber={getRandomNumber}
        shouldRoll={shouldRoll.d12}
        handleDiceResult={handleDiceResult}
        diceType="d12"
        initialNumber={6}
        animationTime={3}
      />
      <OtherDice
        getRandomFace={getRandomFace}
        getRandomNumber={getRandomNumber}
        shouldRoll={shouldRoll.d20}
        handleDiceResult={handleDiceResult}
        diceType="d20"
        initialNumber={20}
        animationTime={3}
      />
    </div>
  );
};

export default AllDice;
