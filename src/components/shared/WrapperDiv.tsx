import { ReactNode } from "react";

const WrapperDiv: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-blue-950/80 p-8 md:p-10 rounded-3xl max-w-4xl m-auto">
      {children}
    </div>
  );
};

export default WrapperDiv;
