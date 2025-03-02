import { ReactNode } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorAlert: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-red-600/60 p-3 rounded-xl flex">
      <span className="size-6 mr-3">{<ExclamationTriangleIcon />}</span>
      {children}
    </div>
  );
};

export default ErrorAlert;
