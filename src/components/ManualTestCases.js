import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../Context/context';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import '../assets/CSS/style.css';

const ManualTestCases = () => {
  const { isOpen } = useContext(Context);
  const [workbook, setWorkbook] = useState(null);
  const [currentSheet, setCurrentSheet] = useState([]);
  const [sheetName, setSheetName] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleFile = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const wb = XLSX.read(data, { type: 'binary' });
      setWorkbook(wb);
    };
    reader.readAsBinaryString(file);
  };

  const loadSheet = (name) => {
    if (!workbook) {
      alert('Please upload an Excel file first.');
      return;
    }

    const sheet = workbook.Sheets[name];
    if (!sheet) {
      alert(`Sheet "${name}" not found.`);
      return;
    }

    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    setCurrentSheet(json);
    setSheetName(name);
    setIsSheetOpen(true);
  };

  const saveSheet = () => {
    if (!workbook || !sheetName) {
      alert('No sheet to save.');
      return;
    }

    const table = document.querySelector('#sheetContainer table');
    const newData = [];
    table.querySelectorAll('tr').forEach((row) => {
      const rowData = [];
      row.querySelectorAll('th, td').forEach((cell) => {
        rowData.push(cell.innerText);
      });
      newData.push(rowData);
    });

    const newSheet = XLSX.utils.aoa_to_sheet(newData);
    workbook.Sheets[sheetName] = newSheet;
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const generateReport = () => {
    const moduleNamesInput = document.getElementById('moduleNames');
    const moduleNames = moduleNamesInput.value.split(',').map(name => name.trim());

    fetch('/generate_report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moduleNames }),
    })
      .then(response => response.text())
      .then(data => {
        document.getElementById('report').innerHTML = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const downloadPDF = () => {
    const moduleNamesInput = document.getElementById('moduleNames');
    const moduleNames = moduleNamesInput.value.split(',').map(name => name.trim());

    fetch('/generate_report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moduleNames }),
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className={`currentProject-data ${isOpen ? "inactive" : "active"}`}>
        <input type="file" onChange={handleFile} accept=".xlsx,.xls" />
        {!isSheetOpen && (
          <div className="current-projects-i">
            <div className="current-projects-div-i">
              <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
              <h3>Attendance</h3>
              <div className="position-ofTestType-i">
                <Link to="#" onClick={() => loadSheet('attendence')}>Load Attendance</Link>
              </div>
            </div>
            <div className="current-projects-div-i">
              <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
              <h3>TimeTable</h3>
              <div className="position-ofTestType-i">
                <Link to="#" onClick={() => loadSheet('TimeTable')}>Load TimeTable</Link>
              </div>
            </div>
            <div className="current-projects-div-i">
              <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
              <h3>Feedback</h3>
              <div className="position-ofTestType-i">
                <Link to="#" onClick={() => loadSheet('Feedback')}>Load Feedback</Link>
              </div>
            </div>

            <div className="current-projects-div-i">
              <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
              <h3>Invoices</h3>
              <div className="position-ofTestType-i">
                <Link to="#" onClick={() => loadSheet('invoices')}>Load invoices</Link>
              </div>
            </div>


            <div className="current-projects-div-i">
              <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
              <h3>Results and Exams</h3>
              <div className="position-ofTestType-i">
                <Link to="#" onClick={() => loadSheet('resultsAndExams')}>Load resultsAndExams</Link>
              </div>
            </div>


            <div className="current-projects-div-i">
              <FontAwesomeIcon className="current-project-icon-i" icon={faPowerOff} />
              <h3>Profile</h3>
              <div className="position-ofTestType-i">
                <Link to="#" onClick={() => loadSheet('Profile')}>Load Profile</Link>
              </div>
            </div>


          </div>
        )}
        {isSheetOpen && (
          <div id="sheetContainer">
            <h2>{sheetName}</h2>
            <table>
              <tbody>
                {currentSheet.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      rowIndex === 0
                        ? <th key={cellIndex}>{cell}</th>
                        : <td key={cellIndex} contentEditable>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={saveSheet}>Save Sheet</button>
          </div>
        )}
        <div>
          <label>Module Names (comma separated):</label>
          <input type="text" id="moduleNames" />
          <button onClick={generateReport}>Generate Report</button>
          <button onClick={downloadPDF}>Download PDF</button>
        </div>
        <div id="report"></div>
      </div>
    </>
  );
};

export default ManualTestCases;