import react from 'react';

function incrementCounter(counter, setCounter) {
  setCounter(counter + 1);
}

function decrementCounter(counter, setCounter) {
  setCounter(counter - 1);
}

export default function App() {
  const [counter, setCounter] = react.useState(0);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => incrementCounter(counter, setCounter)} disabled={counter >= 10}>Increment</button>
      <button onClick={() => decrementCounter(counter, setCounter)} disabled={counter <= 0} >Decrement</button>
    </div >
  );
}

