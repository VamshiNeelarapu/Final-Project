import Card from "./Components/card/productCard";
import Company from "./Components/company/Company";
import Search from "./Components/search/Search";
import Side from "./Components/side-bar/Side";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Wish from "./Pages/Wish";

function ProductDisplay({ category }) {
  const [data, setProduct] = useState([]);
  const [value, setValue] = useState("");
  const [val, setCat] = useState("");
  const [com, setCompany] = useState("");
  const [lpr, setLowPrice] = useState(0);
  const [hpr, setHighPrice] = useState(0);
  const [wish, setWish] = useState(null);
  const [wishItem, setWishItems] = useState([]);

  const loadProducts = async () => {
    return axios
      .get("http://localhost:9000/products")
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };
  const loadWishList = async () => {
    return axios
      .get("http://localhost:9000/wishList")
      .then((res) => setProduct(res.wishItem))
      .catch((err) => console.log(err));
  };
  // console.log("data", data);
  //-----------------------------------------------------Search--------------------------------------------//
  const searchHandler = async (e) => {
    e.preventDefault();
    console.log("VALUE: ", value);

    return await axios
      .get(`http://localhost:9000/products`)
      .then((res) => {
        let temp = [];
        res.data.map((resItem) => {
          let x = "";
          x = x + resItem.Description;
          // console.log(x);

          if (x.toLocaleLowerCase().includes(value)) temp.push(resItem);
        });
        setProduct(temp);
        setValue("");
      })
      .catch((err) => console.log(err));
  };
  //---------------------------------------------- Category--------------------------------------------------//
  const categoryHandler = async (e) => {
    // e.preventDefault();
    // console.log("VALUE: ", val);

    return axios
      .get(`http://localhost:9000/products`)
      .then((res) => {
        let temp = [];
        res.data.map((resItem) => {
          if (resItem.Category == val) temp.push(resItem);
        });
        setProduct(temp);
      })
      .catch((err) => console.log(err));
  };

  //---------------------------------------------- Company--------------------------------------------------//
  const companyHandler = async (e) => {
    // e.preventDefault();
    // console.log("VALUE: ", com);

    return axios
      .get(`http://localhost:9000/products`)
      .then((res) => {
        let temp = [];
        res.data.map((resItem) => {
          let x = "";
          x = x + resItem.Company;
          // console.log(x);

          if (x.toLocaleLowerCase() == com) temp.push(resItem);
        });
        setProduct(temp);
      })
      .catch((err) => console.log(err));
  };

  //---------------------------------------------- Price --------------------------------------------------//
  const priceHandler = async (e) => {
    // e.preventDefault();
    // console.log("VALUE: ", com);

    return axios
      .get(`http://localhost:9000/products`)
      .then((res) => {
        let temp = [];
        res.data.map((resItem) => {
          // console.log(x);
          // console.log(lpr);
          // console.log(hpr);

          if (resItem.Price >= lpr && resItem.Price <= hpr) {
            temp.push(resItem);
          }
        });
        setProduct(temp);
      })
      .catch((err) => console.log(err));
  };
  //------------------------------------------- Add to Wish List ----------------------------------//
  // const addToWishList = async (e) => {
  //   return axios.get(`http://localhost:9000/products`).then((res) => {
  //     let temp = [];
  //     res.data.map((resItem) => {
  //       if (resItem.id == wish) {
  //         temp.push(resItem);
  //       }
  //     });
  //     setWishItems(temp);
  //   });
  // };

  //------------------------------------------ Add to Cart -----------------------------------------//

  //------------------------------------------------------------------------------------------------//

  return (
    <div className="App">
      <div className="row">
        <div className="col-lg-3 col-sm-12 col-3">
          <Side
            categoryHandler={categoryHandler}
            setCat={setCat}
            value={val}
            priceHandler={priceHandler}
            setLowPrice={setLowPrice}
            setHighPrice={setHighPrice}
            lpr={lpr}
            hpr={hpr}
            loadProducts={loadProducts}
          />
        </div>
        <div className="col-lg-9 col-sm-12 col-9 ">
          <Search
            searchHandler={searchHandler}
            setValue={setValue}
            value={value}
          />
          <Company
            companyHandler={companyHandler}
            setCompany={setCompany}
            com={com}
            loadProducts={loadProducts}
          />
          <Card
            loadProducts={loadProducts}
            setProduct={setProduct}
            data={data}
            // addToWishList={addToWishList}
          />
        </div>
      </div>
      {/* <Wish setWishItems={setWishItems} /> */}
      {/* <Wish loadWishList={loadWishList} wishItem={wishItem} /> */}

      {/* <Wish /> */}
    </div>
  );
}

export default ProductDisplay;
