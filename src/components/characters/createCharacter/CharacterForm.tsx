'use client'

import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import { createZodSchema, FormType } from '@/lib/formSchema/zodSchema';
import { Race, Class, Alignment, CreateCharacterInput, NewCharacterAbilityInput } from '@/generated/graphql/graphql';
import { useCreateCharacter, useReferenceValues } from '@/lib/graphql/hooks';
import TextInput from './formFields/TextInput';
import NumericInput from './formFields/NumericInput';
import Select from './formFields/Select';
import Section from './formFields/Section';
import SkillsList from './formFields/SkillsList';
import AbilitiesList from './formFields/AbilitiesList';

const CharacterForm = () => {
  const [skillsIds, setSkillsIds] = useState<number[]>([]);
  const [abilitiesIds, setAbilitiesIds] = useState<number[]>([]);
  const [createError, setCreateError] = useState(false);

  const { createCharacterMutation, loading: createPending } = useCreateCharacter();
  const { races, skills, abilities, classes, alignments, error, loading } = useReferenceValues();

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
    if (loading || skillsIds.length === 0 || abilitiesIds.length === 0) {
      // Return a placeholder or minimal schema
      return {
        schema: z.object({}),
        schemaDefaults: {}
      };
    }
    
    // Only create the real schema when loaded and IDs are available
    return createZodSchema(abilitiesIds, skillsIds);
  }, [loading, abilitiesIds, skillsIds]);

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

  const ToastError = () => (
    <div>
      An error occured on submitting character, please try again.
    </div>
  );

  const ToastSuccess = () => (
    <div>
      Character created!
    </div>
  );

  /**
   * showErrorToast
   * function to show toast on unsuccessful character creation
   */
  const showErrorToast = () => {
    toast.error(ToastError, {
      position: 'bottom-right',
      className:"p-3 w-[400px] border border-red-900/40 rounded-xl bg-red-700 text-red-100",
      ariaLabel: 'An error occured on submission.'
    });
  }

  /**
   * showSuccessToast
   * function to show toast on successful character creation
   */
  const showSuccessToast = () => {
    toast.success(ToastSuccess, {
      position: 'bottom-right',
      className:"p-3 w-[400px] border border-green-900/40 rounded-xl bg-green-700 text-green-100",
      ariaLabel: 'Character created!'
    });
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
    } catch(err) {
      console.log(err);
      showErrorToast();
      setCreateError(true);
    }
  }

  if (error) {
    return (
      <>
        <div className="text-lg pb-3">Error!</div>
        <div>An error occurred. Please try again.</div>
      </>
    )
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl py-12 px-4 sm:px-6 lg:px-8">

      <ToastContainer />

        {/* submit error */}
        {createError && (
          <div className="bg-red-600/60 p-3 rounded-xl mb-4 flex">
            <span className="size-6 mr-3">{<ExclamationTriangleIcon />}</span>
            An error occured on submitting character, please try again.
          </div>
        )}

        <div className="max-w-6xl mx-auto bg-indigo-900 rounded-lg shadow-2xl overflow-hidden border border-indigo-500/30">

          {/* section one */}
          <Section label="Character Details">
            <div className="space-y-6">
              {/* Character Name */}
              <TextInput
                id="name"
                label="Character Name"
                name="name"
                register={register}
                errors={errors}
              />

              <div className='md:grid md:grid-cols-2 md:w-full md:gap-4'>
                {/* Class Selection */}
                <Select
                  id="class"
                  name="class"
                  label="Class"
                  register={register}
                  errors={errors}
                  options={classes ? classes.map((singleClass: Class) => ({ id: singleClass.id!, description: singleClass.className! })) : []}
                />

                {/* Level Selection */}
                <div className="pt-6 md:pt-0">
                  <NumericInput
                    id="level"
                    label="Level"
                    name="level"
                    min={1}
                    max={20}
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-4'>
                {/* HP */}
                <NumericInput
                  id="hp"
                  label="HP"
                  name="hp"
                  min={1}
                  max={1000}
                  register={register}
                  errors={errors}
                />

                {/* AC */}
                <NumericInput
                  id="ac"
                  label="AC"
                  name="ac"
                  min={1}
                  max={30}
                  register={register}
                  errors={errors}
                />

                {/* Speed */}
                <div className="pt-4 md:pt-0">
                  <NumericInput
                    id="speed"
                    label="Speed"
                    name="speed"
                    min={1}
                    max={150}
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-4'>
                {/* Initiative */}
                <NumericInput
                  id="initiative"
                  label="Initiative"
                  name="initiative"
                  min={1}
                  max={10}
                  register={register}
                  errors={errors}
                />

                {/* Proficiency Bonus */}
                <NumericInput
                  id="proficiency-bonus"
                  label="Proficiency Bonus"
                  name="proficiencyBonus"
                  min={1}
                  max={20}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </Section>

          {/* section two */}
          <Section label="Race & Alignment">
            <div className="space-y-6">

              <div className='md:grid md:grid-cols-2 md:w-full md:gap-4'>
                {/* Race Selection */}
                <Select
                  id="race"
                  name="race"
                  label="Race"
                  register={register}
                  errors={errors}
                  options={races ? races.map((race: Race) => ({ id: race.id!, description: race.raceName! })) : []}
                />

                {/* Alignment Selection */}
                <div className="pt-6 md:pt-0">
                  <Select
                    id="alignment"
                    name="alignment"
                    label="Alignment"
                    register={register}
                    errors={errors}
                    options={alignments ? alignments.map((alignment: Alignment) => ({ id: alignment.id!, description: alignment.alignment! })) : []}
                  />
                </div>
              </div>
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
        <button
          type='submit'
          className="rounded-lg p-3 mt-5 text-small bg-violet-900 hover:bg-violet-800"
        >
          Submit
        </button>

        <button
          type='button'
          onClick={() => reset()}
          className="rounded-lg p-3 mt-5 ml-5 text-small bg-violet-950 hover:bg-violet-800"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
