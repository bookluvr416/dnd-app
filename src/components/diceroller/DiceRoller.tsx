'use client'

import { SyntheticEvent, useState } from "react";
import { ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/outline'
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
    const num = (e.target as HTMLInputElement).value;
    setNumDice((prevState) => {
      const newResults = { ...prevState };
      
      if (!num) {
        newResults[diceType] = 0;
      } else {
        newResults[diceType] = parseInt(num);
      }
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

    Object.keys(numDice).forEach((key) => {
      const typedKey = key as keyof NumDice;
      [...Array(numDice[typedKey])].forEach((_item, i) => {
        setTimeout(() => {
          setShouldRoll((prevState) => {
            const newState = { ...prevState }
            newState[typedKey] = true;
            return newState
          });
        }, 3500 * (i))
      });
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
    <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
      <div className="bg-blue-950/80 p-8 md:p-20 rounded-3xl max-w-5xl m-auto">
        <h1 className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl font-quintessential text-center mb-6 md:mb-12 p-4 sm:p-6 text-2xl sm:text-4xl text-fuchsia-200">
          Dice Roller
        </h1>
        {hasNat1 && (
          <div className="bg-red-600/60 p-3 rounded-xl mb-4 flex">
            <span className="size-6 mr-3">{<ExclamationTriangleIcon />}</span>
            Natural 1
          </div>
        )}
        {hasNat20 && (
          <div className="bg-green-600/60 p-3 rounded-xl mb-4 flex">
            <span className="size-6 mr-3">{<SparklesIcon />}</span>
            Natural 20
          </div>
        )}
        <div className="mb-4 bg-indigo-950 p-4 rounded-lg ring-1 ring-blue-700/50">
          <p>Feeling lucky? Enter number of dice to roll.</p>
          <div className="pr-5 sm:pr-10 inline-block pt-4">
            <DiceSelect diceType="d4" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pr-5 sm:pr-10 inline-block pt-4">
            <DiceSelect diceType="d6" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pr-5 sm:pr-10 inline-block pt-4">
            <DiceSelect diceType="d8" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pr-5 sm:pr-10 inline-block pt-4">
            <DiceSelect diceType="d10" onNumberSelect={onNumberSelect} />
          </div>
          <div className="pr-5 sm:pr-10 inline-block pt-4">
            <DiceSelect diceType="d12" onNumberSelect={onNumberSelect} />
          </div>
          <div className="inline-block pt-4">
            <DiceSelect diceType="d20" onNumberSelect={onNumberSelect} />
          </div>
        </div>
        <button
            onClick={startAnimationRoll}
            className="bg-blue-950 hover:bg-blue-900 p-2 text-blue-100 border-2 border-blue-800 rounded-lg content-center mb-3 mr-4"
          >
            Start Rolling
          </button>
        <button
          onClick={resetTotals}
          className="bg-blue-950 hover:bg-blue-900 p-2 text-blue-100 border-2 border-blue-800 rounded-lg content-center mb-3"
        >
          Reset Totals
        </button>
        <div>
          <AllDice handleDiceResult={handleDiceResult} shouldRoll={shouldRoll} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-7">
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

