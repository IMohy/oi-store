import * as Route from "@/constants/routes";
import logo from "@/images/logo-full.png";
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
            Eyad Gamal & Mostafa Ayman
          </span>
        </strong>
      </div>
      <div className="footer-col-2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          alt="Footer logo"
          className="footer-logo"
          src="/src/images/logo-full.png"
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
          src="/src/images/obour-logo.png"
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
