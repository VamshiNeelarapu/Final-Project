import React from "react";
import "./Item.css";

const Item = (props) => {
  return (
    <div className="item">
      <img src={props.image} alt="Image" />
      <p>{props.title}</p>
      <p>{props.description}</p>
      <div className="item-prices">
        {/* <p>MRP: ${props.MRP}</p> */}
        {/* <p>Discount: {props.Discount}%</p> */}
        {/* <p>Price: ${props.Price}</p> */}
      </div>
    </div>
  );
};

export default Item;
