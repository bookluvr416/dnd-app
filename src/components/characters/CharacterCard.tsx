import { Character } from '@/generated/graphql/graphql';
import Image, { StaticImageData } from 'next/image';
import artificerIcon from '@/assets/Artificer-icon.webp';
import barbarianIcon from '@/assets/Barbarian-icon.webp';
import bardIcon from '@/assets/Bard-icon.webp';
import clericIcon from '@/assets/Cleric-icon.webp';
import druidIcon from '@/assets/Druid-icon.webp';
import fighterIcon from '@/assets/Fighter-icon.webp';
import monkIcon from '@/assets/Monk-icon.webp';
import paladinIcon from '@/assets/Paladin-icon.webp';
import rangerIcon from '@/assets/Ranger-icon.webp';
import rogueIcon from '@/assets/Rogue-icon.webp';
import sorcererIcon from '@/assets/Sorcerer-icon.webp';
import warlockIcon from '@/assets/Warlock-icon.webp';
import wizardIcon from '@/assets/Wizard-icon.webp';
import dragonborn from '@/assets/female_dragonborn.webp';

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  let iconImage: StaticImageData | null = null;
  let iconAlt = character.class?.className ?? '';

  switch (character.class?.className?.toUpperCase()) {
    case 'ARTIFICER':
      iconImage = artificerIcon;
      break;
    case 'BARBARIAN':
      iconImage = barbarianIcon;
      break;
    case 'BARD':
      iconImage = bardIcon;
      break;
    case 'CLERIC':
      iconImage = clericIcon;
      break;
    case 'DRUID':
      iconImage = druidIcon;
      break;
    case 'FIGHTER':
      iconImage = fighterIcon;
      break;
    case 'MONK':
      iconImage = monkIcon;
      break;
    case 'PALADIN':
      iconImage = paladinIcon;
      break;
    case 'RANGER':
      iconImage = rangerIcon;
      break;
    case 'ROGUE':
      iconImage = rogueIcon;
      break;
    case 'SORCERER':
      iconImage = sorcererIcon;
      break;
    case 'WARLOCK':
      iconImage = warlockIcon;
      break;
    case 'WIZARD':
      iconImage = wizardIcon;
      break;
    default: break;
  }

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
        {iconImage && (
          <div className="pl-2">
            <Image
              src={iconImage}
              alt={iconAlt}
              width={50}
              height={50}
            />
          </div>
        )}
        
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