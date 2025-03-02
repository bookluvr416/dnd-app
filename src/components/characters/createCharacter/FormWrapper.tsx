import { ReactNode } from 'react';

const FormWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl py-12 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export default FormWrapper;