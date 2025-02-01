'use client'

import { SyntheticEvent, useState } from "react";
import ResultCard from "./ResultCard";
import DiceSelect from "./DiceSelect";
import AllDice from "./AllDice";
import { Dice, ShouldRoll, NumDice } from "@/interfaces/dice-interfaces";

const DiceRoller: React.FC = () => {
  const [diceResults, setDiceResults] = useState<Dice>({
    d4: [],
    d6: [],
    d8: [],
    d10: [],
    d12: [],
    d20: [],
  });
  const [numDice, setNumDice] = useState<NumDice>({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
  });
  const [shouldRoll, setShouldRoll] = useState<ShouldRoll>({
    d4: false,
    d6: false,
    d8: false,
    d10: false,
    d12: false,
    d20: false,
  });
  const [hasNat20, setHasNat20] = useState(false);
  const [hasNat1, setHasNat1] = useState(false);

  const onNumberSelect = (e: SyntheticEvent, diceType: keyof NumDice) => {
    setNumDice((prevState) => {
      const newResults = { ...prevState };
      newResults[diceType]  = parseInt((e.target as HTMLSelectElement).value);
      return newResults;
    });
  };

  const handleDiceResult = (diceType: keyof Dice, result: number) => {
    setDiceResults((prevDiceResults: Dice) => {
      const newResults = { ...prevDiceResults };
      newResults[diceType].push(result);
      return newResults;
    });
    setShouldRoll((prevState) => {
      const newState = { ...prevState }
      newState[diceType] = false;
      return newState
    });
    if (result === 20 && diceType === 'd20') {
      setHasNat20(true);
    } else if (result === 1 && diceType === 'd20') {
      setHasNat1(true);
    }
  };

  const startAnimationRoll = () => {
    setHasNat20(false);
    setHasNat1(false);

    [...Array(numDice.d4)].forEach((_item, i) => {
      setTimeout(() => {
        setShouldRoll((prevState) => {
          const newState = { ...prevState }
          newState['d4'] = true;
          return newState
        });
      }, 3500 * (i))
    });

    [...Array(numDice.d6)].forEach((_item, i) => {
      setTimeout(() => {
        setShouldRoll((prevState) => {
          const newState = { ...prevState }
          newState['d6'] = true;
          return newState
        });
      }, 3500 * (i))
    });

    [...Array(numDice.d8)].forEach((_item, i) => {
      setTimeout(() => {
        setShouldRoll((prevState) => {
          const newState = { ...prevState }
          newState['d8'] = true;
          return newState
        });
      }, 3500 * (i))
    });

    [...Array(numDice.d10)].forEach((_item, i) => {
      setTimeout(() => {
        setShouldRoll((prevState) => {
          const newState = { ...prevState }
          newState['d10'] = true;
          return newState
        });
      }, 3500 * (i))
    });

    [...Array(numDice.d12)].forEach((_item, i) => {
      setTimeout(() => {
        setShouldRoll((prevState) => {
          const newState = { ...prevState }
          newState['d12'] = true;
          return newState
        });
      }, 3500 * (i))
    });

    [...Array(numDice.d20)].forEach((_item, i) => {
      setTimeout(() => {
        setShouldRoll((prevState) => {
          const newState = { ...prevState }
          newState['d20'] = true;
          return newState
        });
      }, 3500 * (i))
    });
  }

  const resetTotals = () => {
    setDiceResults({
      d4: [],
      d6: [],
      d8: [],
      d10: [],
      d12: [],
      d20: [],
    });
  }

  return (
    <div className="mr-4 ml-4">
      <div className="bg-blue-950/50 p-4 rounded-lg h-auto">
        {hasNat1 && (
          <div className="bg-red-600/60 p-3 rounded-xl mb-4">Natural 1</div>
        )}
        {hasNat20 && (
          <div className="bg-green-600/60 p-3 rounded-xl mb-4">Natural 20</div>
        )}
        <div className="pb-4">
          <p className="pb-4 pl-2">Select number of dice to roll.</p>
          <DiceSelect diceType="d4" onNumberSelect={onNumberSelect} />
          <div className="pl-5 sm:pl-10 inline-block">
            <DiceSelect diceType="d6" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pl-5 sm:pl-10 inline-block">
            <DiceSelect diceType="d8" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pl-5 sm:pl-10 inline-block">
            <DiceSelect diceType="d10" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pl-5 sm:pl-10 inline-block">
            <DiceSelect diceType="d12" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pl-5 sm:pl-10 inline-block">
            <DiceSelect diceType="d20" onNumberSelect={onNumberSelect} />
          </div>
        </div>
        <button
            onClick={startAnimationRoll}
            className="bg-blue-950 hover:bg-blue-900 p-2 text-blue-100 border-2 border-blue-800 rounded-lg content-center mb-3"
          >
            Start Rolling
          </button>
        <button
          onClick={resetTotals}
          className="bg-blue-950 hover:bg-blue-900 p-2 text-blue-100 border-2 border-blue-800 rounded-lg content-center mb-3 ml-4"
        >
          Reset Totals
        </button>
        <div className="">
        <AllDice handleDiceResult={handleDiceResult} shouldRoll={shouldRoll} />
      </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-5">
          <ResultCard diceType="d4" results={diceResults.d4} />
          <ResultCard diceType="d6" results={diceResults.d6} />
          <ResultCard diceType="d8" results={diceResults.d8} />
          <ResultCard diceType="d10" results={diceResults.d10} />
          <ResultCard diceType="d12" results={diceResults.d12} />
          <ResultCard diceType="d20" results={diceResults.d20} />
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;

