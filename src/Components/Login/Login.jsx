import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import i1 from "../Assets/ospan-ali-jg7910ihs7o-unsplash.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignup = async () => {
    if (name && email && password) {
      const user = {
        name: name,
        email: email,
        password: password,
        cart: [],
        wishlist: [],
      };
      try {
        const res = await axios.post("http://localhost:9000/users", user);
        console.log(res);
        if (res.status === 201) {
          // Save user to local storage
          localStorage.setItem("currentUser", JSON.stringify(user));
          console.log("User after signup:", user);
          login(user);
          navigate("/");
        }
      } catch (error) {
        setError("Signup failed. Please try again.");
      }
      const res = await axios.post("http://localhost:9000/users", user);
    } else {
      setError("All fields are required.");
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    try {
      const res = await axios.get("http://localhost:9000/users");
      const users = res.data;
      console.log("Users from server:", users);

      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      console.log("Found user:", user);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setError("");
        login(user);
        navigate("/");
      } else {
        setError("Invalid email or password.");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Login failed. Please try again.");
    }
  };

  const addToWishlist = (item) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      currentUser.wishlist.push(item);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      updateUserInLocalStorage(currentUser);
    }
  };

  const addToCart = (item) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      currentUser.cart.push(item);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      updateUserInLocalStorage(currentUser);
    }
  };

  const updateUserInLocalStorage = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(
      (user) => user.email === updatedUser.email
    );
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <div className={styles["loginsignup"]}>
      <div className={styles["wel"]}>
        <h3>Welcome to</h3>
        <h1>GlamCart</h1>
      </div>
      <img src={i1} alt="Shopping" />
      <div className={styles["loginsignup-container"]} id={styles["ls"]}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div className={styles["loginsignup-fields"]}>
          {!isLogin && (
            <input
              className={styles["login-input"]}
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            className={styles["login-input"]}
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles["login-input"]}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <div className={styles["loginsignup-agree"]}>
              <input
                type="checkbox"
                name=""
                id=""
                className={styles["check"]}
              />
              <p>By continuing, I agree with the terms and conditions.</p>
            </div>
          )}
        </div>
        <button
          className={styles["login-button"]}
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Continue"}
        </button>
        {error && <p className={styles["error"]}>{error}</p>}
        <p className={styles["loginsignup-login"]}>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                className="sign-up-option"
                onClick={() => setIsLogin(false)}
              >
                Sign up here!
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login here!</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
