import { CLASS_LIST } from "../consts";
import { CharacterClass } from "../types";

export const StatDisplay = ({
  playerClass,
  close,
}: {
  playerClass: CharacterClass;
  close: () => void;
}) => {
  const requiredStats = CLASS_LIST[playerClass];
  return (
    <div>
      <h2>
        Minimum Required Statistics for {playerClass}{" "}
        <span
          onClick={close}
          style={{
            cursor: "pointer",
            color: "red",
            fontSize: "1.5em",
          }}
        >
          X
        </span>
      </h2>
      <div></div>
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
