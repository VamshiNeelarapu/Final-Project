import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Wish from "./Wish";

const Wishlist = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <div>
      {!isAuthenticated ? (
        <h1>Sign in to view your wishlist!</h1>
      ) : (
        <div>
          {/* <h1> {user.name} Wishlist</h1> */}
          <Wish />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
