import React, { useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import property from "lodash/property";
import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import classnames from "classnames";

import userSvg from "../../assets/user.svg";
import trueFalserLogo from "../../assets/true_falser_logo.png";
import style from "./Header.module.scss";
import elifechLogo from "../../assets/eliftech.ico";
import { LogOut } from "../../actions/authorization";
import { toggleMenu } from "../../actions/mobile";

function Header() {
  const dispatch = useDispatch();
  const currentUserName = useSelector(
    property("authorization.userData.name"),
    shallowEqual
  );
  const isMenuOpen = useSelector(property("mobile.isMenuOpen"), shallowEqual);

  const menuToggleHandler = useCallback(() => {
    dispatch(toggleMenu(!isMenuOpen));
  }, [dispatch, isMenuOpen]);

  const logOutHandler = useCallback(() => {
    dispatch(LogOut());
  }, [dispatch]);

  return (
    <header className={style.header}>
      <nav
        className={classnames(
          "navbar navbar-expand-lg navbar-dark bg-primary",
          style.bgPrimary
        )}
      >
        <div className={style.infoWrapper}>
          <div className={style.wrapperLogo}>
            <Link to="/" className={style.logo}>
              <img alt="Logo" src={trueFalserLogo} />
            </Link>

            <Link to="/" className={style.home}>
              TrueFalsr
            </Link>
          </div>
          <div className={style.descriptionContainerDiv}>
            <p>
              Code Readability Quiz made by
              <a
                href="https://www.eliftech.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Eliftech
              </a>
            </p>
            <a
              href="https://www.eliftech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={style.elifechLink}
            >
              <img
                alt="Eliftech"
                src={elifechLogo}
                className={style.elifechLogo}
              />
            </a>
          </div>
        </div>
        <button
          className={classnames("navbar-toggler", {
            [`collapsed`]: !isMenuOpen,
          })}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={menuToggleHandler}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={classnames("collapse navbar-collapse", {
            [`show`]: isMenuOpen,
          })}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link
                to="/statistic/averageTimeOfCorrectAnswers"
                className="nav-link"
              >
                Statistic <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          {!isEmpty(currentUserName) && (
            <div className={style.wrapperUserLogo}>
              <button type="button" onClick={logOutHandler}>
                Log out
              </button>
              <Link to="/profile" className={style.userDataContainer}>
                <img alt={currentUserName} src={userSvg} />

                <span>{currentUserName}</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;
