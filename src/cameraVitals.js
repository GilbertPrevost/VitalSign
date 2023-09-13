import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './App.js';


const CameraVitals = () => {
  const videoRef = useRef(null);
  const [countdown, setCountdown] = useState(30);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const [timerCompleted, setTimerCompleted] = useState(false);

  // Add a state to track the flashlight status
  const [flashlightOn, setFlashlightOn] = useState(false);

  // Add the redScreenDetected state
  const [redScreenDetected, setRedScreenDetected] = useState(false);

  const redScreenThreshold = 0.2;


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

          const checkRedScreen = () => {
            if (videoRef.current) {
              context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);


              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;

              let redPixelCount = 0;

              for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];

                if (red > 150 && green < 100 && blue < 100) {
                  redPixelCount++;
                }
              }

              const redPixelRatio = redPixelCount / (canvas.width * canvas.height);

              if (redPixelRatio >= redScreenThreshold) {
                setRedScreenDetected(true);
              } else {
                setRedScreenDetected(false);
              }
            }

            requestAnimationFrame(checkRedScreen);
          };

          checkRedScreen();
        });

      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }

    getCameraStream();
  }, []);


  useEffect(() => {
    // Turn off the flashlight when the timer countdown ends
    if (timerCompleted && flashlightOn) {
      const track = videoRef.current.srcObject.getVideoTracks()[0];
      track.applyConstraints({
        advanced: [{ torch: false }]
      });
      setFlashlightOn(false);
    }
  }, [timerCompleted, flashlightOn]);

  useEffect(() => {
    if (redScreenDetected) {
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
  }, [countdown, redScreenDetected]);

  useEffect(() => {
    if (timerCompleted && !showMessage) {
      const navigateTimer = setTimeout(() => {
        setShowMessage(true);
        localStorage.setItem('isSuccess', true);
        navigate('/Home-Page');

      }, 4000);

      return () => {
        clearTimeout(navigateTimer);

      };
    }
  }, [timerCompleted, showMessage, navigate]);


  const headingStyles = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '10px',
    marginBottom: '50px',
  };

  const imageStyles = {
    border: '2px solid black',
    width: '300px',
    height: '150px',
  };

  const progressBarStyles = {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(navy ${(30 - countdown) / 30 * 100}%, transparent 0)`,
  };

  const progressBarTextStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '12px',
    color: 'navy',
    fontWeight: 'bold',
  };

  const progressBarContainerStyles = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',
  };

  return (
    <div className="camera-container">
      <h1 style={headingStyles}>Vital Signs Process</h1>

      <div className="circle-mask">
        <img src="/fingerprint.png" alt="Fingerprint Overlay" className="fingerprint-overlay" />
        <video ref={videoRef} autoPlay playsInline />
      </div>
      <div className="camera-text">

        <p><b>We are scanning your vital signs.</b></p>
        <p><b>Please keep your finger stationary.</b></p>

        <img src="ecgGIF.gif" alt="ECG GIF" style={imageStyles} />
        {redScreenDetected && countdown > 0 ? (
          <div className="progress-bar-container" style={progressBarContainerStyles}>
            <div className="progress-bar" style={progressBarStyles}>
              <div className="progressBarText" style={progressBarTextStyles}>
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
              <div style={{ fontSize: '24px', marginTop: '10px', color: 'red' }}>
                Place your finger on the camera to take vitals.
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
};

export default CameraVitals; 