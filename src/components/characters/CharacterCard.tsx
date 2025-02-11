import { Character } from "@/generated/graphql";
import Image from "next/image";
import druidpaw from "@/assets/druidpaw.webp";
import dragonborn from "@/assets/female_dragonborn.webp";

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div className="bg-indigo-950 p-4 rounded-lg text-wrap ring-1 ring-blue-700/50">
      <div className="flex flex-row justify-center pb-3 md:pb-5">
        <Image
          src={dragonborn}
          alt='image of the character'
          width={320}
          height={400}
          className="ring-2 ring-black"
        />
      </div>
      <div className="flex flex-row justify-between">
        <h2 className="text-lg sm:text-xl pb-5">{character.name}</h2>
        <div className="pl-2">
          <Image
            src={druidpaw}
            alt='druid paw'
            width={50}
            height={50}
          />
        </div>
      </div>
      <div>
        {character.race?.raceName} {character.class?.className}
      </div>
      <div className="flex flex-row justify-between flex-wrap">
        <div>Level {character.level}</div>
        <div>{character.hp} HP</div>
        <div>{character.alignment?.alignment}</div>
      </div>
    </div>
  );
}

export default CharacterCard;