import React from 'react';
// import './CustomAlert.css';

const CustomAlert = ({ message, show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <h2 className='text-center'>Alert!</h2>
        <h4>{message}</h4>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomAlert;
