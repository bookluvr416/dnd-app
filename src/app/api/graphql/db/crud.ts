import { db } from './connection';
import { CharactersTable, CharacterUpdate, NewCharacter } from './types';

export const getAllCharacters = async (): Promise<CharactersTable[] | any> => {
  return await db.selectFrom('characters').selectAll().execute();
};

export const getSingleCharacter = async (id: number): Promise<CharactersTable[] | any> => {
  return await db.selectFrom('characters').where('id', '=', id).execute();
};

export const createNewCharacter = async (character: NewCharacter): Promise<CharactersTable | any> => {
  return await db.insertInto('characters')
    .values(character)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateCharacter = async (id: number, updateWith: CharacterUpdate): Promise<CharactersTable | any> => {
  return await db.updateTable('characters').set(updateWith).where('id', '=', id).returningAll().execute();
};