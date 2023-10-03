import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";


const History = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [guid, setguid] = useState(localStorage.getItem('guid'));




  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [isModalOpen1, setIsModalOpen1] = useState(false);


  const [modalIsOpen, setModalIsOpen] = useState(false);


  const [HR, setHR] = useState(localStorage.getItem('0'));
  const [Blood1, setBloodp] = useState(localStorage.getItem('0'));
  const [Temperature, setTemp] = useState(localStorage.getItem('0'));
  const [oxygen, setOxyzen] = useState(localStorage.getItem('0'));
  const [Respiration, setResp] = useState(localStorage.getItem('0'));
  const [bmi, setBMI] = useState(localStorage.getItem('0'));
  const [qt, setQt] = useState(localStorage.getItem('0'));
  const [Qrs, setQrs] = useState(localStorage.getItem('0'));
  const [ST, setSt] = useState(localStorage.getItem('0'));
  const [Pr, setPr] = useState(localStorage.getItem('0'));




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








  const modalStyle = {
    // display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'navy',
    zIndex: 1000,
    width: '20em',
    height: '8.5em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3.3em, white 3.3em)`,
  };
















  useEffect(() => {
    setguid(localStorage.getItem('guid'));
    callVitalsHistoryOnLoad();
  }, []);




  var requestBody = {
    PatientGUID: guid
  };


  const handleItemClick = (index) => {
    setModalIsOpen(true);
    const data = vitalSigns[index];
    setBMI(data.bodyMassIndex);
    setBloodp(data.bloodPressure);
    setHR(data.heartRate);
    setOxyzen(data.oxygenLevel);
    setResp(data.respirationRate);
    setTemp(data.bodyTemprature);
    setPr(data.printerval);
    setQrs(data.qrsinterval);
    setQt(data.qtinterval);
    setSt(data.stinterval);
    setIsModalOpen(true);






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








  const ECGContainer = {
    display: isModalOpen ? 'block' : 'none',
    backgroundColor: "#efefef",
    height: "22em",
    width: "100%",
    margin: "auto",
    marginRight: "10px",
    marginLeft: "10px",
    overflow: "auto",
    scrollLeft: scrollX,
    scrollTop: scrollY, // Set scrollTop to scrollY
  };




  const svgStyle = {
    display: 'block',
    margin: 'auto',
  };












  const numVerticalLines = 10;
  const HorizontalLineSpacing = (465 - 50) / (numVerticalLines - 1) * 1.8;
  const verticalLineSpacing = (223 - 50) / (numVerticalLines - 1) * 1.8;




  const heading = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
  };




  const verticalLines = [];
  for (let i = 0; i < numVerticalLines; i++) {
    const x = 50 + i * verticalLineSpacing;
    const color = i === 9 ? "black" : "gray"; // Change color to black for the 10th line
    verticalLines.push(
      <line key={i} x1={x} y1={50} x2={x} y2={300} stroke={color} strokeWidth="1" />
    );
  }




  // ECG data (sample data, replace with your actual data)
  const ecgData = [
    { x: 0, y: 0 },
    { x: 0.1, y: 0.05 },
    { x: 0.12, y: 0.1 },
    { x: 0.2, y: 0.05 },
    { x: 0.21, y: 0 },
    { x: 0.26, y: 1 },
    { x: 0.31, y: -0.17 },
    { x: 0.35, y: 0 },
    { x: 0.4, y: 0 },
    { x: 0.45, y: 0.05 },
    { x: 0.5, y: 0.06 },
    { x: 0.53, y: 0.07 },
    { x: 0.58, y: 0.06 },
    { x: 0.6, y: 0.05 },
    { x: 0.65, y: 0 },
    { x: 0.68, y: 0 },
    { x: 0.7, y: 0 },
    { x: 0.75, y: 0 },
    { x: 0.78, y: 0.01 },
    { x: 0.8, y: 0.02 },
    { x: 0.82, y: 0.03 },
    { x: 0.85, y: 0.02 },
    { x: 0.86, y: 0.01 },
    { x: 0.88, y: 0 },
    { x: 0.9, y: 0 },
    { x: 0.9, y: 0 },
    { x: 0.92, y: 0 },
    { x: 0.95, y: 0 },
    { x: 1, y: 0.1 },
    { x: 1.1, y: 0.05 },
    { x: 1.15, y: 0.1 },
    { x: 1.16, y: 0.05 },
    { x: 1.17, y: 0 },
    { x: 1.25, y: 1 },
    { x: 1.3, y: -0.17 },
    { x: 1.4, y: 0 },
    { x: 1.55, y: 0 },
    { x: 1.65, y: 0.05 },
    { x: 1.71, y: 0.06 },
    { x: 1.75, y: 0.07 },
    { x: 1.78, y: 0.06 },
    { x: 1.79, y: 0.05 },
    { x: 1.8, y: 0.0 },
    { x: 2, y: 0.1 },
  ];








  // Calculate the scaling factors based on chart dimensions and data range
  const xScale = (362 - 50) / (ecgData.length - 1);
  const yScale = (148 - 50) / (Math.max(...ecgData.map(point => point.y)) - Math.min(...ecgData.map(point => point.y)));




  // Convert ECG data to SVG path
  const ecgPath = `M${ecgData.map((point, index) => `${50 + index * xScale},${230 - (point.y - Math.min(...ecgData.map(point => point.y))) * yScale}`).join(' L')}`;






  const historyModel = {
    display: isModalOpen1 ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'navy',
    zIndex: 1000,
    width: '20em',
    height: '8.5em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3.3em, white 3.3em)`,
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
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px' }} />
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
          <div key={index} style={historyRectangleStyle}
            onClick={() => handleItemClick(index)}>
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








        {/* <div className="white-container" style={{ marginBottom: '10px', width: "96%", background: "#e5e5e6;", position: "relative" }}> */}




        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeDialog}
          contentLabel="Take Vital Signs"
          className="modal"
          overlayClassName="overlay"
        >


          <div style={historyModel}>


            <div style={ECGContainer}>


              <div>
                <div className="image-container">
                  <img src="hypertension.png" alt="Blood Pressure" className="image1" />
                  <img src="oxygen.png" alt="Oxygen Saturation" className="image1" /></div>




                <div className="header-container">
                  <h4 className="header-title">Blood Pressure</h4>
                  <h4 className="header-title">Oxygen Saturation</h4>
                </div>


                <div className="details-container">
                  {Blood1 !== 0 ? (
                    <>
                      <div className="value">{Blood1}</div>
                    </>
                  ) : (
                    <div className="value"> 0 </div>
                  )}
                  {oxygen !== 0 ? (
                    <>
                      <div className="value">{oxygen}</div>
                    </>
                  ) : (
                    <div className="value"> 0 </div>
                  )}
                </div>


                <div className="tilte-contaniner">
                  <div className="tilte">Normal Range</div>
                  <div className="tilte">Normal Range</div>
                </div>


                <div className="range-container">
                  <div className="range">120/80 - 140/90</div>
                  <div className="range">95 - 100</div>
                </div>


                <div className="image-container">
                  <img src="heart.png" alt="Heart Rate" className="image" />
                  <img src="Thermometer.png" alt="Body Temperature" className="image" /></div>


                <div className="header-container1 ">
                  <h4 className="header-title1">Heart Rate</h4>
                  <h4 className="header-title1">Body Temperature</h4>
                </div>


                <div className="details-container">
                  {HR !== 0 ? (
                    <>
                      <div className="value">{HR}</div>
                    </>
                  ) : (
                    <div className="value">0</div>
                  )}
                  {Temperature !== 0 ? (
                    <>
                      <div className="value">{Temperature}</div>
                    </>
                  ) : (
                    <div className="value">0</div>
                  )}
                </div>


                <div className="tilte-contaniner">
                  <div className="tilte">Normal Range</div>
                  <div className="tilte">Normal Range</div>
                </div>


                <div className="range-container1">
                  <div className="range1">60 - 90</div>
                  <div className="range1">96 F - 98.4 F</div>
                </div>


                <div className="image-container">
                  <img src="lungs.png" alt="Respiration Rate" className="image" />
                  <img src="bmi_icon.png" alt="Body Mass Index" className="image" /></div>




                <div className="header-container">
                  <h4 className="header-title">Respiration Rate</h4>
                  <h4 className="header-title">Body Mass Index</h4>
                </div>


                <div className="details-container">
                  {Respiration !== 0 ? (
                    <>
                      <div className="value">{Respiration}</div>
                      {/* <div className="result">{setRespriationValue}</div> */}
                    </>
                  ) : (
                    <div className="value"> 0 </div>
                  )}
                  {bmi !== 0 ? (
                    <>
                      {/* <div className="value">{bmi.toFixed(2)}</div>  */}
                      <div className="value">{bmi}</div>
                      {/* <div className="result">{setBmiValue}</div> */}
                    </>
                  ) : (
                    <div className="value"> 0 </div>
                  )}
                </div>


                <div className="tilte-contaniner">
                  <div className="tilte">Normal Range</div>
                  <div className="tilte">Normal Range</div>
                </div>


                <div className="range-container2">
                  <div className="range2">12 - 20</div>
                  <div className="range2">18.5 - 25</div>
                </div>
              </div>


              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                <svg width={500} height={350} style={svgStyle}>
                  {/* X-Axis */}
                  <line x1={50} y1={300} x2={362} y2={300} stroke="black" strokeWidth="2" />
                  {/* X-Axis Label (centered) */}
                  <text x={205} y={325} textAnchor="middle" fontWeight="bold">(Seconds)</text>


                  {/* Y-Axis */}
                  <line x1={50} y1={300} x2={50} y2={50} stroke="black" strokeWidth="2" />
                  {/* Y-Axis Label (centered) */}
                  <text x={7} y={188} textAnchor="middle" fontWeight="bold" transform="rotate(-90, 10, 175)">(Milli-Volts)</text>


                  {/* Optional labels for Y-axis */}
                  <text x={40} y={300} textAnchor="end">-1</text>
                  <text x={40} y={225} textAnchor="end">0</text>
                  <text x={40} y={150} textAnchor="end">1</text>
                  <text x={40} y={75} textAnchor="end">2</text>


                  {/* Horizontal lines with increased spacing */}
                  <line x1={50} y1={300 - HorizontalLineSpacing} x2={362} y2={300 - HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
                  <line x1={50} y1={300 - 2 * HorizontalLineSpacing} x2={362} y2={300 - 2 * HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
                  <line x1={50} y1={300 - 3 * HorizontalLineSpacing} x2={362} y2={300 - 3 * HorizontalLineSpacing} stroke="black" strokeWidth="2" />


                  {/* Render the ECG line series */}
                  <path d={ecgPath} stroke="#0276cb" strokeWidth="2.5" fill="none" />
                  {/* Render the vertical lines */}
                  {verticalLines}
                </svg>
              </div>


              <div style={{ marginTop: '90px' }}>
                <center><h3 className="ECGIntervelText">ECG Intervals</h3></center>


                <div className="container-image">


                  <div className="header-container">
                    <h3 className="header-title2">QT Interval</h3>
                    <h3 className="header-title2">ST Segment</h3>
                  </div>


                  <div className="details-container">
                    <div className="value"> {qt} </div>
                    <div className="value"> {ST} </div>
                  </div>


                  <div className="tilte-contaniner">
                    <div className="tilteT">Normal Range</div>
                    <div className="tilteT">Normal Range</div>
                  </div>


                  <div className="range-container1">
                    <div className="range5">0.06 - 01.2 Sec</div>
                    <div className="range5">0.08 Sec</div>
                  </div>


                  <div className="header-container">
                    <h3 className="header-title2">PR Interval</h3>
                    <h3 className="header-title2">QRS Interval</h3>
                  </div>


                  <div className="details-container">
                    <div className="value"> {Pr} </div>
                    <div className="value"> {Qrs} </div>
                  </div>


                  <div className="tilte-contaniner">
                    <div className="tilteT">Normal Range</div>
                    <div className="tilteT">Normal Range</div>
                  </div>


                  <div className="range-container1">
                    <div className="range6">0.12 - 0.20 Sec</div>
                    <div className="range6">0.06 - 0.10 Sec</div>
                  </div>
                </div>
              </div>


              <div
                style={{
                  position: "absolute",
                  top: "23em",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
              </div>
            </div>
          </div>
        </Modal>


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
