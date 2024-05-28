import React, { useCallback, useEffect, useState, useContext } from "react";
import "../assets/CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../Context/context.js";
import { Link } from "react-router-dom";

const CurrentProject = () => {
  const { isOpen, toggleOpen } = useContext(Context);
  return (
    <>
      <div className={`currentProject-data ${isOpen ? "inactive" : "active"}`}>
      <div className="current-projects-i">
<h3 className="testingChoice" >Select the type of testing for this project</h3>


       
          <div className="current-projects-div-i">
        
          <Link to="/AutomatedTestCases" className="CurrentProjectArrow-i" >
        <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
        <h3>Automated Testing</h3>
      </Link>
          </div>
          
   
          <div className="current-projects-div-i">
          <Link to="/ManualTestCases" className="CurrentProjectArrow-i" >
        <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
        <h3>Manual Testing</h3>
      </Link>
          </div>

          <div className="current-projects-div-i">
          <Link to="/Reports" className="CurrentProjectArrow-i" >
        <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
        <h3>share Testing Reports</h3>
      </Link>
          </div>

          <div className="current-projects-div-i">
          <Link to="/UploadFile" className="CurrentProjectArrow-i" >
        <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
        <h3>upload Testing Reports</h3>
      </Link>
          </div>
         
         
        
         
        </div>
      </div>
    </>
  );
};
export default CurrentProject;
