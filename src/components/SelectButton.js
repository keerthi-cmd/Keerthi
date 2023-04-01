import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

function SelectButton({ children, ...rest }) {
  return (
    <select
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
}

export default SelectButton;
