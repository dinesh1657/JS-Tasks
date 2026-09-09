import react from "react";

function addItem(Counter, setCounter) {
  setCounter(Counter + 1);
}

function removeItem(Counter, setCounter) {
  setCounter(Counter - 1);
}

export default function App() {
  const [Counter, setCounter] = react.useState(0);

  return (
    <div className="App">
      <img src="https://media.karousell.com/media/photos/products/2022/10/28/apple_iphone_14_pro_max_512gb__1666943808_3e7b42f0.jpg" alt="Apple Logo" style={{ width: "100px", height: "100px" }} />
      <h1>Iphone 14 Plus</h1>
      <p>Price: 69,999 Rs</p>
      <h2>{Counter}</h2>
      <button onClick={() => addItem(Counter, setCounter)}>Add</button>
      <button onClick={() => removeItem(Counter, setCounter)} disabled={Counter === 0}>
        Remove
      </button>
    </div>
  );
}                                                          
