import React, { memo, useEffect } from "react";
import Header from "../Header/Header";
import ProfileLanguages from "./components/ProfileLanguages";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import property from "lodash/property";
import { getUserLanguages } from "../../actions/authorization";

function Profile() {
  const userId = useSelector(
    property("authorization.userData.id"),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLanguages(userId));
  }, []);
  return (
    <>
      <Header />
      <ProfileLanguages />
    </>
  );
}

export default memo(Profile);
