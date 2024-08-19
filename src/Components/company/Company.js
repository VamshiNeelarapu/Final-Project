import React, { useEffect } from "react";
import "./Company.css";

function Company({ companyHandler, setCompany, com, loadProducts }) {
  useEffect(() => {
    loadProducts();
    setCompany();
    companyHandler();
  }, []);
  return (
    <div className="company">
      <button
        value="men"
        onClick={(e) => {
          loadProducts();
        }}
        className="comp"
      >
        All Products
      </button>
      <button
        value="zara"
        onClick={(e) => {
          setCompany(e.target.value);
          companyHandler(e);
        }}
        className="comp"
      >
        Zara
      </button>
      <button
        value="h&m"
        onClick={(e) => {
          setCompany(e.target.value);
          companyHandler(e);
        }}
        className="comp"
      >
        H&M
      </button>
      <button
        value="levis"
        onClick={(e) => {
          setCompany(e.target.value);
          companyHandler(e);
        }}
        className="comp"
      >
        Levis
      </button>
      <button
        value="adidas"
        onClick={(e) => {
          setCompany(e.target.value);
          companyHandler(e);
        }}
        className="comp"
      >
        Adidas
      </button>
    </div>
  );
}

export default Company;
