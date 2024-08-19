import React, { useEffect, useState, useContext } from "react";
import CartItem from "./CartItem";
import styles from "./CartPage.module.css";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/users?name=${name}`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data[0].cart || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
    totalPrice(); // Calculate total price when component mounts
  }, [name]);

  const updateQuantity = async (id) => {
    try {
      const res = await axios.get(`http://localhost:9000/users?name=${name}`);
      const userData = res.data[0];

      const updatedCart = userData.cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      const updatedUserData = { ...userData, cart: updatedCart };

      await axios.put(
        `http://localhost:9000/users/${userData.id}`,
        updatedUserData
      );

      setProducts(updatedCart);
      totalPrice(); // Calculate total price after updating quantity

      console.log(updatedCart);
      // alert("Added to Cart");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const downQuantity = async (id) => {
    try {
      const res = await axios.get(`http://localhost:9000/users?name=${name}`);
      const userData = res.data[0];

      const updatedCart = userData.cart.map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });

      const updatedUserData = { ...userData, cart: updatedCart };

      await axios.put(
        `http://localhost:9000/users/${userData.id}`,
        updatedUserData
      );

      setProducts(updatedCart);
      totalPrice(); // Calculate total price after decreasing quantity

      console.log(updatedCart);
      // alert("Added to Cart");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      // Fetch the current user data
      const res = await axios.get(`http://localhost:9000/users?name=${name}`);
      const userData = res.data[0];

      // Filter out the item to be removed
      const updatedCart = userData.cart.filter((item) => item.id !== id);

      // Update the user data with the new cart
      const updatedUserData = { ...userData, cart: updatedCart };
      await axios.put(
        `http://localhost:9000/users/${userData.id}`,
        updatedUserData
      );

      // Update the state
      setProducts(updatedCart);
      totalPrice(); // Calculate total price after removing item
    } catch (error) {
      console.error("Error removing item from cart:", error);
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

  const totalPrice = () => {
    axios.get(`http://localhost:9000/users?name=${name}`).then((user) => {
      let sum = 0;
      user.data[0].cart.forEach((item) => {
        sum = sum + item.Price * item.quantity;
      });
      console.log(sum);
      setFinalPrice(sum);
    });
  };

  return (
    <div className={styles.cartPage}>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th className={styles.header}>IMAGE</th>
            <th className={styles.header}>PRODUCT NAME</th>
            <th className={styles.header}>PRICE</th>
            <th className={styles.header}>QUANTITY</th>
            <th className={styles.header}>DELETE</th>
            <th className={styles.header}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              updateQuantity={updateQuantity}
              downQuantity={downQuantity}
              removeFromCart={removeFromCart}
              onAddWishList={onAddWishlist}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.totalContainer}>
        <span className={styles.totalLabel}>Total:</span>
        <span className={styles.totalAmount}>₹{finalPrice}</span>
      </div>
      <button className={styles.checkoutButton}>CHECKOUT</button>
    </div>
  );
};

export default CartPage;
