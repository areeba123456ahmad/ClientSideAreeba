import React, { useCallback, useEffect, useState, useContext } from "react";
import "../assets/CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../Context/context.js";

const RequestsProject = () => {
  const { isOpen, toggleOpen } = useContext(Context);
  return (
    <>
      <div className={`currentProject-data ${isOpen ? "inactive" : "active"}`}>
        <div className="current-projects-i">
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <p>Project Name Here</p>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <p>Project Name Here</p>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <p>Project Name Here</p>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <p>Project Name Here</p>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <p>Project Name Here</p>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <p>Project Name Here</p>
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <p>Project Name Here</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default RequestsProject;
