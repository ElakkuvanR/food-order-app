import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CardContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CardContext);
  const { sendRequest: sendOrders, error: httpError } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    sendOrders({
      url: "https://react-http-51a82-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { user: userData, orderitems: cartCtx.items },
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartitems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((cartitem) => (
        <CartItem
          key={cartitem.id}
          name={cartitem.name}
          amount={cartitem.amount}
          price={cartitem.price}
          onRemove={cartItemRemoveHandler.bind(null, cartitem.id)}
          onAdd={cartItemAddHandler.bind(null, cartitem)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartitems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onClose}
          onConfirm={submitOrderHandler}
        ></Checkout>
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModal = isSubmitting && <p>Sending Order Data!!!</p>;

  const didSubmitModalContent = didSubmit && <p>Order is successfully sent.</p>;
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModal}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
