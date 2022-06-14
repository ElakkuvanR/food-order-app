import { useContext } from "react";
import React from "react";
import styles from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CardIcon";
import CardContext from "../../store/cart-context";

const HeaderCardButton = (props) => {
  const cartCtx = useContext(CardContext);
  const numberOfCartItems = cartCtx.items.reduce((curNo, item) => {
    return curNo + item.amount;
  }, 0);
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
