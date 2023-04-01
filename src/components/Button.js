import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
};

function Button({ children, type, variant, ...rest }) {
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
        styles.buttonText,
      ])}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
