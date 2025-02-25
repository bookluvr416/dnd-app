'use client'

import { useSuspenseQuery } from '@apollo/client';
import { getLookupValues } from '@/lib/graphql/queries';

export function useLookupValues() {
  const { data, error } = useSuspenseQuery(getLookupValues);

  if (error) {
    console.log(error);
  }

  return {
    abilities: data.lookupValues.abilities,
    skills: data.lookupValues.skills,
    alignments: data.lookupValues.alignments,
    classes: data.lookupValues.classes,
    races: data.lookupValues.races,
    error
  };
}
