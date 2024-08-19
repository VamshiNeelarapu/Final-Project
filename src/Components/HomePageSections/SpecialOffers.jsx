import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Trending.module.css";
import fire from "./giphy.gif";
import AuthContext from "../../Context/AuthContext";

const SpecialOffers = () => {
  // const [productarray, setproductarray] = useState([]);
  const [specialarray, setspecialarray] = useState([]);
  const [error, seterror] = useState("");
  const [cart, setCart] = useState([]);
  const [wish, setWishlist] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [name, setname] = useState([user.name]);

  console.log("Special JS");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/special`)
      .then((products) => {
        setspecialarray(products.data);
      })
      .catch((error) => seterror(error.message));
    console.log("special");
  }, []);
  const addToCart = (product) => {
    setCart([...cart, product]);
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

  return (
    <div>
      <div id={styles["trend_head"]}>
        <h1 style={{ fontFamily: "serif", fontWeight: "bolder" }}>
          <img id={styles["trend_img"]} src={fire} /> Special Offers
        </h1>
        <h5>Exclusive Deals Just for You</h5>
      </div>

      <div className={styles["container"]}>
        {specialarray.map((post) => {
          const { title, MRP, image, Price, id, Company } = post;
          return (
            <Card
              id={styles["trend"]}
              style={{ width: "18rem", margin: "10px" }}
              key={post.id}
            >
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {Company}
                  <br></br>
                  <sup>₹ </sup>
                  {Price} <s className={styles["MRP"]}>₹{MRP}</s>
                </Card.Text>
                {/* <Button>Add To Cart</Button> */}
                <div className="button">
                  <Button
                    id="buttons"
                    variant="primary"
                    onClick={() => {
                      onAddCartlist(post);
                    }}
                    style={{ width: "200px", margin: "10px" }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    id="buttons"
                    onClick={() => onAddWishlist(post)}
                    variant="primary"
                    style={{ width: "200px" }}
                  >
                    Add to wishlist
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialOffers;
