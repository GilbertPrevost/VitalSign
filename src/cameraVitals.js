import React, { useRef, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
// import './App.css';
import './cameraVitals.css';
import './App.js';
import { useNavigate } from 'react-router-dom';


const CameraVitals = () => {
  const videoRef = useRef(null);
  const [countdown, setCountdown] = useState(30);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const [timerCompleted, setTimerCompleted] = useState(false);
  // Add a state to track the flashlight status

  const [isFlashlightOn, setIsFlashlightOn] = useState(false);



  const toggleFlashlight = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const track = stream.getVideoTracks()[0];
      await track.applyConstraints({ advanced: [{ torch: isFlashlightOn }] });
      setIsFlashlightOn(!isFlashlightOn);
    } catch (error) {
      console.error('Error accessing flashlight:', error);
    }
  };


  // Add the blackScreenDetected state
  const [blackScreenDetected, setblackScreenDetected] = useState(false);


  const blackScreenThreshold = 0.2;




  useEffect(() => {
    const constraints = { video: { facingMode: 'environment' } };


    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;


        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');


        videoRef.current.addEventListener('playing', () => {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;


          const checkblackScreen = () => {
            if (videoRef.current) {
              context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);




              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;


              let blackPixelCount = 0;


              for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];


                if (red < 50 && green < 50 && blue < 50) {
                  blackPixelCount++;
                }
              }


              const blackPixelRatio = blackPixelCount / (canvas.width * canvas.height);


              if (blackPixelRatio >= blackScreenThreshold) {
                setblackScreenDetected(true);
              } else {
                setblackScreenDetected(false);
              }
            }


            requestAnimationFrame(checkblackScreen);
          };


          checkblackScreen();
        });


      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }


    getCameraStream();
  }, []);


  useEffect(() => {
    if (blackScreenDetected) {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);


        return () => {
          clearInterval(timer);
        };
      } else {
        setShowMessage(false);
        if (countdown === 0) {
          setTimerCompleted(true);
        }
      }
    } else {
      setCountdown(30);
    }
  }, [countdown, blackScreenDetected]);


  useEffect(() => {
    if (timerCompleted && !showMessage) {
      const navigateTimer = setTimeout(() => {
        setShowMessage(true);
        localStorage.setItem('isSuccess', true);
        localStorage.setItem("from", "camera");



        HeartRate();
        BodyTemperature();
        RespirationRate();
        bloodpre();
        oxyzen();
        QT();
        ST();
        QRS();
        PR();


        localStorage.setItem('cameFromCameraVitals', 'true');


        navigate('/Home-Page');
      }, 4000);


      return () => {
        clearTimeout(navigateTimer);


      };
    }
  }, [timerCompleted, showMessage, navigate]);





  const progressBarStyles = {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(navy ${(30 - countdown) / 30 * 100}%, transparent 0)`,
  };



  const Navigate = useNavigate();
  const backButton = () => {


    Navigate('/takevitals');
  };




  const HeartRate = () => {
    let blood = ""
    // setHeartValue1(blood);
    const Value = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
    console.log('HR...', Value);
    // setHeartValue(String(Value));
    localStorage.setItem('HR', + Value)
  };


  const oxyzen = () => {
    // let oxygen = ""
    // setOxygenValue1(oxygen);
    const Value = Math.floor(Math.random() * (100 - 95 + 1)) + 95;
    // setOxygenValue(String(Value));
    localStorage.setItem('oxyzen', + Value)


  };




  const bloodpre = () => {
    // let blood = ""
    // setBloodValue1(blood);
    const systolic = Math.floor(Math.random() * (140 - 120 + 1)) + 120;
    const diastolic = Math.floor(Math.random() * (90 - 80 + 1)) + 80;
    const Value = systolic + "/" + diastolic;
    // setBloodValue(String(bloodPressureValue));
    localStorage.setItem('bloodp', Value)
    console.log('BLo...', Value);
  };




  const RespirationRate = () => {
    // let blood = ""
    // setRespriationValue1(blood);
    const Value = Math.floor(Math.random() * (20 - 12 + 1)) + 12;

    localStorage.setItem('resp', + Value)
  };




  const BodyTemperature = () => {
    // let blood = ""
    // setTempValue1(blood);
    const Value1 = Math.floor(Math.random() * (98.4 - 96 + 1)) + 96;
    const Value = Value1;

    localStorage.setItem('temp', + Value)
    console.log('Temp...', Value);
  };


  const QT = () => {
    // let blood = ""
    // setTempValue1(blood);
    const Value1 = Math.floor(Math.random() * (1.2 - 0.6 + 1)) + 0.6;
    const Value = Value1;

    localStorage.setItem('qt', + Value)
    console.log('Qt...', Value);
  };


  const ST = () => {
    // let blood = ""
    // setTempValue1(blood);
    const Value1 = Math.floor(Math.random() * (0.08 - 0.08 + 1)) + 0.08;
    const Value = Value1;

    localStorage.setItem('st', + Value)
    console.log('ST...', Value);
  };


  const PR = () => {
    // let blood = ""
    // setTempValue1(blood);
    const Value1 = Math.floor(Math.random() * (0.20 - 0.12 + 1)) + 0.12;
    const Value = Value1;

    localStorage.setItem('pr', + Value)
    console.log('PR...', Value);
  };


  const QRS = () => {
    // let blood = ""
    // setTempValue1(blood);
    const Value1 = Math.floor(Math.random() * (0.6 - 0.10 + 1)) + 0.6;
    const Value = (Value1);

    localStorage.setItem('qrs', + Value)
    console.log('Qrs...', Value);
  };




  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave this page? Your progress may be lost.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);





  return (


    <div>
      <header style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        padding: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(Indian-Girls.jpg)`,
        zIndex: '999',
      }}>
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: "300px", height: "100px", marginRight: '1.5em' }} />
        <div style={{}}></div>
      </header>


      <div className='cameraContainer'>


        <div className="camera-container">

          <header className='cameraHeader'>


            <button className='cameraBackBtn'

              onClick={() => {
                backButton();
              }}
            >
              <img
                src="back.png"
                alt="Back"
                className='ImgCameraBackBtn'
              />
              {/* Logout */}
            </button>


            <div className='cameraHeaderTxt'>
              VITAL SIGN PROCESS
            </div>

          </header>

          <div className="circle-mask">
            <img src="/fingerprint.png" alt="Fingerprint Overlay" className="fingerprint-overlay" />
            <video ref={videoRef} autoPlay playsInline />
          </div>
          <div className="camera-text">


            {/* <div>
              <button onClick={toggleFlashlight}>
                {isFlashlightOn ? 'Flashlight On/Off' : 'Flashlight On/Off'}
              </button>
            </div> */}


            <p><b>We are scanning your vital signs.</b></p>
            <p><b>Please keep your finger stationary.</b></p>


            <img src="ecgGIF.gif" alt="ECG GIF" className='GIFStyle' />
            {blackScreenDetected && countdown > 0 ?
              (
                <div className="progressBarContainerStyles">
                  <div className="progress-bar" style={progressBarStyles}>
                    <div className="progressBarTextStyles" >
                      {`${countdown}s Remaining...`}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {timerCompleted ? (
                    <>
                      <div style={{ fontSize: '24px', marginTop: '10px', color: 'green' }}>You may take your hands! </div>
                      <div style={{ fontSize: '18px', marginTop: '10px' }}>Don't close this tab                     </div>
                      <div style={{ fontSize: '18px', marginTop: '10px' }}>Calculating Your Vitlas is in process    </div>
                      <div style={{ fontSize: '18px', marginTop: '10px' }}>This may take some time...               </div>
                    </>
                  ) : (
                    <div className='cameraAlertText'>
                      Place your finger on the camera to take vitals.
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      </div>


      <footer className="cameraVitalsfooter"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "navy",
          marginTop: '100vh',
          width: '100%',
          backgroundImage: `url(Indian-Girls.jpg)`,
        }}
      >
        {/* <div> */}
        <div style={{ color: "orange",display:'flex',justifyContent:'center',fontWeight:'bold'}}>YourVitals, Inc. </div>
          <div style={{ color: "#ffffff"}}>
          © 2023, All Rights Reserved.
          </div>

        <div className='footercontent' style={{ alignItems: 'center'}}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
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
              color: "white",
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
              color: "white",
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


    </div>

  );
};

export default CameraVitals;
