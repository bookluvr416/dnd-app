'use client'

import { Race, Class, Alignment, Skill } from '@/generated/graphql/graphql';
import { useLookupValues } from '@/lib/graphql/hooks';
import TextInput from './formFields/TextInput';
import NumericInput from './formFields/NumericInput';
import Select from './formFields/Select';
import Section from './formFields/Section';
import SkillsList from './formFields/SkillsList';
import AbilitiesList from './formFields/AbilitiesList';

const CharacterForm = () => {
  const { races, skills, abilities, classes, alignments, error } = useLookupValues();

  if (error) {
    return (
      <>
        <div className="text-lg pb-3">Error!</div>
        <div>An error occurred. Please try again.</div>
      </>
    )
  }

  async function createCharacter(formData: FormData) {
    console.log(formData.get('race'));
  }

  return (
    <form action={createCharacter}>
      <div className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-indigo-900 rounded-lg shadow-2xl overflow-hidden border border-indigo-500/30">
          
          {/* section one */}
          <Section label="Character Details">
            <div className="space-y-6">
              {/* Character Name */}
              <TextInput
                id="name"
                htmlFor="name"
                label="Character Name"
                name="name"
              />

              <div className='md:grid md:grid-cols-2 md:w-full md:gap-4'>
                {/* Class Selection */}
                <Select
                  id="class"
                  htmlFor="class"
                  name="class"
                  label="Class"
                  options={classes.map((singleClass: Class) => ({ id: singleClass.id!, description: singleClass.className! }))}
                />

                {/* Level Selection */}
                <div className="pt-6 md:pt-0">
                  <NumericInput
                    id="level"
                    htmlFor="level"
                    label="Level"
                    name="level"
                    min={1}
                    max={20}
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 w-full gap-4'>
                {/* HP */}
                <NumericInput
                  id="hp"
                  htmlFor="hp"
                  label="HP"
                  name="hp"
                  min={1}
                  max={1000}
                />

                {/* AC */}
                <NumericInput
                  id="ac"
                  htmlFor="ac"
                  label="AC"
                  name="ac"
                  min={1}
                  max={30}
                />

                {/* Speed */}
                <div className="pt-4 md:pt-0">
                  <NumericInput
                    id="speed"
                    htmlFor="speed"
                    label="Speed"
                    name="speed"
                    min={1}
                    max={150}
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 w-full gap-4'>
                {/* Initiative */}
                <NumericInput
                  id="initiative"
                  htmlFor="initiative"
                  label="Initiative"
                  name="initiative"
                  min={1}
                  max={10}
                />

                {/* Proficiency Bonus */}
                <NumericInput
                  id="proficiency-bonus"
                  htmlFor="proficiency-bonus"
                  label="Proficiency Bonus"
                  name="proficiency-bonus"
                  min={1}
                  max={20}
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
                  htmlFor="race"
                  name="race"
                  label="Race"
                  options={races.map((race: Race) => ({ id: race.id!, description: race.raceName! }))}
                />

                {/* Alignment Selection */}
                <div className="pt-6 md:pt-0">
                  <Select
                    id="alignment"
                    htmlFor="alignment"
                    name="alignment"
                    label="Alignment"
                    options={alignments.map((alignment: Alignment) => ({ id: alignment.id!, description: alignment.alignment! }))}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* section three - abilities */}
          <Section label="Abilities">
            <div className="space-y-6">
              <AbilitiesList abilities={abilities} />
            </div>
          </Section>

          {/* section four - skills */}
          <Section label="Skills">
            <div className="space-y-6">
              <SkillsList skills={skills} />
            </div>
          </Section>

        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default CharacterForm