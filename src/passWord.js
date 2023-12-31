import React, { useState, useEffect } from 'react';
// import './App.css';
import './passWord.css';
import 'react-phone-input-2/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2'; // Import the PhoneInput component
import { getCountryCallingCode } from 'libphonenumber-js';
import { BASE_API_URL } from './content';



function Password() {
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [userPhoneNumber, setUserPhoneNumber] = useState(localStorage.getItem('userPhoneNumber'));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
  const loginUrl = `${BASE_API_URL}Login`;
  const forgotUrl =  `${BASE_API_URL}ForgetPWD`;


  const [countryCode, setCountryCode] = useState(localStorage.getItem('Ccode'));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialCodes, setDialCode] = useState('');


  useEffect(() => {


    // Check for phone number in local storage
    const savedPhoneNumber = localStorage.getItem('phoneNumberInput');
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }
  }, []);

  window.onload = () => {
    // setShowPopup(true);
    Navigate('/verification');
  };



  useEffect(() => {
    setUserPhoneNumber(localStorage.getItem('userPhoneNumber'));
    setUserName(localStorage.getItem("userName"));

    const rememberMe = localStorage.getItem('remembermeStatus');
    const pass = localStorage.getItem('password');
    if(rememberMe === 'true'){
      setRememberMe(true);
      setPassword(pass);

    }
    else{
      setRememberMe(false);
    }
  }, []);

  const handlePhoneNumberChange = (value, country) => {
    setUserPhoneNumber(value);
  };


  const handleCountryCodeChange = (country) => {
    const code = country.dialCode;
    setCountryCode(code);
    setPhoneNumber('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log("pass", password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const Navigate = useNavigate();
  const backButton = () => {

    Navigate('/');
  };

  const handleButtonClick = () => {
    // Navigate('/Home-Page');

    if(rememberMe){
      localStorage.setItem('remembermeStatus','true');
    }
    else{
      localStorage.setItem('remembermeStatus','false');
    }


    if (password.length == 0) {
      setAlertMessage("Enter password");
      console.error("Enter password");
    } else {
      setAlertMessage("");
      login();
      // Navigate('/Home-Page');
    }
  };

  const handleforgotClick = () => {
    forgotRequest();
  };

  const login = () => {
    setIsLoading(true);
    console.log("requesting...", requestBody);
    axios
      .post(loginUrl, requestBody, {
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
          localStorage.setItem('guid', response.data.guid);
          localStorage.setItem('password', password);
          localStorage.setItem('gender', response.data.gender);
          localStorage.setItem('height', response.data.height);
          localStorage.setItem('weight', response.data.weight);
          // localStorage.setItem('userName', response.data.userName);
          localStorage.setItem('phoneNumber', response.data.phoneNumber);
          localStorage.setItem('firstName', response.data.firstName);
          localStorage.setItem('lastName', response.data.lastName);
          localStorage.setItem('bloodGroup', response.data.bloodGroup);
          localStorage.setItem('address', response.data.address);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('dob', response.data.dob);
          localStorage.setItem('medicalPredisposition', response.data.medicalPredisposition);
          localStorage.setItem('about', response.data.about);
          localStorage.setItem('city', response.data.city);
          localStorage.setItem('state', response.data.state);
          localStorage.setItem('pinCode', response.data.pinCode);
          localStorage.setItem('regType', response.data.regType);
          localStorage.setItem('specialistFees', response.data.specialistFees);
          localStorage.setItem('specializationName', response.data.specializationName);
          localStorage.setItem('profileIMG', response.data.profileIMG);
          localStorage.setItem('weighttype', response.data.weighttype===''?"KG":response.data.weighttype);
          localStorage.setItem('heighttype', response.data.heighttype===''?"CMS":response.data.heighttype);
          localStorage.setItem('inches', response.data.inches);
          localStorage.setItem('feet', response.data.feet);

          Navigate('/Home-Page');
        }
        else {
          console.log("error=", response.data.errormessage);
          setAlertMessage("Invalid Password");
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

  const forgotRequest = () => {
    setIsLoading(true);
    console.log("forgot password requesting...", requestBodyforgot)
    axios
      .put(forgotUrl, requestBodyforgot, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle the response data here
        console.log("data", response.data);
        var data = response.data.response;
        // var errorjson = JSON.parse();
        if (data == "Success") {
          console.log("success=", response.data.response);
          console.log("result", response.data.result);
          // const jsonString = response.data.result;
          // const phIndex = jsonString.indexOf("Ph");
          // const jsonStringWithoutPh = jsonString.substring(0, phIndex);
          // const jsonObject = JSON.parse(jsonStringWithoutPh);
          console.log("session id", " ");
          localStorage.setItem('forgotSessionId', " ");
          Navigate('/otp');
          // Navigate('/verification');
        }
        else {
          console.log("error=", response.data.errormessage);
          setAlertMessage("Error occured ");
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

  var requestBody = {
    username: userPhoneNumber,
    passwords: password
  };

  var requestBodyforgot = {
    Username: userPhoneNumber
  };

  const LoadingSpinner = () => {
    return (
      <div className="verification-loading-spinner">
        <div className="verification-spinner"></div>
      </div>
    );
  };

  return (
    <div className="verification-main-container">
      <div className="verification-content" style={{
        backgroundImage: `url(Indian-Girls.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: '100vh'
      }}>


        <div>
          <header
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="yourvitals_logo_panner.png"
              alt="yourVitals"
              style={{ width: "300px", height: "100px", marginRight: '1.5em' }}
            />
          </header>


          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <img src='mobileScreen.png'
              style={{
                maxHeight: '36em',
                // filter: 'blur(5px)', // Adjust the blur amount as needed
                opacity: '0.50', backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',     // Adjust the opacity value (0.0 to 1.0) as needed
              }} />
            <div style={{
              position: 'absolute',
              width: '15em',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>


                <label style={{ display: 'flex', fontWeight: 'bold', color: 'white', marginRight: '7.5em', marginBottom: '1em', marginTop: '7.2em' }}>Phone Number:</label>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px', }}>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                    <PhoneInput
                      country={countryCode}
                      onChange={handleCountryCodeChange}
                      disabled = {true}
                      inputStyle={{
                        width: '7em', pointerEvents: 'none',
                        backgroundColor: '#D3D3D3',
                      }}
                      containerStyle={{ textAlign: 'left' }}
                      countryCodeEditable={false}
                      readOnly 
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', pointerEvents: 'none' }}>
                    <input
                      type="tel"
                      id="newField"
                      name="newField"

                      value={userName}

                      style={{ width: '100%', height: '32px', marginLeft: '0.5em', border: 0, borderRadius: '4px' }}
                    />
                  </div>
                </div>


                <label style={{ display: 'flex', fontWeight: 'bold', color: 'white', marginRight: '1.5em', marginBottom: '1em', marginTop: '1.5em' }}>Please Enter Your Password</label>


                <div style={{ width: '250px', marginBottom: '20px' }}>
                  <div style={{ position: 'relative', marginRight: '12px' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          document.getElementById('signinButton').click();
                          return;
                        }

                        if (e.key === ' ') {
                          e.preventDefault();
                        }

                      }}
                      onChange={handlePasswordChange}
                      style={{ width: '94%', marginLeft: '0.5em', padding: '6px', height: '25px', border: 'none', borderRadius: '4px' }}
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ fontSize: '20px' }} />
                    </button>
                  </div>
                  {alertMessage && <div style={{ color: 'red',marginLeft:'0.5em',marginTop:'0.2em' }}>{alertMessage}</div>}
                </div>




                <div style={{ display: 'flex', alignItems: 'center', width: '400px', marginBottom: '10px', marginRight: '2px' }}>
                  <label htmlFor="rememberMe" style={{ fontWeight: 'bold', marginLeft: '4.9em', color: 'white', marginRight: '4.8em' }}>Remember Me:</label>
                  <Switch
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                    onColor="#020753"
                    offColor="#ccc"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '300px', marginLeft: '6.5em', marginBottom: '5px' }}>
                  <div style={{ marginRight: '20px' }}>
                    <button
                      style={{
                        backgroundColor: '#f8b413', color: 'white', padding: '10px 17px', borderRadius: '10px', fontWeight: 'bold', border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                      onClick={() => {
                        backButton()
                      }}
                    >
                      Back
                    </button>
                  </div>
                  <div>
                    <button
                      id='signinButton'
                      style={{ backgroundColor: '#f8b413', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '10px', fontWeight: 'bold' }}
                      onClick={handleButtonClick}
                    >
                      Sign In
                    </button>
                  </div>
                </div>

                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginLeft: '9.5em',
                    paddingTop: '5px',
                  }}
                  onClick={handleforgotClick}
                  disabled={isLoading}
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <footer
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "navy",
          marginTop: 'auto',
          zIndex: '10',
        }}
      >
        <div style={{ width: "100%", height: "9em", }}>
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q=11.02517,  76.95835&zoom=18`}
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ color: "orange",display:'flex',justifyContent:'center',fontWeight:'bold',marginTop:'0.2em'}}>YourVitals, Inc. </div>
          <div style={{ color: "#454e6f",marginTop:'0.2em'}}>
          © 2023, All Rights Reserved.
          </div>

        <div style={{ alignItems: 'center',marginTop:'0.2em',marginBottom:'0.2em'}}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "navy",
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
              color: "navy",
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
              color: "navy",
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


    </div>
  );
}

export default Password;