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
      <div
        className="content"
        style={{
          backgroundImage: `url(Indian-Girls.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div>
          <header
            style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src="yourvitals_logo_panner.png"
              alt="yourVitals"
              style={{ width: '300px', height: '100px' }}
            />
          </header>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '42vh',
            }}
          >
            <img
              src="mobileScreen2.png"
              style={{
                maxHeight: '43vh',
                opacity: '0.25',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div
              style={{
                position: 'absolute',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '9em',
                  marginBottom: '1em',
                  marginTop: '11.2em',
                }}
              >
                Phone Number:
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <PhoneInput
                    country={countryCode}
                    onChange={handleCountryCodeChange}
                    inputStyle={{ width: '7em' }}
                    containerStyle={{ textAlign: 'left' }}
                    countryCodeEditable={false}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <input
                    type="text"
                    id="newField"
                    name="newField"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    style={{
                      width: '100%',
                      height: '32px',
                      marginLeft: '0.5em',
                      border: 0,
                      borderRadius: '4px',
                    }}
                  />
                </div>
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
                  marginLeft: '7em',
                }}
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                Register or Sign In
              </button>
              {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
            </div>
          </div>

          <footer
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'navy',
            }}
          >
            <div style={{ width: '100%', height: '20em' }}>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOFIGDZDm87A0C9b3JZn2wPIqEVCyEbTM&q=11.0250608,76.9582571&zoom=18`}
                allowFullScreen
              ></iframe>
            </div>
            <div className="footercontent" style={{ alignItems: 'center', marginTop: '1em' }}>
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'navy',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open('https://yourvitals.ai/terms_of_use.html', '_blank');
                }}
              >
                Terms Of Use
              </button>
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'navy',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open('https://yourvitals.ai/privacy_policy.html', '_blank');
                }}
              >
                Privacy Policy
              </button>
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'navy',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open('https://yourvitals.ai/#', '_blank');
                }}
              >
                FAQ
              </button>
            </div>
            <p>
              <strong style={{ color: 'orange' }}>YourVitals, Inc. </strong>
              <span style={{ color: '#454e6f' }}>©2023, All Rights Reserved.</span>
            </p>
          </footer>
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}

export default App;










// import React from 'react';




// function ECGChart() {


//   const svgStyle = {
//     display: 'block',
//     margin: 'auto',
//   };

//   const numVerticalLines = 10;
//   const HorizontalLineSpacing = (465 - 50) / (numVerticalLines - 1) * 1.8;
//   const verticalLineSpacing = (223 - 50) / (numVerticalLines - 1) * 1.8;

//   const heading = {
//     backgroundColor: 'navy',
//     color: 'white',
//     padding: '20px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: '35px',
//   };

//   const verticalLines = [];
//   for (let i = 0; i < numVerticalLines; i++) {
//     const x = 50 + i * verticalLineSpacing;
//     const color = i === 9 ? "black" : "gray"; // Change color to black for the 10th line
//     verticalLines.push(
//       <line key={i} x1={x} y1={50} x2={x} y2={300} stroke={color} strokeWidth="1" />
//     );
//   }

//   // ECG data (sample data, replace with your actual data)
//   const ecgData = [
//     { x: 0, y: 0 },
//     { x: 0.1, y: 0.05 },
//     { x: 0.12, y: 0.1 },
//     { x: 0.2, y: 0.05 },
//     { x: 0.21, y: 0 },
//     { x: 0.26, y: 1 },
//     { x: 0.31, y: -0.17 },
//     { x: 0.35, y: 0 },
//     { x: 0.4, y: 0 },
//     { x: 0.45, y: 0.05 },
//     { x: 0.5, y: 0.06 },
//     { x: 0.53, y: 0.07 },
//     { x: 0.58, y: 0.06 },
//     { x: 0.6, y: 0.05 },
//     { x: 0.65, y: 0 },
//     { x: 0.68, y: 0 },
//     { x: 0.7, y: 0 },
//     { x: 0.75, y: 0 },
//     { x: 0.78, y: 0.01 },
//     { x: 0.8, y: 0.02 },
//     { x: 0.82, y: 0.03 },
//     { x: 0.85, y: 0.02 },
//     { x: 0.86, y: 0.01 },
//     { x: 0.88, y: 0 },
//     { x: 0.9, y: 0 },
//     { x: 0.9, y: 0 },
//     { x: 0.92, y: 0 },
//     { x: 0.95, y: 0 },
//     { x: 1, y: 0.1 },
//     { x: 1.1, y: 0.05 },
//     { x: 1.15, y: 0.1 },
//     { x: 1.16, y: 0.05 },
//     { x: 1.17, y: 0 },
//     { x: 1.25, y: 1 },
//     { x: 1.3, y: -0.17 },
//     { x: 1.4, y: 0 },
//     { x: 1.55, y: 0 },
//     { x: 1.65, y: 0.05 },
//     { x: 1.71, y: 0.06 },
//     { x: 1.75, y: 0.07 },
//     { x: 1.78, y: 0.06 },
//     { x: 1.79, y: 0.05 },
//     { x: 1.8, y: 0.0 },
//     { x: 2, y: 0.1 },
//   ];


//   // Calculate the scaling factors based on chart dimensions and data range
//   const xScale = (362 - 50) / (ecgData.length - 1);
//   const yScale = (148 - 50) / (Math.max(...ecgData.map(point => point.y)) - Math.min(...ecgData.map(point => point.y)));

//   // Convert ECG data to SVG path
//   const ecgPath = `M${ecgData.map((point, index) => `${50 + index * xScale},${230 - (point.y - Math.min(...ecgData.map(point => point.y))) * yScale}`).join(' L')}`;

//   return (
//     <div>
//       <div style={heading}>Electrocardiogram</div>

//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
//         <svg width={500} height={350} style={svgStyle}>
//           {/* X-Axis */}
//           <line x1={50} y1={300} x2={362} y2={300} stroke="black" strokeWidth="2" />
//           {/* X-Axis Label (centered) */}
//           <text x={205} y={325} textAnchor="middle" fontWeight="bold">(Seconds)</text>

//           {/* Y-Axis */}
//           <line x1={50} y1={300} x2={50} y2={50} stroke="black" strokeWidth="2" />
//           {/* Y-Axis Label (centered) */}
//           <text x={7} y={188} textAnchor="middle" fontWeight="bold" transform="rotate(-90, 10, 175)">(Milli-Volts)</text>

//           {/* Optional labels for Y-axis */}
//           <text x={40} y={300} textAnchor="end">-1</text>
//           <text x={40} y={225} textAnchor="end">0</text>
//           <text x={40} y={150} textAnchor="end">1</text>
//           <text x={40} y={75} textAnchor="end">2</text>

//           {/* Horizontal lines with increased spacing */}
//           <line x1={50} y1={300 - HorizontalLineSpacing} x2={362} y2={300 - HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
//           <line x1={50} y1={300 - 2 * HorizontalLineSpacing} x2={362} y2={300 - 2 * HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
//           <line x1={50} y1={300 - 3 * HorizontalLineSpacing} x2={362} y2={300 - 3 * HorizontalLineSpacing} stroke="black" strokeWidth="2" />

//           {/* Render the ECG line series */}
//           <path d={ecgPath} stroke="#0276cb" strokeWidth="2.5" fill="none" />
//           {/* Render the vertical lines */}
//           {verticalLines}
//         </svg>
//       </div>

//       <div style={{ marginTop: '75px' }}>
//         <center><h3>ECG Intervals</h3></center>

//         <div className="section">

//           <div className="details">
//             <h3>QT Interval</h3>
            
//             <div className="value"> 0 </div>
//             {/* )} */}
//             <center><h3>Normal Range</h3></center>
//             <div className="range">0.06 - 01.2 Sec</div>
//           </div>
//         </div>

//         <div className="section">

//           <div className="details">
//             <h3>SG Segment</h3>
            
//             <div className="value"> 0 </div>
//             {/* )} */}
//             <center><h3>Normal Range</h3></center>
//             <div className="range">0.08 Sec</div>
//           </div>
//         </div>

//         <div className="section">

//           <div className="details">
//             <h3>PR Interval</h3>
            
//             <div className="value"> 0 </div>
//             {/* )} */}
//             <center><h3>Normal Range</h3></center>
//             <div className="range">0.12 - 0.20 Sec</div>
//           </div>
//         </div>

//         <div className="section">

//           <div className="details">
//             <h3>QRS Interval</h3>
            
//             <div className="value"> 0 </div>
//             {/* )} */}
//             <center><h3>Normal Range</h3></center>
//             <div className="range">0.06 - 0.10 Sec</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ECGChart;
