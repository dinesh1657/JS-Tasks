import "./App.css";

function Parent() {
  return (
    <div>
      <h1>Parent Component</h1>

      <Child
        name="Dinesh"
        age={22}
        course="B.Sc Computer Science"
      />
    </div>
  );
}

function Child(props) {
  return (
    <div>
      <h2>Child Component</h2>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Course: {props.course}</p>
    </div>
  );
}

function App() {
  return <Parent />;
}

export default App;