import React, { useState, useEffect } from 'react';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function App() {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const loginUrl = 'https://staycured-clinic.azurewebsites.net/API/MinimalRegistration/SentOTP';


  // Determine the default country code based on the user's locale
  useEffect(() => {
    const userLocale = navigator.language;
    if (userLocale.startsWith('en-US')) {
      setCountryCode('us');
    } else if (userLocale.startsWith('en-IN')) {
      setCountryCode('in');
    } else {
      // Set a default country code here for other locales
      setCountryCode('us');
    }
  }, []);


  const handleCountryCodeChange = (value, country) => {
    const code = country.dialCode;
    setCountryCode(code);
  };


  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };


  const requestBody = {
    PhoneNumber: `+${countryCode}${phoneNumber}`,
    UserName: phoneNumber,
  };


  const login = () => {
    setIsLoading(true);


    axios
      .post(proxyURL + loginUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle the response data here
        console.log('data', response.data);
        var data = response.data.errormessage;


        if (data.indexOf('Already Exist') !== -1) {
          console.log('Already Exist');
          Navigate('/verification');
          localStorage.setItem('userPhoneNumber', phoneNumber);
          localStorage.setItem('userName', phoneNumber);
        } else {
          console.log('newnumber');
          console.log('result', response.data.result);
          const jsonObject = JSON.parse(response.data.result);
          console.log('session id', jsonObject.Details);
          localStorage.setItem('newSessionId', jsonObject.Details);
          Navigate('/otp');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const handleButtonClick = () => {
    if (!phoneNumber) {
      setAlertMessage('Please fill in the mobile number');
    } else {
      login();
    }
  };


  const LoadingSpinner = () => {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
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
              style={{ width: "300px", height: "100px" }}
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
                width:'16em'
              }}>
              <label style={{ display: 'flex', fontWeight: 'bold', color: 'white', marginRight: '8em', marginBottom: '1em', marginTop: '11.2em' }}>Phone Number:</label>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
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
                  />
                </div>


                {/* New text field */}
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <input
                    type="text"
                    id="newField"
                    name="newField"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    style={{ width: '100%', height: '32px', marginLeft: '0.5em', border: 0, borderRadius: '4px' }}
                  />
                </div>
              </div>


              <button
                style={{
                  width: '152px',
                  backgroundColor: '#f8b413',
                  color: 'white',
                  padding: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  marginLeft: '7.8em'
                }}
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                Register or Sign In
              </button>
              {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
            </div>
          </div>


          {/* ------- */}


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


export default App;



