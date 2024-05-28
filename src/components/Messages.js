import React, { useCallback, useEffect, useState, useContext } from "react";
import "../assets/CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../Context/context.js";

const Messages = () => {
  const { isOpen, toggleOpen } = useContext(Context);
  return (
    <>
      <div className={`currentProject-data ${isOpen ? "inactive" : "active"}`}>
        <div className="current-projects-i">
          <h1 style={{ color: "white", textAlign: "center" }}>Messages</h1>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <h3>Project Name Here</h3>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <h3>Project Name Here</h3>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <h3>Project Name Here</h3>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <h3>Project Name Here</h3>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <h3>Project Name Here</h3>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <h3>Project Name Here</h3>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <h3>Project Name Here</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default Messages;
