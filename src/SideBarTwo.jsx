import React from 'react';
import {  Link } from "react-router-dom";

function SidebarTwo() {
  const sidebarStyle = {
    height: '100vh', 
    backgroundColor: 'lightgreen', 
    color: 'white', 

  };

  const linkStyle = {
    display: 'block',
    padding: '20px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: 'green',
    borderBottom: '2px solid #13e00e' ,// 2px solid white border
    marginTop:'10px'
  };

  const linkStyleActive = {
    display: 'block',
    padding: '20px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#0b872c',
    borderBottom: '2px solid #13e00e' ,// 2px solid white border
    marginTop:'10px'
  };
  

  return (
    <div style={sidebarStyle}>
      <h4 className="mb-4 text-center py-4">History</h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li>
      <Link to="/" style={linkStyle}>Forecast Values</Link>
    </li>
    <li>
    <Link to="/hist" style={linkStyleActive}>Historic Values</Link>
  </li>
        <li style={linkStyle}>Traffic</li>
      </ul>
    </div>
  );
}

export default SidebarTwo;
