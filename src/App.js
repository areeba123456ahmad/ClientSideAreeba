import React, { useCallback, useEffect, useState } from "react";
import "./assets/CSS/style.css";
import "./App.css"; // Import your CSS file here
//Routing
import SideBar from "./components/side-bar.js";
import NavBar from "./components/nav-bar.js";
import MainBody from "./components/main-body.js";
import { ContextProvider } from "./Context/context.js";
import CurrentProject from "./components/CurrentProject.js";
import RequestsProject from "./components/RequestsProject.js";
import CompletedProjects from "./components/CompletedProjects.js";
import Notifications from "./components/Notifications.js";
import Messages from "./components/Messages.js";
import Ucp from "./components/Ucp.js";
import AutomatedTestCases from "./components/AutomatedTestCases.js";
import Reports from "./components/reports.js"
import UploadFile from './components/FileUpload.js';
import ManualTestCases from "./components/ManualTestCases.js";
import { Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <>
      <div className="main-i">
        <ContextProvider>
          <SideBar />
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<MainBody />} />
            <Route path="/CurrentProject" element={<CurrentProject />} />
            <Route path="/RequestsProject" element={<RequestsProject />} />
            <Route path="/CompletedProjects" element={<CompletedProjects />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Ucp" element={<Ucp />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/ManualTestCases" element={<ManualTestCases />} />
            <Route path="/automatedExecution" element={<automatedExecution />} />
            <Route path="/UploadFile" element={<UploadFile />} />

            <Route
              path="/AutomatedTestCases"
              element={<AutomatedTestCases />}
            />
          </Routes>
          {/* <MainBody /> */}
        </ContextProvider>
      </div>
    </>
  );
};

// function DropdownItem(props) {
//   return (
//     <li className="dropdownItem">
//       <a> {props.text}</a>
//     </li>
//   );
// }

export default App;