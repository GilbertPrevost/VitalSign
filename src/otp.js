import React, { useState, useEffect } from 'react';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';


function OtpPage() {

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

    useEffect(() => {
        setUserPhoneNumber(localStorage.getItem('userPhoneNumber'));
        setUserName(localStorage.getItem("userName"));
        setForgetSessionId(localStorage.getItem('forgotSessionId'));
    }, []);


    // const handlePhoneNumberChange = (value, country) => {
    //     setPhoneNumber(value);
    // };


    const handlePasswordChange = (event) => {
        setOtp(event.target.value);
        console.log("OTP", otp);
    };

    const signinclick = () => {
        if (otp.length == 0) {
            console.error("Enter otp");

        }
        else {
            verifyForgotOtp();
            // console.log("OTP",otp);
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
        UserName: userName
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
                            style={{ width: "300px", height: "100px",marginRight: '1.5em'  }}
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
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh' }}>
                                <div style={{ width: '230px', marginTop: '8.5em' }}>
                                    <label htmlFor="password" style={{ color: 'white', fontWeight: 'bold', }}>Please enter the OTP just send to your Mobile Number</label>
                                    <div style={{ color: 'white', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', marginLeft: '3em' }}>{userPhoneNumber}</div>
                                    <div style={{ position: 'relative', marginTop: '2em', alignItems: 'center', }}>
                                        <input
                                            type="tel" // Change the type to "tel"
                                            id="password"
                                            name="password"
                                            value={otp}
                                            onChange={handlePasswordChange}
                                            onKeyPress={(e) => {
                                                // Check if the pressed key is a number (0-9) or a control key (e.g., Backspace)
                                                const isNumericInput = /^[0-9]+$/.test(e.key);

                                                // If the input is not numeric, prevent it from being entered
                                                if (!isNumericInput) {
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
                                        // disabled={isLoading}
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
                                >
                                    REGISTER
                                </button> */}
                                {/* </div> */}

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
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q=staycuredmedicalclinic&zoom=18`}
                        allowFullScreen
                    ></iframe>
                </div>
                <div className='footercontent' style={{ alignItems: 'center', marginTop: '1em' }}>
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
                <p>
                    <strong style={{ color: "orange" }}>YourVitals, Inc. </strong>
                    <span style={{ color: "#454e6f" }}>
                        ©2023, All Rights Reserved.
                    </span>
                </p>
            </footer>


            {isLoading && <LoadingSpinner />}

        </div>

    );
}


export default OtpPage;
