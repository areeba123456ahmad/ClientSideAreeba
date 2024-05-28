import React, { useCallback, useEffect, useState, useContext } from "react";
import "../assets/CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPowerOff,
  faSpinner,
  faPeopleGroup,
  faCircleArrowDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../Context/context.js";
import ProgressBar from "./ProgressBar.js";
import { Link } from "react-router-dom";

const MainBody = () => {
  const [click, afterClick] = useState(false);
  const { isOpen, toggleOpen } = useContext(Context);
  const completionPercentage = 66;

  return (
    <div className={`main-body-i ${isOpen ? "inactive" : "active"}`}>
      <div className="main-upperbody-i">
        <div className="current-projects-i">
          <h2>Current Projects</h2>

          <Link to="/UCP" className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faSpinner}
            />
            <div className="current-project-blockElements-i">
              <h3>
                Project Name: University of Central Punjab <em>(Inprogress)</em>
              </h3>
            </div>
          </Link>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faSpinner}
            />
            <div className="current-project-blockElements-i">
              <h3>
                Project Name: Odoo <em>[Pending]</em>
              </h3>
            </div>
          </div>
          <Link to="/CurrentProject" className="CurrentProjectArrow-i">
            <p>
              See more <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </Link>
        </div>
        <div className="orders-etc-i">
          <div className="orders-etc-div-i">
            <div className="orders-icon-background-i"></div>
            <FontAwesomeIcon
              className="orders-etc-icon-i"
              icon={faCircleCheck}
            />
            <h3>488</h3>
            <h2>Orders</h2>
          </div>
          <div className="orders-etc-div-i">
            <div className="orders-icon2-background-i"></div>
            <FontAwesomeIcon className="orders-etc-icon2-i" icon={faUser} />
            <h3>23</h3>
            <h2>Users</h2>
          </div>
          <div className="orders-etc-div-i">
            <div className="orders-icon3-background-i"></div>
            <FontAwesomeIcon
              className="orders-etc-icon3-i"
              icon={faPeopleGroup}
            />
            <h3>400</h3>
            <h2>Team</h2>
          </div>
          <div className="orders-etc-div-last-i">
            <div className="orders-icon4-background-i"></div>
            <FontAwesomeIcon className="orders-etc-icon4-i" icon={faStar} />
            <h3>3.7</h3>
            <h2>Reviews</h2>
          </div>
        </div>
      </div>
      <div className="main-lowerbody-i">
        <div className="request-lowerbody-i">
          <h2>Requests</h2>
          <div className="request-lowerbody-div-i">
            <FontAwesomeIcon
              className="request-lowerbody-icon-i"
              icon={faStar}
            />
            <p>Project 1 Date: 23-3-24</p>
          </div>
          <div className="request-lowerbody-div-i">
            <FontAwesomeIcon
              className="request-lowerbody-icon-i"
              icon={faStar}
            />
            <p>Project 2 Date: 23-3-24</p>
          </div>
          <div className="request-lowerbody-div-i">
            <FontAwesomeIcon
              className="request-lowerbody-icon-i"
              icon={faStar}
            />
            <p>Project 3 Date: 23-3-24</p>
          </div>
          <Link to="/RequestsProject" className="request-lowerbody-btn-i">
            Click here view All
          </Link>
        </div>
        <div
          className="pendingWork-lowerbody-i"
          // style={{ display: click ? "block" : "none" }}
        >
          <h2>Project Progress</h2>
          <ProgressBar value={completionPercentage} />
        </div>
        <div className="completedProject-lowerbody-i">
          <h2>Completed Projects</h2>
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
          <Link to="/CompletedProjects" className="request-lowerbody-btn-i">
            Click here view All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
