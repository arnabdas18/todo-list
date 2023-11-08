import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClass } from "../util/getClasses";

const Button = ({ type, variant = "primary", children, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getClass([styles.button, styles[`button--${variant}`]])}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, id, ...rest }) => {
  return (
    <select
      id={id}
      className={getClass([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
