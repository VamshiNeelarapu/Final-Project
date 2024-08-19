import React from "react";
import ProductDisplay from "../ProductDisplay";

const ShopCategory = ({ category }) => {
  return (
    <div>
      <ProductDisplay category={category} />
    </div>
  );
};

export default ShopCategory;
