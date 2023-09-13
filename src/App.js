import React, { useState } from 'react';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setcountryCode] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const loginUrl = "https://staycured-clinic.azurewebsites.net/API/MinimalRegistration/SentOTP";


  const handlePhoneNumberChange = (value, country) => {
    const code = country.dialCode;
    console.log("code", code);
    setcountryCode(code); // Get the country dial code
    const formattedNumber = value.slice(countryCode.length); // Remove country code
    setPhoneNumber(formattedNumber);
    console.log("phone", formattedNumber);
    // setPhoneNumber(value);
  };
  var requestBody = {
    PhoneNumber: "+" + countryCode + phoneNumber,
    UserName: phoneNumber
  };




  const login1 = () => {
    fetch(proxyURL + loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });


  };


  const login = () => {
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
        }
        else {
          console.log("newnumber");
          Navigate('/otp');
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:1111", error);
      });
  };








  const Navigate = useNavigate();
  const handleButtonClick = () => {
    Navigate('/verification');
    if (!phoneNumber) {
      setAlertMessage('Please fill the mobile number');
      // Navigate('/otp');
    }
    else {
      // const phoneNumberWithoutCountryCode = phoneNumber.replace(`+${countryCode}`, '');
      console.log(phoneNumber);
      // login();
      // Navigate('/verification');
    }

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
              // value={phoneNumber}
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
          >
            REGISTER OR SIGN IN
          </button>
          {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}




        </div>


        <div style={{ width: '100%', height: '320px', marginTop: '20px' }}>
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q=techunitysoftware&zoom=18`}
            allowFullScreen
          ></iframe>
        </div>


        <footer style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'navy' }}>
          {/* <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '150px', height: '50px' }} /> */}
          <div>
            <button
              style={{ backgroundColor: 'transparent', border: 'none', color: 'navy', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://yourvitals.ai/', '_blank');
              }}
            >
              Terms Of Use
            </button>
            <button
              style={{ backgroundColor: 'transparent', border: 'none', color: 'navy', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://yourvitals.ai/', '_blank');
              }}
            >
              Privacy Policy
            </button>
            <button
              style={{ backgroundColor: 'transparent', border: 'none', color: 'navy', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://yourvitals.ai/', '_blank');
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
    </div>
  );
}
export default App;

