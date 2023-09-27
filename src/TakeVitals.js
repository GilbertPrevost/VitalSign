import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const TakeVitals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isModalOpen1,setIsModalOpen1] = useState(false);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    // height: '1000px',
    backgroundColor: '#e5e5e6',
    margin: '0 auto',
  };

  const headerStyle = {
    backgroundColor: 'navy',
    color: 'white',
    // padding: '5px',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: '25px',
    width: '100%',
  };

  const overlayStyle = {
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  const instructionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '15px',
  };

  const stepStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5em',
  };

  const stepNumberStyle = {
    marginLeft: '1em',
    minWidth: '1.5em',
  };

  const startButtonStyle = {
    width: '180px',
    height: '40px',
    fontsize: '19px',
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '10px',
  };

  const navigate = useNavigate();

  const handleStartClick = () => {
    const userAgent = navigator.userAgent;

    navigate('/Camera');


    // if (userAgent.match(/Android/i) || userAgent.match(/iPhone/i)) {
    //   navigate('/Camera');
    // } else {
      // openModal();
    // }
  };


  const modalStyle1 = {
    display: isModalOpen1 ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'navy',
    zIndex: 1000,
    width: '20em',
    height: '8.5em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3.3em, white 3.3em)`,
  };
 
  const modalStyle = {
    display: isModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'navy',
    zIndex: 1000,
    width: '20em',
    height: '8.5em',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    background: `linear-gradient(to bottom, navy 3.3em, white 3.3em)`,
  };

  const okayButtonStyle = {
    backgroundColor: 'navy',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
  };


  const headingStyle = {
    color: 'white',
    marginTop: '0px',
  };

  const alertTextStyle = {
    color: 'black',
  }


  const closeModal = () => {
    navigate('/Home-Page');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const Navigate = useNavigate();
  const backButton = () => {
    Navigate('/Home-Page');
  };

  return (
    <div>

      <header style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(Indian-Girls.jpg)`, }}>
        <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px' }} />
        <div style={{}}></div>
      </header>


      <div className='container'>
        <div style={containerStyle}>


          {/* <div style={headerStyle}>VITAL SIGNS INSTRUCTIONS</div> */}
          {/* <header style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'navy',border: '1px solid #ccc', borderRadius: '5px',width: '100%',height:'55px',
           color: "white", marginBottom: "3px", fontSize: "25px" }}>
           VITAL SIGNS INSTRUCTIONS
          </header> */}

          <header style={{
            // padding: '5px',
            display: 'flex',
            backgroundColor: 'navy',
            border: '1px solid #ccc',
            borderRadius: '5px',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            marginBottom: '3px',
            fontSize: '25px',
            width: '100%', height: '55px'
          }}>

            <button
              style={{
                backgroundColor: '#000080',
                color: 'white',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '10px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center', // Center the content vertically
              }}
              onClick={() => {
                backButton();
              }}
            >
              <img
                src="back.png"
                alt="Back"
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '5px', // Add some space between the image and text
                }}
              />
              {/* Logout */}
            </button>

            <div style={{
              marginRight: '3em',
              textAlign: 'center'
            }}>
              VITAL SIGNS INSTRUCTIONS
            </div>


          </header>



          <img src="cameraIcon.png" alt="Heart" width="250" height="250" />
          <div style={instructionsStyle}>
            <div style={stepStyle}>
              <img src="aa.png" alt="Step 1" width="30" height="30" />
              <div style={stepNumberStyle}>1. Please position yourself in a shaded area.</div>
            </div>
            <div style={stepStyle}>
              <img src="ab.png" alt="Step 2" width="30" height="30" />
              <div style={stepNumberStyle}>2. Place and hold your Index Finger over the Camera Lens.</div>
            </div>
            <div style={stepStyle}>
              <img src="ac.png" alt="Step 3" width="30" height="30" />
              <div style={stepNumberStyle}>3. Make sure your Index Finger fully covers the Camera Lens.</div>
            </div>
            <div style={stepStyle}>
              <img src="ad.png" alt="Step 4" width="30" height="30" />
              <div style={stepNumberStyle}>4. Press the start button below to begin the process.</div>
            </div>
            <div style={stepStyle}>
              <img src="ae.png" alt="Step 5" width="30" height="30" />
              <div style={stepNumberStyle}>5. While the App is taking your Vital Signs please remain still.</div>
            </div>
            <div style={stepStyle}>
              <img src="af.png" alt="Step 6" width="30" height="30" />
              <div style={stepNumberStyle}>6. This will take 30 Seconds and may have to be repeated.</div>
            </div>
          </div>

          <button
            className="button"
            onClick={handleStartClick}
            style={{ width: '180px', height: '40px', fontSize: '19px', backgroundColor: 'navy', color: 'white', marginTop: '1.6em', marginBottom: '0.5em' }}
          >
            Start
          </button>

          <div style={overlayStyle}></div>

          <div style={modalStyle}>
            <button style={okayButtonStyle} onClick={setIsModalOpen1}>
              Okay
            </button>
            <h2 style={headingStyle}>Alert</h2>
            <h4 style={alertTextStyle}>Your Vital Signs can be measured only on mobile devices.
              Please use your mobile devices.</h4>
          </div>

          <div style={modalStyle1}>
            <button style={okayButtonStyle} onClick={closeModal}>
              Okay
            </button>
            <h2 style={headingStyle}>Alert</h2>
            <h4 style={alertTextStyle}>Wait while your pulse is being captured or return to main menu.
              Refresh your screen or check your history.</h4>
          </div>

        </div>
      </div>


      <footer className="footer1"
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

        <div>
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
        <p>
          <strong style={{ color: "orange" }}>YourVitals, Inc. </strong>
          <span style={{ color: "white" }}>
            ©2023, All Rights Reserved.
          </span>
        </p>
      </footer>


    </div>
  );
};

export default TakeVitals;












// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const TakeVitals = () => {
//   const [alertMessage, setAlertMessage] = useState('');


//   const headerStyle = {
//     backgroundColor: 'navy',
//     color: 'white',
//     padding: '5px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: '35px',
//   };

//   const instructionsStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     marginLeft: '15px',
//   };

//   const stepStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   };

//   const stepNumberStyle = {
//     minWidth: '1.5em',
//     marginRight: '5px',
//   };

//   const startButtonStyle = {
//     backgroundColor: 'navy',
//     color: 'white',
//     padding: '10px 20px',
//     fontSize: '20px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginTop: '20px',
//   };

//   const navigate = useNavigate();

//   const handleStartClick = () => {
//     const userAgent = navigator.userAgent;

//     // navigate('/Camera');


//     if (userAgent.match(/Android/i) || userAgent.match(/iPhone/i)) {
//       navigate('/Camera');
//     } else {
//       setAlertMessage('This Vital Signs can be measured only in mobile devices.');
//     }
//   };


//   return (
//     <div>

//         <header style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(Indian-Girls.jpg)`, backgroundRepeat: 'no-repeat' }}>
//           <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px' }} />
//           <div style={{}}></div>
//         </header>




//     <div className='containerStyle'>
//       <div style={headerStyle}>
//         <label> VITAL SIGNS INSTRUCTIONS </label>
//       </div>
//       <img src="cameraIcon.png" alt="Heart" width="250" height="250" />
//       <div style={instructionsStyle}>
//         <div style={stepStyle}>
//           <img src="aa.png" alt="Step 1" width="50" height="50"/>
//           <span style={stepNumberStyle}>1.</span> Please position yourself in a shaded area.
//         </div>
//         <div style={stepStyle}>
//           <img src="ab.png" alt="Step 2" width="50" height="50" />
//           <span style={stepNumberStyle}>2.</span> Place and hold your Index Finger over the Camera Lens.
//         </div>
//         <div style={stepStyle}>
//           <img src="ac.png" alt="Step 3" width="50" height="50" />
//           <span style={stepNumberStyle}>3.</span> Make sure your Index Finger fully covers the Camera Lens.
//         </div>
//         <div style={stepStyle}>
//           <img src="ad.png" alt="Step 4" width="50" height="50" />
//           <span style={stepNumberStyle}>4.</span> Press the start button below to begin the process.
//         </div>
//         <div style={stepStyle}>
//           <img src="ae.png" alt="Step 5" width="50" height="50" />
//           <span style={stepNumberStyle}>5.</span> While the App is taking your Vital Signs please remain still.
//         </div>
//         <div style={stepStyle}>
//           <img src="af.png" alt="Step 6" width="50" height="50" />
//           <span style={stepNumberStyle}>6.</span> This will take 30 Seconds and may have to be repeated.
//         </div>
//       </div>
//       <button style={startButtonStyle} onClick={handleStartClick}>
//         Start
//       </button>
//       {alertMessage && <div style={{ color: 'red', fontWeight: 'bold' }}>{alertMessage}</div>}
//     </div>

//     <footer className="footer1"
//             style={{
//               backgroundColor: "white",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               color: "navy",
//               marginTop: '100vh',
//               width: '100%',
//               backgroundImage: `url(Indian-Girls.jpg)`,
//                backgroundRepeat: 'no-repeat'
//             }}
//           >

//             <div>
//               <button
//                 style={{
//                   backgroundColor: "transparent",
//                   border: "none",
//                   color: "white",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   window.open("https://yourvitals.ai/terms_of_use.html", "_blank");
//                 }}
//               >
//                 Terms Of Use
//               </button>
//               <button
//                 style={{
//                   backgroundColor: "transparent",
//                   border: "none",
//                   color: "white",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   window.open(
//                     "https://yourvitals.ai/privacy_policy.html",
//                     "_blank"
//                   );
//                 }}
//               >
//                 Privacy Policy
//               </button>
//               <button
//                 style={{
//                   backgroundColor: "transparent",
//                   border: "none",
//                   color: "white",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   window.open("https://yourvitals.ai/#", "_blank");
//                 }}
//               >
//                 FAQ
//               </button>
//             </div>
//             <p>
//               <strong style={{ color: "orange" }}>YourVitals, Inc. </strong>
//               <span style={{ color: "white" }}>
//                 ©2023, All Rights Reserved.
//               </span>
//             </p>
//           </footer>




//     </div>
//   );
// };

// export default TakeVitals;
