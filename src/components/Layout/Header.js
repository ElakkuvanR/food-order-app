import React from "react";
import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Meals</h1>
        <HeaderCardButton onClick={props.onShowCartClicked}></HeaderCardButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="Full of delicious food!"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
