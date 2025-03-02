import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Section from './formFields/Section';
import FormWrapper from './FormWrapper';

const SkeletonComponent = () => (
  <SkeletonTheme baseColor="#351460" highlightColor="#30205e">
    <div>
      <Skeleton className='h-10 border border-violet-800 rounded-md' />
    </div>
  </SkeletonTheme>
);

const FormFrame = () => (
  <FormWrapper>
    <div className="max-w-6xl mx-auto bg-indigo-950/60 rounded-lg overflow-hidden border border-indigo-500/30 shadow-2xl">
      <Section label="Character Details"><SkeletonComponent /></Section>
      <Section label="Race & Alignment"><SkeletonComponent /></Section>
      <Section label="Abilities"><SkeletonComponent /></Section>
      <Section label="Skills"><SkeletonComponent /></Section>
    </div>
  </FormWrapper>
);

export default FormFrame;
