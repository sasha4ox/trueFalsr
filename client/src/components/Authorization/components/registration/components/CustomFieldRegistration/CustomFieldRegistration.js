import PropTypes from "prop-types";
import React from "react";
import style from "./CustomFieldRegistration.module.scss";

export default function CustomFieldRegistration({
  input: { name, onBlur, onChange, onFocus },
  label,
  type,
  meta: { touched, error },
}) {
  return (
    <div className={style.groupRegistration}>
      <input
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        required
        type={type}
      />
      <label htmlFor={name}>{label}</label>
      {touched && error && <div className={style.inputsError}>{error}</div>}
    </div>
  );
}
CustomFieldRegistration.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  type: PropTypes.string,
};
CustomFieldRegistration.defaultProps = {
  label: "input",
  type: "text",
};
