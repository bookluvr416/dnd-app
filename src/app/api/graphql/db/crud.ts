import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { Expression } from 'kysely';
import { db } from './connection';
import * as Types from './types';
import {
  Character,
  CreateCharacterInput,
  UpdateCharacterAbilityInput,
  UpdateCharacterInput,
  UpdateCharacterSkillInput,
} from '@/generated/graphql';

type NewSkillsInput = {
  characterId: number;
  skillId: number;
  skillProficiency: number;
  activeInd: boolean;
}

type NewAbilitiesInput = {
  characterId: number;
  abilityId: number;
  abilityScore: number;
  proficiencyBonus: number;
  activeInd: boolean;
}

/**
 * races
 * kysely fragment getting data from the races table
 * @param raceId 
 * @returns json object of race data
 */
function races(raceId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('races')
      .whereRef('races.id', '=', raceId)
      .selectAll('races')
  ).as('race');
}

/**
 * classes
 * kysely fragment getting data from the classes table
 * @param classId 
 * @returns json object of class data
 */
function classes(classId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('classes')
      .whereRef('classes.id', '=', classId)
      .selectAll('classes')
  ).as('class');
}

/**
 * alignment
 * kysely fragment getting data from the alignment table
 * @param alignmentId 
 * @returns json object of alignment data
 */
function alignment(alignmentId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('alignment')
      .whereRef('alignment.id', '=', alignmentId)
      .selectAll('alignment')
  ).as('alignment');
}

/**
 * skills
 * kysely fragment getting data from the skills table
 * @param skillId 
 * @returns json object of skills data
 */
function skills(skillId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('skills')
      .whereRef('skills.id', '=', skillId)
      .selectAll('skills')
  ).as('skills');
}

/**
 * abilities
 * kysely fragment getting data from the abilities table
 * @param abilityId 
 * @returns json object of abilities data
 */
function abilities(abilityId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('abilities')
      .whereRef('abilities.id', '=', abilityId)
      .selectAll('abilities')
  ).as('abilities');
}

/**
 * characterSkills
 * kysely fragment getting data from the characterSkills table
 * @param characterId 
 * @returns array of json objects of character skills data
 */
function characterSkills(characterId: Expression<number>) {
  return jsonArrayFrom(
    db.selectFrom('characterSkills')
      .whereRef('characterSkills.characterId', '=', characterId)
      .where('activeInd', '=', true)
      .select(({ ref }) => [
        skills(ref('characterSkills.skillId'))
      ])
      .orderBy('characterSkills.skillId')
      .selectAll('characterSkills')
  ).as('characterSkills');
}

/**
 * characterAbilities
 * kysely fragment getting data from the characterAbilities table
 * @param characterId 
 * @returns array of json objects of character abilities data
 */
function characterAbilities(characterId: Expression<number>) {
  return jsonArrayFrom(
    db.selectFrom('characterAbilities')
      .whereRef('characterAbilities.characterId', '=', characterId)
      .where('activeInd', '=', true)
      .select(({ ref }) => [
        abilities(ref('characterAbilities.abilityId'))
      ])
      .orderBy('characterAbilities.abilityId')
      .selectAll('characterAbilities')
  ).as('characterAbilities');
}

/**
 * mapData
 * takes data returned from graphql and converts it into a Character object
 * @param data 
 * @returns 
 */
const mapData = (data: Types.ReturnedData) => {
  let skills: Character['skills'];
  let abilities: Character['abilities'];

  if (!data.characterSkills) {
    skills = [];
  } else {
    skills = data.characterSkills.map((skill) => (
      {
        id: skill.id,
        skillProficiency: skill.skillProficiency,
        skill: {
          id: skill.skills!.id,
          skill: skill.skills!.skill,
        }
      }
    ));
  }

  if (!data.characterAbilities) {
    abilities = [];
  } else {
    abilities = data.characterAbilities.map((ability) => (
      {
        id: ability.id,
        abilityScore: ability.abilityScore,
        proficiencyBonus: ability.proficiencyBonus,
        ability: {
          id: ability.abilities?.id,
          ability: ability.abilities?.ability,
        }
      }
    ));
  }

  const character: Character = {
    id: data.id,
    name: data.name,
    level: data.level,
    race: {
      id: data.raceId,
      raceType: data.race!.raceType,
      raceName: data.race!.raceName,
    },
    alignment: {
      id: data.alignmentId,
      alignment: data.alignment!.alignment
    },
    class: {
      id: data.classId,
      className: data.class!.className,
    },
    skills: skills,
    abilities: abilities,
    armorClass: data.armorClass,
    hp: data.hp,
    initiative: data.initiative,
    proficiencyBonus: data.proficiencyBonus,
    speed: data.speed,
  };
  return character;
}

/**
 * getAllCharacters
 * Gets a list of characters
 * @returns array of Character objects
 */
export const getAllCharacters = async (): Promise<Character[]> => {
  try {
    const returnedData = await db
      .selectFrom('characters')
      .select(({ ref }) => [
        races(ref('characters.raceId')),
        classes(ref('characters.classId')),
        alignment(ref('characters.alignmentId')),
        characterSkills(ref('characters.id')),
        characterAbilities(ref('characters.id'))
      ])
      .where('characters.activeInd', '=', true)
      .orderBy('characters.name')
      .selectAll('characters')
      .execute();

    return returnedData.map((data) => mapData(data));
  } catch (e) {
    throw e;
  }
};

/**
 * getSingleCharacter
 * Gets a single character based on id
 * @param id 
 * @returns Character object
 */
export const getSingleCharacter = async (id: number): Promise<Character | null> => {
  try {
    const returnedData = await db
      .selectFrom('characters')
      .where('characters.id', '=', id)
      .select(({ ref }) => [
        races(ref('characters.raceId')),
        classes(ref('characters.classId')),
        alignment(ref('characters.alignmentId')),
        characterSkills(ref('characters.id')),
        characterAbilities(ref('characters.id'))
      ])
      .where('characters.activeInd', '=', true)
      .selectAll('characters')
      .executeTakeFirst();

    if (!returnedData) {
      return null;
    }

    return mapData(returnedData);
  } catch (e) {
    throw e;
  }
};

/**
 * createNewCharacter
 * creates a new character
 * @param character 
 * @returns Character object
 */
export const createNewCharacter = async (character: CreateCharacterInput): Promise<Types.CharactersTable | any> => {
  const characterValues = { ...character.character };
  let abilityValues: NewAbilitiesInput[] = [];
  let skillValues: NewSkillsInput[] = [];
  const activeInd = true;

  try {
    const newCharacterId = await db.transaction().execute(async (trx) => {
      // write to characters table
      const newCharacter = await trx
        .insertInto('characters')
        .values({...characterValues, activeInd})
        .returningAll()
        .executeTakeFirstOrThrow();

      // write to character abilities table if there are abilities
      if (character.abilities.length > 0) {
        abilityValues = character.abilities.map((ability) => (
          {
            characterId: newCharacter.id,
            abilityId: ability!.abilityId,
            abilityScore: ability!.abilityScore,
            proficiencyBonus: ability!.proficiencyBonus,
            activeInd: true,
          }
        ));

        await trx
          .insertInto('characterAbilities')
          .values(abilityValues)
          .execute();
      }
    
      // write to character skills table if there are skills
      if (character.skills && character.skills.length > 0) {
        skillValues = character.skills.map((skill) => (
          {
            characterId: newCharacter.id,
            skillId: skill!.skillId,
            skillProficiency: skill!.skillProficiency,
            activeInd: true,
          }
        ));

        await trx
          .insertInto('characterSkills')
          .values(skillValues)
          .execute();
      }

      return newCharacter.id;
    });

    const returnedData = await db
        .selectFrom('characters')
        .where('characters.id', '=', newCharacterId)
        .select(({ ref }) => [
          races(ref('characters.raceId')),
          classes(ref('characters.classId')),
          alignment(ref('characters.alignmentId')),
          characterSkills(ref('characters.id')),
          characterAbilities(ref('characters.id'))
        ])
        .selectAll('characters')
        .executeTakeFirst();

      if (!returnedData) {
        throw new Error('No new character found');
      }

      return mapData(returnedData);
  } catch (e) {
    throw e;
  }
};

/**
 * updateCharacter
 * takes in data to update the character, characterSkills, and characterAbilities tables
 * @param id 
 * @param data 
 * @returns Character object
 */
export const updateCharacter = async (id: number, data: UpdateCharacterInput): Promise<Character> => {
  const characterValues = { ...data };
  let abilityValues: UpdateCharacterAbilityInput[] = [];
  let skillValues: UpdateCharacterSkillInput[] = [];

  if (data.abilities) {
    delete characterValues.abilities;

    if (data.abilities.length > 0) {
      abilityValues = data.abilities.map((ability) => (
        {
          id: ability!.id,
          abilityScore: ability!.abilityScore,
          proficiencyBonus: ability!.proficiencyBonus,
        }
      ));
    }
  }

  if (data.skills) {
    delete characterValues.skills;

    if (data.skills.length > 0) {
      skillValues = data.skills.map((skill) => (
        {
          id: skill!.id,
          skillProficiency: skill!.skillProficiency
        }
      ));
    }
  }

  const cleanedCharacterValues = Object.fromEntries(
    Object.entries(characterValues).map(([key, value]) => [key, value === null ? undefined : value])
  );

  try {
    const returnedData = await db.transaction().execute(async (trx) => {
      // update characters table
      await trx
        .updateTable('characters')
        .set(cleanedCharacterValues)
        .where('id', '=', id)
        .returningAll()
        .execute();

      // update character abilities table
      await Promise.all(
        abilityValues.map(update => 
          trx
            .updateTable('characterAbilities')
            .set({
              abilityScore: update.abilityScore,
              proficiencyBonus: update.proficiencyBonus,
            })
            .where('id', '=', update.id)
            .execute()
        )
      )

      // update character skills table
      await Promise.all(
        skillValues.map(update => 
          trx
            .updateTable('characterSkills')
            .set({
              skillProficiency: update.skillProficiency,
            })
            .where('id', '=', update.id)
            .execute()
        )
      )

      return await trx
        .selectFrom('characters')
        .where('characters.id', '=', id)
        .select(({ ref }) => [
          races(ref('characters.raceId')),
          classes(ref('characters.classId')),
          alignment(ref('characters.alignmentId')),
          characterSkills(ref('characters.id')),
          characterAbilities(ref('characters.id'))
        ])
        .selectAll('characters')
        .executeTakeFirst();
    });

    if (!returnedData) {
      throw new Error('Updated character not found');
    }
  
    return mapData(returnedData);
  } catch (e) {
    throw e;
  }
};

/**
 * deleteCharacter
 * logically deletes a character by setting data as inactive
 * @param id
 */
export const deleteCharacter = async (id: number) => {
  try {
    await db.transaction().execute(async (trx) => {
      // update characters table
      await trx
        .updateTable('characters')
        .set({
          activeInd: false
        })
        .where('id', '=', id)
        .returningAll()
        .execute();

      // update character abilities table
      await trx
        .updateTable('characterAbilities')
        .set({
          activeInd: false
        })
        .where('characterId', '=', id)
        .execute();

      // update character skills table
      await trx
        .updateTable('characterSkills')
        .set({
          activeInd: false
        })
        .where('characterId', '=', id)
        .execute();
    });
  } catch (e) {
    throw e;
  }
}
