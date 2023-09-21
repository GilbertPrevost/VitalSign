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
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const verifyUrl = "https://staycured-clinic.azurewebsites.net/API/ForgetPWD/OTPVerification_New";
    const loginUrl = "https://staycured-clinic.azurewebsites.net/API/Login";
    const PasswordUpdateUrl = 'https://staycured-clinic.azurewebsites.net/API/ForgetPWD/UpdateChangePassword';


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
            .post(proxyURL + verifyUrl, requestBodyVerify, {
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
            .post(proxyURL + loginUrl, requestBodyLogin, {
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
            .post(proxyURL + PasswordUpdateUrl, requestBodyupdatePsw, {
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


    return (
        
        <div className="App">

            <div style={{ backgroundImage: `url(Indian-Girls.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

            <header style={{  padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px' }} />
            </header>
          

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh' }}>
<div style={{ width: '300px', marginBottom: '20px' }}>
                    <label htmlFor="password" style={{color: 'white', fontWeight: 'bold' }}>Please enter the OTP just send to your Mobile Number {userPhoneNumber}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={otp}
                            onChange={handlePasswordChange}
                            disabled={isLoading}
                            style={{ width: '100%', padding: '5px', height: '25px' }}
                        />
                    </div>
                </div>
    {/* <div style={{ marginRight: '10px' }}> */}
        <button
            style={{ 
            backgroundColor: '#f8b413',
            color: 'white',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            borderRadius: '10px',
            marginLeft:'17.5em' }}
            onClick={signinclick}
        >
            REGISTER
        </button>
    {/* </div> */}
    
</div>

            <footer style={{ backgroundColor: 'white',  display: 'flex', flexDirection: 'column',  color: 'navy' }}>
          <div>

          <div style={{ width: '100%', height: '420px' }}>
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q=11.0250608,76.9582571&zoom=18`}


            allowFullScreen
          ></iframe>
        </div>


            <button
              style={{ backgroundColor: 'transparent', border: 'none', color: 'navy', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://yourvitals.ai/terms_of_use.html', '_blank');
              }}
            >
              Terms Of Use
            </button>
            <button
              style={{ backgroundColor: 'transparent', border: 'none', color: 'navy', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://yourvitals.ai/privacy_policy.html', '_blank');
              }}
            >
              Privacy Policy
            </button>
            <button
              style={{ backgroundColor: 'transparent', border: 'none', color: 'navy', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://yourvitals.ai/#', '_blank');
              }}
            >
              FAQ
            </button>
          </div>
          <div>
            <p>
              <strong style={{ color: 'orange' }}>YourVitals, Inc. </strong>
              <span style={{ color: '#454e6f' }}>©2023, All Rights Reserved.</span>
            </p>
          </div>


        </footer>

            
            
            {isLoading && <LoadingSpinner />}
        </div>
        
         </div>
    );
}


export default OtpPage;
