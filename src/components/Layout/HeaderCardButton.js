import React from "react";
import styles from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CardIcon";

const HeaderCardButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default HeaderCardButton;
