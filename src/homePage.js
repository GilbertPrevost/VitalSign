import React, { useState, useRef } from "react";
import "./App.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function HomePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(Number);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [bmiDescription, setBMIDescription] = useState("");

  const [oxygen, setOxygenValue] = useState("0");
  const [Blood, setBloodValue] = useState("0");
  const [Respiration, setRespriationValue] = useState("0");
  const [Temperature, setTempValue] = useState("0");
  const [heart, setHeartValue] = useState("0");
  const [bmiDes, setBmiValue] = useState("0");

  const [oxygen1, setOxygenValue1] = useState("");
  const [Blood1, setBloodValue1] = useState("");
  const [Respiration1, setRespriationValue1] = useState("");
  const [Temperature1, setTempValue1] = useState("");
  const [heart1, setHeartValue1] = useState("");
  const [bmiDes1, setBmiValue1] = useState("");

  // Add these state variables at the top of your component
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomFactor = 0.1; // You can adjust this factor as needed

  const [showContainer, setShowContainer] = useState(false);
  const toggleECGContainer = () => {
    setShowContainer(!showContainer);
  };

  const zoomECG = (zoomIn) => {
    if (zoomIn) {
      setZoomLevel(zoomLevel + zoomFactor);
    } else {
      setZoomLevel(Math.max(zoomLevel - zoomFactor, 1)); // Ensure minimum zoom level is 1
    }
  };


  const [bmi, setBMI] = useState(null);

  const navigate = useNavigate();

  const takeVitalSigns = () => {
    setModalIsOpen(true);
  };

  const GoToHistory = () => {
    navigate("/history");
  };

  const closeDialog = () => {
    setModalIsOpen(true);
  };

  const validateForm = () => {
    if (!gender || age <= 0 || height <= 0 || weight <= 0) {
      setValidationError(true);
    } else {
      setValidationError(false);
      calculateBMI();
      navigate("/takevitals");
    }
  };

  const RandomOxygenValue = () => {
    let oxygen = ""
    setOxygenValue1(oxygen);
    const randomValue = Math.floor(Math.random() * (100 - 95 + 1)) + 95;
    setOxygenValue(String(randomValue));

  };

  const bloodpre = () => {
    let blood = ""
    setBloodValue1(blood);
    const systolic = Math.floor(Math.random() * (140 - 120 + 1)) + 120;
    const diastolic = Math.floor(Math.random() * (90 - 80 + 1)) + 80;
    const bloodPressureValue = `${systolic}/${diastolic}`;
    setBloodValue(String(bloodPressureValue));
  };

  const RespirationRate = () => {
    let blood = ""
    setRespriationValue1(blood);
    const randomValue = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    setRespriationValue(String(randomValue));
  };

  const BodyTemperature = () => {
    let blood = ""
    setTempValue1(blood);
    const randomValue = Math.floor(Math.random() * (98.4 - 96 + 1)) + 96;
    setTempValue(String(randomValue));
  };

  const HeartRate = () => {
    let blood = ""
    setHeartValue1(blood);
    const randomValue = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
    setHeartValue(String(randomValue));
  };

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue);

      let bmiResult = "";
      if (bmiValue < 18.5) {
        bmiResult = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        bmiResult = "Normal Weight";
      } else if (bmiValue >= 25 && bmiValue < 30) {
        bmiResult = "Overweight";
      } else {
        bmiResult = "Obese";
      }
      setBMIDescription(bmiResult);
    }
  };

  const [hasPerformedInitialSetup, setHasPerformedInitialSetup] = useState(false);
  var isSuccess = true;
  isSuccess = localStorage.getItem('isSuccess');

  // Perform initial setup only once when isSuccess becomes true
  if (isSuccess && hasPerformedInitialSetup) {
    setHasPerformedInitialSetup(true);
    calculateBMI();
    RandomOxygenValue();
    bloodpre();
    RespirationRate();
    BodyTemperature();
    HeartRate();
    localStorage.setItem('isSuccess', false);
  }

  const svgStyle = {
    display: 'block',
    margin: 'auto',
  };

  const numVerticalLines = 10;
  const HorizontalLineSpacing = (465 - 50) / (numVerticalLines - 1) * 1.8;
  const verticalLineSpacing = (223 - 50) / (numVerticalLines - 1) * 1.8;

  const heading = {
    backgroundColor: "navy",
    color: 'white',
    padding: '2px',
    textAlign: 'center',
    fontWeight: 'semi-bold',
    fontSize: '25px',
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

  const headingStyles = {
    width: '20px',
    backgroundColor: 'navy',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
  };

  const ECGContainer = {
    backgroundColor: "#efefef",
    width: "96%",
    margin: "auto",
    marginRight: "2em",
    marginLeft: "1.3em",
    transform: `scale(${zoomLevel})`, // Apply the zoom level to scale the container
  };




  return (

    <div>

      <header style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        padding: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(Indian-Girls.jpg)`,
        backgroundRepeat: 'no-repeat',
        zIndex: '999', // Added this to make sure the header is on top
      }}>
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px' }} />
        <div style={{}}></div>
      </header>

      <div className="container" >

        <header style={{
          padding: '9px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'navy', border: '1px solid #ccc', borderRadius: '5px',
          color: "white", marginBottom: "3px", fontSize: "25px"
        }}>
          VITAL SIGNS
        </header>

        <div className="image-container">
          <img src="hypertension.png" alt="Blood Pressure" className="image1" />
          <img src="oxygen.png" alt="Oxygen Saturation" className="image1" /></div>

        <div className="header-container">
          <h4 className="header-title">Blood Pressure</h4>
          <h4 className="header-title">Oxygen Saturation</h4>
        </div>

        <div className="details-container">
          {Blood !== 0 ? (
            <>
              <div className="value">{Blood}</div>
              <div className="result">{setBloodValue}</div>
            </>
          ) : (
            <div className="value"> 0 </div>
          )}
          {oxygen !== 0 ? (
            <>
              <div className="value">{oxygen}</div>
              <div className="result">{setOxygenValue}</div>
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
          {heart !== 0 ? (
            <>
              <div className="value">{heart}</div>
              <div className="result">{setHeartValue}</div>
            </>
          ) : (
            <div className="value"> 0 </div>
          )}
          {Temperature !== 0 ? (
            <>
              <div className="value">{Temperature}</div>
              <div className="result">{setTempValue}</div>
            </>
          ) : (
            <div className="value"> 0 </div>
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
              <div className="result">{setRespriationValue}</div>
            </>
          ) : (
            <div className="value"> 0 </div>
          )}
          {bmiDes !== 0 ? (
            <>
              {/* <div className="value">{bmi.toFixed(2)}</div>  */}
              <div className="value">{bmiDes}</div>
              <div className="result">{setBmiValue}</div>
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

        {/* </div> */}

        <div className="footer">
          <button
            className="button"
            onClick={takeVitalSigns}
            style={{ width: '180px', height: '40px', fontSize: '19px', backgroundColor: 'navy', color: 'white' }}
          >
            Take Vital Signs
          </button>

          <button
            className="button"
            onClick={GoToHistory}
            style={{ width: '180px', height: '40px', fontSize: '19px', backgroundColor: 'navy', color: 'white' }}
          >
            Vital Sign History
          </button>
        </div>

        <button
          className="button ecg-button"
          onClick={toggleECGContainer}
          style={{ height: '40px', fontSize: '19px', backgroundColor: 'navy', color: 'white', marginBottom: '2em' }}
        >
          <span className="button-text">
            {showContainer ? "Electrocardiogram" : "Electrocardiogram"}
          </span>
        </button>

        {showContainer && (
          <div
            className="white-container"
            style={{ marginBottom: '10px', width: "96%", background: "#e5e5e6;", }}
          >

            <div style={ECGContainer}>
              {/* Electrocardiogram graph */}
              <div
                style={{
                  position: "relative", // Make sure this div is a positioned container
                  width: "100%",
                  height: "100%",
                }}
              >
                <svg width={"100%"} height={350} style={svgStyle}>
                  {/* X-Axis */}
                  <line x1={50} y1={300} x2={362} y2={300} stroke="black" strokeWidth="2" />
                  {/* X-Axis Label (centered) */}
                  <text x={205} y={325} textAnchor="middle" fontWeight="bold">
                    (Seconds)
                  </text>

                  {/* Y-Axis */}
                  <line x1={50} y1={300} x2={50} y2={50} stroke="black" strokeWidth="2" />
                  {/* Y-Axis Label (centered) */}
                  <text
                    x={7}
                    y={188}
                    textAnchor="middle"
                    fontWeight="bold"
                    transform="rotate(-90, 10, 175)"
                  >
                    (Milli-Volts)
                  </text>

                  {/* Optional labels for Y-axis */}
                  <text x={40} y={300} textAnchor="end">
                    -1
                  </text>
                  <text x={40} y={225} textAnchor="end">
                    0
                  </text>
                  <text x={40} y={150} textAnchor="end">
                    1
                  </text>
                  <text x={40} y={75} textAnchor="end">
                    2
                  </text>

                  {/* Horizontal lines with increased spacing */}
                  <line
                    x1={50}
                    y1={300 - HorizontalLineSpacing}
                    x2={362}
                    y2={300 - HorizontalLineSpacing}
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1={50}
                    y1={300 - 2 * HorizontalLineSpacing}
                    x2={362}
                    y2={300 - 2 * HorizontalLineSpacing}
                    stroke="gray"
                    strokeWidth="1"
                  />
                  <line
                    x1={50}
                    y1={300 - 3 * HorizontalLineSpacing}
                    x2={362}
                    y2={300 - 3 * HorizontalLineSpacing}
                    stroke="black"
                    strokeWidth="2"
                  />

                  {/* Render the ECG line series */}
                  <path d={ecgPath} stroke="#0276cb" strokeWidth="2.5" fill="none" />
                  {/* Render the vertical lines */}
                  {verticalLines}
                </svg>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end", // Align buttons to the right
                  }}
                >
                  <button
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "navy",
                      color: "white",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                    onClick={() => zoomECG(true)} // Zoom In
                  >
                    +
                  </button>
                  <button
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "navy",
                      color: "white",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => zoomECG(false)} // Zoom Out
                  >
                    -
                  </button>

                </div>
              </div>
            </div>



            <div style={{ marginTop: '75px' }}>
              <center><h3>ECG Intervals</h3></center>

              <div className="container-image">

                <div className="header-container">
                  <h3 className="header-title2">QT Interval</h3>
                  <h3 className="header-title2">ST Segment</h3>
                </div>

                <div className="details-container">
                  <div className="value"> 0 </div>
                  <div className="value"> 0 </div>
                </div>

                <div className="tilte-contaniner">
                  <div className="tilte">Normal Range</div>
                  <div className="tilte">Normal Range</div>
                </div>

                <div className="range-container1">
                  <div className="range3">0.06 - 01.2 Sec</div>
                  <div className="range3">0.08 Sec</div>
                </div>

                <div className="header-container">
                  <h3 className="header-title2">PR Interval</h3>
                  <h3 className="header-title2">QRS Interval</h3>
                </div>

                <div className="details-container">
                  <div className="value"> 0 </div>
                  <div className="value"> 0 </div>
                </div>

                <div className="tilte-contaniner">
                  <div className="tilte">Normal Range</div>
                  <div className="tilte">Normal Range</div>
                </div>

                <div className="range-container1">
                  <div className="range4">0.12 - 0.20 Sec</div>
                  <div className="range4">0.06 - 0.10 Sec</div>
                </div>
              </div>
            </div>
          </div>

        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeDialog}
          contentLabel="Take Vital Signs"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "-30px",
              }}
            >
              <button
                className="close-button"
                onClick={() => {
                  closeDialog();
                  setModalIsOpen(false);
                }}
                style={{
                  background: "navy",
                  color: "white",
                  borderColor: "white",
                  fontWeight: "bold",
                  padding: "3px 7px",
                  borderRadius: "14px",
                  fontSize: "12px",
                  margin: "5px",
                }}
              >
                x
              </button>
            </div>
            <h6> . </h6>
            <form>
              <div
                id="dialog_box"
                style={{ width: "100%", background: "url('dialog_box.jpg')" }}
              >
                <div
                  id="header"
                  style={{
                    width: "100%",
                    height: "40px",
                    background: "navy",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h2
                    style={{
                      margin: "0",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Confirm and / or Edit your profile
                  </h2>
                </div>

                <div
                  style={{ width: "100%", height: "1px", background: "white" }}
                ></div>
                <div
                  id="profile_section"
                  style={{ margin: "7px", textAlign: "center" }}
                >
                  <h3
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Gender
                  </h3>
                  <select
                    id="edtgender"
                    value={gender}
                    style={{
                      width: "100%",
                      height: "35px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Select the Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <h3
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Age
                  </h3>
                  <input
                    id="edtage"
                    type="number"
                    style={{
                      width: "100%",
                      height: "35px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />

                  <h3
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Height (CM)
                  </h3>
                  <input
                    id="edtheight"
                    type="number"
                    style={{
                      width: "100%",
                      height: "35px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Height in Centimeters"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />

                  <h3
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Weight (KG)
                  </h3>
                  <input
                    id="edtweight"
                    type="number"
                    style={{
                      width: "100%",
                      height: "35px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Weight in Kilograms"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div
                  style={{ width: "100%", height: "1px", background: "grey" }}
                ></div>
                <div
                  id="proceed_section"
                  style={{ textAlign: "center", margin: "3px", marginTop: "5px" }}
                >
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    If necessary, you can edit your profile before proceeding.
                  </p>
                  <button
                    type="button"
                    className="button"
                    style={{
                      backgroundColor: '#f8b413',
                      color: "white",
                      fontWeight: "bold",
                      padding: "5px 20px",
                      fontSize: "15px",
                      margin: "5px",
                    }}
                    onClick={validateForm}
                  >
                    Proceed
                  </button>
                  {validationError && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Please fill in all required fields correctly.
                    </p>
                  )}
                </div>
              </div>
            </form>
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
          marginTop: '100vh',
          width: '100%',
          backgroundImage: `url(Indian-Girls.jpg)`,
          backgroundRepeat: 'no-repeat'
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

    </div >

  );
}

export default HomePage;