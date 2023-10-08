import "./App.css";
import { CharacterClass } from "./types";
import { useAttributes } from "./hooks/attributes";
import { classMeetRequirements } from "./lib/classMeetRequirements";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import { useEffect, useState } from "react";
import { StatDisplay } from "./components/statDisplay";
import { calculateAbilityModifier } from "./lib/calculateAbilityModifier";
import { useSkills } from "./hooks/skills";

function App() {
  const [attributes, updateAttribute] = useAttributes();
  const [skills, updateSkill] = useSkills();
  const [error, setError] = useState("");
  const [classList, updateClassList] = useState(
    Object.keys(CLASS_LIST).map((className) => ({
      name: className,
      met: false,
    }))
  );
  const [selectedClass, setSelectedClass] = useState<
    CharacterClass | undefined
  >();

  useEffect(() => {
    // TODO: cloud add a debounce here if preformance becomes an issue
    updateClassList(() => {
      return Object.keys(CLASS_LIST).map((className) => ({
        name: className,
        met: classMeetRequirements(className as CharacterClass, attributes),
      }));
    });
  }, [JSON.stringify(attributes), updateClassList, CLASS_LIST]);

  //Characters have 10 + (4 * Intelligence Modifier) points to spend between skills
  const intelligenceModifier = calculateAbilityModifier(
    attributes.Intelligence
  );
  const totalPointToSpend = Math.max(10 + 4 * intelligenceModifier, 0);
  const totalPointsSpent = Object.values(skills).reduce(
    (prev, current) => prev + current,
    0
  );

  // useEffect to check if we are in the valid state and we can clear the error
  useEffect(() => {
    if (totalPointsSpent <= totalPointToSpend) {
      setError("");
    }
  }, [totalPointsSpent, totalPointToSpend]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          {ATTRIBUTE_LIST.map((attribute) => {
            return (
              <div key={attribute}>
                {attribute} :{attributes[attribute]} (Modifier:{" "}
                {calculateAbilityModifier(attributes[attribute])})
                <button
                  onClick={() => {
                    updateAttribute(attribute, attributes[attribute] + 1);
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    updateAttribute(attribute, attributes[attribute] - 1);
                  }}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <h2>Class</h2>
          <p>
            (Green means the class requirements are met, red means they are not)
          </p>
          {classList.map((currentClass) => {
            return (
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  // Green means the class requirements are met
                  color: currentClass.met ? "green" : "red",
                }}
                onClick={() => {
                  setSelectedClass(currentClass.name as CharacterClass);
                }}
                key={currentClass.name}
              >
                {currentClass.name}
              </button>
            );
          })}
        </div>
        {selectedClass && <StatDisplay playerClass={selectedClass} />}

        <div>
          <h2>Skills</h2>
          <h3>
            {totalPointsSpent}/{totalPointToSpend} points spent
          </h3>
          {error && (
            <div>
              <p style={{ color: "red" }}>
                {error}{" "}
                <span
                  style={{
                    fontSize: "2rem",
                  }}
                  onClick={() => setError("")}
                >
                  x
                </span>
              </p>
            </div>
          )}
          <div>
            {SKILL_LIST.map((skill) => {
              const modifier = attributes[skill.attributeModifier];
              const modifierValue = calculateAbilityModifier(modifier);
              const total = skills[skill.name] + modifierValue;
              return (
                <div key={skill.name}>
                  {skill.name}: {skills[skill.name]} (Modifier:{" "}
                  {skill.attributeModifier})
                  <button
                    onClick={() => {
                      // if we are in an error state we can't increase the skill
                      if (error) {
                        return;
                      }
                      const canUpdate =
                        totalPointsSpent + 1 <= totalPointToSpend;
                      if (canUpdate) {
                        updateSkill(skill.name, skills[skill.name] + 1);
                      } else {
                        setError(
                          "You do not have enough points to spend on skills"
                        );
                      }
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      updateSkill(skill.name, skills[skill.name] - 1);
                    }}
                  >
                    -
                  </button>
                  <span>total: {total}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
