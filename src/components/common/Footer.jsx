import * as Route from "@/constants/routes";
import logoWordmark from "@/images/logo-wordmark.png";
import ObourLogo from "@/images/obour-logo.png";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [Route.HOME, Route.SHOP];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Developed by
            <br />
            Mohamed Mohy & Mohamed Hamada <br />
            Eyad Gamal & Mostafa Ayman & Hussain Ahmed<br />
            Abderahim Adnan
          </span>
        </strong>
      </div>
      <div className="footer-col-2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          alt="Footer logo"
          className="footer-logo"
          src={logoWordmark}
          width={60}
          height={60}
          style={{
            backgroundColor: "black",
            borderRadius: "10px",
            marginRight: "10px",
            width: "60px",
            height: "60px",
          }}
        />
        <h5>
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
      <div className="footer-col-3">
        <img
          src={ObourLogo}
          alt="Footer logo"
          className="footer-logo"
          width={60}
          height={60}
        />
      </div>
    </footer>
  );
};

export default Footer;
