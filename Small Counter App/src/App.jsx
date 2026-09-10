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
        src="https://www.machines.com.my/cdn/shop/files/iPhone_17_Pro_Max_Cosmic_Orange_PDP_Image_Position_1_Cosmic_Orange_Colour__MY-EN_1024x1024.jpg?v=1757944834"
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
