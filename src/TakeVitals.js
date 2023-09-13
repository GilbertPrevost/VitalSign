import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TakeVitals = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyle = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
  };

  const instructionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '15px',
  };

  const stepStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const stepNumberStyle = {
    minWidth: '1.5em',
    marginRight: '5px',
  };

  const startButtonStyle = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '10px 20px',
    fontSize: '20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  const navigate = useNavigate();

  const handleStartClick = () => {
    const userAgent = navigator.userAgent;

    navigate('/Camera');


    // if (userAgent.match(/Android/i) || userAgent.match(/iPhone/i)) {
    //   navigate('/Camera');
    // } else {
    //   setAlertMessage('This Vital Signs can be measured only in mobile devices.');
    // }
  };


  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <label> VITAL SIGNS INSTRUCTIONS </label>
      </div>
      <img src="cameraIcon.png" alt="Heart" width="250" height="250" />
      <div style={instructionsStyle}>
        <div style={stepStyle}>
          <img src="aa.png" alt="Step 1" width="50" height="50" />
          <span style={stepNumberStyle}>1.</span> Please position yourself in a shaded area.
        </div>
        <div style={stepStyle}>
          <img src="ab.png" alt="Step 2" width="50" height="50" />
          <span style={stepNumberStyle}>2.</span> Place and hold your Index Finger over the Camera Lens.
        </div>
        <div style={stepStyle}>
          <img src="ac.png" alt="Step 3" width="50" height="50" />
          <span style={stepNumberStyle}>3.</span> Make sure your Index Finger fully covers the Camera Lens.
        </div>
        <div style={stepStyle}>
          <img src="ad.png" alt="Step 4" width="50" height="50" />
          <span style={stepNumberStyle}>4.</span> Press the start button below to begin the process.
        </div>
        <div style={stepStyle}>
          <img src="ae.png" alt="Step 5" width="50" height="50" />
          <span style={stepNumberStyle}>5.</span> While the App is taking your Vital Signs please remain still.
        </div>
        <div style={stepStyle}>
          <img src="af.png" alt="Step 6" width="50" height="50" />
          <span style={stepNumberStyle}>6.</span> This will take 30 Seconds and may have to be repeated.
        </div>
      </div>
      <button style={startButtonStyle} onClick={handleStartClick}>
        Start
      </button>
      {alertMessage && <div style={{ color: 'red', fontWeight: 'bold' }}>{alertMessage}</div>}
    </div>
  );
};

export default TakeVitals;
