import "./productCard.css";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function Card({ loadProducts, data }) {
  useEffect(() => {
    loadProducts();
    console.log("yes");
  }, []);

  // const user = "Vamshi";
  const [wishItem, setWishItem] = useState([]);
  const [cart, setCart] = useState([]);
  const [test, setTest] = useState();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [name, setname] = useState([user.name]);

  const addToCart = (item) => {
    let flag = false;
    cart.forEach((response) => {
      if (response.id == item.id) flag = true;
    });
    if (flag) return;

    //   setCart([...cart, item]);

    //   return axios.post(
    //     "http://localhost:9000/users?user_id=Vamshi/cartList",
    //     item
    //   );
  };

  const addToWishList = async (user, item) => {
    return axios
      .get("http://localhost:9000/users")
      .then((res) => {
        let temp = [];
        if (res.user_id == user) {
          temp = res.wishList.push(item);
          axios.post(`http://localhost:9000/users?user_id=Vamshi`, {
            user_id: "Krishna",
            wishList: temp,
          });
        }
      })
      .catch((err) => console.log(err));

    // test.map();

    // let flag = false;
    // wishItem.forEach((response) => {
    //   if (response.id == item.id) flag = true;
    // });
    // if (flag) return;

    // setWishItem([...wishItem, item]);
    // axios.put("http://localhost:9000/users/?user_id=Vamshi", {
    //   user_id: "Vamshi",
    //   password: "12345",
    //   wishList: [item],
    //   cartList: [],
    // });
  };

  const onAddCartlist = (product) => {
    console.log(name);
    let flag = false;

    if (name != "") {
      console.log("VALID");

      axios.get(`http://localhost:9000/users?name=${name}`).then((user) => {
        user.data[0].cart.forEach((item) => {
          if (item.id === product.id) {
            flag = true;
            return;
          }
        });

        if (flag === false) {
          user.data[0].cart.push(product);

          axios
            .put(`http://localhost:9000/users/${user.data[0].id}`, user.data[0])
            .then(console.log(user.data[0].cart), alert("Added to Cart"));
        } else {
          alert("Already Added");
        }
      });
    }
  };

  const onAddWishlist = (product) => {
    console.log(name);
    let flag = false;

    if (name != "") {
      console.log("VALID");

      axios.get(`http://localhost:9000/users?name=${name}`).then((user) => {
        user.data[0].wishlist.forEach((item) => {
          if (item.id === product.id) {
            flag = true;
            return;
          }
        });

        if (flag === false) {
          user.data[0].wishlist.push(product);

          axios
            .put(`http://localhost:9000/users/${user.data[0].id}`, user.data[0])
            .then(
              console.log(user.data[0].wishlist),
              alert("Wishlisted Successfully!")
            );
        } else {
          alert("Already Added");
        }
      });
    }
  };

  return (
    <div className="card-container">
      {data.length === 0 ? (
        <h2>Search results not found...</h2>
      ) : (
        data.map((item, index) => {
          return (
            <div key={index} className="card proCard">
              <img className="proImage" src={item.image} alt="Product Image" />
              <div className="rating">
                <FaStar className="activeStar" />
                <FaStar className="activeStar" />
                <FaStar className="activeStar" />
                <FaStar className="activeStar" />
                <FaStar className="inactiveStar" />
              </div>
              <p className="proCompany">{item.Company}</p>
              <p className="proTitle">{item.title}</p>
              <div className="proPrice">
                <sup>₹ </sup>
                {item.Price} <s className="MRP">₹{item.MRP}</s>
              </div>
              <button className="cart" onClick={() => onAddCartlist(item)}>
                <FaShoppingCart />
              </button>
              <button className="wish" onClick={() => onAddWishlist(item)}>
                <FaHeart />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Card;
