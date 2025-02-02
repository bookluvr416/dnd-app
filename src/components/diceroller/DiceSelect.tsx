import { SyntheticEvent } from "react";
import { NumDice } from "@/interfaces/dice-interfaces";

interface Props {
  onNumberSelect: (e: SyntheticEvent, diceType: keyof NumDice) => void;
  diceType: keyof NumDice;
}

const DiceSelect: React.FC<Props> = ({ onNumberSelect, diceType }) => {
  return (
    <div className="inline-block">
      <div>
        <label
            htmlFor={`${diceType}-input`}
            id={`${diceType}-input`}
            aria-label={`Number of ${diceType}`}
            className="pr-4"
          >
            {diceType.toUpperCase()}
          </label>
      </div>
      <input
        type="number"
        id={`${diceType}-input`}
        name={`${diceType}-input`}
        className="w-12 h-10 bg-slate-800 rounded-md pl-3"
        onChange={(e) => onNumberSelect(e, diceType)}
      />
      {/* <select
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
      </select> */}
    </div>
  )
};

export default DiceSelect;
