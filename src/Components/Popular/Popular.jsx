import React, { useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import axios from "axios";
import { useEffect } from "react";

const Popular = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      let response = await axios.get("http://localhost:9000/popular");
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <div className="popular">
      <h1>Popular in Fashion</h1>
      <hr />
      <div className="popularItem">
        {products.map((item, index) => {
          return (
            <Item
              key={index}
              image={item.image}
              title={item.title}
              MRP={item.MRP}
              Price={item.Price}
              Discount={item.Discount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
