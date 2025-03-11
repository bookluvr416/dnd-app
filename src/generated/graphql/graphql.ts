/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Ability = {
  __typename?: 'Ability';
  ability: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type Alignment = {
  __typename?: 'Alignment';
  alignment: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type Character = {
  __typename?: 'Character';
  abilities?: Maybe<Array<Maybe<CharacterAbility>>>;
  alignment?: Maybe<Alignment>;
  armorClass?: Maybe<Scalars['Int']['output']>;
  class?: Maybe<Class>;
  hp?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  initiative?: Maybe<Scalars['Int']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  proficiencyBonus?: Maybe<Scalars['Int']['output']>;
  race?: Maybe<Race>;
  skills?: Maybe<Array<Maybe<CharacterSkill>>>;
  speed?: Maybe<Scalars['Int']['output']>;
};

export type CharacterAbility = {
  __typename?: 'CharacterAbility';
  ability?: Maybe<Ability>;
  abilityScore?: Maybe<Scalars['Int']['output']>;
  characterId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  proficiencyBonus?: Maybe<Scalars['Int']['output']>;
};

export type CharacterSkill = {
  __typename?: 'CharacterSkill';
  characterId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  skill?: Maybe<Skill>;
  skillProficiency?: Maybe<Scalars['Int']['output']>;
};

export type CharactersPage = {
  __typename?: 'CharactersPage';
  characters: Array<Character>;
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Class = {
  __typename?: 'Class';
  className: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type CreateCharacterInput = {
  abilities: Array<InputMaybe<NewCharacterAbilityInput>>;
  character: NewCharacterInput;
  skills: Array<InputMaybe<NewCharacterSkillInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacter?: Maybe<Character>;
  deleteCharacter?: Maybe<Scalars['Boolean']['output']>;
  updateCharacter?: Maybe<Character>;
};


export type MutationCreateCharacterArgs = {
  input: CreateCharacterInput;
};


export type MutationDeleteCharacterArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateCharacterArgs = {
  input: UpdateCharacterInput;
};

export type NewCharacterAbilityInput = {
  abilityId: Scalars['Int']['input'];
  abilityScore: Scalars['Int']['input'];
  proficiencyBonus: Scalars['Int']['input'];
};

export type NewCharacterInput = {
  alignmentId: Scalars['Int']['input'];
  armorClass: Scalars['Int']['input'];
  classId: Scalars['Int']['input'];
  hp: Scalars['Int']['input'];
  initiative: Scalars['Int']['input'];
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  proficiencyBonus: Scalars['Int']['input'];
  raceId: Scalars['Int']['input'];
  speed: Scalars['Int']['input'];
};

export type NewCharacterSkillInput = {
  skillId: Scalars['Int']['input'];
  skillProficiency: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  abilities: Array<Ability>;
  ability?: Maybe<Ability>;
  alignment?: Maybe<Alignment>;
  alignments: Array<Alignment>;
  character?: Maybe<Character>;
  characters: CharactersPage;
  class?: Maybe<Class>;
  classes: Array<Class>;
  race?: Maybe<Race>;
  races: Array<Race>;
  referenceValues: ReferenceValues;
  skill?: Maybe<Skill>;
  skills: Array<Skill>;
};


export type QueryAbilityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAlignmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCharacterArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCharactersArgs = {
  input: QueryCharactersInput;
};


export type QueryClassArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRaceArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySkillArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCharactersInput = {
  alignment?: InputMaybe<Scalars['Int']['input']>;
  class?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  race?: InputMaybe<Scalars['Int']['input']>;
};

export type Race = {
  __typename?: 'Race';
  id: Scalars['Int']['output'];
  raceName: Scalars['String']['output'];
  raceType: Scalars['String']['output'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['Int']['output'];
  skill: Scalars['String']['output'];
};

export type UpdateCharacterAbilityInput = {
  abilityScore: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  proficiencyBonus: Scalars['Int']['input'];
};

export type UpdateCharacterInput = {
  abilities?: InputMaybe<Array<InputMaybe<UpdateCharacterAbilityInput>>>;
  alignmentId?: InputMaybe<Scalars['Int']['input']>;
  armorClass?: InputMaybe<Scalars['Int']['input']>;
  classId?: InputMaybe<Scalars['Int']['input']>;
  hp?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  initiative?: InputMaybe<Scalars['Int']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  proficiencyBonus?: InputMaybe<Scalars['Int']['input']>;
  raceId?: InputMaybe<Scalars['Int']['input']>;
  skills?: InputMaybe<Array<InputMaybe<UpdateCharacterSkillInput>>>;
  speed?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCharacterSkillInput = {
  id: Scalars['Int']['input'];
  skillProficiency: Scalars['Int']['input'];
};

export type ReferenceValues = {
  __typename?: 'referenceValues';
  abilities: Array<Ability>;
  alignments: Array<Alignment>;
  classes: Array<Class>;
  races: Array<Race>;
  skills: Array<Skill>;
};

export type CharacterDetailFragment = { __typename?: 'Character', id: number, name?: string | null, level?: number | null, hp?: number | null, alignment?: { __typename?: 'Alignment', id: number, alignment: string } | null, race?: { __typename?: 'Race', id: number, raceName: string, raceType: string } | null, class?: { __typename?: 'Class', id: number, className: string } | null };

export type GetCharactersQueryVariables = Exact<{
  input: QueryCharactersInput;
}>;


export type GetCharactersQuery = { __typename?: 'Query', characters: { __typename?: 'CharactersPage', totalCount: number, totalPages: number, currentPage: number, pageSize: number, hasNextPage: boolean, hasPreviousPage: boolean, characters: Array<{ __typename?: 'Character', id: number, name?: string | null, level?: number | null, hp?: number | null, alignment?: { __typename?: 'Alignment', id: number, alignment: string } | null, race?: { __typename?: 'Race', id: number, raceName: string, raceType: string } | null, class?: { __typename?: 'Class', id: number, className: string } | null }> } };

export type GetSingleCharacterQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSingleCharacterQuery = { __typename?: 'Query', character?: { __typename?: 'Character', initiative?: number | null, proficiencyBonus?: number | null, speed?: number | null, id: number, name?: string | null, level?: number | null, hp?: number | null, skills?: Array<{ __typename?: 'CharacterSkill', id?: number | null, skillProficiency?: number | null, skill?: { __typename?: 'Skill', id: number, skill: string } | null } | null> | null, abilities?: Array<{ __typename?: 'CharacterAbility', id?: number | null, abilityScore?: number | null, proficiencyBonus?: number | null, ability?: { __typename?: 'Ability', id: number, ability: string } | null } | null> | null, alignment?: { __typename?: 'Alignment', id: number, alignment: string } | null, race?: { __typename?: 'Race', id: number, raceName: string, raceType: string } | null, class?: { __typename?: 'Class', id: number, className: string } | null } | null };

export type GetPartialCharacterByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPartialCharacterByIdQuery = { __typename?: 'Query', character?: { __typename?: 'Character', id: number, name?: string | null, level?: number | null, hp?: number | null, alignment?: { __typename?: 'Alignment', id: number, alignment: string } | null, race?: { __typename?: 'Race', id: number, raceName: string, raceType: string } | null, class?: { __typename?: 'Class', id: number, className: string } | null } | null };

export type GetRacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRacesQuery = { __typename?: 'Query', races: Array<{ __typename?: 'Race', id: number, raceName: string, raceType: string }> };

export type GetClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: number, className: string }> };

export type GetAlignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlignmentsQuery = { __typename?: 'Query', alignments: Array<{ __typename?: 'Alignment', id: number, alignment: string }> };

export type GetSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSkillsQuery = { __typename?: 'Query', skills: Array<{ __typename?: 'Skill', id: number, skill: string }> };

export type GetAbilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAbilitiesQuery = { __typename?: 'Query', abilities: Array<{ __typename?: 'Ability', id: number, ability: string }> };

export type GetreferenceValuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetreferenceValuesQuery = { __typename?: 'Query', referenceValues: { __typename?: 'referenceValues', races: Array<{ __typename?: 'Race', id: number, raceName: string, raceType: string }>, classes: Array<{ __typename?: 'Class', id: number, className: string }>, abilities: Array<{ __typename?: 'Ability', id: number, ability: string }>, skills: Array<{ __typename?: 'Skill', id: number, skill: string }>, alignments: Array<{ __typename?: 'Alignment', id: number, alignment: string }> } };

export type GetCharacterFiltersReferenceValuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCharacterFiltersReferenceValuesQuery = { __typename?: 'Query', referenceValues: { __typename?: 'referenceValues', races: Array<{ __typename?: 'Race', id: number, raceName: string, raceType: string }>, classes: Array<{ __typename?: 'Class', id: number, className: string }>, alignments: Array<{ __typename?: 'Alignment', id: number, alignment: string }> } };

export const CharacterDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"hp"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}}]}}]}}]} as unknown as DocumentNode<CharacterDetailFragment, unknown>;
export const GetCharactersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCharacters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryCharactersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterDetail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"hp"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}}]}}]}}]} as unknown as DocumentNode<GetCharactersQuery, GetCharactersQueryVariables>;
export const GetSingleCharacterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSingleCharacter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"character"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterDetail"}},{"kind":"Field","name":{"kind":"Name","value":"initiative"}},{"kind":"Field","name":{"kind":"Name","value":"proficiencyBonus"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skill"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skill"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillProficiency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"abilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"abilityScore"}},{"kind":"Field","name":{"kind":"Name","value":"proficiencyBonus"}},{"kind":"Field","name":{"kind":"Name","value":"ability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ability"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"hp"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}}]}}]}}]} as unknown as DocumentNode<GetSingleCharacterQuery, GetSingleCharacterQueryVariables>;
export const GetPartialCharacterByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPartialCharacterById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"character"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"hp"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}}]}}]}}]} as unknown as DocumentNode<GetPartialCharacterByIdQuery, GetPartialCharacterByIdQueryVariables>;
export const GetRacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}}]}}]}}]} as unknown as DocumentNode<GetRacesQuery, GetRacesQueryVariables>;
export const GetClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}}]}}]}}]} as unknown as DocumentNode<GetClassesQuery, GetClassesQueryVariables>;
export const GetAlignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAlignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}}]}}]}}]} as unknown as DocumentNode<GetAlignmentsQuery, GetAlignmentsQueryVariables>;
export const GetSkillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSkills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skill"}}]}}]}}]} as unknown as DocumentNode<GetSkillsQuery, GetSkillsQueryVariables>;
export const GetAbilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAbilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ability"}}]}}]}}]} as unknown as DocumentNode<GetAbilitiesQuery, GetAbilitiesQueryVariables>;
export const GetreferenceValuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetreferenceValues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referenceValues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}}]}},{"kind":"Field","name":{"kind":"Name","value":"abilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ability"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skill"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}}]}}]}}]}}]} as unknown as DocumentNode<GetreferenceValuesQuery, GetreferenceValuesQueryVariables>;
export const GetCharacterFiltersReferenceValuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCharacterFiltersReferenceValues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referenceValues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"raceName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}}]}}]}}]}}]} as unknown as DocumentNode<GetCharacterFiltersReferenceValuesQuery, GetCharacterFiltersReferenceValuesQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Ability: ResolverTypeWrapper<Ability>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Alignment: ResolverTypeWrapper<Alignment>;
  Character: ResolverTypeWrapper<Character>;
  CharacterAbility: ResolverTypeWrapper<CharacterAbility>;
  CharacterSkill: ResolverTypeWrapper<CharacterSkill>;
  CharactersPage: ResolverTypeWrapper<CharactersPage>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Class: ResolverTypeWrapper<Class>;
  CreateCharacterInput: CreateCharacterInput;
  Mutation: ResolverTypeWrapper<{}>;
  NewCharacterAbilityInput: NewCharacterAbilityInput;
  NewCharacterInput: NewCharacterInput;
  NewCharacterSkillInput: NewCharacterSkillInput;
  Query: ResolverTypeWrapper<{}>;
  QueryCharactersInput: QueryCharactersInput;
  Race: ResolverTypeWrapper<Race>;
  Skill: ResolverTypeWrapper<Skill>;
  UpdateCharacterAbilityInput: UpdateCharacterAbilityInput;
  UpdateCharacterInput: UpdateCharacterInput;
  UpdateCharacterSkillInput: UpdateCharacterSkillInput;
  referenceValues: ResolverTypeWrapper<ReferenceValues>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Ability: Ability;
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  Alignment: Alignment;
  Character: Character;
  CharacterAbility: CharacterAbility;
  CharacterSkill: CharacterSkill;
  CharactersPage: CharactersPage;
  Boolean: Scalars['Boolean']['output'];
  Class: Class;
  CreateCharacterInput: CreateCharacterInput;
  Mutation: {};
  NewCharacterAbilityInput: NewCharacterAbilityInput;
  NewCharacterInput: NewCharacterInput;
  NewCharacterSkillInput: NewCharacterSkillInput;
  Query: {};
  QueryCharactersInput: QueryCharactersInput;
  Race: Race;
  Skill: Skill;
  UpdateCharacterAbilityInput: UpdateCharacterAbilityInput;
  UpdateCharacterInput: UpdateCharacterInput;
  UpdateCharacterSkillInput: UpdateCharacterSkillInput;
  referenceValues: ReferenceValues;
};

export type AbilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ability'] = ResolversParentTypes['Ability']> = {
  ability?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AlignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Alignment'] = ResolversParentTypes['Alignment']> = {
  alignment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  abilities?: Resolver<Maybe<Array<Maybe<ResolversTypes['CharacterAbility']>>>, ParentType, ContextType>;
  alignment?: Resolver<Maybe<ResolversTypes['Alignment']>, ParentType, ContextType>;
  armorClass?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes['Class']>, ParentType, ContextType>;
  hp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  initiative?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proficiencyBonus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['CharacterSkill']>>>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterAbilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterAbility'] = ResolversParentTypes['CharacterAbility']> = {
  ability?: Resolver<Maybe<ResolversTypes['Ability']>, ParentType, ContextType>;
  abilityScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  characterId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  proficiencyBonus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacterSkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterSkill'] = ResolversParentTypes['CharacterSkill']> = {
  characterId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType>;
  skillProficiency?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharactersPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharactersPage'] = ResolversParentTypes['CharactersPage']> = {
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassResolvers<ContextType = any, ParentType extends ResolversParentTypes['Class'] = ResolversParentTypes['Class']> = {
  className?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCharacter?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<MutationCreateCharacterArgs, 'input'>>;
  deleteCharacter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteCharacterArgs, 'id'>>;
  updateCharacter?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<MutationUpdateCharacterArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  abilities?: Resolver<Array<ResolversTypes['Ability']>, ParentType, ContextType>;
  ability?: Resolver<Maybe<ResolversTypes['Ability']>, ParentType, ContextType, RequireFields<QueryAbilityArgs, 'id'>>;
  alignment?: Resolver<Maybe<ResolversTypes['Alignment']>, ParentType, ContextType, RequireFields<QueryAlignmentArgs, 'id'>>;
  alignments?: Resolver<Array<ResolversTypes['Alignment']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QueryCharacterArgs, 'id'>>;
  characters?: Resolver<ResolversTypes['CharactersPage'], ParentType, ContextType, RequireFields<QueryCharactersArgs, 'input'>>;
  class?: Resolver<Maybe<ResolversTypes['Class']>, ParentType, ContextType, RequireFields<QueryClassArgs, 'id'>>;
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType, RequireFields<QueryRaceArgs, 'id'>>;
  races?: Resolver<Array<ResolversTypes['Race']>, ParentType, ContextType>;
  referenceValues?: Resolver<ResolversTypes['referenceValues'], ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType, RequireFields<QuerySkillArgs, 'id'>>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
};

export type RaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Race'] = ResolversParentTypes['Race']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  raceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  raceType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skill?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferenceValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['referenceValues'] = ResolversParentTypes['referenceValues']> = {
  abilities?: Resolver<Array<ResolversTypes['Ability']>, ParentType, ContextType>;
  alignments?: Resolver<Array<ResolversTypes['Alignment']>, ParentType, ContextType>;
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType>;
  races?: Resolver<Array<ResolversTypes['Race']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Ability?: AbilityResolvers<ContextType>;
  Alignment?: AlignmentResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  CharacterAbility?: CharacterAbilityResolvers<ContextType>;
  CharacterSkill?: CharacterSkillResolvers<ContextType>;
  CharactersPage?: CharactersPageResolvers<ContextType>;
  Class?: ClassResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Race?: RaceResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  referenceValues?: ReferenceValuesResolvers<ContextType>;
};

