const ResultCard: React.FC<{ diceType: string, results: number[] }> = ({ diceType, results }) => {
  const resultsString = results.join(', ');
  const total = results.reduce((prev, current) => prev + current , 0);
  return (
    <div id={`${diceType}-results`} className="bg-indigo-950 p-4 rounded-lg text-wrap">
      <h2
        className="text-cyan-200 mb-4 bg-indigo-900 rounded-lg p-2"
      >
        {diceType.toUpperCase()} Total: {total}
      </h2>
      <div className="pl-2 pr-2">{resultsString}</div>
    </div>
  );
};

export default ResultCard;
