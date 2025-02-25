import { Ability } from "@/generated/graphql/graphql";
import NumericInput from "./NumericInput";

interface Props {
  abilities: Ability[]
}

const AbilitiesList: React.FC<Props> = ({ abilities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {abilities.map((ability) => (
        <div
          key={ability.ability}
          className="bg-purple-950/20 rounded-lg p-4 border border-violet-800"
        >
          <div className="text-center mb-2">
            <h3 className="text-lg font-medium text-indigo-300">
              {ability.ability}
            </h3>
          </div>
          <div className="flex flex-col space-y-3">
            <NumericInput 
              id={`${ability.ability}-score`}
              htmlFor={`${ability.ability}-score`}
              label="Ability Score"
              name={`${ability.ability}-score`}
              min={1}
              max={30}
            />

            <NumericInput 
              id={`${ability.ability}-proficiency-bonus`}
              htmlFor={`${ability.ability}-proficiency-bonus`}
              label="Proficiency Bonus"
              name={`${ability.ability}-proficiency-bonus`}
              min={1}
              max={30}
            />
          </div>
        </div>
      ))}
    </div>
  )
};

export default AbilitiesList;
