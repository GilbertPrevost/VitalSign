import "./App.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

Modal.setAppElement("#root");


function HomePage() {

  const [guid, setguid] = useState(localStorage.getItem('guid'));
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const [isSaveYes, setIsSaveYes] = useState(false);
  const [isSaveNo, setIsSaveNo] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
  const loginUrl = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/PatientVitalSigns/GetDetails_V2`;
  const saveVitalsUrl = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/PatientVitalSigns/Post_V1`;


  const [userCameFromCameraVitals, setuserCameFromCameraVitals] = useState(localStorage.getItem('0'));
  const [HR, setHR] = useState(localStorage.getItem('0'));
  const [Blood1, setBloodp] = useState(localStorage.getItem('0'));
  const [Temperature, setTemp] = useState(localStorage.getItem('0'));
  const [oxygen, setOxyzen] = useState(localStorage.getItem('0'));
  const [Respiration, setResp] = useState(localStorage.getItem('0'));
  const [qt, setQt] = useState(localStorage.getItem('0'));
  const [Qrs, setQrs] = useState(localStorage.getItem('0'));
  const [ST, setSt] = useState(localStorage.getItem('0'));
  const [Pr, setPr] = useState(localStorage.getItem('0'));
  const [bmi, setBMI] = useState(localStorage.getItem('0'));

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [gender, setGender] = useState(localStorage.getItem('gender'));
  const [age, setAge] = useState('');
  const [height, setHeight] = useState(localStorage.getItem('height'));
  const [weight, setWeight] = useState(localStorage.getItem('weight'));
  const [validationError, setValidationError] = useState(false);
  const [bmiDescription, setBMIDescription] = useState("");
  const [from, setFrom] = useState("login")

  // Add these state variables at the top of your component
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomFactor = 0.1; // You can adjust this factor as needed

  const [showContainer, setShowContainer] = useState(false);

  const [isRotated, setIsRotated] = useState(false);
  const rotation = isRotated ? 90 : 0;

  const toggleECGContainer = () => {
    setShowContainer(!showContainer);
    setIsRotated(!isRotated);
  };

  const imgStyle = {
    position: 'absolute',
    marginTop: '0.2em',
    right: '13px',
    height: '0.7em',
    width: '0.7em',
    transform: `rotate(${rotation}deg)`,
  };

  const zoomECG = (zoomIn) => {
    if (zoomIn) {
      if (zoomLevel < 1.7) {
        setZoomLevel((prevZoom) => Math.min(prevZoom + zoomFactor, 5));
      }
    } else {
      if (zoomLevel > 1) {
        setZoomLevel((prevZoom) => Math.max(prevZoom - zoomFactor, 1));
      }
    }
  };





  const navigate = useNavigate();


  const takeVitalSigns = () => {
    setModalIsOpen(true);
  };


  const GoToHistory = () => {
    navigate("/history");
  };


  const closeDialog = () => {
    setModalIsOpen(false);
  };


  const validateForm = () => {
    if (!gender || age <= 0 || height <= 0 || weight <= 0) {
      setValidationError(true);
    } else {
      setValidationError(false);

      navigate("/takevitals");
      calculateBMI();
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
      const bmiValue1 = weight / (heightInMeters * heightInMeters);
      const bmiValue = bmiValue1.toFixed(2);
      localStorage.setItem('Bmi1', + bmiValue)
      console.log("bMi.." + bmiValue)
    }
  };

  const [hasPerformedInitialSetup, setHasPerformedInitialSetup] = useState(false);
  var isSuccess = true;
  isSuccess = localStorage.getItem('isSuccess');


  // Perform initial setup only once when isSuccess becomes true
  if (isSuccess && hasPerformedInitialSetup) {
    setHasPerformedInitialSetup(true);

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
    const x = 90 + i * verticalLineSpacing;
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
  const xScale = (361 - 50) / (ecgData.length - 1);
  const yScale = (148 - 50) / (Math.max(...ecgData.map(point => point.y)) - Math.min(...ecgData.map(point => point.y)));

  // Convert ECG data to SVG path
  const ecgPath = `M${ecgData.map((point, index) => `${90 + index * xScale},${230 - (point.y - Math.min(...ecgData.map(point => point.y))) * yScale}`).join(' L')}`;

  const headingStyles = {
    width: '20px',
    backgroundColor: 'navy',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
  };

  const handleScrollX = (scroll) => {
    const container = document.getElementById("ecg-container");
    if (container) {
      const maxScrollX = container.scrollWidth - container.clientWidth;
      setScrollX(Math.min(maxScrollX, Math.max(0, scroll)));
    }
  };

  const handleScrollY = (scroll) => {
    const container = document.getElementById("ecg-container");
    if (container) {
      const maxScrollY = container.scrollHeight - container.clientHeight;
      setScrollY(Math.min(maxScrollY, Math.max(0, scroll)));
    }
  };

  useEffect(() => {
    handleScrollX(scrollX);
    handleScrollY(scrollY);
  }, [scrollX, scrollY]);


  const ECGContainer = {
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

  const ECGGraphContainer = {
    display: "flex",
    backgroundColor: "#efefef",
    transform: `scale(${zoomLevel})`,
    width: "96%",
    transformOrigin: "center",
    position: "absolute",
    top: "0",
    left: "0",
    transition: "width 0.2s, height 0.2s",
    overflow: "auto",
  };

  const Navigate = useNavigate();
  const backButton = () => {
    Navigate('/');
  };

  const okClick = () => {
    setIsSaveYes(false)
  }

  const [showSaveButton, setShowSaveButton] = useState(false);

  // useEffect(() => {
  //   const userCameFromCameraVitals = localStorage.getItem('cameFromCameraVitals');

  //   if (userCameFromCameraVitals) {
  //     setShowSaveButton(true);

  //     localStorage.removeItem('cameFromCameraVitals');
  //   }
  // }, []);






  useEffect(() => {
    const userCameFromCameraVitals = localStorage.getItem('cameFromCameraVitals');
    setTime(getCurrentTime());
    // callVitalsHistoryOnLoad();

    if (userCameFromCameraVitals) {
      // setuserCameFromCameraVitals(localStorage.getItem('cameFromCameraVitals'));
      setShowSaveButton(true);
      setGraph(true);

      setHR(localStorage.getItem('HR'));
      setResp(localStorage.getItem('resp'));
      setBloodp(localStorage.getItem('bloodp'));
      // setBloodp("ee");
      setTemp(localStorage.getItem('temp'));
      setBMI(localStorage.getItem('Bmi1'))


      setOxyzen(localStorage.getItem('oxyzen'));
      setSt(localStorage.getItem('st'));
      setPr(localStorage.getItem('pr'));
      setQrs(localStorage.getItem('qrs'));
      setQt(localStorage.getItem('qt'));




      localStorage.removeItem('cameFromCameraVitals');
    }
    else {
      callVitalsHistoryOnLoad();
    }
  }, []);


  // useEffect(() => {
  //   setTime(getCurrentTime());
  //   callVitalsHistoryOnLoad();


  // }, []);
  useEffect(() => {
    setguid(localStorage.getItem('guid'));
    setFrom(localStorage.getItem('from'));
    setGender(localStorage.getItem('gender'));
    setHeight(localStorage.getItem('height'));
    setWeight(localStorage.getItem('weight'));

  }, []);


  const getCurrentTime = () => {
    const now = new Date();


    // Get the current year, month, day, hours, and minutes
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    // Create the formatted date and time string
    const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;


    setTime(formattedTime);
    return formattedTime;
  };





  // useEffect(() => {


  //   console.log('from', from);
  //   if (from === "camera") {


  //     setHR(localStorage.getItem('HR'));
  //     setResp(localStorage.getItem('resp'));
  //     setBloodp(localStorage.getItem('bloodp'));
  //     // setBloodp("ee");
  //     setTemp(localStorage.getItem('temp'));
  //     setBMI(localStorage.getItem('Bmi1'))


  //     setOxyzen(localStorage.getItem('oxyzen'));
  //     setSt(localStorage.getItem('st'));
  //     setPr(localStorage.getItem('pr'));
  //     setQrs(localStorage.getItem('qrs'));
  //     setQt(localStorage.getItem('qt'));


  //   }
  //   else if (from === "login") {
  //     callVitalsHistoryOnLoad();
  //   }


  //   else {
  //     callVitalsHistoryOnLoad();
  //   }




  // }, [from]);


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
        var dataArray = response.data;
        console.log("array lenth", dataArray.length);

        // else {
        if (dataArray.length !== 0) {
          if (!userCameFromCameraVitals) {
            setBloodp(dataArray[0].bloodPressure);
            setOxyzen(dataArray[0].oxygenLevel);
            setHR(dataArray[0].heartRate);
            setTemp(dataArray[0].bodyTemprature);
            setResp(dataArray[0].respirationRate);
            setBMI(dataArray[0].bodyMassIndex);
            setPr(dataArray[0].printerval);
            setQrs(dataArray[0].qrsinterval);
            setQt(dataArray[0].qtinterval);
            setSt(dataArray[0].stinterval);
          }
        } else {
          setBloodp('0');
          setOxyzen('0');
          setHR('0');
          setTemp('0');
          setResp('0');
          setBMI('0');
          setPr('0');
          setQrs('0');
          setQt('0');
          setSt('0');
        }
        // }


        // setVitalSigns(response.data);
      })
      .catch((error) => {
        console.error("Error:1111", error);
        setBloodp('0');
        setOxyzen('0');
        setHR('0');
        setTemp('0');
        setResp('0');
        setBMI('0');
        setPr('0');
        setQrs('0');
        setQt('0');
        setSt('0');
      });


  };


  var requestBodySave = {
    PatientGUID: guid,
    vitalSignType: "All",
    heartRate: parseInt(HR),
    bloodPressure: Blood1,
    respirationRate: parseInt(Respiration),
    oxygenLevel: parseInt(oxygen),
    bodyTemprature: parseFloat(Temperature),
    recordingDateTime: time,
    bodyMassIndex: bmi,
    qtinterval: qt,
    stinterval: ST,
    printerval: Pr,
    qrsinterval: Qrs
  };
  const openLogoutModel = () => {
    setIsLogout(true);
  }



  const saveVitals = () => {
    setIsLoading(true);
    console.log("Requesting....", requestBodySave);


    axios
      .post(saveVitalsUrl, requestBodySave, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle the response data here
        console.log("data", response.data);
        var data = response.data.result;
        // var errorjson = JSON.parse();
        if (data == "1") {
          console.log("vitals saved");
          setIsSaveYes(true)
        }
        else {
          console.log("vitals not saved");
          setIsSaveNo(true);

        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };




  const LoadingSpinner = () => {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  };



  const [showGraph, setGraph] = useState(false);

  // useEffect(() => {
  //   const userCameFromCameraVitals = localStorage.getItem('cameFromCameraVitals');

  //   if (userCameFromCameraVitals) {


  //     localStorage.removeItem('cameFromCameraVitals');
  //   }
  // }, []);



  const overlayStyle = {
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };



  const saveYes = {
    display: isSaveYes ? 'block' : 'none',
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

  const saveNo = {
    display: isSaveNo ? 'block' : 'none',
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

  const logout = {
    display: isLogout ? 'block' : 'none',
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

  const okayButtonStyle = {
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    left: '8em',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
  };

  const okayButtonStyleSuccess = {
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
  };
  const cancelButtonStyle = {
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    right: '2em',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
  };


  const headingStyle = {
    color: 'white',
    marginTop: '0px',
  };

  const alertTextStyle = {
    color: 'black',
  }




  const openModal = () => {
    setIsModalOpen(true);
  };
  // const handleOkClick = () => {

  //   openModal();

  // };


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
        zIndex: '999',
      }}>
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px',marginRight:'1.5em' }} />
      </header>

      <div className="container" >

        <header style={{
          height: '1.4em',
          padding: '9px',
          display: 'flex',
          backgroundColor: 'navy',
          border: '1px solid #ccc',
          borderRadius: '5px',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          marginBottom: '3px',

        }}>
          <div style={{
            marginLeft: '9.3em',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 600
          }}>
            VITAL SIGNS
          </div>

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
              height: 18,
            }}
            onClick={() => {
              openLogoutModel();
            }}
          >
            <img
              src="logout.png"
              alt="Back"
              style={{
                height: '25px',
                width: '25px',
              }}
            />
            {/* Logout */}
          </button>

        </header>

        <div style={logout}>
          <button style={okayButtonStyle} onClick={() => { backButton(); }}>
            Okay
          </button>
          <button style={cancelButtonStyle} onClick={() => { setIsLogout(false) }}>
            Cancel
          </button>
          <h2 style={headingStyle}>Alert</h2>
          <h4 style={alertTextStyle}>Are You sure you want to logout?</h4>
        </div>

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

        <div className="footer" style={{ display: 'flex', flexDirection: 'column' }}>


          <button
            className="elctrocardiogram-button"
            onClick={toggleECGContainer}

          >
            <span className="button-text">
              {showContainer ? "Electrocardiogram" : "Electrocardiogram"}
            </span>
            <img
              src="arrow.png"
              alt="Arrow"
              style={imgStyle}
            />
          </button>


          {showContainer && (
            <div className="white-container" style={{ marginBottom: '10px', width: "96%", background: "#e5e5e6;", position: "relative" }}>

              <div style={ECGContainer}>
                {/* Electrocardiogram graph */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >

                  <div className="ECGGraphContainer">
                    {/* Electrocardiogram graph */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <svg width={"100%"} height={350} style={svgStyle}>
                        {/* X-Axis */}
                        <line x1={90} y1={300} x2={402} y2={300} stroke="black" strokeWidth="2" />
                        {/* X-Axis Label (centered) */}
                        <text x={235} y={325} textAnchor="middle" fontWeight="bold">
                          (Seconds)
                        </text>

                        {/* Y-Axis */}
                        <line x1={90} y1={300} x2={90} y2={50} stroke="black" strokeWidth="2" />
                        {/* Y-Axis Label (centered) */}
                        <text
                          x={9}
                          y={223}
                          textAnchor="middle"
                          fontWeight="bold"
                          transform="rotate(-90, 10, 175)"
                        >
                          (Milli-Volts)
                        </text>

                        {/* Optional labels for Y-axis */}
                        <text x={80} y={300} textAnchor="end">
                          -1
                        </text>
                        <text x={80} y={225} textAnchor="end">
                          0
                        </text>
                        <text x={80} y={140} textAnchor="end">
                          1
                        </text>
                        <text x={80} y={60} textAnchor="end">
                          2
                        </text>

                        {/* Horizontal lines with increased spacing */}
                        <line
                          x1={90}
                          y1={300 - HorizontalLineSpacing}
                          x2={402}
                          y2={300 - HorizontalLineSpacing}
                          stroke="gray"
                          strokeWidth="1"
                        />
                        <line
                          x1={90}
                          y1={300 - 2 * HorizontalLineSpacing}
                          x2={402}
                          y2={300 - 2 * HorizontalLineSpacing}
                          stroke="gray"
                          strokeWidth="1"
                        />
                        <line
                          x1={90}
                          y1={300 - 3 * HorizontalLineSpacing}
                          x2={402}
                          y2={300 - 3 * HorizontalLineSpacing}
                          stroke="black"
                          strokeWidth="2"
                        />

                        {/* Render the ECG line series */}
                        <path d={ecgPath} stroke="#0276cb" strokeWidth="2.5" fill="none" />
                        {/* Render the vertical lines */}
                        {verticalLines}
                      </svg>
                    </div>
                  </div>
                </div>
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
                <button
                  className="zoomPlusButton"
                  onClick={() => {
                    zoomECG(true); // Zoom In
                    handleScrollX(scrollX * zoomFactor);
                    handleScrollY(scrollY * zoomFactor);
                  }}
                >
                  +
                </button>



                <div className="zoomText">Zoom</div>

                <button
                  className="zoomMinusButton"
                  onClick={() => {
                    zoomECG(false); // Zoom Out
                    handleScrollX(scrollX / zoomFactor);
                    handleScrollY(scrollY / zoomFactor);
                  }}
                >
                  -
                </button>


              </div>
            </div>
          )}

          <button
            className="button-ecg-button"
            onClick={takeVitalSigns}
          >
            Take Vital Signs
          </button>

          <button
            className="button-ecg-button"
            onClick={GoToHistory}
          >
            Vital Sign History
          </button>

          {showSaveButton && (
            <button
              className="button-save-button"
              onClick={saveVitals}
              disabled={isLoading}
            >
              SAVE
            </button>
          )}

          <div style={overlayStyle}></div>

          <div style={saveYes}>
            <button style={okayButtonStyleSuccess} onClick={okClick}>
              Okay
            </button>
            <h2 style={headingStyle}>Alert</h2>
            <h4 style={alertTextStyle}>Vitals data saved successfully.</h4>
          </div>

          <div style={saveNo}>
            <button style={okayButtonStyleSuccess} onClick={okClick}>
              Okay
            </button>
            <h2 style={headingStyle}>Alert</h2>
            <h4 style={alertTextStyle}>Network issue please take vitlas once again.</h4>
          </div>



        </div>

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

            </div>
            {/* <h6> . </h6> */}
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
                    marginTop: '1.5em',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        // margin: "0",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: "bold",
                        display:'flex',
                        marginLeft:'2em',
                        // alignItems: "center",
                        // justifyContent: "center",
                      }}
                    >
                      Confirm and / or Edit your profile
                    </h2>
                  </div>

                  
                    <button
                      className="close-button"
                      onClick={() => {
                        setModalIsOpen(false);
                      }}
                      style={{
                        // height: '20px',
                        // width: '20px',
                        // right:'2px',
                        background: "navy",
                        color: "white",
                        borderColor: "white",
                        fontWeight: "bold",
                        padding: "3px 7px",
                        borderRadius: "14px",
                        fontSize: "14px",
                        display:'flex',
                        marginLeft:'1em'
                        // marginRight: '2px',
                        // marginTop: '1em'
                      }}
                    >
                      x
                    </button>

                  

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
                      height: "34px",
                      // marginBottom: "5px",
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
                      height: "34px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Age"
                    value={age}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue >= 0) {
                        setAge(inputValue);
                      }
                    }}
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
                      height: "34px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Height in Centimeters"
                    value={height}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue >= 0) {
                        setHeight(inputValue);
                      }
                    }}
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
                      height: "34px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Weight in Kilograms"
                    value={weight}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue >= 0) {
                        setWeight(inputValue);
                      }
                    }}
                  />
                </div>
                <div
                  style={{ width: "100%", height: "1px", background: "grey" }}
                ></div>
                <div
                  id="proceed_section"
                  style={{ 
                    textAlign: "center", 
                    margin: "3px", 
                    marginTop: "5px" 
                  }}
                >
                  <p style={{ color: "black", fontWeight: "bold",   }}>
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
          <strong style={{ color: "orange" }}>YourVitals, Inc.</strong>
          <span style={{ color: "white" }}>
            ©2023, All Rights Reserved.
          </span>
        </p>
      </footer>
      {isLoading && <LoadingSpinner />}
    </div >

  );

}


export default HomePage;