import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import style from "./Alert.module.scss";

export default function AlertMessage({ message, view }) {
  let errorView;
  if (view === "error") {
    errorView = "danger";
  } else {
    errorView = view;
  }
  return (
    <div className="wrapperForAlert">
      <div
        className={classNames(`alert alert-${errorView}`, {
          [`${style.error}`]: view === "error",
          [`${style.success}`]: view === "success",
        })}
        role="alert"
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  view: PropTypes.string,
};
AlertMessage.defaultProps = {
  view: "success",
};
