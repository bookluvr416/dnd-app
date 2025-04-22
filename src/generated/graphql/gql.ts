/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment CharacterDetail on Character {\n    id\n    name\n    level\n    hp\n    imageLink\n    alignment {\n      id\n      alignment\n    }\n    race {\n      id\n      raceName\n      raceType\n    }\n    class {\n      id\n      className\n    }\n  }\n": typeof types.CharacterDetailFragmentDoc,
    "\n  query GetCharacters($input: QueryCharactersInput!) {\n    characters(input: $input) {\n      characters {\n        ...CharacterDetail\n      }\n      totalCount\n      totalPages\n      currentPage\n      pageSize\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": typeof types.GetCharactersDocument,
    "\n  query GetSingleCharacter($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n      initiative\n      armorClass\n      proficiencyBonus\n      speed\n      skills {\n        skill {\n          id\n          skill\n        }\n        id\n        skillProficiency\n      }\n      abilities {\n        id\n        abilityScore\n        proficiencyBonus\n        ability {\n          id\n          ability\n        }\n      }\n    }\n  }\n": typeof types.GetSingleCharacterDocument,
    "\n  query getPartialCharacterById($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n    }\n  }\n": typeof types.GetPartialCharacterByIdDocument,
    "\n  query GetRaces {\n    races {\n      id\n      raceName\n      raceType\n    }\n  }\n": typeof types.GetRacesDocument,
    "\n  query GetClasses {\n    classes {\n      id\n      className\n    }\n  }\n": typeof types.GetClassesDocument,
    "\n  query GetAlignments {\n    alignments {\n      id\n      alignment\n    }\n  }\n": typeof types.GetAlignmentsDocument,
    "\n  query GetSkills {\n    skills {\n      id\n      skill\n    }\n  }\n": typeof types.GetSkillsDocument,
    "\n  query GetAbilities {\n    abilities {\n      id\n      ability\n    }\n  }\n": typeof types.GetAbilitiesDocument,
    "\n  query GetreferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      abilities {\n        id\n        ability\n      }\n      skills {\n        id\n        skill\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n": typeof types.GetreferenceValuesDocument,
    "\n  query GetCharacterFiltersReferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n": typeof types.GetCharacterFiltersReferenceValuesDocument,
};
const documents: Documents = {
    "\n  fragment CharacterDetail on Character {\n    id\n    name\n    level\n    hp\n    imageLink\n    alignment {\n      id\n      alignment\n    }\n    race {\n      id\n      raceName\n      raceType\n    }\n    class {\n      id\n      className\n    }\n  }\n": types.CharacterDetailFragmentDoc,
    "\n  query GetCharacters($input: QueryCharactersInput!) {\n    characters(input: $input) {\n      characters {\n        ...CharacterDetail\n      }\n      totalCount\n      totalPages\n      currentPage\n      pageSize\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": types.GetCharactersDocument,
    "\n  query GetSingleCharacter($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n      initiative\n      armorClass\n      proficiencyBonus\n      speed\n      skills {\n        skill {\n          id\n          skill\n        }\n        id\n        skillProficiency\n      }\n      abilities {\n        id\n        abilityScore\n        proficiencyBonus\n        ability {\n          id\n          ability\n        }\n      }\n    }\n  }\n": types.GetSingleCharacterDocument,
    "\n  query getPartialCharacterById($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n    }\n  }\n": types.GetPartialCharacterByIdDocument,
    "\n  query GetRaces {\n    races {\n      id\n      raceName\n      raceType\n    }\n  }\n": types.GetRacesDocument,
    "\n  query GetClasses {\n    classes {\n      id\n      className\n    }\n  }\n": types.GetClassesDocument,
    "\n  query GetAlignments {\n    alignments {\n      id\n      alignment\n    }\n  }\n": types.GetAlignmentsDocument,
    "\n  query GetSkills {\n    skills {\n      id\n      skill\n    }\n  }\n": types.GetSkillsDocument,
    "\n  query GetAbilities {\n    abilities {\n      id\n      ability\n    }\n  }\n": types.GetAbilitiesDocument,
    "\n  query GetreferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      abilities {\n        id\n        ability\n      }\n      skills {\n        id\n        skill\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n": types.GetreferenceValuesDocument,
    "\n  query GetCharacterFiltersReferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n": types.GetCharacterFiltersReferenceValuesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharacterDetail on Character {\n    id\n    name\n    level\n    hp\n    imageLink\n    alignment {\n      id\n      alignment\n    }\n    race {\n      id\n      raceName\n      raceType\n    }\n    class {\n      id\n      className\n    }\n  }\n"): (typeof documents)["\n  fragment CharacterDetail on Character {\n    id\n    name\n    level\n    hp\n    imageLink\n    alignment {\n      id\n      alignment\n    }\n    race {\n      id\n      raceName\n      raceType\n    }\n    class {\n      id\n      className\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCharacters($input: QueryCharactersInput!) {\n    characters(input: $input) {\n      characters {\n        ...CharacterDetail\n      }\n      totalCount\n      totalPages\n      currentPage\n      pageSize\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"): (typeof documents)["\n  query GetCharacters($input: QueryCharactersInput!) {\n    characters(input: $input) {\n      characters {\n        ...CharacterDetail\n      }\n      totalCount\n      totalPages\n      currentPage\n      pageSize\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSingleCharacter($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n      initiative\n      armorClass\n      proficiencyBonus\n      speed\n      skills {\n        skill {\n          id\n          skill\n        }\n        id\n        skillProficiency\n      }\n      abilities {\n        id\n        abilityScore\n        proficiencyBonus\n        ability {\n          id\n          ability\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSingleCharacter($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n      initiative\n      armorClass\n      proficiencyBonus\n      speed\n      skills {\n        skill {\n          id\n          skill\n        }\n        id\n        skillProficiency\n      }\n      abilities {\n        id\n        abilityScore\n        proficiencyBonus\n        ability {\n          id\n          ability\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPartialCharacterById($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n    }\n  }\n"): (typeof documents)["\n  query getPartialCharacterById($id: Int!) {\n    character(id: $id) {\n      ...CharacterDetail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRaces {\n    races {\n      id\n      raceName\n      raceType\n    }\n  }\n"): (typeof documents)["\n  query GetRaces {\n    races {\n      id\n      raceName\n      raceType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClasses {\n    classes {\n      id\n      className\n    }\n  }\n"): (typeof documents)["\n  query GetClasses {\n    classes {\n      id\n      className\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAlignments {\n    alignments {\n      id\n      alignment\n    }\n  }\n"): (typeof documents)["\n  query GetAlignments {\n    alignments {\n      id\n      alignment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSkills {\n    skills {\n      id\n      skill\n    }\n  }\n"): (typeof documents)["\n  query GetSkills {\n    skills {\n      id\n      skill\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAbilities {\n    abilities {\n      id\n      ability\n    }\n  }\n"): (typeof documents)["\n  query GetAbilities {\n    abilities {\n      id\n      ability\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetreferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      abilities {\n        id\n        ability\n      }\n      skills {\n        id\n        skill\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetreferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      abilities {\n        id\n        ability\n      }\n      skills {\n        id\n        skill\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCharacterFiltersReferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCharacterFiltersReferenceValues {\n    referenceValues {\n      races {\n        id\n        raceName\n        raceType\n      }\n      classes {\n        id\n        className\n      }\n      alignments {\n        id\n        alignment\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;