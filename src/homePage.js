// import "./App.css";
import './homePage.css'
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getCountryCallingCode } from 'libphonenumber-js';
import PhoneInput from 'react-phone-input-2';
import { BASE_API_URL, BASE_API_URL1 } from "./content";
// import * as signalR from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement("#root");




function HomePage() {

  const [showPassword, setShowPassword] = useState(false);


  const [guid, setguid] = useState(localStorage.getItem('guid'));
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state


  const [isSaveYes, setIsSaveYes] = useState(false);
  const [isSaveNo, setIsSaveNo] = useState(false);
  const [isLogout, setIsLogout] = useState(false);


  const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
  const updateUrl = `${BASE_API_URL1}Patient/PUT`;
  const loginUrl = `${BASE_API_URL1}Login`;
  const getHistoryUrl = `${BASE_API_URL1}PatientVitalSigns/GetDetails_V2`;
  const saveVitalsUrl = `${BASE_API_URL1}PatientVitalSigns/Post_V1`;




  const [userCameFromCameraVitals, setuserCameFromCameraVitals] = useState(localStorage.getItem('0'));
  const [HR, setHR] = useState(localStorage.getItem('HR'));
  const [Blood1, setBloodp] = useState(localStorage.getItem('bloodp'));
  const [Temperature, setTemp] = useState(localStorage.getItem('temp'));
  const [oxygen, setOxyzen] = useState(localStorage.getItem('oxyzen'));
  const [Respiration, setResp] = useState(localStorage.getItem('resp'));
  const [qt, setQt] = useState(localStorage.getItem('qt'));
  const [Qrs, setQrs] = useState(localStorage.getItem('qrs'));
  const [ST, setSt] = useState(localStorage.getItem('st'));
  const [Pr, setPr] = useState(localStorage.getItem('pr'));
  const [bmi, setBMI] = useState(localStorage.getItem('Bmi1'));
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [AlertModel, setAlertModel] = useState(false);

  const [dialogueVisible, setDialogueVisible] = useState(false);


  const [gender1, setGender1] = useState(localStorage.getItem('gender'));
  const [age1, setAge1] = useState(localStorage.getItem('about'));
  const [height1, setHeight1] = useState(localStorage.getItem('height'));
  const [weight1, setWeight1] = useState(localStorage.getItem('weight'));



  const [userPhoneNumber, setuserPhoneNumberr] = useState(localStorage.getItem('userPhoneNumber'));
  const [gender, setGender] = useState(localStorage.getItem('gender'));
  const [age, setAge] = useState(localStorage.getItem('about'));
  const [height, setHeight] = useState(localStorage.getItem('height'));
  const [weight, setWeight] = useState(localStorage.getItem('weight'));
  const [password, setpassword] = useState(localStorage.getItem('password'));
  const [userName, setuserName] = useState(localStorage.getItem('userName'));
  const [phoneNumber, setphoneNumber] = useState(localStorage.getItem('phoneNumber'));
  const [firstName, setfirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setlastName] = useState(localStorage.getItem('lastName'));
  const [bloodGroup, setbloodGroup] = useState(localStorage.getItem('bloodGroup'));
  const [address, setaddress] = useState(localStorage.getItem('address'));
  const [email, setemail] = useState(localStorage.getItem('email'));
  const [dob, setdob] = useState(localStorage.getItem('dob'));
  const [medicalPredisposition, setmedicalPredisposition] = useState(localStorage.getItem('medicalPredisposition'));
  const [about, setabout] = useState(localStorage.getItem('about'));
  const [city, setcity] = useState(localStorage.getItem('city'));
  const [state, setstate] = useState(localStorage.getItem('state'));
  const [pinCode, setpinCode] = useState(localStorage.getItem('pinCode'));
  const [regType, setregType] = useState(localStorage.getItem('regType'));
  const [specialistFees, setspecialistFees] = useState(localStorage.getItem('specialistFees'));
  const [specializationName, setspecializationName] = useState(localStorage.getItem('specializationName'));
  const [profileIMG, setprofileIMG] = useState(localStorage.getItem('profileIMG'));
  const [weighttype, setweighttype] = useState(localStorage.getItem('weighttype'));
  const [heighttype, setheighttype] = useState(localStorage.getItem('heighttype'));
  const [feet, setfeet] = useState(localStorage.getItem('feet'));
  const [inches, setinches] = useState(localStorage.getItem('inches'));
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [bmiDescription, setBMIDescription] = useState("");
  const [from, setFrom] = useState("login")
  // Add these state variables at the top of your component
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomFactor = 0.1; // You can adjust this factor as needed

  const [showContainer, setShowContainer] = useState(false);


  const [isRotated, setIsRotated] = useState(false);
  const rotation = isRotated ? 90 : 0;


  const [okButtonClicked, setOkButtonClicked] = useState(false);
  const [shouldContinueInterval, setShouldContinueInterval] = useState(true);
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [dialCodes, setDialCode] = useState('');
  const [countryCode, setCountryCode] = useState(localStorage.getItem('Ccode'));
  // const [unit, setUnit] = useState("cms"); // 'cms', 'ftinches'
  // const [weightUnit, setWeightUnit] = useState("kg");

  const toggleUnit = (e) => {

    if (heighttype === "CMS") {
      const totalInches = Math.round(height / 2.54);
      setfeet(Math.floor(totalInches / 12));
      setinches(totalInches % 12);
      setheighttype("FT/IN");
    } else {

      const totalInches = (parseInt(feet) * 12) + parseInt(inches);
      setHeight(Math.round(totalInches * 2.54)); // Convert inches to cms
      setheighttype("CMS");
    }
  };

  const toggleWeightUnit = (e) => {
    if (weighttype === "KG") {
      // Checked state corresponds to lbs
      setWeight(Math.round(weight * 2.20462)); // Convert kg to lbs
      setweighttype("LBS");
    } else {
      // Unchecked state corresponds to kg
      setWeight(Math.round(weight / 2.20462)); // Convert lbs to kg
      setweighttype("KG");
    }
  };

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
    setValidationError(false);
    setModalIsOpen(true);
  };

  const profileButton = () => {
    setValidationError(false);
    setModalIsOpen1(true);
  };

  const GoToHistory = () => {
    navigate("/history");
  };




  const closeDialog = () => {
    setModalIsOpen(true);
  };




  const closeDialog1 = () => {
    setModalIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false)
    setIsModalOpen(false)
    closeModal();
    callVitalsHistoryOnLoad();
    login();
  };


  const closeModal12 = () => {
    setIsModalOpen1(false)
    setIsModalOpen(false)
    closeModal();
  };



  const handleStartClick = () => {
    if (!gender || age <= 0 || height <= 0 || weight <= 0) {
      setValidationError(true);
    } else {

      const userAgent = navigator.userAgent;
      setValidationError(false);
      setModalIsOpen(false);
      // navigate('/takevitals');
      if (userAgent.match(/Android/i) || userAgent.match(/iPhone/i)) {
        navigate('/takevitals');
        validateForm();
      } else {
        openModal();
        // updateProfileData();
      }
    }
  };

  const validateForm = () => {
    if (!gender || age <= 0 || height <= 0 || weight <= 0) {
      setValidationError(true);
    } else {
      setValidationError(false);
      setModalIsOpen1(false);
      // navigate("/takevitals");
      setUpdateModalOpen(true);
      calculateBMI();
      updateProfileData();
    }
  };


  // const UpdatevalidateForm = () => {
  //   if (!gender || age <= 0 || height <= 0 || weight <= 0) {
  //     setValidationError(true);
  //   } else {
  //     setValidationError(false);


  //     // navigate("/takevitals");
  //     updateProfileData1();
  //     calculateBMI();
  //   }
  // };


  const calculateBMI = () => {

    var weightinKG = weight;

    if (heighttype === 'FT/IN') {
      setHeight((feet * 30.48) + (inches * 2.54));
    }
    if (weighttype === 'LBS') {
      weightinKG = weight * 0.453592;
    }

    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue1 = weightinKG / (heightInMeters * heightInMeters);
      const bmiValue = bmiValue1.toFixed(2);
      localStorage.setItem('Bmi1', bmiValue)
      console.log("bMi..+++--", + bmiValue)
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

  // msd
  const okClick = () => {
    setIsSaveYes(false);
    setShowSaveButton(false);
  }


  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showElectrodiagram, setshowElectrodiagram] = useState(false);


  // useEffect(() => {
  //   const userCameFromCameraVitals = localStorage.getItem('cameFromCameraVitals');


  //   if (userCameFromCameraVitals) {
  //     setShowSaveButton(true);


  //     localStorage.removeItem('cameFromCameraVitals');
  //   }
  // }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {

    const NewUserAlert = localStorage.getItem('WelcomeAlert');

    if (NewUserAlert === 'true') {
      setAlertModel(true);
      localStorage.setItem('WelcomeAlert', 'false');
    }


    const userCameFromCameraVitals = localStorage.getItem('cameFromCameraVitals');
    setTime(getCurrentTime());



    if (userCameFromCameraVitals) {
      // setuserCameFromCameraVitals(localStorage.getItem('cameFromCameraVitals'));
      debugger;
      setShowSaveButton(true);
      setshowElectrodiagram(true);
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


  useEffect(() => {

    login();

    setguid(localStorage.getItem('guid'));
    setFrom(localStorage.getItem('from'));
    setGender(localStorage.getItem('gender'));
    setHeight(localStorage.getItem('height'));
    setWeight(localStorage.getItem('weight'));


    setuserPhoneNumberr(localStorage.getItem('userPhoneNumber'));
    setpassword(localStorage.getItem('password'));
    setuserName(localStorage.getItem('userName'));
    setphoneNumber(localStorage.getItem('phoneNumber'));
    setfirstName(localStorage.getItem('firstName'));
    setlastName(localStorage.getItem('lastName'));
    setbloodGroup(localStorage.getItem('bloodGroup'));
    setaddress(localStorage.getItem('address'));
    setemail(localStorage.getItem('email'));
    setdob(localStorage.getItem('dob'));
    setmedicalPredisposition(localStorage.getItem('medicalPredisposition'));
    setabout(localStorage.getItem('about'));
    setcity(localStorage.getItem('city'));
    setstate(localStorage.getItem('state'));
    setpinCode(localStorage.getItem('pinCode'));
    setregType(localStorage.getItem('regType'));
    setspecialistFees(localStorage.getItem('specialistFees'));
    setspecializationName(localStorage.getItem('specializationName'));
    setprofileIMG(localStorage.getItem('profileIMG'));
    setweighttype(localStorage.getItem('weighttype'));
    setheighttype(localStorage.getItem('heighttype'));


    handleScrollX(scrollX);
    handleScrollY(scrollY);
  }, [scrollX, scrollY]);


  const DateConverter = () => {
    if (dob === '') {
      return "2000-01-01";
    } else {
      const dateParts = dob.split(' ')[0].split('/');
      const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
      return formattedDate;
    }
  }


  var updaterequestBaby = {
    StaffGUID: guid,
    UserName: userPhoneNumber,
    about: age,
    Password: password,
    FirstName: firstName,
    LastName: lastName,
    email: email,
    PhoneNumber: phoneNumber,
    DateofBirth: DateConverter(),
    Gender: gender,
    Address: address,
    City: city,
    State: state,
    Zip: pinCode,
    MedicalPredisposition: medicalPredisposition,
    height: parseInt(height),
    weight: parseInt(weight),
    BloodGroup: bloodGroup,
    heighttype: heighttype,
    RegType: regType,
    weighttype: weighttype,
    Feet: parseInt(feet),
    Inches: parseInt(inches),
    ProfileImageURL: profileIMG
  }

  const updateProfileData = () => {
    console.log("requesting", updaterequestBaby);


    axios
      .post(updateUrl, updaterequestBaby, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        var data = response.data.response;
        // var errorjson = JSON.parse();
        if (data == "Success") {
          console.log("success=", response.data.response);
          console.log("result", response.data.result);
          // navigate("/takevitals");
          localStorage.setItem('gender', gender);
          localStorage.setItem('about', age);
          localStorage.setItem('height', height);
          localStorage.setItem('weight', weight);

          login();

        }
        else {
          console.log("error ", response.data.errormessage);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const closeModal = () => {

    navigate('/Home-Page');
  };


  const modalStyle2 = {
    display: AlertModel ? 'block' : 'none',
    position: 'fixed',
    top: '35%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '20em',
    height: '10em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3em, white 3em)`,
  };

  const openModalStyle = {
    display: UpdateModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: '40%',
    left: '51%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '20em',
    height: '7em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3em, white 3em)`,
  };

  const modalStyle1 = {
    display: isModalOpen1 ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '52.5%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '20em',
    height: '10em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3em, white 3em)`,
  };

  const overlayStyle = {
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '122.5%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
    zIndex: 999, // Lower z-index to be below the modal
  };

  const saveoverlayStyle = {
    display: isSaveYes ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '122.5%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
    zIndex: 999, // Lower z-index to be below the modal
  }

  const logoutoverlayStyle = {
    display: isLogout ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
    zIndex: 999, // Lower z-index to be below the modal
  }

  const grayOverlayStyle = {
    display: AlertModel ? 'block' : 'none',
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Gray background with 50% opacity
    zIndex: 999, // Make it appear above other content
  };

  const grayUpdateOverlayStyle = {
    display: UpdateModalOpen ? 'block' : 'none',
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Gray background with 50% opacity
    zIndex: 999, // Make it appear above other content
  };

  const modalStyle = {
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '52.5%',
    transform: 'translate(-50%, -50%)',
    // backgroundColor: 'navy',
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    width: '20em',
    height: '9.5em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3em, white 3em)`,
  };

  const okButtonStyle = {
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    left: '35%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    padding: '10px 30px',
    borderRadius: '5px',
  };
  const RefreshButtonStyle = {
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    left: '35%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
  };
  const updateProfileData1 = () => {
    console.log("requesting", updaterequestBaby);


    axios
      .post(updateUrl, updaterequestBaby, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        var data = response.data.response;
        // var errorjson = JSON.parse();
        if (data == "Success") {
          console.log("success=", response.data.response);
          console.log("result", response.data.result);
          setModalIsOpen1(false);


          localStorage.setItem('gender', gender);
          localStorage.setItem('about', age);
          localStorage.setItem('height', height);
          localStorage.setItem('weight', weight);






        }
        else {
          console.log("error ", response.data.errormessage);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });




  };














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






  var requestBody = {
    PatientGUID: guid
  };

  const callHistoryOnLoop = () => {
    console.log('Function called when component');
    console.log("requesting", requestBody);

    axios
      .post(getHistoryUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        var data = response.data.length;
        console.log("datalenght", data)
        const olddata = localStorage.getItem('olddatalength')
        if (olddata != data) {
          // alert("New Vital history is added")
          toast("The New Vitals record is captured. Now you can refresh to see the latest vital records.");
          setShouldContinueInterval(false); // Stop the interval if condition is met
          // setInterval(() => {
          closeModal1();
          // callVitalsHistoryOnLoad();
          // login();
          // navigate("/Home-Page");
          // }, 3000);

        }
      })
      .catch((error) => {
        console.error("Error:1111", error);
      });
  };

  useEffect(() => {
    if (okButtonClicked && shouldContinueInterval) {
      callHistoryOnLoop();

      // Set up the interval
      const interval = setInterval(() => {
        if (shouldContinueInterval) { // Check the condition before calling the function
          callHistoryOnLoop();
        }
      }, 5000);

      // Cleanup on unmount or when dependencies change
      return () => clearInterval(interval);
    }
  }, [okButtonClicked, shouldContinueInterval]);



  const callVitalsHistoryOnLoad = () => {
    console.log('Function called when component is loaded');
    console.log("requesting", requestBody);








    axios
      .post(getHistoryUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        var data = response.data.length;
        localStorage.setItem('olddatalength', data)
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

  // const connection = new signalR.HubConnectionBuilder().withUrl(`https://staycured-clinic-staging.azurewebsites.net/API/notificationHub`).build();

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
          setShowSaveButton(false);
          setIsSaveYes(true);
        }
        else {
          console.log("vitals not saved");
          setIsSaveNo(true);


        }
        // connection.start().then(() => {
        //   console.log('Connected!');
        // }).catch(err => console.error(err));
        // connection.invoke("SendNotification", "Vitals saved!").catch(err => console.error(err));
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };














  const [showGraph, setGraph] = useState(false);


  // useEffect(() => {
  //   const userCameFromCameraVitals = localStorage.getItem('cameFromCameraVitals');


  //   if (userCameFromCameraVitals) {




  //     localStorage.removeItem('cameFromCameraVitals');
  //   }
  // }, []);






  // const overlayStyle = {
  //   display: isModalOpen ? 'block' : 'none',
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '122%',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   zIndex: 1000,
  // };






  const saveYes = {
    display: isSaveYes ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '55%',
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
    left: '55%',
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
    top: '33%',
    left: '51.5%',
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


  const cancelButtonStyle1 = {
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    // right: '2em',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    padding: '10px 40px',
    borderRadius: '5px',
  };



  const headingStyle = {
    color: 'white',
    marginTop: '-10px',
  };


  const alertTextStyle = {
    // marginTop: '1em',
    color: 'black',
  }

  const historyBoldTextStyle = {
    fontWeight: 'bold',
  };



  var loginrequestBody = {
    username: userPhoneNumber,
    passwords: password
  };



  const login = () => {
    setIsLoading(true);
    console.log("requesting...", loginrequestBody);
    axios
      .post(loginUrl, loginrequestBody, {
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
          console.log("success=", response.data.response);
          // localStorage.setItem('guid', response.data.guid);
          localStorage.setItem('password', password);
          setGender(response.data.gender);
          setHeight(response.data.height);
          setWeight(response.data.weight);
          setAge(response.data.about);
          setweighttype(response.data.weighttype === '' ? 'KG' : response.data.weighttype);
          setheighttype(response.data.heighttype === '' ? 'CMS' : response.data.heighttype);
          setinches(response.data.inches);
          setfeet(response.data.feet);

          localStorage.setItem('gender', response.data.gender);
          localStorage.setItem('height', response.data.height);
          localStorage.setItem('weight', response.data.weight);
          localStorage.setItem('about', response.data.about);
          localStorage.setItem('weighttype', response.data.weighttype === '' ? 'KG' : response.data.weighttype);
          localStorage.setItem('heighttype', response.data.heighttype === '' ? 'CMS' : response.data.heighttype);
          localStorage.setItem('inches', response.data.inches);
          localStorage.setItem('feet', response.data.feet);


          // localStorage.setItem('userName', response.data.userName);
          // localStorage.setItem('phoneNumber', response.data.phoneNumber);
          // localStorage.setItem('firstName', response.data.firstName);
          // localStorage.setItem('lastName', response.data.lastName);
          // localStorage.setItem('bloodGroup', response.data.bloodGroup);
          // localStorage.setItem('address', response.data.address);
          // localStorage.setItem('email', response.data.email);
          // localStorage.setItem('dob', response.data.dob);
          // localStorage.setItem('medicalPredisposition', response.data.medicalPredisposition);

          // localStorage.setItem('city', response.data.city);
          // localStorage.setItem('state', response.data.state);
          // localStorage.setItem('pinCode', response.data.pinCode);
          // localStorage.setItem('regType', response.data.regType);
          // localStorage.setItem('specialistFees', response.data.specialistFees);
          // localStorage.setItem('specializationName', response.data.specializationName);
          // localStorage.setItem('profileIMG', response.data.profileIMG);
          // localStorage.setItem('weighttype', response.data.weighttype);
          // localStorage.setItem('heighttype', response.data.heighttype);
          // localStorage.setItem('inches', response.data.inches);
          // localStorage.setItem('feet', response.data.feet);







          // Navigate('/Home-Page');
        }
        else {
          console.log("error=", response.data.errormessage);
          // setAlertMessage("Invalid Password");
          // Navigate('/verification');
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:1111", error);
      })
      .finally(() => {
        setIsLoading(false); // Turn off the loading spinner
      });
  };


  useEffect(() => {

    // Check for phone number in local storage
    const savedPhoneNumber = localStorage.getItem('phoneNumberInput');
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }
  }, []);


  const handleCountryCodeChange = (country) => {
    const code = country.dialCode;
    setCountryCode(code);
    setPhoneNumber('');
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };


  const LoadingSpinner = () => {
    return (
      <div className="homePage-loading-spinner">
        <div className="homePage-spinner"></div>
      </div>
    );
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
        zIndex: '999',
      }}>
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px', marginRight: '1.5em' }} />
      </header>


      <div className="homePageContainer" >


        <header style={{
          height: '1.4em',
          // weight: '2.5em',
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

        <ToastContainer />

        <header1 style={{
          height: '2.8em',

          padding: '9px',
          display: 'flex',
          backgroundColor: 'navy',
          border: '1px solid #ccc',
          borderRadius: '5px',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          marginBottom: '3px',
          marginTop: '2px'


        }}>
          {/* <div style={{
            marginLeft: '9.3em',
            textAlign: 'right',
            fontSize: '20px',
            fontWeight: 300
          }}>
            VITAL SIGNS
          </div> */}

          <div style={{ flex: 'auto', marginLeft: '3.7em' }}>
            <p><span style={historyBoldTextStyle}>Gender:</span> {gender}</p>
            <p><span style={historyBoldTextStyle}>Age:</span> {age}</p>

          </div>
          <div style={{ flex: '1' }}>
            <p><span style={historyBoldTextStyle}>Height:</span> {heighttype === 'CMS' ? height + ' cm' : feet + "\'" + inches + "\""}</p>
            <p><span style={historyBoldTextStyle}>Weight:</span> {(weighttype == 'KG') ? weight + ' Kg' : weight + ' lbs'}</p>
          </div>





        </header1>

        <div style={logoutoverlayStyle} onClick={() => setIsLogout(false)}></div>
        <div style={logout} >
          <button style={okayButtonStyle} onClick={() => { backButton(); }}>
            Logout
          </button>
          <button style={cancelButtonStyle} onClick={() => { setIsLogout(false) }}>
            Cancel
          </button>
          <h2 style={headingStyle}>Alert</h2>
          <h4 style={alertTextStyle}>Are You sure you want to logout?</h4>
        </div>


        <div className="homePage-image-container">
          <img src="hypertension.png" alt="Blood Pressure" className="image1" />
          <img src="oxygen.png" alt="Oxygen Saturation" className="image1" /></div>


        <div className="homePage-header-container">
          <h4 className="homePageHeader-title">Blood Pressure</h4>
          <h4 className="homePageHeader-title">Oxygen Saturation</h4>
        </div>


        <div className="homePage-details-container">
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




        <div className="homePage-tilte-contaniner">
          <div className="tilte">Normal Range</div>
          <div className="tilte">Normal Range</div>
        </div>




        <div className="homePage-range-container">
          <div className="range">120/80 - 140/90</div>
          <div className="range">95 - 100</div>
        </div>


        <div className="homePage-image-container">
          <img src="heart.png" alt="Heart Rate" className="image" />
          <img src="Thermometer.png" alt="Body Temperature" className="image" /></div>


        <div className="homePage-header-container1 ">
          <h4 className="homePageHeader-title1">Heart Rate</h4>
          <h4 className="homePageHeader-title1">Body Temperature</h4>
        </div>




        <div className="homePage-details-container">
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




        <div className="homePage-tilte-contaniner">
          <div className="tilte">Normal Range</div>
          <div className="tilte">Normal Range</div>
        </div>


        <div className="homePage-range-container1">
          <div className="range1">60 - 90</div>
          <div className="range1">96 F - 98.4 F</div>
        </div>


        <div className="homePage-image-container">
          <img src="lungs.png" alt="Respiration Rate" className="image" />
          <img src="bmi_icon.png" alt="Body Mass Index" className="image" /></div>


        <div className="homePage-header-container">
          <h4 className="homePageHeader-title">Respiration Rate</h4>
          <h4 className="homePageHeader-title">Body Mass Index</h4>
        </div>


        <div className="homePage-details-container">
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


        <div className="homePage-tilte-contaniner">
          <div className="tilte">Normal Range</div>
          <div className="tilte">Normal Range</div>
        </div>


        <div className="homePage-range-container2">
          <div className="range2">12 - 20</div>
          <div className="range2">18.5 - 25</div>
        </div>


        <div className="homePageFooter" style={{ display: 'flex', flexDirection: 'column' }}>


          {showElectrodiagram && (
            <button
              className="homePageElctrocardiogram-button"
              onClick={toggleECGContainer}


            >
              <span className="homePageButton-text">
                {showContainer ? "Electrocardiogram" : "Electrocardiogram"}
              </span>
              <img
                src="arrow.png"
                alt="Arrow"
                style={imgStyle}
              />
            </button>
          )}

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
                        <text x={235} y={343} textAnchor="middle" fontWeight="bold">
                          (Seconds)
                        </text>
                        <text x={95} y={320} textAnchor="end" fontSize="14px">
                          0
                        </text>
                        <text x={135} y={320} textAnchor="end" fontSize="14px">
                          0.2
                        </text>
                        <text x={168} y={320} textAnchor="end" fontSize="14px">
                          0.4
                        </text>
                        <text x={202} y={320} textAnchor="end" fontSize="14px">
                          0.6
                        </text>
                        <text x={237} y={320} textAnchor="end" fontSize="14px">
                          0.8
                        </text>
                        <text x={272} y={320} textAnchor="end" fontSize="14px">
                          1.0
                        </text>
                        <text x={307} y={320} textAnchor="end" fontSize="14px">
                          1.2
                        </text>
                        <text x={344} y={320} textAnchor="end" fontSize="14px">
                          1.4
                        </text>
                        <text x={375} y={320} textAnchor="end" fontSize="14px">
                          1.6
                        </text>
                        <text x={410} y={320} textAnchor="end" fontSize="14px">
                          1.8
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
                          0
                        </text>
                        <text x={80} y={225} textAnchor="end">
                          1
                        </text>
                        <text x={80} y={140} textAnchor="end">
                          2
                        </text>
                        <text x={80} y={60} textAnchor="end">
                          3
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
                <center><h3 className="homePageECGIntervelText">ECG Intervals</h3></center>




                <div className="homePageContainer-image">




                  <div className="homePage-header-container">
                    <h3 className="homePageHeader-title2">QT Interval</h3>
                    <h3 className="homePageHeader-title2">ST Segment</h3>
                  </div>




                  <div className="homePage-details-container">
                    <div className="value"> {qt} </div>
                    <div className="value"> {ST} </div>
                  </div>




                  <div className="homePage-tilte-contaniner">
                    <div className="tilteT">Normal Range</div>
                    <div className="tilteT">Normal Range</div>
                  </div>




                  <div className="homePage-range-container1">
                    <div className="range5">0.06 - 01.2 Sec</div>
                    <div className="range5">0.08 Sec</div>
                  </div>


                  <div className="homePage-header-container">
                    <h3 className="homePageHeader-title2">PR Interval</h3>
                    <h3 className="homePageHeader-title2">QRS Interval</h3>
                  </div>




                  <div className="homePage-details-container">
                    <div className="value"> {Pr} </div>
                    <div className="value"> {Qrs} </div>
                  </div>




                  <div className="homePage-tilte-contaniner">
                    <div className="tilteT">Normal Range</div>
                    <div className="tilteT">Normal Range</div>
                  </div>




                  <div className="homePage-range-container1">
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
            className="homePage-ecg-button"
            onClick={profileButton}
          >
            Profile
          </button>


          <button
            className="homePage-ecg-button"
            onClick={takeVitalSigns}
          >
            Take Vital Signs
          </button>


          <button
            className="homePage-ecg-button"
            onClick={GoToHistory}
          >
            Vital Signs History
          </button>


          {showSaveButton && (
            <button
              className="homePage-ecg-button"
              onClick={saveVitals}
              disabled={isLoading}
            >
              Save
            </button>
          )}




          <div style={saveoverlayStyle} onClick={() => setIsSaveYes(false)}></div>
          <div style={saveYes}>
            <button style={okayButtonStyleSuccess} onClick={okClick}>
              Okay
            </button>
            <h2 style={headingStyle}>Alert</h2>
            <h4 style={alertTextStyle}>Vitals data saved successfully.</h4>
          </div>



          <div overlayClassName="homePageOverlay">
            <div style={saveNo}>
              <button style={okayButtonStyleSuccess} onClick={okClick}>
                Okay
              </button>
              <h2 style={headingStyle}>Alert</h2>
              <h4 style={alertTextStyle}>Network issue please take vitlas once again.</h4>
            </div>
          </div>




        </div>


        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeDialog}
          contentLabel="Take Vital Signs"
          className="homePageTakeVitalsModal"
          overlayClassName="homePageOverlay"
        >
          <div >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "-30px",
              }}
            >


            </div>
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
                        display: 'flex',
                        marginLeft: '2em',
                        // alignItems: "center",
                        // justifyContent: "center",
                      }}
                    >
                      Confirm and / or Edit your profile
                    </h2>
                  </div>





                  <button

                    onClick={() => {
                      setModalIsOpen(false);
                      login();
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
                      display: 'flex',
                      marginLeft: '1em'
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


                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                      <PhoneInput
                        disabled={true}
                        country={countryCode}
                        onChange={handleCountryCodeChange}
                        inputStyle={{
                          width: '7em', pointerEvents: 'none',
                          backgroundColor: '#D3D3D3',
                        }}
                        containerStyle={{ textAlign: 'left' }}
                        countryCodeEditable={false}
                      // Add readOnly a comment indicating that the country dropdown is read-only
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', pointerEvents: 'none' }}>
                      <input
                        type="tel"
                        id="newField"
                        name="newField"

                        value={userName}

                        style={{ width: '13em', height: '32px', marginLeft: '0.5em', border: 0, borderRadius: '4px', border: '1.5px solid black', }}
                      />
                    </div>
                  </div>

                  {/* karthi */}

                  <div style={{ width: '250px', marginBottom: '20px' }}>
                    <div style={{ position: 'relative', marginRight: '12px', marginTop: '1em' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}

                        style={{ width: '20.1em', padding: '6px', height: '25px', border: 'none', borderRadius: '4px', pointerEvents: 'none', border: '1px solid black', }}
                      />
                      <button
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        style={{ position: 'absolute', top: '50%', right: '-3em', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ fontSize: '20px' }} />
                      </button>
                    </div>
                  </div>




                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Gender
                  </h4>
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


                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Age
                  </h4>
                  <input
                    id="edtage"
                    type="number"
                    style={{
                      width: "96%",
                      height: "34px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Age"
                    value={age}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue >= 0 && inputValue <= 120) {
                        setAge(inputValue);
                      }
                    }}
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number (0-9) or a control key (e.g., Backspace)
                      const isNumericInput = /^[0-9]+$/.test(e.key);


                      // If the input is not numeric, prevent it from being entered
                      if (!isNumericInput) {
                        e.preventDefault();
                      }
                    }}
                  />


                  {/* <div style={{ display: "flex", alignItems: "center" }}> */}
                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Height ({heighttype})

                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={heighttype === "FT/IN"}
                        onChange={toggleUnit}
                      />
                      <span className="slider"></span>
                    </label>
                  </h4>

                  {heighttype === "CMS" ? (
                    <input
                      id="edtheight"
                      type="number"
                      style={{
                        width: "96%",
                        height: "34px",
                        marginBottom: "5px",
                        textAlign: "center",
                      }}
                      placeholder="Enter the Height in Centimeters"
                      value={height}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue >= 0 && inputValue <= 272) {
                          setHeight(inputValue);
                        }
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'rows' }}>
                      <input
                        type="number"
                        style={{
                          width: "50%",
                          height: "34px",
                          textAlign: "center",
                        }}
                        value={feet}
                        onChange={(e) =>
                          setfeet(Math.max(0, Math.min(8, parseInt(e.target.value))))
                        }
                        placeholder="Feet"
                      />
                      <input
                        type="number"
                        style={{
                          width: "50%",
                          height: "34px",
                          textAlign: "center",
                        }}
                        value={inches}
                        onChange={(e) =>
                          setinches(
                            Math.max(0, Math.min(11, parseInt(e.target.value)))
                          )
                        }
                        placeholder="Inches"
                      />
                    </div>
                  )}
                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Weight ({weighttype})
                    <label className="switch" style={{ marginTop: "2px" }}>
                      <input
                        type="checkbox"
                        checked={weighttype === "LBS"}
                        onChange={toggleWeightUnit}
                      />
                      <span className="slider"></span>
                    </label>
                  </h4>
                  <input
                    id="edtweight"
                    type="number"
                    style={{
                      width: "96%",
                      height: "34px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder={
                      weighttype === "KG"
                        ? "Enter the Weight in Kilograms"
                        : "Enter the Weight in Pounds"
                    }
                    value={weight}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (
                        inputValue >= 0 &&
                        (weighttype === "KG"
                          ? inputValue <= 272
                          : inputValue <= 600)
                      ) {
                        setWeight(inputValue);
                      }
                    }}
                    onKeyPress={(e) => {
                      const isNumericInput = /^[0-9]+$/.test(e.key);
                      if (!isNumericInput) {
                        e.preventDefault();
                      }
                    }}
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
                    className="homePageButton"
                    style={{
                      backgroundColor: '#f8b413',
                      color: "white",
                      fontWeight: "bold",
                      padding: "5px 20px",
                      fontSize: "15px",
                      margin: "5px",
                    }}
                    onClick={handleStartClick}
                  >
                    Proceed
                  </button>
                  {validationError && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Please fill all required fields.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Modal>






        <Modal
          isOpen={modalIsOpen1}
          onRequestClose={closeDialog1}
          contentLabel="Take Vital Signs"
          className="homePageTakeVitalsModal"
          overlayClassName="homePageOverlay"
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "-30px",
              }}
            >


            </div>
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
                        display: 'flex',
                        marginLeft: '9em',
                        // alignItems: "center",
                        // justifyContent: "center",
                      }}
                    >
                      My Profile
                    </h2>
                  </div>
                  <button
                    className="close-button"
                    onClick={() => {
                      setModalIsOpen1(false);
                      login();
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
                      display: 'flex',
                      marginLeft: '6em'
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


                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                      <PhoneInput
                        disabled={true}
                        country={countryCode}
                        onChange={handleCountryCodeChange}
                        inputStyle={{
                          width: '7em', pointerEvents: 'none',
                          backgroundColor: '#D3D3D3',
                        }}
                        containerStyle={{ textAlign: 'left' }}
                        countryCodeEditable={false}
                      // Add readOnly a comment indicating that the country dropdown is read-only
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', pointerEvents: 'none' }}>
                      <input
                        type="tel"
                        // id="newField"
                        name="newField"

                        value={userName}

                        style={{ width: '13em', height: '32px', marginLeft: '0.5em', border: 0, borderRadius: '4px', border: '1.5px solid black', }}
                      />
                    </div>
                  </div>

                  {/* karthi */}

                  <div style={{ width: '250px', marginBottom: '20px' }}>
                    <div style={{ position: 'relative', marginRight: '12px', marginTop: '1em' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        // id="password"
                        name="password"
                        value={password}

                        style={{ width: '20.1em', padding: '6px', height: '25px', border: 'none', borderRadius: '4px', pointerEvents: 'none', border: '1px solid black', }}
                      />
                      <button
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        style={{ position: 'absolute', top: '50%', right: '-3em', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ fontSize: '20px' }} />
                      </button>
                    </div>
                  </div>



                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Gender
                  </h4>
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


                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Age
                  </h4>
                  <input
                    id="edtage"
                    type="number"
                    style={{
                      width: "96%",
                      height: "34px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder="Enter the Age"
                    value={age}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue >= 0 && inputValue <= 120) {
                        setAge(inputValue);
                      }
                    }}
                    onKeyPress={(e) => {
                      // Check if the pressed key is a number (0-9) or a control key (e.g., Backspace)
                      const isNumericInput = /^[0-9]+$/.test(e.key);


                      // If the input is not numeric, prevent it from being entered
                      if (!isNumericInput) {
                        e.preventDefault();
                      }
                    }}
                  />



                  {/* <div style={{ display: "flex", alignItems: "center" }}> */}
                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Height ({heighttype})

                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={heighttype === "FT/IN"}
                        onChange={toggleUnit}
                      />
                      <span className="slider"></span>
                    </label>
                  </h4>

                  {heighttype === "CMS" ? (
                    <input
                      id="edtheight"
                      type="number"
                      style={{
                        width: "96%",
                        height: "34px",
                        marginBottom: "5px",
                        textAlign: "center",
                      }}
                      placeholder="Enter the Height in Centimeters"
                      value={height}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue >= 0 && inputValue <= 272) {
                          setHeight(inputValue);
                        }
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'rows' }}>
                      <input
                        type="number"
                        style={{
                          width: "50%",
                          height: "34px",
                          textAlign: "center",
                        }}
                        value={feet}
                        onChange={(e) =>
                          setfeet(Math.max(0, Math.min(8, parseInt(e.target.value))))
                        }
                        placeholder="Feet"
                      />
                      <input
                        type="number"
                        style={{
                          width: "50%",
                          height: "34px",
                          textAlign: "center",
                        }}
                        value={inches}
                        onChange={(e) =>
                          setinches(
                            Math.max(0, Math.min(11, parseInt(e.target.value)))
                          )
                        }
                        placeholder="Inches"
                      />
                    </div>
                  )}
                  <h4
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Weight ({weighttype})
                    <label className="switch" style={{ marginTop: "2px" }}>
                      <input
                        type="checkbox"
                        checked={weighttype === "LBS"}
                        onChange={toggleWeightUnit}
                      />
                      <span className="slider"></span>
                    </label>
                  </h4>
                  <input
                    id="edtweight"
                    type="number"
                    style={{
                      width: "96%",
                      height: "34px",
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                    placeholder={
                      weighttype === "KG"
                        ? "Enter the Weight in Kilograms"
                        : "Enter the Weight in Pounds"
                    }
                    value={weight}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (
                        inputValue >= 0 &&
                        (weighttype === "KG"
                          ? inputValue <= 272
                          : inputValue <= 600)
                      ) {
                        setWeight(inputValue);
                      }
                    }}
                    onKeyPress={(e) => {
                      const isNumericInput = /^[0-9]+$/.test(e.key);
                      if (!isNumericInput) {
                        e.preventDefault();
                      }
                    }}
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
                    className="homePageButton"
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
                    Update
                  </button>
                  {validationError && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Please fill all required fields.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Modal>
        <div style={grayUpdateOverlayStyle}></div>
        <div style={openModalStyle}>
          <h2 style={headingStyle}>Alert</h2>
          <h4 style={alertTextStyle}>
            Profile Updated successfully.
          </h4>
          <button style={cancelButtonStyle1} onClick={() => setUpdateModalOpen(false)}>
            OK
          </button>
        </div>

        <div style={overlayStyle} onClick={() => setIsModalOpen(false)}></div>
        <div style={modalStyle}>
          <button style={okButtonStyle} onClick={() => {
            setOkButtonClicked(true); // setting state to true when Ok button is clicked
            setIsModalOpen1(true);
          }}> {/*setIsModalOpen1*/}
            Ok
          </button>
          <button style={cancelButtonStyle} onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <h2 style={headingStyle}>Alert</h2>
          <h4 style={alertTextStyle}>Your pulse can only be caputured using your mobile phone.<br></br>Please use mobile phone to caputure your pulse.</h4>
        </div>


        <div style={overlayStyle} onClick={() => setIsModalOpen(false)}></div>
        <div style={modalStyle1}>
          <button style={RefreshButtonStyle} onClick={closeModal1}>
            Refresh
          </button>
          <button style={cancelButtonStyle} onClick={closeModal12}>
            Cancel
          </button>
          <h2 style={headingStyle}>Alert</h2>
          <h4 style={alertTextStyle}>After you have caputured your pulse using your mobile phone please click refresh. </h4>
        </div>


        {/* <div onClick={() => setAlertModel(true)} style={logoutoverlayStyle} ></div>
        {AlertModel && (
          <div style={modalStyle2}>
            <h2 style={headingStyle}>Alert</h2>
            <h4 style={alertTextStyle}>Welcome to Your Vitals.<br></br>You are new user, so your history is empty. Please set a profile and take your Vital Signs. </h4>
            <button style={cancelButtonStyle1}
              onClick={() => setAlertModel(false)}
            >
              OK
            </button>
          </div>
        )} */}


        <div onClick={() => setAlertModel(true)} style={grayOverlayStyle}></div>
        {AlertModel && (
          <div style={modalStyle2}>
            <h2 style={headingStyle}>Alert</h2>
            <h4 style={alertTextStyle}>
              Welcome to Your Vitals.<br></br>You are a new user, so your history is empty. Please set a profile and take your Vital Signs.
            </h4>
            <button style={cancelButtonStyle1} onClick={() => setAlertModel(false)}>
              OK
            </button>
          </div>
        )}



      </div>


      <footer className="homePagefooter"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "navy",
          // marginTop: '100vh',
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
      {isLoading && <LoadingSpinner />}
    </div >


  );


}


export default HomePage;