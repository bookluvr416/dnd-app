import DiceRoller from "@/components/diceroller/DiceRoller";


export default function DiceRollerPage() {
  return (
    <main className="">
      <h1 className="font-quintessential text-center pb-6 pt-10 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-fuchsia-200">
        Dice Roller
      </h1>
      <DiceRoller />
    </main>
  );
}
