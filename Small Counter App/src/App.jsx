import React, { useState, useEffect } from "react";

function addItem(counter, setCounter) {
  setCounter(counter + 1);
}

function removeItem(counter, setCounter) {
  setCounter(counter - 1);
}

export default function App() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("Counter changed:", counter);

    document.title = `iPhone - ${counter} items`;
  }, [counter]);

  return (
    <div className="App">

      <img
        src="https://media.karousell.com/media/photos/products/2022/10/28/apple_iphone_14_pro_max_512gb__1666943808_3e7b42f0.jpg"
        alt="iPhone"
        style={{
          width: "100px",
          height: "100px"
        }}
      />
      <h1>iPhone 17</h1>
      <p>Price: ₹99,999</p>
      <h2>Quantity: {counter}</h2>

      <button
        onClick={() => addItem(counter, setCounter)}
      >
        Add
      </button>

      <button
        onClick={() => removeItem(counter, setCounter)}
        disabled={counter === 0}
      >
        Remove
      </button>

    </div>
  );
}
