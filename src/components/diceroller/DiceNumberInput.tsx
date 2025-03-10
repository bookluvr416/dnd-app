import { SyntheticEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { NumDice } from '@/interfaces/dice-interfaces';
import { FormType } from '@/lib/diceSchema/zodSchema';

interface Props {
  onNumberSelect: (e: SyntheticEvent, diceType: keyof NumDice) => void;
  diceType: keyof NumDice;
  register: UseFormRegister<FormType>;
}

const DiceNumberInput: React.FC<Props> = ({ onNumberSelect, diceType, register }) => {
  return (
    <div className="inline-block">
      <div>
        <label
          htmlFor={`${diceType}Input`}
          id={`${diceType}InputLabel`}
          aria-label={`Number of ${diceType}`}
          className="pr-4"
        >
          {diceType.toUpperCase()}
        </label>
      </div>
      <input
        type="number"
        id={`${diceType}Input`}
        min={0}
        max={30}
        {...register(`${diceType}Input`, { valueAsNumber: true })}
        onChange={(e) => onNumberSelect(e, diceType)}
        className="w-14 px-2 py-1 bg-purple-950/60 border border-violet-800 rounded-md shadow-sm text-indigo-50 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
      />
    </div>
  )
};

export default DiceNumberInput;
