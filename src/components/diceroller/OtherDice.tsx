'use client'

import { useEffect, useRef, useState } from 'react';
import '@/components/diceroller/dice.css';
import { Dice } from '@/interfaces/dice-interfaces';

interface DynamicObject {
  [key: string]: string; 
}

interface Props {
  getRandomFace(min: number, max: number): number;
  getRandomNumber(min: number, max: number,usedSides: number[]): number;
  shouldRoll: boolean;
  handleDiceResult(diceType: keyof Dice, result: number): void;
  diceType: keyof Dice;
  initialNumber: number;
  animationTime: number;
}

/**
 * useRefsList
 * Creates a function to set item ref, a function to get ref by id
 * @returns object with functions
 */
const useRefsList = () => {
  const refsList = useRef<Record<string, any>>({});

  const setItemRef = (_id: string) => (ref: any) => {
    refsList.current[_id] = ref;
  };

  const getRefById = (_id: string) => {
    return refsList.current[_id];
  };

  return { setItemRef, getRefById };
};

const OtherDice: React.FC<Props> = ({
  getRandomFace,
  getRandomNumber,
  shouldRoll,
  handleDiceResult,
  diceType,
  initialNumber,
  animationTime,
}) => {
  const { getRefById, setItemRef } = useRefsList();
  const [prevNumber, setPrevNumber] = useState<number>(initialNumber);
  const [dataFace, setDataFace] = useState('');
  const [animationStyle, setAnimationStyle] = useState('roll-stop');

  // sets size based on dice type
  let size: number = 0;
  switch (diceType) {
    case 'd20':
      size = 20;
      break;
    case 'd12':
      size = 12;
      break;
    case 'd10':
      size = 10;
      break;
    case 'd8':
      size = 8;
      break;
    case 'd6':
      size = 6;
      break;
    default: break;
  }

  // sets initial sides
  const initialSides: DynamicObject = {};
  [...Array(size)].forEach((_item, i) => {
    initialSides[`${diceType}-${i + 1}`] = (i + 1).toString();
  })

  const [dataSides, setDataSides] = useState<DynamicObject>(initialSides);

  /**
   * useEffect
   * when prop shouldRoll is true, start the animation roll
   */
  useEffect(() => {
    if (shouldRoll) startAnimationRoll();
  }, [shouldRoll]);

  /**
   * handleDataSideChange
   * sets new state when a data side value changes
   * @param num string
   * @param side string
   */
  const handleDataSideChange = (num: string, side: string) => {
    setDataSides((prevState) => {
      const newState = {...prevState};
      newState[side] = num;
      return newState;
    });
  }

  /**
   * startAnimationRoll
   * sets the animation roll style and then sets a timeout to randomize the dice
   * @returns void
   */
  const startAnimationRoll = () => {
    const el: HTMLDivElement = getRefById(`diceClassRef-${diceType}`);
    if (!el) { return; }

    setAnimationStyle('roll');

    setDataFace('');
    
    setTimeout(() => {
      const currentDice: keyof Dice = diceType;
      const dataElements: HTMLDivElement[] = [];
      const usedNumbers: number[] = [];

      // gets a new dice number to land on
      const newNumber = getRandomFace(1, size);
      usedNumbers.push(newNumber);

      // gets refs
      [...Array(size)].forEach((_, i) => {
        dataElements.push(getRefById(`${diceType}-${i + 1}`));
      });

      // for each data element
      dataElements.forEach((element, i) => {
        const side = element.getAttribute('data-side');
        
        // if new dice number is not old number
        if (newNumber !== prevNumber) {
          if (side === prevNumber.toString()) {
            handleDataSideChange(newNumber.toString(), `${diceType}-${i + 1}`);
          } else {
            const num = getRandomNumber(1, size, usedNumbers);
            usedNumbers.push(num);
            handleDataSideChange(num.toString(), `${diceType}-${i + 1}`);
          }
        }
        setDataFace(newNumber.toString());
      });

      setAnimationStyle('roll-stop');

      setPrevNumber(newNumber);
      handleDiceResult(currentDice, newNumber);
    }, (animationTime * 1000));
  }

  return (
    <>
      <div className={`${diceType}-wrap inset-x-0 top-0`} ref={setItemRef(`diceWrapperRef-${diceType}`)}>
        <div data-face={dataFace} className={`${diceType}-inner dice ${animationStyle}`} ref={setItemRef(`diceClassRef-${diceType}`)}>
          {[...Array(size)].map((_item, i) => (
            <div
              key={`side-${i + 1}`}
              className={`die ${diceType} ${diceType}-${i + 1}`}
              ref={setItemRef(`${diceType}-${(i + 1).toString()}`)}
              data-side={dataSides[`${diceType}-${i + 1}`]}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OtherDice;
