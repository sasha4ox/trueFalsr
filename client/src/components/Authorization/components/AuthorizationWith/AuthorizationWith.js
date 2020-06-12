import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { chosenAuthorizationUrl } from "../../../../actions/authorization";

import "./AuthirizationWith.scss";

function AuthorizationWith({ googleUrl, facebookUrl }) {
  const dispatch = useDispatch();
  const setAuthorizationUrlGoogle = useCallback(() => {
    dispatch(chosenAuthorizationUrl("google"));
  }, [dispatch]);
  const setAuthorizationUrlFacebook = useCallback(() => {
    dispatch(chosenAuthorizationUrl("facebook"));
  }, [dispatch]);
  return (
    <div className="signInWith">
      <span>Sign in with</span>
      <div className="withItemContainer">
        <a
          href={googleUrl}
          className="item"
          onClick={setAuthorizationUrlGoogle}
        >
          <img
            alt="Google"
            src="https://assets.gitlab-static.net/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png"
          />
          <span>Google</span>
        </a>
        <a
          href={facebookUrl}
          className="item"
          onClick={setAuthorizationUrlFacebook}
        >
          <img
            alt="Facebook"
            src="https://www.facebook.com/images/fb_icon_325x325.png"
          />
          <span>Facebook</span>
        </a>
      </div>
    </div>
  );
}

export default AuthorizationWith;
