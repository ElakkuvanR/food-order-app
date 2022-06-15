import { useContext, useEffect, useState } from "react";
import React from "react";
import styles from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CardIcon";
import CardContext from "../../store/cart-context";

const HeaderCardButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const cartCtx = useContext(CardContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNo, item) => {
    return curNo + item.amount;
  }, 0);

  const buttonClasses = `${styles.button} ${
    buttonIsHighlighted ? styles.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    const timer = setTimeout(() => {
      setButtonIsHighlighted(true);
    }, 300);
    return () => {
      clearTimeout(timer);
      setButtonIsHighlighted(false);
    };
  }, [items]);
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
