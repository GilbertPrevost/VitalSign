import React, { useState, useEffect } from 'react';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';
import { getCountryCallingCode } from 'libphonenumber-js';


function OtpPage() {

    const [otpValidationMessage, setOtpValidationMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const [userPhoneNumber, setUserPhoneNumber] = useState(localStorage.getItem('userPhoneNumber'));
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [forgotSessionId, setForgetSessionId] = useState(localStorage.getItem('forgotSessionId'));
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
    const verifyUrl = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/ForgetPWD/OTPVerification_New`;
    const loginUrl = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/Login`;
    const PasswordUpdateUrl = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/ForgetPWD/UpdateChangePassword`;
    const [alertMessage, setAlertMessage] = useState('');

    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dialCodes, setDialCode] = useState('');


    useEffect(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              axios
                .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q`)
                .then((response) => {
                  debugger;
                  const results = response.data.results;
                  if (results && results.length > 0) {
                    for (const component of results[0].address_components) {
                      if (component.types.includes('country')) {
                        const name = component.short_name.toLowerCase();
                        const code = component.short_name;
    
                        try {
                          const dCode = getCountryCallingCode(code);
                          setCountryCode(name);
                          setDialCode(dCode)
                        } catch (e) {
                          console.error('Error determining dial code:', e);
                        }
                        break;
                      }
                    }
                  }
                })
                .catch((error) => {
                  console.error('Error getting geolocation:', error);
                  // Set a default country code here if geolocation fails
                  setCountryCode('us');
                });
            },
            (error) => {
              console.error('Error getting geolocation:', error);
              // Set a default country code here if geolocation fails
              setCountryCode('us');
            }
          );
        } else {
          // Geolocation is not supported, set a default country code
          setCountryCode('us');
        }
    
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

    useEffect(() => {
        setUserPhoneNumber(localStorage.getItem('userPhoneNumber'));
        setUserName(localStorage.getItem("userName"));
        setForgetSessionId(localStorage.getItem('forgotSessionId'));
    }, []);

    const signinclick = () => {
        if (otp.length < 6) {
            setOtpValidationMessage('Please enter a valid OTP with 6 digits.');
        } else {
            setOtpValidationMessage('');
            verifyForgotOtp();
        }
    };


    const handlePasswordChange = (event) => {
        setOtp(event.target.value);
        console.log("OTP", otp);
    };

    // const signinclick = () => {
    //     if (otp.length == 0) {
    //         console.error("Enter otp");

    //     }
    //     else {
    //         verifyForgotOtp();
    //         // console.log("OTP",otp);
    //     }
    // };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    var requestBodyVerify = {
        PhoneNumber: userPhoneNumber,
        OTP: otp,
        sessionid: forgotSessionId
    };

    const verifyForgotOtp = () => {
        console.log("requesting...")
        console.log("request body", requestBodyVerify);
        axios
            .post(verifyUrl, requestBodyVerify, {
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
                    const jsonObject = JSON.parse(response.data.result);
                    console.log("details", jsonObject.Details);
                    if (jsonObject.Details == "OTP Matched") {
                        localStorage.setItem('newSessionId', jsonObject.Details);
                        console.log("otp matched");
                        updatepsw();


                        // Navigate('/Home-Page');
                    }
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
            });
    };

    const login = () => {
        setIsLoading(true);
        console.log("requesting...", requestBodyLogin);
        axios
            .post(loginUrl, requestBodyLogin, {
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
                    localStorage.setItem('weighttype', response.data.weighttype);
                    localStorage.setItem('heighttype', response.data.heighttype);
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
                console.error("Error:", error);
            })

            .finally(() => {
                setIsLoading(false); // Turn off the loading spinner
            });
    };

    var requestBodyupdatePsw = {
        Password: otp,
        UserName: userPhoneNumber
    };

    var requestBodyLogin = {
        username: userPhoneNumber,
        passwords: otp
    };

    const LoadingSpinner = () => {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    };

    const updatepsw = () => {
        console.log("requesting...");
        console.log("update passowrd body", requestBodyupdatePsw);
        axios
            .post(PasswordUpdateUrl, requestBodyupdatePsw, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                // Handle the response data here
                console.log("data", response.data);
                const data = response.data.response;
                // var errorjson = JSON.parse();
                if (data == "Success") {
                    console.log("navigating");
                    // Navigate('/Home-Page');
                    login();
                }
                else {
                    console.log("error=", response.data.errormessage);
                    // Navigate('/verification');
                }
            })
            .catch((error) => {
                // Handle any errors here
                console.error("Error:1111", error);
            });
    };

    // const Navigate = useNavigate();
    const backButton = () => {
        Navigate('/');
    };


    return (
        <div className="main-container">
            <div className="content" style={{
                backgroundImage: `url(Indian-Girls.jpg)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: '80vh'
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
                    {/* ------- */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src='mobileScreen.png'
                            style={{
                                maxHeight: '36em',
                                opacity: '0.25', backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }} />

                        <div
                            style={{
                                position: 'absolute',
                                width: '16em'
                            }}>


                            <label style={{ display: 'flex', fontWeight: 'bold', color: 'white', marginRight: '7.5em', marginBottom: '1em', marginTop: '11.2em' }}>Phone Number:</label>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px', marginLeft: '0.5em', }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                                    <PhoneInput
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

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh' }}>
                                <div style={{ width: '230px', marginTop: '-2em' }}>






                                    <label htmlFor="password" style={{ color: 'white', fontWeight: 'bold', }}>Please enter the OTP just send to your Mobile Number</label>
                                    {/* <div style={{ color: 'white', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', marginLeft: '3em' }}>{userPhoneNumber}</div> */}
                                    <div style={{ position: 'relative', marginTop: '1em', alignItems: 'center' }}>
                                        <input
                                            type="tel"
                                            id="password"
                                            name="password"
                                            value={otp}
                                            onChange={handlePasswordChange}
                                            onKeyPress={(e) => {
                                                const isNumericInput = /^[0-9]+$/.test(e.key);
                                                if (!isNumericInput || (otp.length >= 6 && e.key !== 'Backspace')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            disabled={isLoading}
                                            style={{
                                                width: '15.8em',
                                                padding: '5px',
                                                height: '25px',
                                                borderRadius: '5px',
                                            }}
                                        />
                                    </div>
                                    <p style={{ color: 'red' }}>{otpValidationMessage}</p>

                                </div>
                                {/* <div style={{ marginRight: '10px' }}> */}


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
                                        >
                                            SUBMIT
                                        </button>
                                    </div>
                                </div>
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

        <div className='footercontent' style={{ alignItems: 'center',marginTop:'0.2em',marginBottom:'0.2em'}}>
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


export default OtpPage;
