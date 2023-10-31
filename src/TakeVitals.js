import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './takeVitals.css'


const TakeVitals = () => {

  const navigate = useNavigate();

  const handleStartClick = () => {
    const userAgent = navigator.userAgent;

    navigate('/Camera');

    // if (userAgent.match(/Android/i) || userAgent.match(/iPhone/i)) {
    //   navigate('/Camera');
    // } else {
    //   openModal();
    // }
  };


  window.onload = () => {
    // setShowPopup(true);
    Navigate('/takeVitals');
  };

  const Navigate = useNavigate();
  const backButton = () => {
    Navigate('/Home-Page');
  };



  return (
    <div>

      <header style={{
        // width: '96%',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        padding: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(Indian-Girls.jpg)`,
        zIndex: '10',
      }}>
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: "300px", height: "100px", marginRight: '1.5em' }} />
        <div style={{}}></div>
      </header>


      <div className='takeVitalsContainer'>


        <div className="takeVitals-Container">

          <header className='takeVitalsHeader'>


            <button className='instructionsBackBtn'

              onClick={() => {
                backButton();
              }}
            >
              <img
                src="back.png"
                alt="Back"
                className='ImgCameraBackBtn'
              />
              {/* Logout */}
            </button>

            <div className='takeVitalsHeaderTxt'>
              VITAL SIGNS INSTRUCTIONS
            </div>

          </header>

          <div className='takeVitalsImageStyle'>
            <img src="cameraIcon.png" alt="Heart" width="250" height="250" />
          </div>

          <div className='instructionStyle'>
            {/* <div style={instructionsStyle}> */}

            {/* <div style={stepStyle}> */}
            <div className='stepStyle'>
              <img src="aa.png" alt="Step 1" width="30" height="30" />
              {/* <div style={stepNumberStyle}> */}
              <div className='stepNumberStyle'>1. Please position yourself in a shaded area.</div>
            </div>

            {/* <div style={stepStyle}> */}
            <div className='stepStyle'>
              <img src="ab.png" alt="Step 2" width="30" height="30" />
              {/* <div style={stepNumberStyle}> */}
              <div className='stepNumberStyle'>2. Place and hold your Index Finger over the Camera Lens.</div>
            </div>

            {/* <div style={stepStyle}> */}
            <div className='stepStyle'>
              <img src="ac.png" alt="Step 3" width="30" height="30" />
              {/* <div style={stepNumberStyle}> */}
              <div className='stepNumberStyle'>3. Make sure your Index Finger fully covers the Camera Lens.</div>
            </div>

            {/* <div style={stepStyle}> */}
            <div className='stepStyle'>
              <img src="ad.png" alt="Step 4" width="30" height="30" />
              {/* <div style={stepNumberStyle}> */}
              <div className='stepNumberStyle'>4. Press the start button below to begin the process.</div>
            </div>

            {/* <div style={stepStyle}> */}
            <div className='stepStyle'>
              <img src="ae.png" alt="Step 5" width="30" height="30" />
              {/* <div style={stepNumberStyle}> */}
              <div className='stepNumberStyle'>5. While the App is taking your Vital Signs please remain still.</div>
            </div>

            {/* <div style={stepStyle}> */}
            <div className='stepStyle'>
              <img src="af.png" alt="Step 6" width="30" height="30" />
              {/* <div style={stepNumberStyle}> */}
              <div className='stepNumberStyle'>6. This will take 30 Seconds and may have to be repeated.</div>
            </div>
          </div>


          <button
            className="startBtn"
            onClick={handleStartClick}
            style={{ width: '180px', height: '40px', fontSize: '19px', backgroundColor: 'navy', color: 'white', marginTop: '0em', marginBottom: '0.5em' }}
          >
            Start
          </button>
        </div>




      </div>

      <footer className="takeVitalsfooter"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "navy",
          marginTop: '100vh',
          width: '100%',
          backgroundImage: `url(Indian-Girls.jpg)`,
        }}
      >
        {/* <div> */}
        <div style={{ color: "orange", display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>YourVitals, Inc. </div>
        <div style={{ color: "#ffffff" }}>
          © 2023, All Rights Reserved.
        </div>

        <div style={{ alignItems: 'center' }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("https://yourvitals.ai/terms_of_use.html", "_blank");
            }}
          >
            Terms Of Use
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(
                "https://yourvitals.ai/privacy_policy.html",
                "_blank"
              );
            }}
          >
            Privacy Policy
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("https://yourvitals.ai/#", "_blank");
            }}
          >
            FAQ
          </button>
        </div>
      </footer>


    </div >
  );
};


export default TakeVitals;