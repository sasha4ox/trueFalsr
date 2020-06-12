import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import property from 'lodash/property';
import { useSelector, shallowEqual } from 'react-redux';

export default function LoginButton({ name, buttonLoginHandler }) {
  const isLoggedIn = useSelector(property('login.isLoggedIn'), shallowEqual);
  const isLoading = useSelector(property('login.loading'), shallowEqual);
  return (
    <button
      className="btn btn-secondary"
      disabled={isLoggedIn}
      onClick={buttonLoginHandler}
      type="submit"
    >
      {capitalize(name)}
      {isLoading && (
        <span
          aria-hidden="true"
          className="spinner-grow spinner-grow-sm"
          role="status"
        />
      )}
    </button>
  );
}
LoginButton.propTypes = {
  buttonLoginHandler: PropTypes.func,
  name: PropTypes.string.isRequired,
};
LoginButton.defaultProps = {
  buttonLoginHandler: null,
};
