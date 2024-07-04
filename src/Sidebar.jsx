import React from 'react';

function Sidebar() {
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
  

  return (
    <div style={sidebarStyle}>
      <h4 className="mb-4 text-center py-4">Lucky Motors</h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={linkStyle}>Home</li>
        <li style={linkStyle}>Sales</li>
        <li style={linkStyle}>Traffic</li>
      </ul>
    </div>
  );
}

export default Sidebar;
