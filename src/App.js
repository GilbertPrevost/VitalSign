import React, { useState, useEffect } from 'react';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCountryCallingCode } from 'libphonenumber-js';

function App() {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [dialCodes, setDialCode] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
  //https://staycured-clinic-staging.azurewebsites.net/
  const loginUrl = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/MinimalRegistration/SentOTP`;

  // Determine the default country code based on the user's locale
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

  const handlePhoneNumberChange = (value) => {
    if (value.length <= 15) {
      setPhoneNumber(value);
      localStorage.setItem('phoneNumberInput', value);
    }
  };

  const requestBody = {
    PhoneNumber: `+${dialCodes}${phoneNumber}`,
    UserName: phoneNumber,
  };

  const login = () => {
    setIsLoading(true);

    axios
      .post(loginUrl, requestBody, {
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
          localStorage.setItem('userPhoneNumber', '+' + dialCodes + phoneNumber);
          localStorage.setItem('userName', phoneNumber);
        } else {
          console.log('newnumber');
          console.log('result', response.data.result);
          const jsonObject = JSON.parse(response.data.result);
          console.log('session id', jsonObject.Details);
          localStorage.setItem('newSessionId', jsonObject.Details);
          Navigate('/new-user');
          localStorage.setItem('userPhoneNumber', '+' + dialCodes + phoneNumber);
          localStorage.setItem('userName', phoneNumber);
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
    if (!phoneNumber || phoneNumber.length < 7) {
      setAlertMessage('Please enter a valid Mobile number');
    } else {
      setAlertMessage('');
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
        height: "100vh",
        // marginBottom: '35px',
      }}>

        <div >
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
              style={{ width: "300px", height: "100px",marginRight: '1.5em' }}
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

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <input
                    type="tel"
                    id="newField"
                    name="newField"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    onKeyPress={(e) => {
                      // If Enter key is pressed, click the button
    if (e.key === 'Enter') {
      document.getElementById('registerButton').click();
      return; // Exit the function to prevent the following logic from executing
    }
                      // Check if the pressed key is a number (0-9) or a control key (e.g., Backspace)
                      const isNumericInput = /^[0-9]+$/.test(e.key);

                      // If the input is not numeric, prevent it from being entered
                      if (!isNumericInput) {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: '100%', height: '32px', marginLeft: '0.5em', border: 0, borderRadius: '4px' }}
                  />

                </div>
              </div>

              <button
              id='registerButton'
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
              {alertMessage && <div style={{ display: 'flex', marginTop: '1em', fontWeight: 500, color: 'red'}}>{alertMessage}</div>}
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
          
          // marginTop: '100px',
          // marginBottom: '5px',
          // position: 'fixed',

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


export default App;