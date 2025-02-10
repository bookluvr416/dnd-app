import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
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
  ability?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type Alignment = {
  __typename?: 'Alignment';
  alignment?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
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

export type Class = {
  __typename?: 'Class';
  className?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
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
  characters: Array<Character>;
  class?: Maybe<Class>;
  classes: Array<Class>;
  race?: Maybe<Race>;
  races: Array<Race>;
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


export type QueryClassArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRaceArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySkillArgs = {
  id: Scalars['Int']['input'];
};

export type Race = {
  __typename?: 'Race';
  id?: Maybe<Scalars['Int']['output']>;
  raceName?: Maybe<Scalars['String']['output']>;
  raceType?: Maybe<Scalars['String']['output']>;
};

export type Skill = {
  __typename?: 'Skill';
  id?: Maybe<Scalars['Int']['output']>;
  skill?: Maybe<Scalars['String']['output']>;
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
  Alignment: ResolverTypeWrapper<Alignment>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Character: ResolverTypeWrapper<Character>;
  CharacterAbility: ResolverTypeWrapper<CharacterAbility>;
  CharacterSkill: ResolverTypeWrapper<CharacterSkill>;
  Class: ResolverTypeWrapper<Class>;
  CreateCharacterInput: CreateCharacterInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCharacterAbilityInput: NewCharacterAbilityInput;
  NewCharacterInput: NewCharacterInput;
  NewCharacterSkillInput: NewCharacterSkillInput;
  Query: ResolverTypeWrapper<{}>;
  Race: ResolverTypeWrapper<Race>;
  Skill: ResolverTypeWrapper<Skill>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateCharacterAbilityInput: UpdateCharacterAbilityInput;
  UpdateCharacterInput: UpdateCharacterInput;
  UpdateCharacterSkillInput: UpdateCharacterSkillInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Ability: Ability;
  Alignment: Alignment;
  Boolean: Scalars['Boolean']['output'];
  Character: Character;
  CharacterAbility: CharacterAbility;
  CharacterSkill: CharacterSkill;
  Class: Class;
  CreateCharacterInput: CreateCharacterInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  NewCharacterAbilityInput: NewCharacterAbilityInput;
  NewCharacterInput: NewCharacterInput;
  NewCharacterSkillInput: NewCharacterSkillInput;
  Query: {};
  Race: Race;
  Skill: Skill;
  String: Scalars['String']['output'];
  UpdateCharacterAbilityInput: UpdateCharacterAbilityInput;
  UpdateCharacterInput: UpdateCharacterInput;
  UpdateCharacterSkillInput: UpdateCharacterSkillInput;
};

export type AbilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ability'] = ResolversParentTypes['Ability']> = {
  ability?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AlignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Alignment'] = ResolversParentTypes['Alignment']> = {
  alignment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type ClassResolvers<ContextType = any, ParentType extends ResolversParentTypes['Class'] = ResolversParentTypes['Class']> = {
  className?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes['Class']>, ParentType, ContextType, RequireFields<QueryClassArgs, 'id'>>;
  classes?: Resolver<Array<ResolversTypes['Class']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType, RequireFields<QueryRaceArgs, 'id'>>;
  races?: Resolver<Array<ResolversTypes['Race']>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['Skill']>, ParentType, ContextType, RequireFields<QuerySkillArgs, 'id'>>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
};

export type RaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Race'] = ResolversParentTypes['Race']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  raceName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  raceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Ability?: AbilityResolvers<ContextType>;
  Alignment?: AlignmentResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  CharacterAbility?: CharacterAbilityResolvers<ContextType>;
  CharacterSkill?: CharacterSkillResolvers<ContextType>;
  Class?: ClassResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Race?: RaceResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
};

