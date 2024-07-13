import React from 'react'
import './App.css';
import logo from './assets/makung.jpeg'; 

function App() {
  const studentID = "B6525279"
  const studentName = "มาติน"
  const teamNumber = "G06"


  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} ></img>
        <div className="center">
          <h1>สวัสดี, {studentID} {studentName} {teamNumber}</h1>
        </div>
      </header>
    </div>
  );
}

export default App
