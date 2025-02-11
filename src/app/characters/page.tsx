import CharacterList from "@/components/characters/CharacterList";

export default function CharactersPage() {
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <div className="bg-blue-950/80 p-8 md:p-20 rounded-3xl max-w-7xl m-auto">
          <h1 className="bg-gradient-to-r from-cyan-700/50 to-violet-800/50 rounded-xl font-quintessential text-center mb-6 md:mb-12 p-4 sm:p-6 text-2xl sm:text-4xl text-fuchsia-200">
            Characters
          </h1>
          <CharacterList />
        </div>
      </div>
    </main>
  );
}
