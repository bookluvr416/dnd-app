import CharacterList from "@/components/characters/CharacterList";
import Image from "next/image";
import femaleCleric from "@/assets/female-cleric.png";
import elf from "@/assets/archer-elf.png";
import cleric from "@/assets/male-cleric.png";
import paladin from "@/assets/male-paladin.png";
import Link from "next/link";

export default function CharactersPage() {
  return (
    <div className="bg-blue-950/80 p-8 md:p-20 rounded-3xl max-w-5xl m-auto">
      <h1 className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl text-center font-quintessential items-center mb-6 md:mb-12 p-4 sm:p-6 text-2xl sm:text-4xl text-fuchsia-200">
        Characters
      </h1>
      <div className="flex flex-row gap-2 sm:gap-4 pb-5 justify-between items-center">
        <Image
          src={femaleCleric}
          alt="female human cleric"
          width={100}
          height={100}
          className="size-20 md:size-24 lg:size-28"
        />
        <Image
          src={paladin}
          alt="male paladin"
          width={100}
          height={100}
          className="hidden md:block md:size-24 lg:size-28"
        />
        <Link
          href="/characters/create"
          className="rounded-lg p-4 mb-7 bg-violet-900 hover:bg-violet-800">
          Create Character
        </Link>
        <Image
          src={elf}
          alt="female elf archer"
          width={100}
          height={100}
          className="hidden md:block md:size-24 lg:size-28"
        />
        <Image
          src={cleric}
          alt="male human cleric"
          width={100}
          height={100}
          className="size-20 md:size-24 lg:size-28"
        />
      </div>
      <CharacterList />
    </div>
  );
}
