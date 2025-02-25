import { db } from './connection';

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
