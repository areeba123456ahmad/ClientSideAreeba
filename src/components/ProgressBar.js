// ProgressBar.js
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ value }) => {
  return (
    <div className="ProgressBar">
      <CircularProgressbar
        className="CircularProgressbar"
        value={value}
        text={`${value}%`}
      />
    </div>
  );
};

export default ProgressBar;
