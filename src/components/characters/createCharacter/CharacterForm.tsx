'use client'

import { useEffect, useMemo, useState, CSSProperties } from 'react';
import { z } from 'zod';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createZodSchema, FormType } from '@/lib/formSchema/zodSchema';
import { CreateCharacterInput, NewCharacterAbilityInput } from '@/generated/graphql/graphql';
import { useCreateCharacter, useReferenceValues } from '@/lib/graphql/hooks';
import FormWrapper from './FormWrapper';
import Section from './formFields/Section';
import SectionOne from './formFields/SectionOne';
import SectionTwo from './formFields/SectionTwo';
import SkillsList from './formFields/SkillsList';
import AbilitiesList from './formFields/AbilitiesList';
import Button from '@/components/shared/Button';
import ErrorLoading from '@/components/shared/ErrorLoading';
import ErrorAlert from '@/components/shared/ErrorAlert';
import { showSuccessToast, showErrorToast } from './Toasts';
import "react-loading-skeleton/dist/skeleton.css";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const CharacterForm = () => {
  const [skillsIds, setSkillsIds] = useState<number[]>([]);
  const [abilitiesIds, setAbilitiesIds] = useState<number[]>([]);
  const [createError, setCreateError] = useState(false);

  const { createCharacterMutation, loading: createPending } = useCreateCharacter();
  const { races, skills, abilities, classes, alignments, error, refetch } = useReferenceValues();

  const router = useRouter();

  /**
   * useEffect
   * once skills and abilities have loaded, set array of skills ids and abilities ids
   */
  useEffect(() => {
    if (skills && abilities) {
      const skillsIds = skills.map((skill) => skill.id) as number[];
      const abilitiesIds = abilities.map((ability) => ability.id) as number[];

      setSkillsIds(skillsIds);
      setAbilitiesIds(abilitiesIds);
    }
  }, [skills, abilities]);

  // Create the schema only when not loading and we have the IDs
  const { schema, schemaDefaults } = useMemo(() => {
    // Return a default/empty value while loading
    if (skillsIds.length === 0 || abilitiesIds.length === 0) {
      // Return a placeholder or minimal schema
      return {
        schema: z.object({}),
        schemaDefaults: {}
      };
    }
    
    // Only create the real schema when loaded and IDs are available
    return createZodSchema(abilitiesIds, skillsIds);
  }, [abilitiesIds, skillsIds]);

  // set up react-hook-form with zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: schemaDefaults,
    shouldUnregister: false,
  });

  // reset schema defaults once schemaDefaults is set
  useEffect(() => {
    if (Object.keys(schemaDefaults).length !== 0) {
      reset(schemaDefaults);
    }
  }, [schemaDefaults])

  // create input to send to server
  const createInput = (data: FormType) => {
    const input: CreateCharacterInput = {} as CreateCharacterInput;

    // character fields
    input.character = {
      name: data.name,
      level: data.level,
      classId: data.class,
      alignmentId: data.alignment,
      raceId: data.race,
      armorClass: data.ac,
      hp: data.hp,
      initiative: data.initiative,
      proficiencyBonus: data.proficiencyBonus,
      speed: data.speed,
    }

    input.skills = [];
    input.abilities = [];

    for (const [key, value] of Object.entries(data)) {

      // skills
      if (key.includes('skill')) {
        const id = key.slice(5);
        input.skills.push({
          skillId: parseInt(id),
          skillProficiency: value as number,
        })
      }

      // abilities
      if (key.includes('ability')) {
        const id = parseInt(key.slice(12));
        const index = input.abilities.findIndex((ability) => ability?.abilityId === id);

        if (key.includes('Score')) {
          if (index !== -1) {
            input.abilities[index]!.abilityScore = value as number;
          } else {
            input.abilities.push({
              abilityId: id,
              abilityScore: value
            } as NewCharacterAbilityInput)
          }
        } else {
          if (index !== -1) {
            input.abilities[index]!.proficiencyBonus = value as number;
          } else {
            input.abilities.push({
              abilityId: id,
              proficiencyBonus: value,
            } as NewCharacterAbilityInput)
          }
        }        
      }
    };

    return input;
  }

  /**
   * onSubmit
   * calls the function to send a graphql mutation.
   * on success, shows a success toast, clears form, and directs to the /characters route.
   * on failure, shows an error toast and error message.
   * @param data FormData
   */
  const onSubmit = async (data: FormData) => {
    const input = createInput(data);

    try {
      await createCharacterMutation(input);
      setCreateError(false);
      showSuccessToast();
      reset(schemaDefaults);
      setTimeout(() => { router.push('/characters')}, 5000);
    } catch(error) {
      console.log(error);
      showErrorToast();
      setCreateError(true);
    }
  }

  return (
    <FormWrapper>
      <ToastContainer />

        {/* submit error */}
        {createError && (
          <div className="mb-5">
            <ErrorAlert>
              An error occured on submitting character, please try again.
            </ErrorAlert>
          </div>
        )}

        {error && <ErrorLoading refetch={refetch} />}

        {!error && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-6xl mx-auto bg-indigo-950/60 rounded-lg overflow-hidden border border-indigo-500/30 shadow-2xl">

              {/* section one */}
              <Section label="Character Details">
                <div className="space-y-6">
                  <SectionOne
                    errors={errors}
                    register={register}
                    classes={classes ? classes : []}
                  />
                </div>
              </Section>

              {/* section two */}
              <Section label="Race & Alignment">
                <div className="space-y-6">
                  <SectionTwo
                    errors={errors}
                    register={register}
                    races={races ? races : []}
                    alignments={alignments ? alignments : []}
                  />
                </div>
              </Section>

              {/* section three - abilities */}
              <Section label="Abilities">
                <div className="space-y-6">
                  <AbilitiesList
                    abilities={abilities ? abilities : []}
                    register={register}
                    errors={errors}
                  />
                </div>
              </Section>

              {/* section four - skills */}
              <Section label="Skills">
                <div className="space-y-6">
                  <SkillsList
                    skills={skills ? skills : []}
                    register={register}
                    errors={errors}
                  />
                </div>
              </Section>
            </div>

            {/* submit and cancel buttons */}
            <div className='mt-5'>
              {createPending && (
                <div className='flex flex-row justify-center'>
                  <PropagateLoader
                    color="#fa77f7"
                    loading={createPending}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}

              <span className='mr-3'>
                <Button
                  text="Submit"
                  type="submit"
                  disabled={createPending}
                  cssColor="bg-purple-950 hover:bg-purple-900/80"
                />
              </span>
              <Button
                text="Clear"
                type="button"
                disabled={createPending}
                onClick={() => reset()}
                cssColor="bg-purple-950/60 hover:bg-purple-900/80"
              />
            </div>
          </form>
        )}
      </FormWrapper>
  );
};

export default CharacterForm;
