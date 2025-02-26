'use client'

import { useSuspenseQuery } from '@apollo/client';
import { getReferenceValues } from '@/lib/graphql/queries';

export function useReferenceValues() {
  const { data, error } = useSuspenseQuery(getReferenceValues);

  if (error) {
    console.log(error);
  }

  return {
    abilities: data.referenceValues.abilities,
    skills: data.referenceValues.skills,
    alignments: data.referenceValues.alignments,
    classes: data.referenceValues.classes,
    races: data.referenceValues.races,
    error
  };
}
