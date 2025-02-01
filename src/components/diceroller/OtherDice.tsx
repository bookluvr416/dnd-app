'use client'

import { useEffect, useRef, useState } from 'react';
import '@/components/diceroller/dice.css';
import { Dice } from "@/interfaces/dice-interfaces";

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

const useRefsList = () => {
  const refsList = useRef<Record<string, any>>({});

  const getItemRefFn = (_id: string) => (ref: any) => {
    refsList.current[_id] = ref;
  };

  const getRefById = (_id: string) => {
    return refsList.current[_id];
  };

  return { getItemRefFn, getRefById };
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
  const { getRefById, getItemRefFn } = useRefsList();
  const [prevNumber, setPrevNumber] = useState<number>(initialNumber);
  const [dataFace, setDataFace] = useState('');
  const [animationStyle, setAnimationStyle] = useState('roll-stop');

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

  const initialSides: DynamicObject = {};
  [...Array(size)].forEach((_item, i) => {
    initialSides[`${diceType}-${i + 1}`] = (i + 1).toString();
  })

  const [dataSides, setDataSides] = useState<DynamicObject>(initialSides);

  useEffect(() => {
    if (shouldRoll) startAnimationRoll();
  }, [shouldRoll]);

  const handleDataSideChange = (num: string, side: string) => {
    setDataSides((prevState) => {
      const newState = {...prevState};
      newState[side] = num;
      return newState;
    });
  }

  const startAnimationRoll = () => {
    const el: HTMLDivElement = getRefById(`diceClassRef-${diceType}`);
    if (!el) { return; }

    setAnimationStyle('roll');

    setDataFace('');
    
    setTimeout(() => {
      const currentDice: keyof Dice = diceType;
      const dataElements: HTMLDivElement[] = [];
      const usedNumbers: number[] = [];

      const newNumber = getRandomFace(1, size);
      usedNumbers.push(newNumber);

      [...Array(size)].forEach((_, i) => {
        dataElements.push(getRefById(`${diceType}-${i + 1}`));
      });

      dataElements.forEach((element, i) => {
        const side = element.getAttribute('data-side');
        
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
      <div className={`${diceType}-wrap inset-x-0 top-0`} ref={getItemRefFn(`diceWrapperRef-${diceType}`)}>
        <div data-face={dataFace} className={`${diceType}-inner dice ${animationStyle}`} ref={getItemRefFn(`diceClassRef-${diceType}`)}>
          {[...Array(size)].map((_item, i) => (
            <div
              key={`side-${i + 1}`}
              className={`die ${diceType} ${diceType}-${i + 1}`}
              ref={getItemRefFn(`${diceType}-${(i + 1).toString()}`)}
              data-side={dataSides[`${diceType}-${i + 1}`]}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OtherDice;
