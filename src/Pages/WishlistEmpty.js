import React from "react";
import "./WishlistEmpty.css";
import gif from "../Components/HomePageSections/giphy 2.webp";

const WishlistEmpty = () => {
  return (
    <div class="wishempty-container">
      <div class="wishempty-title">
        <span class="title-word title-word-1">Add </span>
        <span class="title-word title-word-2"> Little</span>
        <span class="title-word title-word-3"> Love</span>
        <span class="title-word title-word-4"> To</span>
        <span class="title-word title-word-4"> Your</span>
        <span class="title-word title-word-4"> Wishlist</span>
        <span class="title-word title-word-4"> :)</span>

        {/* <a href='/'><img class="giff1" src='giphy.webp'></img></a> */}
      </div>

      <img class="giff1" src={gif}></img>
    </div>
  );
};

export default WishlistEmpty;
