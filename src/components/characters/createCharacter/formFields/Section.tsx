import { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
}

const Section: React.FC<Props> = ({ label, children }) => {
  return (
    <section className="p-6 rounded-lg border border-indigo-500/30">
      <h2 className="font-semibold text-indigo-300 mb-6 text-center">
        {label}
      </h2>
      {children}
    </section>
  )
};

export default Section;
