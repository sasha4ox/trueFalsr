import React from "react";

import elifechLogo from "../../assets/eliftech.ico";
import style from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={style.footerContainer}>
      <div className={style.footerContainerDiv}>
        <span>Made by </span>
        <a href="https://www.eliftech.com/" target="_blank">
          <span>Eliftech </span>
          <img alt="Eliftech" src={elifechLogo} />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
