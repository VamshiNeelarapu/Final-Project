import React, { useState } from "react";
import "./Side.css";

function Side({
  categoryHandler,
  setCat,
  value,
  setLowPrice,
  setHighPrice,
  priceHandler,
  loadProducts,
}) {
  const [style, setStyle] = useState("light");

  const changeStyle = () => {
    console.log("you just clicked");
    if (style !== "light") setStyle("light");
    else setStyle("dark");
  };
  return (
    <div>
      <div style={{ marginTop: "40px" }}></div>
      <div className="Cat categories">
        <h5>Categories</h5>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="Cate"
            onClick={() => {
              loadProducts();
            }}
          />
          <span className="checkmark"></span>
          No Filter
        </label>

        <label className="sidebar-label-container">
          <input
            type="radio"
            name="Cate"
            onClick={() => {
              setCat("men");
              categoryHandler();

              changeStyle();
            }}
          />
          <span className="checkmark"></span>
          Men
        </label>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="Cate"
            onClick={() => {
              setCat("women");
              categoryHandler();

              changeStyle();
            }}
          />
          <span className="checkmark"></span>
          Women
        </label>
      </div>
      <div className="Cat price">
        <h5>Price</h5>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="Cate"
            onClick={() => {
              setLowPrice(0);
              setHighPrice(2000);
              priceHandler();
            }}
          />
          <span className="checkmark"></span>
          ₹0 - ₹2000
        </label>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="Cate"
            onClick={() => {
              setLowPrice(2000);
              setHighPrice(4000);
              priceHandler();
            }}
          />
          <span className="checkmark"></span>
          ₹2000 - ₹4000
        </label>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="Cate"
            onClick={() => {
              setLowPrice(4000);
              setHighPrice(6000);
              priceHandler();
            }}
          />
          <span className="checkmark"></span>
          ₹4000 - ₹6000
        </label>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="Cate"
            onClick={() => {
              setLowPrice(6000);
              setHighPrice(2000000);
              priceHandler();
            }}
          />
          <span className="checkmark"></span>
          ₹6000 +
        </label>
      </div>
    </div>
  );
}

export default Side;
