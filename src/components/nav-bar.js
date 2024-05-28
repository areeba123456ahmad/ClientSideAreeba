import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context/context";
import "../assets/CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faBars,
  faMagnifyingGlass,
  faMoneyBill1,
  faPowerOff,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import ubaidPic from "../assets/images/PIC.jpg";
import { Link } from "react-router-dom";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

const NavBar = () => {
  const [open, setOpenInspector] = useState(false);
  const [push, setOpenMessages] = useState(false);

  const { isOpen, toggleOpen } = useContext(Context);

  const handleClick = () => {
    toggleOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleMessengerClick = () => {
    window.open("http://localhost:3001/inspector", "_blank"); // Open the URL in a new tab
  };

  useEffect(() => {
    // Close dropdowns by clicking anywhere outside
    const clickOutside = () => {
      setOpenInspector(false);
      setOpenMessages(false);
    };
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <div className="side-body-i">
      <nav className={`navbar-i ${isOpen ? "inactive" : "active"}`}>
        <button className="minimize-btn-i" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div className="search-bar-i">
          <FontAwesomeIcon
            className="iconSearchBar-i"
            icon={faMagnifyingGlass}
          />
          <input type="text" placeholder="Search..." />
        </div>
        <Link to="/Notifications">
          <FontAwesomeIcon className="iconAfterSearchBar-i" icon={faBell} />
        </Link>
        <a href="#" onClick={handleMessengerClick} className="message-button-i">
          <FontAwesomeIcon
            className="iconAfterNotification-i"
            icon={faFacebookMessenger}
          />
        </a>
        <button
          className="inspector-button-i"
          onClick={() => setOpenInspector(!open)}
        >
          <img src={ubaidPic} alt="Ubaid" />
        </button>
        <div className={`dropdown-menu-i ${open ? "active" : "inactive"}`}>
          <div className="menu-img-i">
            <img src={ubaidPic} alt="Ubaid" />
            <br />
            <br />
            <br />
            <h3>Insp-01, Ubaid</h3>
          </div>
          <div className="line-i"></div>
          <div className="profile-i">
            <ul>
              <li>
                <FontAwesomeIcon className="icons-i" icon={faUser} />
                <a href="#"> Profile</a>
              </li>
              <li>
                <FontAwesomeIcon className="icons-i" icon={faBars} />
                <a href="#"> Setting</a>
              </li>
              <li>
                <FontAwesomeIcon className="icons-i" icon={faTableColumns} />
                <a href="#"> Dashboard</a>
              </li>
              <li>
                <FontAwesomeIcon className="icons-i" icon={faMoneyBill1} />
                <a href="#"> Earning</a>
              </li>
            </ul>
          </div>
          <div className="line-i"></div>
          <div className="logout-i">
            <ul>
              <li>
                <FontAwesomeIcon className="icons-i" icon={faPowerOff} />
                <a href="#"> Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
