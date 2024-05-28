
import React, { useCallback, useEffect, useState, useContext } from "react";
import "../assets/CSS/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../Context/context.js";
import { Link } from "react-router-dom";

const MyComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { isOpen, toggleOpen } = useContext(Context);
  const login = async (endpoint) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Redirect or perform other actions upon successful login
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const generatePdf = async (event) => {
    event.preventDefault();
    try {
      console.log('Button clicked, making fetch request...');
      const response = await fetch('/generate-pdf', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response received:', response);

      if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('Blob created:', blob);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      console.log('PDF downloaded');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      
      <form id="loginForm">

      <div className={`currentProject-data ${isOpen ? "inactive" : "active"}`}>
        <div className="current-projects-i">
        <label style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} htmlFor="email">Email:</label>
        <input  style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <label style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} htmlFor="password">Password:</label>
        <input style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} /><br /><br />

       
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
          <button onClick={() => login('/MainLogin')} style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button><br /><br />

           
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <button onClick={() => login('/attendance')}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Attendance</button><br /><br />
          
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
             <button onClick={() => login('/profile')}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Profile</button><br /><br />
           
          </div>
          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
             <button onClick={() => login('/timetable')}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Timetable</button><br /><br />
            
          </div>


          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <button onClick={() => login('/notification')}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Notification</button><br /><br />
          </div>


          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
             <button onClick={() => login('/feedback')}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Feedback</button><br /><br />
            
          </div>

          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
            <button onClick={() => login('/invoice')}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Invoice</button><br /><br />
            
          </div>


          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
             <button onClick={() => login('/enrollment')}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Enrollment</button><br /><br />
            
          </div>

          <div className="current-projects-div-i">
            <FontAwesomeIcon
              className="current-project-icon-i"
              icon={faPowerOff}
            />
              <button id="generate-pdf-btn" onClick={generatePdf}style={{ backgroundColor: '#212529', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate Report PDF</button><br /><br />
            
          </div>

        </div>
      </div>


        
      </form>
      <div id="message">{message}</div>
    </div>
  );
};

export default MyComponent;
