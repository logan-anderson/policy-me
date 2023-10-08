import "./App.css";
import { useAttributes } from "./hooks/attributes";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";

function App() {
  const [attributes, updateAttribute] = useAttributes();
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {ATTRIBUTE_LIST.map((attribute) => {
          console.log({ attribute });
          console.log(attributes);
          return (
            <div key={attribute}>
              {attribute} :{attributes[attribute]}
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
      </section>
    </div>
  );
}

export default App;
