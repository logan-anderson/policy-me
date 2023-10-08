import "./App.css";
import { CharacterClass } from "./types";
import { useAttributes } from "./hooks/attributes";
import { classMeetRequirements } from "./lib/classMeetRequirements";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import { useEffect, useState } from "react";
import { StatDisplay } from "./components/statDisplay";
import { calculateAbilityModifier } from "./lib/calculateAbilityModifier";

function App() {
  const [attributes, updateAttribute] = useAttributes();
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
      </section>
    </div>
  );
}

export default App;
