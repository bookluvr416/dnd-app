'use client'

import { useEffect, useRef, useState } from 'react';
import '@/components/diceroller/dice.css';

interface Dice {
  d4: number,
  d6: number,
  d8: number,
  d10: number,
  d12: number,
  d20: number,
};

interface DynamicObject {
  [key: string]: {
    dataSide: string,
    dataNumbers: { [key2: string]: string }
  }; 
}

interface ComponentProps {
  getRandomFace(min: number, max: number): number;
  shouldRoll: boolean;
  getRandomNumber(min: number, max: number, avoid: number[]): number;
  handleDiceResult(diceType: keyof Dice, result: number): void;
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

let prevD4Number = 4;
let prevD4Face = 2;

const D4: React.FC<ComponentProps> = ({
  getRandomFace,
  shouldRoll,
  getRandomNumber,
  handleDiceResult,
  animationTime,
}) => {
  const { getRefById, setItemRef } = useRefsList();
  const [dataFace, setDataFace] = useState('');
  const [animationStyle, setAnimationStyle] = useState('roll-stop');
  const [dataAttributes, setDataAttributes] = useState<DynamicObject>({
    'd4-1': {
      dataSide: '1',
      dataNumbers: {
        'rotate-120': '2',
        'rotate-240': '3',
        'facing-down': '4',
      }
    },
    ['d4-2']: {
      dataSide: '2',
      dataNumbers: {
        'rotate-120': '1',
        'rotate-240': '3',
        'facing-down': '4',
      }
    },
    ['d4-3']: {
      dataSide: '3',
      dataNumbers: {
        'rotate-120': '1',
        'rotate-240': '2',
        'facing-down': '4',
      }
    },
    ['d4-4']: {
      dataSide: '4',
      dataNumbers: {
        'rotate-120': '1',
        'rotate-240': '2',
        'facing-down': '3',
      }
    },
  });

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
    setDataAttributes((prevState) => {
      const newState = {...prevState};
      newState[side].dataSide = num;
      return newState;
    });
  }

  /**
   * handleDataNumberChange
   * sets state when a data number value changes
   * @param num string
   * @param angle string
   * @param side string
   */
  const handleDataNumberChange = (num: string, angle: string, side: string) => {
    setDataAttributes((prevState) => {
      const newState = {...prevState};
      newState[side].dataNumbers[angle] = num;
      return newState;
    });
  }

  /**
   * startAnimationRoll
   * sets the animation roll style and then sets a timeout to randomize the dice
   * @returns void
   */
  const startAnimationRoll = () => {
    const el: HTMLDivElement = getRefById('diceClassRef-d4');
    if (!el) { return; }

    setAnimationStyle('roll');

    setDataFace('');
    
    setTimeout(() => {
      const currentDice: keyof Dice = 'd4';
      const usedD4Faces: number[] = [];
      const dataElements: HTMLDivElement[] = [];

      // gets refs
      [...Array(4)].forEach((_, i) => {
        dataElements.push(getRefById(`d4-${i + 1}`));
      });

      // gets new values for face and number for dice to land on
      const newD4Face = getRandomFace(1, 4);
      const newD4Number = getRandomNumber(1, 4, [newD4Face]);
      usedD4Faces.push(newD4Face);  
  
      // for each data element
      dataElements.forEach((element, i) => {
        const side = element.getAttribute('data-side');

        // if new dace is not the old face or the new number is not the old number
        if (newD4Face !== prevD4Face || newD4Number !== prevD4Number) {
          const usedD4Numbers = [newD4Face];
          let dataNumbers:HTMLDivElement[] = [];

          // get refs
          [...Array(4)].forEach((_, i) => {
            if ((i + 1).toString() === side) {
              dataNumbers.push(getRefById(`d4-${i + 1}-1`));
              dataNumbers.push(getRefById(`d4-${i + 1}-2`));
              dataNumbers.push(getRefById(`d4-${i + 1}-3`));
            }
          });

          // if current side is the previous face
          if (side === prevD4Face.toString()) {
            handleDataSideChange(newD4Face.toString(), `d4-${i + 1}`);

            usedD4Numbers.push(newD4Number);

            // for each data number on that side
            dataNumbers.forEach((dataNumber) => {
              if (dataNumber.classList.contains('facing-down')) {
                handleDataNumberChange(newD4Number.toString(), 'facing-down', `d4-${i + 1}`);
              } else {
                const num = getRandomNumber(1, 4, usedD4Numbers);
                usedD4Numbers.push(num);

                if (dataNumber.classList.contains('rotate-120')) {
                  handleDataNumberChange(num.toString(), 'rotate-120', `d4-${i + 1}`);
                } else {
                  handleDataNumberChange(num.toString(), 'rotate-240', `d4-${i + 1}`);
                }
              }
            });
          } else {
            const number = getRandomNumber(1, 4, usedD4Faces);
            usedD4Faces.push(number);

            handleDataSideChange(number.toString(), `d4-${i + 1}`);

            // for each data number on that side
            dataNumbers.forEach((dataNumber) => {
              const num = getRandomNumber(1, 4, usedD4Numbers);
              usedD4Numbers.push(num);

              if (dataNumber.classList.contains('rotate-120')) {
                handleDataNumberChange(num.toString(), 'rotate-120', `d4-${i + 1}`);
              } else if (dataNumber.classList.contains('rotate-240')) {
                handleDataNumberChange(num.toString(), 'rotate-240', `d4-${i + 1}`);
              } else {
                handleDataNumberChange(num.toString(), 'facing-down', `d4-${i + 1}`);
              }
            });
          }
        }
        setDataFace(newD4Number.toString());     
      });

      prevD4Number = newD4Number;
      prevD4Face = newD4Face;

      setAnimationStyle('roll-stop');

      handleDiceResult(currentDice, newD4Number);
    }, (animationTime * 1000));
  }

  return (
    <>
      <div className="d4-wrap" ref={setItemRef("diceWrapperRef-d4")}>
         <div data-face={dataFace} className={`dice d4-inner ${animationStyle}`}  ref={setItemRef("diceClassRef-d4")}>
            {[...Array(4)].map((_item, i) => (
              <div
                key={`side-${i + 1}`}
                className={`die d4 d4-${i + 1}`}
                ref={setItemRef(`d4-${(i + 1).toString()}`)}
                data-side={dataAttributes[`d4-${i + 1}`].dataSide}
              >
                <div
                  className="rotate-120"
                  data-number={dataAttributes[`d4-${i + 1}`].dataNumbers['rotate-120']}
                  ref={setItemRef(`d4-${i + 1}-1`)}
                ></div>
                <div
                  className="rotate-240"
                  data-number={dataAttributes[`d4-${i + 1}`].dataNumbers['rotate-240']}
                  ref={setItemRef(`d4-${i + 1}-2`)}
                ></div>
                <div
                  className="facing-down"
                  data-number={dataAttributes[`d4-${i + 1}`].dataNumbers['facing-down']}
                  ref={setItemRef(`d4-${i + 1}-3`)}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default D4;
