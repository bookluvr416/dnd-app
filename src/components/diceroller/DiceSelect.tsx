import { SyntheticEvent } from "react";
import { NumDice } from "@/interfaces/dice-interfaces";

interface Props {
  onNumberSelect: (e: SyntheticEvent, diceType: keyof NumDice) => void;
  diceType: keyof NumDice;
}

const DiceSelect: React.FC<Props> = ({ onNumberSelect, diceType }) => {
  return (
    <div className="inline-block">
      <div className="">
      <label
          htmlFor={`${diceType}-select`}
          id={`${diceType}-select`}
          aria-label={`Select number of ${diceType}`}
          className="pr-4"
        >
          {diceType.toUpperCase()}
        </label>
        </div>
        <select
          id={`${diceType}-select`}
          name={`${diceType}-select`}
          className="w-10 h-8 bg-slate-800 rounded-md overflow-y-auto"
          onChange={(e) => onNumberSelect(e, diceType)}
        >
          {[...Array(21)].map((_item, i) => (
            <option
              key={`${diceType}-amount-${i}`}
              value={(i).toString()}
            >
              {i}
            </option>
          ))};
        </select>
    </div>
  )
};

export default DiceSelect;
