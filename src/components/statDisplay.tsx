import { CLASS_LIST } from "../consts";
import { CharacterClass } from "../types";

export const StatDisplay = ({
  playerClass,
}: {
  playerClass: CharacterClass;
}) => {
  const requiredStats = CLASS_LIST[playerClass];
  return (
    <div>
      <h2>Minimum Required Statistics for {playerClass}</h2>
      <div>
        {Object.entries(requiredStats).map(([stat, value]) => {
          return (
            <div key={stat}>
              {stat} : {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
