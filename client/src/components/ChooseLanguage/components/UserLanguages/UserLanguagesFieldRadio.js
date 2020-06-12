import * as React from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import style from "./UserLanguagesFieldRadio.module.scss";

const Radio = ({ input: { name }, label, options }) => {
  const renderRadioButtons = (key, index) => {
    return (
      <label
        className={style.label}
        key={`${index}`}
        htmlFor={`${name}-${index}`}
      >
        <Field
          id={`${name}-${index}`}
          component="input"
          name={name}
          type="radio"
          value={options[key].value.toString()}
          className={style.input}
        />
        {options[key].label}
      </label>
    );
  };
  return (
    <>
      <h2 className={style.languageName}>{label}</h2>
      <div className={style.wrapperForLabels}>
        {options && Object.keys(options).map(renderRadioButtons)}
      </div>
    </>
  );
};

Radio.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};
export default Radio;
