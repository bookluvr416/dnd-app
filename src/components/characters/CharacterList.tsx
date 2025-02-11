'use client'

import { useState } from "react";

import { Character } from "@/generated/graphql";
import CharacterCard from "./CharacterCard";
import CharacterFilters from "./CharacterFilters";

const characters: Character[] = [
      {
        "id": 1,
        "name": "Character ABC",
        "level": 5,
        "hp": 21,
        "initiative": 2,
        "proficiencyBonus": 1,
        "speed": 30,
        "alignment": {
          "id": 2,
          "alignment": "Neutral Good"
        },
        "race": {
          "id": 1,
          "raceName": "Dragonborn",
          "raceType": "Dragonborn"
        },
        "class": {
          "id": 2,
          "className": "Bard"
        },
        "skills": [
          {
            "skill": {
              "id": 1,
              "skill": "Acrobatics"
            },
            "id": 1,
            "skillProficiency": 4
          },
          {
            "skill": {
              "id": 2,
              "skill": "Animal Handling"
            },
            "id": 2,
            "skillProficiency": 7
          },
          {
            "skill": {
              "id": 3,
              "skill": "Arcana"
            },
            "id": 3,
            "skillProficiency": 2
          },
          {
            "skill": {
              "id": 4,
              "skill": "Athletics"
            },
            "id": 4,
            "skillProficiency": 10
          },
          {
            "skill": {
              "id": 5,
              "skill": "Deception"
            },
            "id": 5,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 6,
              "skill": "History"
            },
            "id": 6,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 7,
              "skill": "Insight"
            },
            "id": 7,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 8,
              "skill": "Intimidation"
            },
            "id": 8,
            "skillProficiency": 7
          },
          {
            "skill": {
              "id": 9,
              "skill": "Investigation"
            },
            "id": 9,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 10,
              "skill": "Medicine"
            },
            "id": 10,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 11,
              "skill": "Nature"
            },
            "id": 11,
            "skillProficiency": 3
          },
          {
            "skill": {
              "id": 12,
              "skill": "Perception"
            },
            "id": 12,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 13,
              "skill": "Performance"
            },
            "id": 13,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 14,
              "skill": "Persuasion"
            },
            "id": 14,
            "skillProficiency": 1
          },
          {
            "skill": {
              "id": 15,
              "skill": "Religion"
            },
            "id": 15,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 16,
              "skill": "Sleight of Hand"
            },
            "id": 16,
            "skillProficiency": 2
          },
          {
            "skill": {
              "id": 17,
              "skill": "Stealth"
            },
            "id": 17,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 18,
              "skill": "Survival"
            },
            "id": 18,
            "skillProficiency": null
          }
        ],
        "abilities": [
          {
            "id": 1,
            "abilityScore": 13,
            "proficiencyBonus": 2,
            "ability": {
              "id": 1,
              "ability": "Strength"
            }
          },
          {
            "id": 2,
            "abilityScore": 10,
            "proficiencyBonus": 5,
            "ability": {
              "id": 2,
              "ability": "Dexterity"
            }
          },
          {
            "id": 3,
            "abilityScore": 15,
            "proficiencyBonus": null,
            "ability": {
              "id": 3,
              "ability": "Constitution"
            }
          },
          {
            "id": 4,
            "abilityScore": 16,
            "proficiencyBonus": null,
            "ability": {
              "id": 4,
              "ability": "Intelligence"
            }
          },
          {
            "id": 5,
            "abilityScore": 17,
            "proficiencyBonus": null,
            "ability": {
              "id": 5,
              "ability": "Wisdom"
            }
          },
          {
            "id": 6,
            "abilityScore": 18,
            "proficiencyBonus": null,
            "ability": {
              "id": 6,
              "ability": "Charisma"
            }
          }
        ]
      },
      {
        "id": 2,
        "name": "Character Test",
        "level": 8,
        "hp": 30,
        "initiative": 2,
        "proficiencyBonus": 1,
        "speed": 30,
        "alignment": {
          "id": 5,
          "alignment": "True Neutral"
        },
        "race": {
          "id": 2,
          "raceName": "Hill Dwarf",
          "raceType": "Dwarf"
        },
        "class": {
          "id": 4,
          "className": "Druid"
        },
        "skills": [
          {
            "skill": {
              "id": 1,
              "skill": "Acrobatics"
            },
            "id": 19,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 2,
              "skill": "Animal Handling"
            },
            "id": 20,
            "skillProficiency": 10
          },
          {
            "skill": {
              "id": 3,
              "skill": "Arcana"
            },
            "id": 21,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 4,
              "skill": "Athletics"
            },
            "id": 22,
            "skillProficiency": 5
          },
          {
            "skill": {
              "id": 5,
              "skill": "Deception"
            },
            "id": 23,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 6,
              "skill": "History"
            },
            "id": 24,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 7,
              "skill": "Insight"
            },
            "id": 25,
            "skillProficiency": 3
          },
          {
            "skill": {
              "id": 8,
              "skill": "Intimidation"
            },
            "id": 26,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 9,
              "skill": "Investigation"
            },
            "id": 27,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 10,
              "skill": "Medicine"
            },
            "id": 28,
            "skillProficiency": 7
          },
          {
            "skill": {
              "id": 11,
              "skill": "Nature"
            },
            "id": 29,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 12,
              "skill": "Perception"
            },
            "id": 30,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 13,
              "skill": "Performance"
            },
            "id": 31,
            "skillProficiency": 1
          },
          {
            "skill": {
              "id": 14,
              "skill": "Persuasion"
            },
            "id": 32,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 15,
              "skill": "Religion"
            },
            "id": 33,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 16,
              "skill": "Sleight of Hand"
            },
            "id": 34,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 17,
              "skill": "Stealth"
            },
            "id": 35,
            "skillProficiency": 1
          },
          {
            "skill": {
              "id": 18,
              "skill": "Survival"
            },
            "id": 36,
            "skillProficiency": null
          }
        ],
        "abilities": [
          {
            "id": 7,
            "abilityScore": 19,
            "proficiencyBonus": null,
            "ability": {
              "id": 1,
              "ability": "Strength"
            }
          },
          {
            "id": 8,
            "abilityScore": 14,
            "proficiencyBonus": -1,
            "ability": {
              "id": 2,
              "ability": "Dexterity"
            }
          },
          {
            "id": 9,
            "abilityScore": 8,
            "proficiencyBonus": null,
            "ability": {
              "id": 3,
              "ability": "Constitution"
            }
          },
          {
            "id": 10,
            "abilityScore": 9,
            "proficiencyBonus": null,
            "ability": {
              "id": 4,
              "ability": "Intelligence"
            }
          },
          {
            "id": 11,
            "abilityScore": 18,
            "proficiencyBonus": -3,
            "ability": {
              "id": 5,
              "ability": "Wisdom"
            }
          },
          {
            "id": 12,
            "abilityScore": 5,
            "proficiencyBonus": null,
            "ability": {
              "id": 6,
              "ability": "Charisma"
            }
          }
        ]
      },
      {
        "id": 3,
        "name": "Character Three",
        "level": 6,
        "hp": 28,
        "initiative": 2,
        "proficiencyBonus": 1,
        "speed": 30,
        "alignment": {
          "id": 7,
          "alignment": "Lawful Evil"
        },
        "race": {
          "id": 3,
          "raceName": "Mountain Dwarf",
          "raceType": "Dwarf"
        },
        "class": {
          "id": 4,
          "className": "Druid"
        },
        "skills": [
          {
            "skill": {
              "id": 1,
              "skill": "Acrobatics"
            },
            "id": 37,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 2,
              "skill": "Animal Handling"
            },
            "id": 38,
            "skillProficiency": 1
          },
          {
            "skill": {
              "id": 3,
              "skill": "Arcana"
            },
            "id": 39,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 4,
              "skill": "Athletics"
            },
            "id": 40,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 5,
              "skill": "Deception"
            },
            "id": 41,
            "skillProficiency": 2
          },
          {
            "skill": {
              "id": 6,
              "skill": "History"
            },
            "id": 42,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 7,
              "skill": "Insight"
            },
            "id": 43,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 8,
              "skill": "Intimidation"
            },
            "id": 44,
            "skillProficiency": 3
          },
          {
            "skill": {
              "id": 9,
              "skill": "Investigation"
            },
            "id": 45,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 10,
              "skill": "Medicine"
            },
            "id": 46,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 11,
              "skill": "Nature"
            },
            "id": 47,
            "skillProficiency": 5
          },
          {
            "skill": {
              "id": 12,
              "skill": "Perception"
            },
            "id": 48,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 13,
              "skill": "Performance"
            },
            "id": 49,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 14,
              "skill": "Persuasion"
            },
            "id": 50,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 15,
              "skill": "Religion"
            },
            "id": 51,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 16,
              "skill": "Sleight of Hand"
            },
            "id": 52,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 17,
              "skill": "Stealth"
            },
            "id": 53,
            "skillProficiency": null
          },
          {
            "skill": {
              "id": 18,
              "skill": "Survival"
            },
            "id": 54,
            "skillProficiency": null
          }
        ],
        "abilities": [
          {
            "id": 13,
            "abilityScore": 16,
            "proficiencyBonus": null,
            "ability": {
              "id": 1,
              "ability": "Strength"
            }
          },
          {
            "id": 14,
            "abilityScore": 15,
            "proficiencyBonus": null,
            "ability": {
              "id": 2,
              "ability": "Dexterity"
            }
          },
          {
            "id": 15,
            "abilityScore": 14,
            "proficiencyBonus": 4,
            "ability": {
              "id": 3,
              "ability": "Constitution"
            }
          },
          {
            "id": 16,
            "abilityScore": 15,
            "proficiencyBonus": null,
            "ability": {
              "id": 4,
              "ability": "Intelligence"
            }
          },
          {
            "id": 17,
            "abilityScore": 18,
            "proficiencyBonus": 2,
            "ability": {
              "id": 5,
              "ability": "Wisdom"
            }
          },
          {
            "id": 18,
            "abilityScore": 16,
            "proficiencyBonus": null,
            "ability": {
              "id": 6,
              "ability": "Charisma"
            }
          }
        ]
      }
    ];

const CharacterList = () => {
  const [filteredResults, setFilteredResults] = useState<Character[]>(characters);

  const handleFilterChange = (filteredCharacters: Character[]) => {
    setFilteredResults(filteredCharacters);
  }

  return (
    <>
      <div>
        <CharacterFilters 
          characters={characters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-7">
        {filteredResults.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </div>
    </>
  );
}

export default CharacterList;
