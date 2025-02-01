export interface NumDice {
  d4: number,
  d6: number,
  d8: number,
  d10: number,
  d12: number,
  d20: number,
};

export interface Dice {
  d4: number[],
  d6: number[],
  d8: number[],
  d10: number[],
  d12: number[],
  d20: number[],
};

export interface ShouldRoll {
  d4: boolean,
  d6: boolean,
  d8: boolean,
  d10: boolean,
  d12: boolean,
  d20: boolean,
}
