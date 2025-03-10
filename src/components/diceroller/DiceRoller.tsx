'use client'

import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/outline'
import ResultCard from './ResultCard';
import DiceNumberInput from './DiceNumberInput';
import AllDice from './AllDice';
import { Dice, ShouldRoll, NumDice } from '@/interfaces/dice-interfaces';
import Button from '../shared/Button';
import { schema, schemaDefaults, FormType } from '@/lib/diceSchema/zodSchema';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: schemaDefaults,
    shouldUnregister: false,
  });

  /**
   * onNumberSelect
   * sets state for the number of rolls for that dice type
   * @param e
   * @param diceType
   */
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

  /**
   * handleDiceResult
   * sets state after a dice roll has been completed
   * @param diceType 
   * @param result 
   */
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

  /**
   * resetNats
   * resets the state to false for nat 20 and nat 1
   */
  const resetNats = () => {
    setHasNat20(false);
    setHasNat1(false);
  };

  /**
   * resetTotals
   * resets nats and dice result numbers
   */
  const resetTotals = () => {
    resetNats();
    setDiceResults({
      d4: [],
      d6: [],
      d8: [],
      d10: [],
      d12: [],
      d20: [],
    });
  }

  /**
   * resets nats, dice result numbers, and number of dice to roll
   */
  const resetDice = () => {
    resetTotals();
    setNumDice({
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
      d20: 0,
    });
    reset();
  };

  /**
   * starts the dice animation roll
   */
  const startAnimationRoll = () => {
    resetNats();

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
  };

  return (
    <>
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

      <form onSubmit={handleSubmit(startAnimationRoll)}>

        {/* dice number inputs */}
        <div className="mb-4 bg-indigo-950 p-4 rounded-lg ring-1 ring-blue-700/50">
          <p>Feeling lucky? Enter number of dice to roll.</p>
          <div className='flex flex-row gap-4 justify-between mt-5 flex-wrap'>
            <DiceNumberInput
              diceType="d4"
              onNumberSelect={onNumberSelect}
              register={register}
            />
            <DiceNumberInput
              diceType="d6"
              onNumberSelect={onNumberSelect}
              register={register}
            />
            <DiceNumberInput
              diceType="d8"
              onNumberSelect={onNumberSelect}
              register={register}
            />
            <DiceNumberInput
              diceType="d10"
              onNumberSelect={onNumberSelect}
              register={register}
            />
            <DiceNumberInput
              diceType="d12"
              onNumberSelect={onNumberSelect}
              register={register}
            />
            <DiceNumberInput
              diceType="d20"
              onNumberSelect={onNumberSelect}
              register={register}
            />
          </div>
          {['d4Input', 'd6Input', 'd8Input', 'd10Input', 'd12Input', 'd20Input'].map((dice) => {
            if (errors[dice as keyof FormType]?.message) {
              return (
                <p key={dice} className='mt-5 text-red-300 text-medium'>
                  {dice.slice(0, -5).toUpperCase()} {errors[dice as keyof FormType]?.message}
                </p>
              );
            } else {
              return <div key={dice}></div>;
            }
          })}
        </div> 

        {/* buttons to roll and reset */}
        <div className='flex flex-col sm:flex-row flex-wrap'>
          <Button
            text="Start Rolling"
            type="submit"
            cssMargin='mb-5 sm:mb-0 sm:mr-5'
          />
          <Button
            text="Reset Rolls"
            type="button"
            onClick={resetTotals}
            cssMargin='mb-5 sm:mb-0 sm:mr-5'
          />
          <Button
            text="Reset Dice"
            type="button"
            onClick={resetDice}
            cssMargin='mb-5 sm:mb-0'
          />
        </div>
      </form>

      {/* css dice */}
      <div>
        <AllDice handleDiceResult={handleDiceResult} shouldRoll={shouldRoll} />
      </div>

      {/* result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-7">
        <ResultCard diceType="d4" results={diceResults.d4} />
        <ResultCard diceType="d6" results={diceResults.d6} />
        <ResultCard diceType="d8" results={diceResults.d8} />
        <ResultCard diceType="d10" results={diceResults.d10} />
        <ResultCard diceType="d12" results={diceResults.d12} />
        <ResultCard diceType="d20" results={diceResults.d20} />
      </div>
    </>
  );
};

export default DiceRoller;

