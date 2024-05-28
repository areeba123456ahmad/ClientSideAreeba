import React, { useCallback, useEffect, useState, useContext } from "react";
import "../assets/CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleQuestion,
  faMessage,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faBars,
  faCaretDown,
  faCircleInfo,
  faMagnifyingGlass,
  faMoneyBill1,
  faMoon,
  faPowerOff,
  faTableColumns,
  faSpinner,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGooglePay, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import USA from "../assets/images/USA.png";
import NEWSIMS from "../assets/images/NEWSIMS.png";
import SIMSLOGO from "../assets/images/solo-logo.png";
import { Context } from "../Context/context";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { isOpen, toggleOpen } = useContext(Context);
  return (
    <div className={`side-bar-i ${isOpen ? "inactive" : "active"} `}>
      <img
        className="aside-logo-i"
        src={`${isOpen ? SIMSLOGO : NEWSIMS} `}
        alt="/"
      />

      <div className="line-forasideBar-i"></div>

      <div className="aside-bar-list-i">
        <ul>
          <Link to="/">
            {" "}
            <FontAwesomeIcon className="icons-i" icon={faTableColumns} />{" "}
            <span>Dashboard</span>
          </Link>
          <br />

          <a href="">
            <FontAwesomeIcon className="icons-i" icon={faGooglePlay} />{" "}
            <span>Apps</span>
          </a>
          <br />

          <a href="">
            <FontAwesomeIcon className="icons-i" icon={faCircleQuestion} />{" "}
            <span>FAQ's</span>
          </a>
          <br />

          <a href="">
            <FontAwesomeIcon className="icons-i" icon={faUser} />{" "}
            <span>User Profile</span>
          </a>
          <br />

          <Link to="Messages">
            <FontAwesomeIcon className="icons-i" icon={faMessage} />{" "}
            <span>Chat</span>
          </Link>
          <br />

          <div className="line-forasideBar-below-i"></div>
          <div className="aside-footer-i">
            <button className="aside-footer-imgBtn-i">
              <FontAwesomeIcon className="icons-i" icon={faMoon} />
            </button>
            <button className="aside-footer-imgBtn-i">
              <img src={USA} alt="#" />
            </button>
            <button className="aside-footer-imgBtn-i">
              <FontAwesomeIcon className="icons-i" icon={faCircleInfo} />
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
