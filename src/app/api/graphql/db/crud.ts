import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { Expression } from 'kysely';
import { db } from './connection';
import * as Types from './types';
import { Character } from '@/generated/graphql';

function races(raceId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('races')
      .whereRef('races.id', '=', raceId)
      .selectAll('races')
  ).as('race');
}

function classes(classId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('classes')
      .whereRef('classes.id', '=', classId)
      .selectAll('classes')
  ).as('class');
}

function alignment(alignmentId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('alignment')
      .whereRef('alignment.id', '=', alignmentId)
      .selectAll('alignment')
  ).as('alignment');
}

function skills(skillId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('skills')
      .whereRef('skills.id', '=', skillId)
      .selectAll('skills')
  ).as('skills');
}

function abilities(abilityId: Expression<number>) {
  return jsonObjectFrom(
    db.selectFrom('abilities')
      .whereRef('abilities.id', '=', abilityId)
      .selectAll('abilities')
  ).as('abilities');
}

function characterSkills(characterId: Expression<number>) {
  return jsonArrayFrom(
    db.selectFrom('characterSkills')
      .whereRef('characterSkills.characterId', '=', characterId)
      .select(({ ref }) => [
        skills(ref('characterSkills.skillId'))
      ])
      .orderBy('characterSkills.skillId')
      .selectAll('characterSkills')
  ).as('characterSkills');
}

function characterAbilities(characterId: Expression<number>) {
  return jsonArrayFrom(
    db.selectFrom('characterAbilities')
      .whereRef('characterAbilities.characterId', '=', characterId)
      .select(({ ref }) => [
        abilities(ref('characterAbilities.abilityId'))
      ])
      .orderBy('characterAbilities.abilityId')
      .selectAll('characterAbilities')
  ).as('characterAbilities');
}

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
      .orderBy('characters.name')
      .selectAll('characters')
      .execute();

    const fullData = returnedData.map((data) => {
      const character: Character = {
      id: data.id!,
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
      skills: data.characterSkills.map((skill) => (
        {
          id: skill.id,
          skillProficiency: skill.skillProficiency,
          skill: {
            id: skill.skills!.id,
            skill: skill.skills!.skill,
          }
        }
      )),
      abilities: data.characterAbilities.map((ability) => (
        {
          id: ability.id,
          abilityScore: ability.abilityScore,
          proficiencyBonus: ability.proficiencyBonus,
          ability: {
            id: ability.abilities?.id,
            ability: ability.abilities?.ability,
          }
        }
      )),
      armorClass: data.armorClass,
      hp: data.hp,
      initiative: data.initiative,
      proficiencyBonus: data.proficiencyBonus,
      speed: data.speed,
    };
      return character;
    })

    return fullData;
  } catch (e) {
    throw e;
  }
};

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
      .selectAll('characters')
      .executeTakeFirst();

    if (!returnedData) {
      return null;
    }

    const character: Character = {
      id: returnedData.id!,
      name: returnedData.name,
      level: returnedData.level,
      race: {
        id: returnedData.raceId,
        raceType: returnedData.race!.raceType,
        raceName: returnedData.race!.raceName,
      },
      alignment: {
        id: returnedData.alignmentId,
        alignment: returnedData.alignment!.alignment
      },
      class: {
        id: returnedData.classId,
        className: returnedData.class!.className,
      },
      skills: returnedData.characterSkills.map((skill) => (
        {
          id: skill.id,
          skillProficiency: skill.skillProficiency,
          skill: {
            id: skill.skills!.id,
            skill: skill.skills!.skill,
          }
        }
      )),
      abilities: returnedData.characterAbilities.map((ability) => (
        {
          id: ability.id,
          abilityScore: ability.abilityScore,
          proficiencyBonus: ability.proficiencyBonus,
          ability: {
            id: ability.abilities?.id,
            ability: ability.abilities?.ability,
          }
        }
      )),
      armorClass: returnedData.armorClass,
      hp: returnedData.hp,
      initiative: returnedData.initiative,
      proficiencyBonus: returnedData.proficiencyBonus,
      speed: returnedData.speed,
    };

    return character;
  } catch (e) {
    throw e;
  }
};

export const createNewCharacter = async (character: Types.NewCharacter): Promise<Types.CharactersTable | any> => {
  return await db.insertInto('characters')
    .values(character)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateCharacter = async (id: number, data: Types.CharacterUpdate): Promise<Character> => {
  try {
    const returnedData = await db.transaction().execute(async (trx) => {
      await trx
        .updateTable('characters')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .execute();

      return await trx
        .selectFrom('characters')
        .where('characters.id', '=', id)
        .select(({ ref }) => [
          races(ref('characters.raceId')),
          classes(ref('characters.classId')),
          alignment(ref('characters.alignmentId'))
        ])
        .selectAll('characters')
        .executeTakeFirst();
    });

    const character: Character = {
      id: returnedData!.id!,
      name: returnedData!.name,
      level: returnedData!.level,
      race: {
        id: returnedData!.raceId,
        raceType: returnedData!.race!.raceType,
        raceName: returnedData!.race!.raceName,
      },
      alignment: {
        id: returnedData!.alignmentId,
        alignment: returnedData!.alignment!.alignment
      },
      class: {
        id: returnedData!.classId,
        className: returnedData!.class!.className,
      },
      armorClass: returnedData!.armorClass,
      hp: returnedData!.hp,
      initiative: returnedData!.initiative,
      proficiencyBonus: returnedData!.proficiencyBonus,
      speed: returnedData!.speed,
    };
  
    return character;
  } catch (e) {
    throw e;
  }
};

export const createNewCharacterSkills = async (characterSkills: Types.NewCharacterSkills): Promise<Types.CharacterSkillsTable | any> => {
  return await db.insertInto('characterSkills')
    .values(characterSkills)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const createNewCharacterAbilities = async (characterAbilities: Types.NewCharacterAbilities): Promise<Types.CharacterAbilitiesTable | any> => {
  return await db.insertInto('characterAbilities')
    .values(characterAbilities)
    .returningAll()
    .executeTakeFirstOrThrow();
};
