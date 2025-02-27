const HeaderBanner: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1 className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl text-center font-quintessential items-center mb-6 md:mb-12 p-4 sm:p-6 text-xl sm:text-2xl text-fuchsia-200">
      {text}
    </h1>
  );
};

export default HeaderBanner;
