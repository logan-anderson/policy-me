import "./App.css";
import { useAttributes } from "./hooks/attributes";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

function App() {
  const [attributes, updateAttribute] = useAttributes();
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {ATTRIBUTE_LIST.map((attribute) => {
          return (
            <div key={attribute}>
              {attribute}:
              <input
                type="number"
                value={attributes[attribute]}
                onChange={(e) => updateAttribute(attribute, e.target.value)}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
