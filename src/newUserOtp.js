import React, { useState, useEffect } from 'react';
// import './App.css'; // Import the CSS file
import './newUserOtp.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';
import { getCountryCallingCode } from 'libphonenumber-js';
import { BASE_API_URL } from './content';


function NewUserVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(localStorage.getItem('userPhoneNumber'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [forgotSessionId, setForgetSessionId] = useState(localStorage.getItem('forgotSessionId'));
  const [newSessionId, setNewSessionId] = useState(localStorage.getItem('newSessionId'));
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
  const verifyUrl = `${BASE_API_URL}ForgetPWD/OTPVerification_New`;
  const newUrl = `${BASE_API_URL}MinimalRegistration/OTPVerification`;
  const loginUrl = `${BASE_API_URL}Login`;
  const PasswordUpdateUrl = `${BASE_API_URL}ForgetPWD/UpdateChangePassword`;
  const [alertMessage, setAlertMessage] = useState('');

  const [otpValidationMessage, setOtpValidationMessage] = useState('');

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



  useEffect(() => {
    setUserPhoneNumber(localStorage.getItem('userPhoneNumber'));
    setUserName(localStorage.getItem('userName'));
    setForgetSessionId(localStorage.getItem('forgotSessionId'));
    setNewSessionId(localStorage.getItem('newSessionId'));
  }, []);

  const handlePasswordChange = (event) => {
    setOtp(event.target.value);
  };

  // const signinclick = () => {
  //   if (otp.length === 0) {
  //     console.error('Enter OTP');
  //   } else {
  //     setIsLoading(true); // Show loading spinner
  //     verifyForgotOtp();
  //   }
  // };

  const handleCountryCodeChange = (country) => {
    const code = country.dialCode;
    setCountryCode(code);
    setPhoneNumber('');
  };

  const signinclick = () => {
    if (otp.length < 6) {
      setOtpValidationMessage('Please enter a valid OTP with 6 digits.');
    } else {
      setOtpValidationMessage('');
      verifyForgotOtp();
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  var requestBodyVerify = {
    PhoneNumber: userPhoneNumber,
    OTP: otp,
    sessionid: forgotSessionId,
  };

  var requestBodyFirstOtp = {
    password: otp,
    phonenumber: userPhoneNumber,
    regtype: 'P',
    ipaddress: '',
    sessionid: newSessionId,
    platforms: 'Android',
    UserName: userName,
  };

  const verifyForgotOtp = () => {
    axios
      .post(newUrl, requestBodyFirstOtp, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('data', response.data);
        var data = response.data.response;
        if (data === 'Success') {
          login();
          console.log('success=', response.data.response);
        } else {
          setIsLoading(false); // Hide loading spinner
          console.log('error=', response.data.errormessage);
          setAlertMessage('Invalid Password');
        }
      })
      .catch((error) => {
        setIsLoading(false); // Hide loading spinner
        console.error('Error:1111', error);
      });
  };

  const login = () => {
    console.log('requesting...', requestBodyLogin);
    axios
      .post(loginUrl, requestBodyLogin, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('data', response.data);
        var data = response.data.result;
        if (data === '1') {
          localStorage.setItem('WelcomeAlert', 'true');
          console.log('success=', response.data.response);
          localStorage.setItem('guid', response.data.guid);
          localStorage.setItem('password', otp);
          localStorage.setItem('gender', response.data.gender);
          localStorage.setItem('height', response.data.height);
          localStorage.setItem('weight', response.data.weight);
          localStorage.setItem('userName', response.data.userName);
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
          localStorage.setItem('weighttype', response.data.weighttype === '' ? 'KG' : response.data.weighttype);
          localStorage.setItem('heighttype', response.data.heighttype === '' ? 'CMS' : response.data.heighttype);
          localStorage.setItem('inches', response.data.inches);
          localStorage.setItem('feet', response.data.feet);

          setIsLoading(false); // Hide loading spinner
          Navigate('/Home-Page');


        } else {
          setIsLoading(false); // Hide loading spinner
          console.log('error=', response.data.errormessage);
          setAlertMessage('Invalid Password');
        }
      })
      .catch((error) => {
        setIsLoading(false); // Hide loading spinner
        console.error('Error:', error);
      });
  };

  var requestBodyupdatePsw = {
    Password: otp,
    UserName: userName,
  };

  var requestBodyLogin = {
    username: userPhoneNumber,
    passwords: otp,
  };

  const LoadingSpinner = () => {
    return (
      <div className="newUser-loading-spinner">
        <div className="newUser-spinner"></div>
      </div>
    );
  };

  // const Navigate = useNavigate();
  const backButton = () => {
    Navigate('/');
  };

  return (
    <div className="newUser-main-container">
      <div
        className="newUser-content"
        style={{
          backgroundImage: `url(Indian-Girls.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        }}
      >
        <div>
          <header
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src="yourvitals_logo_panner.png"
              alt="yourVitals"
              style={{
                width: "300px", height: "100px", marginRight: '1.5em'
              }}
            />
          </header>
          {/* ------- */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src="mobileScreen.png"
              style={{
                maxHeight: '36em',
                opacity: '0.50',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div
              style={{
                position: 'absolute',
                width: '16em',
              }}
            >





              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '30vh',
                }}
              >


                <label style={{ display: 'flex', fontWeight: 'bold', color: 'white', marginRight: '7.5em', marginBottom: '1em', marginTop: '7.2em' }}>Phone Number:</label>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px', marginLeft: '0.5em', }}>
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
                      readOnly // Add a comment indicating that the country dropdown is read-only
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', pointerEvents: 'none' }}>
                    <input
                      type="tel"
                      id="newField"
                      name="newField"

                      value={userName}

                      style={{ width: '9.5em', height: '32px', marginLeft: '0.5em', border: 0, borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ width: '230px', marginTop: '1em' }}>
                  <label
                    htmlFor="password"
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Please enter the OTP just sent to your Mobile Number
                  </label>
                  {/* <div style={{ color: 'white', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', marginLeft: '3em' }}>{userPhoneNumber}</div> */}
                  <div
                    style={{
                      position: 'relative',
                      marginTop: '1em',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="tel" // Change the type to "tel"
                      id="password"
                      name="password"
                      value={otp}
                      onChange={handlePasswordChange}
                      onKeyPress={(e) => {
                        // Check if the pressed key is a number (0-9) or a control key (e.g., Backspace)
                        const isNumericInput = /^[0-9]+$/.test(e.key);

                        if (!isNumericInput || (otp.length >= 6 && e.key !== 'Backspace')) {
                          e.preventDefault();
                        }
                      }}
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        padding: '5px',
                        height: '25px',
                        width: '96%',
                        borderRadius: '5px',
                      }}
                    />
                  </div>
                  <p style={{ color: 'red' }}>{otpValidationMessage}</p>
                </div>


                <div style={{ display: 'flex', justifyContent: 'center', width: '300px', marginLeft: '3.9em', marginTop: '15px' }}>
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
                      style={{ backgroundColor: '#f8b413', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '10px', fontWeight: 'bold' }}
                      onClick={signinclick}
                      disabled={isLoading}
                    >
                      REGISTER
                    </button>
                  </div>
                </div>





                {/* <button
                  style={{
                    backgroundColor: '#f8b413',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    marginLeft: '10.5em',
                    marginTop: '1.5em',
                  }}
                  onClick={signinclick}
                  disabled={isLoading}
                >
                  REGISTER
                </button> */}

                {alertMessage && (
                  <div style={{ color: 'red', marginTop: '1em' }}>
                    {alertMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'navy',
          // marginTop: 'auto',
          zIndex: '10'

        }}
      >
        <div style={{ width: '100%', height: '9em' }}>
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q=11.02517,  76.95835&zoom=18`}
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ color: "orange", display: 'flex', justifyContent: 'center', fontWeight: 'bold', marginTop: '0.2em' }}>YourVitals, Inc. </div>
        <div style={{ color: "#454e6f", marginTop: '0.2em' }}>
          © 2023, All Rights Reserved.
        </div>

        <div style={{ alignItems: 'center', marginTop: '0.2em', marginBottom: '0.2em' }}>
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

export default NewUserVerification;
