import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';




const History = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [guid, setguid] = useState(localStorage.getItem('guid'));

  const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
  const loginUrl = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/PatientVitalSigns/GetDetails_V2`;
  // const rectangles = Array(length).fill(null);

  const historyHeaderStyle = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
  };

  const historyRectangleStyle = {
    width: '460px', // Make the width 100% for mobile
    height: '270px',
    backgroundColor: 'white',
    margin: '10px auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const historyTopContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  };

  const historyBottomContentStyle = {
    marginTop: '1px',
    padding: '10px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const historyBoldTextStyle = {
    fontWeight: 'bold',
  };

  useEffect(() => {
    setguid(localStorage.getItem('guid'));
    callVitalsHistoryOnLoad();
  }, []);

  var requestBody = {
    PatientGUID: guid
  };

  const callVitalsHistoryOnLoad = () => {
    console.log('Function called when component is loaded');
    console.log("requesting", requestBody);


    axios
      .post(loginUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        var data = response.data.errormessage;
        setVitalSigns(response.data);
      })
      .catch((error) => {
        console.error("Error:1111", error);
      });

  };

  const Navigate = useNavigate();
  const backButton = () => {

    Navigate('/Home-Page');
  };

  return (
    <div>

      <header style={{
        position: '100%',
        top: '0',
        left: '0',
        right: '0',
        padding: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(Indian-Girls.jpg)`,

        zIndex: '999', // Added this to make sure the header is on top
      }}>
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px',marginRight:'1.5em' }} />
        <div style={{}}></div>
      </header>


      <div className="container" >

      <header style={{
          padding: '9px',
          display: 'flex',
          backgroundColor: 'navy',
          border: '1px solid #ccc',
          borderRadius: '5px',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          marginBottom: '3px',
          fontSize: '25px'
        }}>

          <button
            style={{
              backgroundColor: '#000080',
              color: 'white',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '10px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center', // Center the content vertically
            }}
            onClick={() => {
              backButton();
            }}
          >
            <img
              src="back.png"
              alt="Back"
              style={{
                height: '30px',
                width: '30px',
                marginRight: '5px', // Add some space between the image and text
              }}
            />
           
          </button>

          <div style={{
            marginRight: '4em',
            textAlign: 'center'
          }}>
            VITAL SIGN HISTORY
          </div>


        </header>

        {vitalSigns.map((vitalSign, index) => (
          <div key={index} style={historyRectangleStyle}>
            <div style={historyTopContentStyle}>
              <div style={{ flex: 'auto' }}>
                <p><span style={historyBoldTextStyle}>Date:</span> {vitalSign.onlyDate}</p>
                <p><span style={historyBoldTextStyle}>Time:</span> {vitalSign.onlyTime}</p>
                <p><span style={historyBoldTextStyle}>HR:</span> {vitalSign.heartRate}</p>
                <p><span style={historyBoldTextStyle}>BP:</span> {vitalSign.bloodPressure}</p>
                <p><span style={historyBoldTextStyle}>ECG</span></p>
                <p><span style={historyBoldTextStyle}>QT:</span> {vitalSign.qtinterval}</p>
                <p><span style={historyBoldTextStyle}>PR:</span> {vitalSign.printerval}</p>
              </div>
              <div style={{ flex: '1' }}>
                <p><span style={historyBoldTextStyle}>O2 Level:</span> {vitalSign.oxygenLevel}</p>
                <p><span style={historyBoldTextStyle}>BodyTemp:</span> {vitalSign.bodyTemprature}</p>
                <p><span style={historyBoldTextStyle}>Respiration:</span> {vitalSign.respirationRate}</p>
                <p><span style={historyBoldTextStyle}>BMI:</span> {vitalSign.bodyMassIndex}</p>
                <p style={{ color: '#ffffff' }}><span style={historyBoldTextStyle}>ECG</span></p>
                <p><span style={historyBoldTextStyle}>ST:</span> {vitalSign.stinterval}</p>
                <p><span style={historyBoldTextStyle}>QRS:</span> {vitalSign.qrsinterval}</p>
              </div>
            </div>
          </div>
        ))}


      </div>

      <footer className="footer1"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "navy",
          //   marginTop: '100vh',
          width: '100%',
          backgroundImage: `url(Indian-Girls.jpg)`,

        }}
      >

        <div>
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
        <p>
          <strong style={{ color: "orange" }}>YourVitals, Inc. </strong>
          <span style={{ color: "white" }}>
            ©2023, All Rights Reserved.
          </span>
        </p>
      </footer>
    </div>
  );
};

export default History;
