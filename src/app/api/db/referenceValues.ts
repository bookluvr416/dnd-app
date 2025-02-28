import { db } from './connection';

/**
 * getRaces
 * @returns array of races
 */
export const getRaces = async () => {
  try {
    const returnedData = await db
      .selectFrom('races')
      .orderBy(['races.raceType', 'races.raceName'])
      .selectAll()
      .execute();

    return returnedData;
  } catch (e) {
    throw e;
  }
};

/**
 * getClasses
 * @returns array of classes
 */
export const getClasses = async () => {
  try {
    const returnedData = await db
      .selectFrom('classes')
      .orderBy('classes.className')
      .selectAll()
      .execute();

    return returnedData;
  } catch (e) {
    throw e;
  }
};

/**
 * getAlignment
 * @returns array of alignments
 */
export const getAlignment = async () => {
  try {
    const returnedData = await db
      .selectFrom('alignment')
      .orderBy('alignment.alignment')
      .selectAll()
      .execute();

    return returnedData;
  } catch (e) {
    throw e;
  }
};

/**
 * getSkills
 * @returns array of skills
 */
export const getSkills = async () => {
  try {
    const returnedData = await db
      .selectFrom('skills')
      .orderBy('skills.skill')
      .selectAll()
      .execute();

    return returnedData;
  } catch (e) {
    throw e;
  }
};

/**
 * getAbilities
 * @returns array of abilities
 */
export const getAbilities = async () => {
  try {
    const returnedData = await db
      .selectFrom('abilities')
      .orderBy('abilities.ability')
      .selectAll()
      .execute();

    return returnedData;
  } catch (e) {
    throw e;
  }
};
