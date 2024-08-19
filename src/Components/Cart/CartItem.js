import React, { useEffect } from "react";
import styles from "./CartPage.module.css";
import mojs from "@mojs/core";

const CartItem = ({
  product,
  updateQuantity,
  removeFromCart,
  downQuantity,
  onAddWishList,
}) => {
  useEffect(() => {
    const heartButtons = document.querySelectorAll(`.${styles.heartButton}`);
    heartButtons.forEach((button) => {
      const timeline = new mojs.Timeline();
      const scaleCurve = mojs.easing.path(
        "M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0"
      );

      const tween1 = new mojs.Burst({
        parent: button,
        radius: { 0: 100 },
        angle: { 0: 45 },
        y: -10,
        count: 10,
        children: {
          shape: "circle",
          radius: 30,
          fill: ["red", "white"],
          strokeWidth: 15,
          duration: 500,
        },
      });

      const tween2 = new mojs.Tween({
        duration: 900,
        onUpdate: function (progress) {
          const scaleProgress = scaleCurve(progress);
          button.style.WebkitTransform =
            button.style.transform = `scale3d(${scaleProgress}, ${scaleProgress}, 1)`;
        },
      });

      const tween3 = new mojs.Burst({
        parent: button,
        radius: { 0: 100 },
        angle: { 0: -45 },
        y: -10,
        count: 10,
        children: {
          shape: "circle",
          radius: 30,
          fill: ["white", "red"],
          strokeWidth: 15,
          duration: 400,
        },
      });

      const sparkle = new mojs.Shape({
        parent: button,
        shape: "circle",
        fill: "none",
        stroke: "yellow",
        strokeWidth: { 10: 0 },
        radius: { 0: 50 },
        duration: 500,
        easing: "cubic.out",
        repeat: 0,
      });

      timeline.add(tween1, tween2, tween3, sparkle);

      button.addEventListener("click", () => {
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        } else {
          timeline.play();
          button.classList.add("active");
        }
      });
    });

    const deleteButtons = document.querySelectorAll(`.${styles.iconButton}`);
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 300);
      });
    });
  }, []);

  return (
    <tr className={styles.row}>
      <td>
        <img src={product.image} alt={product.name} className={styles.image} />
      </td>
      <td>{product.title}</td>
      <td>₹{product.Price}</td>
      <td>
        <button
          onClick={() => updateQuantity(product.id)}
          className={styles.quantityButton}
        >
          +
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() => downQuantity(product.id)}
          className={styles.quantityButton}
        >
          -
        </button>
      </td>
      <td>
        <button
          onClick={() => removeFromCart(product.id)}
          className={styles.iconButton}
        >
          <span className={styles.deleteIcon}>🗑️</span>
        </button>
        {/* <button
          onClick={() => {
            onAddWishList(product);
            removeFromCart(product.id);
          }}
          className={styles.heartButton}
        ></button> */}
      </td>
      <td>₹{parseInt(product.Price) * product.quantity}</td>
    </tr>
  );
};

export default CartItem;
