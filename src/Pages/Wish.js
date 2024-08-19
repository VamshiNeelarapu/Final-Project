import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Wish.css";
// import WishlistEmpty from "./WishlistEmpty";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import WTitle from "../Components/HomePageSections/wish2 1.webp";
import WishlistEmpty from "./WishlistEmpty";

function Wish() {
  const [productarray, setproductarray] = useState([]);
  const [error, seterror] = useState("");
  const { isAuthenticated, user } = useContext(AuthContext);

  const [name, setname] = useState([user.name]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/users?name=${name}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setproductarray(res.data[0].wishlist);
        }
      })
      .catch((error) => seterror(error.message));
  }, [productarray]);

  // const deleteFromWishlist = (id) => {
  //   axios
  //     .delete(`http://localhost:7000/wish/${id}`)
  //     .then(() => {
  //       setproductarray(productarray.filter((item) => item.id !== id));
  //     })
  //     .catch((error) => console.log(error));
  // };
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
  const onDeleteWishlist = (product) => {
    console.log("Name:", name);
    console.log("Product to delete:", product);

    if (name !== "") {
      console.log("VALID");

      axios
        .get(`http://localhost:9000/users?name=${name}`)
        .then((response) => {
          const user = response.data[0];
          console.log("User data:", user);

          const wishlist = user.wishlist;
          console.log("Wishlist:", wishlist);

          // Log each item's id in the wishlist
          wishlist.forEach((item) => {
            console.log("Wishlist item id:", item.id);
          });

          // Log the product id to be deleted
          console.log("Product id to delete:", product.id);

          const index = wishlist.findIndex((item) => item.id === product.id);
          console.log("Index found:", index);

          if (index !== -1) {
            wishlist.splice(index, 1);
            console.log("Updated wishlist:", wishlist);

            axios
              .put(`http://localhost:9000/users/${user.id}`, user)
              .then(() => {
                console.log("Wishlist after update:", user.wishlist);
              })
              .catch((error) => {
                console.error("Error updating wishlist:", error);
                alert("Error updating wishlist");
              });
          } else {
            alert("No item!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("Error fetching user data");
        });
    }
  };

  return (
    <div>
      <div className="title">
        {/* <p>My Wishlist</p> */}
        <img className="wishtitle" src={WTitle} alt="Wishlist Title" />
      </div>
      <div className="wishlist-container">
        {productarray.length === 0 ? (
          //   <WishlistEmpty />
          // <h1>List Empty</h1>
          <WishlistEmpty />
        ) : (
          productarray.map((post) => {
            const { title, MRP, image, Price, id, Company } = post;
            return (
              <Card
                id="wishcard"
                style={{ width: "18rem", margin: "10px" }}
                key={post.id}
              >
                <Card.Img variant="top" src={image} />
                <Card.Body>
                  <Card.Title className="wish-title">{title}</Card.Title>
                  <Card.Text>
                    {Company}
                    <br></br>
                    <sup>₹ </sup>
                    {Price} <s className="MRP">₹{MRP}</s>
                  </Card.Text>
                  {/* <Button id="wish-btn" onClick={() => onAddWishlist(post)}>
                    Add To Cart
                  </Button> */}
                  <Button id="wish-btn" onClick={() => onDeleteWishlist(post)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Wish;

// import "./Wish.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaHeart } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";

// function Card({ loadWishList, wishItem }) {
//   useEffect(() => {
//     loadWishList();
//     console.log("wish");
//   }, []);
//   // const [wishItem, setWishItem] = useState([]);

//   return (
//     <div className="card-container">
//       {wishItem.map((item, index) => {
//         // console.log("DIRNAME: ", __dirname + `/src`);

//         // console.log("IMAGE: ", item.image);

//         return (
//           <div key={index} className="card proCard">
//             <img className="proImage" src={item.image} alt="Product Image" />
//             <div className="rating">
//               <FaStar className="activeStar" />
//               <FaStar className="activeStar" />
//               <FaStar className="activeStar" />
//               <FaStar className="activeStar" />
//               <FaStar className="inactiveStar" />
//             </div>
//             <p className="proCompany">{item.Company}</p>
//             <p className="proTitle">{item.title}</p>
//             <div className="proPrice">
//               <sup>₹ </sup>
//               {item.Price} <s className="MRP">₹{item.MRP}</s>
//             </div>
//             <button className="cart">
//               <FaShoppingCart />
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Card;
