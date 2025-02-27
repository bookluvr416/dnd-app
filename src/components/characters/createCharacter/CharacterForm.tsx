'use client'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, schema, schemaDefaults } from '@/lib/formSchema/zodSchema';
import { Race, Class, Alignment } from '@/generated/graphql/graphql';
import { useReferenceValues } from '@/lib/graphql/hooks';
import TextInput from './formFields/TextInput';
import NumericInput from './formFields/NumericInput';
import Select from './formFields/Select';
import Section from './formFields/Section';
import SkillsList from './formFields/SkillsList';
import AbilitiesList from './formFields/AbilitiesList';


const CharacterForm = () => {
  const { races, skills, abilities, classes, alignments, error } = useReferenceValues();

  if (error) {
    return (
      <>
        <div className="text-lg pb-3">Error!</div>
        <div>An error occurred. Please try again.</div>
      </>
    )
  }

  // set up react-hook-form with zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: schemaDefaults
  });

  /**
   * onSubmit
   * TODO
   * @param data FormData
   */
  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl py-12 px-4 sm:px-6 lg:px-8">
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
                  options={classes.map((singleClass: Class) => ({ id: singleClass.id!, description: singleClass.className! }))}
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
                  options={races.map((race: Race) => ({ id: race.id!, description: race.raceName! }))}
                />

                {/* Alignment Selection */}
                <div className="pt-6 md:pt-0">
                  <Select
                    id="alignment"
                    name="alignment"
                    label="Alignment"
                    register={register}
                    errors={errors}
                    options={alignments.map((alignment: Alignment) => ({ id: alignment.id!, description: alignment.alignment! }))}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* section three - abilities */}
          <Section label="Abilities">
            <div className="space-y-6">
              <AbilitiesList
                abilities={abilities}
                register={register}
                errors={errors}
              />
            </div>
          </Section>

          {/* section four - skills */}
          <Section label="Skills">
            <div className="space-y-6">
              <SkillsList
                skills={skills}
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
