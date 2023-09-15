import React, { useState } from 'react';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function App() {

  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setcountryCode] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const loginUrl = "https://staycured-clinic.azurewebsites.net/API/MinimalRegistration/SentOTP";


  const handlePhoneNumberChange = (value, country) => {
    const code = country.dialCode;
    console.log("code", code);
    setcountryCode(code);
    const formattedNumber = value.slice(countryCode.length);
    setPhoneNumber(formattedNumber);
    console.log("phone", formattedNumber);
  };

  var requestBody = {
    PhoneNumber: "+" + countryCode + phoneNumber,
    UserName: phoneNumber
  };

  const login = () => {
    setIsLoading(true);

    axios
      .post(proxyURL + loginUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle the response data here
        console.log("data", response.data);
        var data = response.data.errormessage;
        // var errorjson = JSON.parse();
        if (data.indexOf("Already Exist") !== -1) {
          console.log("Already Exist");
          Navigate('/verification');
          localStorage.setItem('userPhoneNumber', "+" + countryCode + phoneNumber);
          localStorage.setItem('userName', phoneNumber);


        }
        else {
          console.log("newnumber");
          console.log("result", response.data.result);
          const jsonObject = JSON.parse(response.data.result);
          console.log("session id", jsonObject.Details);
          localStorage.setItem('newSessionId', jsonObject.Details);
          Navigate('/otp');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false); // Turn off the loading spinner
      });
  };


  const handleButtonClick = () => {
    if (!phoneNumber) {
      setAlertMessage('Please fill in the mobile number');
    } else {
      login(); // Start the login process
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
    <div className="App">


      <div style={{ backgroundImage: `url(Indian-Girls.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>


        <header style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px' }} />
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh' }}>
          <div style={{ width: '300px', marginBottom: '20px' }}>
            <label htmlFor="phoneNumber" style={{ fontWeight: 'bold', color: 'white', textAlign: 'left' }}>Mobile Number:</label>


            <PhoneInput
              country={'in'}
              onChange={handlePhoneNumberChange}
              inputStyle={{ width: '100%' }}
              containerStyle={{ textAlign: 'left' }}
            />
          </div>
          <button
            style={{
              width: '170px',
              backgroundColor: '#f8b413',
              color: 'white',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '10px',
            }}
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            Register or Sign In
          </button>
          {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
        </div>


        <div style={{ width: '100%', height: '420px', marginTop: '20px' }}>
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q=11.0250608,76.9582571&zoom=18`}


            allowFullScreen
          ></iframe>
        </div>
        <footer style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'navy' }}>
          <div>
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
      </div>
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
export default App;
