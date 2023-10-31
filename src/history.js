import React, { useEffect, useState } from 'react';
// import './App.css';
import './history.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import { BASE_API_URL ,BASE_API_URL1} from './content';


const History = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [guid, setguid] = useState(localStorage.getItem('guid'));
  const [gender, setGender] = useState(localStorage.getItem('gender'));
  const [age, setAge] = useState(localStorage.getItem('about'));
  const [height, setHeight] = useState(localStorage.getItem('height'));
  const [weight, setWeight] = useState(localStorage.getItem('weight'));
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const [weighttype, setweighttype] = useState(localStorage.getItem('weighttype'));
  const [heighttype, setheighttype] = useState(localStorage.getItem('heighttype'));
  const [feet, setfeet] = useState(localStorage.getItem('feet'));
  const [inches, setinches] = useState(localStorage.getItem('inches'));








  const [HR, setHR] = useState(localStorage.getItem('0'));
  const [Blood1, setBloodp] = useState(localStorage.getItem('0'));
  const [Temperature, setTemp] = useState(localStorage.getItem('0'));
  const [oxygen, setOxyzen] = useState(localStorage.getItem('0'));
  const [Respiration, setResp] = useState(localStorage.getItem('0'));
  const [bmi, setBMI] = useState(localStorage.getItem('0'));
  const [qt, setQt] = useState(localStorage.getItem('0'));
  const [Qrs, setQrs] = useState(localStorage.getItem('0'));
  const [ST, setSt] = useState(localStorage.getItem('0'));
  const [Pr, setPr] = useState(localStorage.getItem('0'));
  const [date, setDate] = useState(localStorage.getItem('0'));
  const [time, setTime] = useState(localStorage.getItem('0'));

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);


  // const filterListTitle = ['HR', 'BP', 'QT', 'PR', 'O2 Level',
  // 'Body Temp', 'Respiration', 'BMI', 'ST', 'QRS'];

  const selecteKey = ['heartRate', 'bodyTemprature', 'respirationRate', 'bloodPressure', 'oxygenLevel', 'bodyMassIndex', 'qtinterval', 'stinterval', 'printerval',
    'qrsinterval'];

  const filterListTitle = ['Heart Rate', 'Body Temprature', 'Respiration Rate', 'Blood Pressure', 'Oxygen Level', 'Body Mass Index', 'ECG QT', 'ECG ST', 'ECG PR',
    'ECG QRS']

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('All');
    const options = ['All','Heart Rate', 'Body Temprature', 'Respiration Rate', 'Blood Pressure', 'Oxygen Level', 'Body Mass Index', 'ECG QT', 'ECG ST', 'ECG PR',
      'ECG QRS'];

    const toggleModal = () => {
      setIsOpen(!isOpen);
      setIsRotated(!isRotated);
    };

    const handleCheckboxChange = (e) => {
      const value = e.target.value;
      setIsRotated(!isRotated);

      if (selectedValue === value || value === 'All') {
        // setSelectedOptions(selectedOptions.filter(option => option !== value));
        setSelectedValue('All');
        setIsFilterON(false);

      } else {
        // setSelectedOptions([...selectedOptions, value]);
        setSelectedValue(value);
        setIsFilterON(true);
        setSelectedKey(selecteKey[options.indexOf(value)-1]);

      }
      setIsOpen(false);

    };



  const [isFilterON, setIsFilterON] = useState(false);
  // const [selectedValue, setSelectedValue] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    console.log('index', event.target.selectedIndex);
    if (event.target.selectedIndex === 0) {
      setIsFilterON(false);
    } else {
      setIsFilterON(true);
      setSelectedKey(selecteKey[event.target.selectedIndex - 1])
    }
    setSelectedValue(newValue);
  };

  const proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}
  const loginUrl = `${BASE_API_URL1}PatientVitalSigns/GetDetails_V2`;
  // const rectangles = Array(length).fill(null);

  // const historyFilterBoldTextStyle = {
  //   fontSize: '16px',
  // };

  const historyHeaderStyle = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
  };


  const historyRectangleStyle = {
    width: '460px', // Make the width 100% for mobile
    height: '270px',
    backgroundColor: 'white',
    margin: '10px auto',
    display: 'flex',
    flexDirection: 'column',
  };








  const historyTopContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  };

  const historyBottomContentStyle = {
    marginTop: '1px',
    padding: '10px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const historyBoldTextStyle = {
    fontWeight: 'bold'
  };
-9
  const modalStyle = {
    // display: isModalOpen ? 'block' : 'none',
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


  const handleScrollX = (scroll) => {
    const container = document.getElementById("ecg-container");
    if (container) {
      const maxScrollX = container.scrollWidth - container.clientWidth;
      setScrollX(Math.min(maxScrollX, Math.max(0, scroll)));
    }
  };

  const handleScrollY = (scroll) => {
    const container = document.getElementById("ecg-container");
    if (container) {
      const maxScrollY = container.scrollHeight - container.clientHeight;
      setScrollY(Math.min(maxScrollY, Math.max(0, scroll)));
    }
  };


  useEffect(() => {
    handleScrollX(scrollX);
    handleScrollY(scrollY);
  }, [scrollX, scrollY]);
















  const patientData = [{
    patientVitalSignsID: 1064,
    patientGUID: "f44ea07e-8af0-4485-b26c-b5f10cd677dc",
    vitalSignType: "All",
    heartRate: 84,
    bloodPressure: "137/84",
    respirationRate: 12,
    oxygenLevel: 95,
    bodyTemprature: 96.00,
    recordingDateTime: "2023-09-23T19:36:00",
    recordingDateTimeview: null,
    onlyDate: "23/09/2023",
    onlyTime: "19:36",
    bodyMassIndex: "21.68",
    qtinterval: "0.75 Sec",
    stinterval: "0.08 Sec",
    printerval: "0.1 Sec",
    qrsinterval: "0.05 Sec",
    createdDateTime: "2023-09-23T19:36:58.817",
    vtype: null,
    insert_Type: "Mobile",
    count: null,
    age: 25
  },
  {
    patientVitalSignsID: 1064,
    patientGUID: "f44ea07e-8af0-4485-b26c-b5f10cd677dc",
    vitalSignType: "All",
    heartRate: 84,
    bloodPressure: "137/84",
    respirationRate: 12,
    oxygenLevel: 95,
    bodyTemprature: 96.00,
    recordingDateTime: "2023-09-23T19:36:00",
    recordingDateTimeview: null,
    onlyDate: "23/09/2023",
    onlyTime: "19:36",
    bodyMassIndex: "21.68",
    qtinterval: "0.75 Sec",
    stinterval: "0.08 Sec",
    printerval: "0.1 Sec",
    qrsinterval: "0.05 Sec",
    createdDateTime: "2023-09-23T19:36:58.817",
    vtype: null,
    insert_Type: "Mobile",
    count: null,
    age: 25
  },
  {
    patientVitalSignsID: 1064,
    patientGUID: "f44ea07e-8af0-4485-b26c-b5f10cd677dc",
    vitalSignType: "All",
    heartRate: 84,
    bloodPressure: "137/84",
    respirationRate: 12,
    oxygenLevel: 95,
    bodyTemprature: 96.00,
    recordingDateTime: "2023-09-23T19:36:00",
    recordingDateTimeview: null,
    onlyDate: "23/09/2023",
    onlyTime: "19:36",
    bodyMassIndex: "21.68",
    qtinterval: "0.75 Sec",
    stinterval: "0.08 Sec",
    printerval: "0.1 Sec",
    qrsinterval: "0.05 Sec",
    createdDateTime: "2023-09-23T19:36:58.817",
    vtype: null,
    insert_Type: "Mobile",
    count: null,
    age: 25
  },
  {
    patientVitalSignsID: 1064,
    patientGUID: "f44ea07e-8af0-4485-b26c-b5f10cd677dc",
    vitalSignType: "All",
    heartRate: 84,
    bloodPressure: "137/84",
    respirationRate: 12,
    oxygenLevel: 95,
    bodyTemprature: 96.00,
    recordingDateTime: "2023-09-23T19:36:00",
    recordingDateTimeview: null,
    onlyDate: "23/09/2023",
    onlyTime: "19:36",
    bodyMassIndex: "21.68",
    qtinterval: "0.75 Sec",
    stinterval: "0.08 Sec",
    printerval: "0.1 Sec",
    qrsinterval: "0.05 Sec",
    createdDateTime: "2023-09-23T19:36:58.817",
    vtype: null,
    insert_Type: "Mobile",
    count: null,
    age: 25
  }];

  const overlayStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '122.5%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
    zIndex: 999, // Lower z-index to be below the modal
  };

  const [isRotated, setIsRotated] = useState(false);
  const rotation = isRotated ? 180 : 0 ;

  const imgStyle = {
    position: 'absolute',
    // marginTop: '0.2em',
    right: '2em',
    // height: '0.7em',
    width: '0.7em',
    transform: `rotate(${rotation}deg)`,
  };








  useEffect(() => {
    setguid(localStorage.getItem('guid'));
    setGender(localStorage.getItem('gender'));
    setHeight(localStorage.getItem('height'));
    setWeight(localStorage.getItem('weight'));


    setfeet(localStorage.getItem('feet'));
    setinches(localStorage.getItem('inches'));
    setweighttype(localStorage.getItem('weighttype'));
    setheighttype(localStorage.getItem('heighttype'));






    // setVitalSigns(patientData);




    callVitalsHistoryOnLoad();
  }, []);








  var requestBody = {
    PatientGUID: guid
    // PatientGUID: "f44ea07e-8af0-4485-b26c-b5f10cd677dc"
  };








  const handleItemClick = (index) => {
    setModalIsOpen(true);
    const data = vitalSigns[index];
    setBMI(data.bodyMassIndex);
    setBloodp(data.bloodPressure);
    setHR(data.heartRate);
    setOxyzen(data.oxygenLevel);
    setResp(data.respirationRate);
    setTemp(data.bodyTemprature);
    setPr(data.printerval);
    setQrs(data.qrsinterval);
    setQt(data.qtinterval);
    setSt(data.stinterval);


    setDate(data.onlyDate);
    setTime(data.onlyTime);
    setIsModalOpen(true);
  };








  const callVitalsHistoryOnLoad = () => {
    console.log('Function called when component is loaded');
    console.log("requesting", requestBody);








    axios
      .post(loginUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        var data = response.data.errormessage;
        setVitalSigns(response.data);
      })
      .catch((error) => {
        console.error("Error:1111", error);
      });








  };








  const Navigate = useNavigate();
  const backButton = () => {
    Navigate('/Home-Page');
  };








  const ECGContainer = {
    display: isModalOpen ? 'block' : 'none',
    backgroundColor: "#efefef",
    height: "34.7em",
    margin: "auto",
    marginRight: "-15px",
    // marginTop: "4em",
    // marginBottom: 'em',
    marginLeft: "-15px",
    overflow: "auto",
    scrollLeft: scrollX,
    scrollTop: scrollY, // Set scrollTop to scrollY
  };








  const svgStyle = {
    display: 'block',
    margin: 'auto',
  };








  const numVerticalLines = 8;
  const HorizontalLineSpacing = (373 - 50) / (numVerticalLines - 1) * 1.8;
  const verticalLineSpacing = (189 - 50) / (numVerticalLines - 1) * 1.8;








  const heading = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
  };








  const verticalLines = [];
  for (let i = 0; i < numVerticalLines; i++) {
    const x = 50 + i * verticalLineSpacing;
    const color = i === 7 ? "black" : "gray"; // Change color to black for the 8th line
    verticalLines.push(
      <line key={i} x1={x} y1={50} x2={x} y2={250} stroke={color} strokeWidth="1" />
    );
  }









  // ECG data (sample data, replace with your actual data)
  const ecgData = [
    { x: 0, y: 0 },
    { x: 0.1, y: 0.05 },
    { x: 0.12, y: 0.1 },
    { x: 0.2, y: 0.05 },
    { x: 0.21, y: 0 },
    { x: 0.26, y: 1 },
    { x: 0.31, y: -0.17 },
    { x: 0.35, y: 0 },
    { x: 0.4, y: 0 },
    { x: 0.45, y: 0.05 },
    { x: 0.5, y: 0.06 },
    { x: 0.53, y: 0.07 },
    { x: 0.58, y: 0.06 },
    { x: 0.6, y: 0.05 },
    { x: 0.65, y: 0 },
    { x: 0.68, y: 0 },
    { x: 0.7, y: 0 },
    { x: 0.75, y: 0 },
    { x: 0.78, y: 0.01 },
    { x: 0.8, y: 0.02 },
    { x: 0.82, y: 0.03 },
    { x: 0.85, y: 0.02 },
    { x: 0.86, y: 0.01 },
    { x: 0.88, y: 0 },
    { x: 0.9, y: 0 },
    { x: 0.9, y: 0 },
    { x: 0.92, y: 0 },
    { x: 0.95, y: 0 },
    { x: 1, y: 0.1 },
    { x: 1.1, y: 0.05 },
    { x: 1.15, y: 0.1 },
    { x: 1.16, y: 0.05 },
    { x: 1.17, y: 0 },
    { x: 1.25, y: 1 },
    { x: 1.3, y: -0.17 },
    { x: 1.4, y: 0 },
    { x: 1.55, y: 0 },
    { x: 1.65, y: 0.05 },
    { x: 1.71, y: 0.06 },
    { x: 1.75, y: 0.07 },
    { x: 1.78, y: 0.06 },
    { x: 1.79, y: 0.05 },
    { x: 1.8, y: 0.0 },
    { x: 2, y: 0.1 },
  ];








  // Calculate the scaling factors based on chart dimensions and data range
  const xScale = (300 - 50) / (ecgData.length - 1);
  const yScale = (138 - 50) / (Math.max(...ecgData.map(point => point.y)) - Math.min(...ecgData.map(point => point.y)));








  // Convert ECG data to SVG path
  const ecgPath = `M${ecgData.map((point, index) => `${50 + index * xScale},${200 - (point.y - Math.min(...ecgData.map(point => point.y))) * yScale}`).join(' L')}`;


















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








      <div className="HistoryContainer" >




        <header className='historyHeader'>
















          <button className='historyBackBtn'








            onClick={() => {
              backButton();
            }}
          >
            <img
              src="back.png"
              alt="Back"
              className='ImgHistoryBackBtn'
            />
            {/* Logout */}
          </button>
















          <div className='HistoryHeaderTxt'>
            VITAL SIGNS HISTORY
          </div>








        </header>
































        <div className='profileDetailHeader'>
          <div className='profileDetailHeaderText'>
            <p><span className='profileDetailText'>Gender:</span> {gender}</p>
            <p><span className='profileDetailText'>Age:</span> {age}</p>








          </div>
          <div style={{ flex: '1' }}>
            <p><span className='profileDetailText'>Height:</span> {heighttype === 'CMS' ? height + ' cm' : feet + "\'" + inches + "\""}</p>
            <p><span className='profileDetailText'>Weight:</span> {(weighttype == 'KG') ? weight + ' Kg' : weight + ' lbs'}</p>
          </div>
        </div>








        {/* <div className='FilterDropdown'>
          <select className='select' value={selectedValue}
            onChange={handleInputChange}>
            <option value="">All</option>
            {filterListTitle.map((item, index) => (
              <option className='paragraphText' key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div> */}




        <button onClick={toggleModal} className='FilterHeaderTitle'>{selectedValue}
        <img
                src="icons8-triangle-16.png"
                alt="Arrow"
                style={imgStyle}
              /></button >
        {isOpen && (
          <div style={overlayStyle}>

            <div className='filterModalBox'>

              {/* <div className="modal-content"> */}

                <div style={{ background: 'navy', color: 'white', padding: '10px', textAlign: 'center', fontSize: '16px' }} >Filter History
                <button
                // className="close-button"
                onClick={() => {
                  toggleModal(false);
                  setIsRotated(!isRotated);
                }}
                className='filterModelx'
              >
                x
              </button></div>

                <ul style={{ listStyleType: 'none', padding: 0 }} >
                  {options.map(option => (
                    <li key={option} style={{ background: '#efefef', marginBottom: '5px', padding: '5px' }} >
                      <label style={{ textAlign: 'left' }} >
                        <input
                          type="checkbox"
                          value={option}
                          checked={selectedValue === option}

                          onChange={handleCheckboxChange}
                        />
                        <span style={{ marginLeft: '10px' }}>{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              {/* </div> */}
            </div>
          </div>
        )}

        {!isFilterON && vitalSigns.map((vitalSign, index) => (
          <div key={index} className='history-rectangle'
            onClick={() => handleItemClick(index)}>
            <div className='history-top-content'>
              <div style={{ flex: 'auto' }}>


                {!false && <p><span className='profileDetailText'>Date:</span> {vitalSign.onlyDate}</p>}
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>Time:</span> {vitalSign.onlyTime}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>HR:</span> {vitalSign.heartRate}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>BP:</span> {vitalSign.bloodPressure}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>ECG</span></p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>QT:</span> {vitalSign.qtinterval}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>PR:</span> {vitalSign.printerval}</p>
                </div>
              </div>
              <div style={{ flex: '1.5' }}>
              <img src='detail-icon.png' className='detail-icon'></img>
                <p><span className='profileDetailText'>O2 Level:</span> {vitalSign.oxygenLevel}</p>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>BodyTemp:</span> {vitalSign.bodyTemprature}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>Respiration:</span> {vitalSign.respirationRate}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>BMI:</span> {vitalSign.bodyMassIndex}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p style={{ color: '#ffffff' }}><span className='profileDetailText'>ECG</span></p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>ST:</span> {vitalSign.stinterval}</p>
                </div>
                <div style={{ marginTop: "-0.5em" }} >
                  <p><span className='profileDetailText'>QRS:</span> {vitalSign.qrsinterval}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isFilterON &&
          <div className='FilterDropdown-header'>
            <p className='FilterDropdown-headerTitle'>Date</p>
            <p className='FilterDropdown-headerTitle'>Time</p>
            {(selectedValue === 'ECG QRS' || selectedValue === 'ECG PR' || selectedValue === 'ECG QT' || selectedValue === 'ECG ST') ?
              <p className='FilterDropdown-headerTitle1'>{selectedValue}</p> : <p className='FilterDropdown-headerTitle'>{selectedValue}</p>
            }
          </div>
        }
        {isFilterON && vitalSigns.map((vitalSign, index) => (
          <div key={index} className='history-filter-rectangle'>
            <div className='history-filter-top-content'>
              <div style={{ flex: '1' }}>
                <p className='historyFilterTextStyle'>{vitalSign.onlyDate}</p>
              </div>
              <div style={{ flex: 'auto' }} className='history-filter-top-content1'>
                <p className='historyFilterTextStyle'>{vitalSign.onlyTime}</p>
              </div>








              <div style={{ flex: '1' }} >
                <p className='historyFilterTextStyle'>{vitalSign[selectedKey]}</p>
              </div>
            </div>
          </div>
        ))}




        {vitalSigns.length === 0 && <div style={{ textAlign: 'center', marginTop: '50%' }}><h3>No record found</h3> </div>}




        {/* <div className="white-container" style={{ marginBottom: '10px', width: "96%", background: "#e5e5e6;", position: "relative" }}> */}








        <Modal
          isOpen={modalIsOpen}
          // onRequestClose={closeDialog}
          contentLabel="Take Vital Signs"
          className="historyPopUpModal"
          overlayClassName="historyOverlay"
        >
          <div className='historyModel'>


            <div
              id="header"
              className='vitalDetailsBorder'
            >
              <div>
                <h2
                  className='vitalDetailsModal'
                >
                  Vital Details
                </h2>
              </div>
              <button
                // className="close-button"
                onClick={() => {
                  setModalIsOpen(false);
                }}
                className='historyModelX'
              >
                x
              </button>








            </div>




















            <header1 className='historyDateTime'>


              <div className="HistoryRecord-title">
                <div style={{ marginLeft: "-4.5em" }}><span className='profileDetailText'>Date:</span> {date}</div>
                <div style={{ marginLeft: "5.3em" }}><span className='profileDetailText'>Time:</span> {time}</div>


              </div>




            </header1>
            <div className='ECGContainer'>
              <div>
                <div className="HistoryImage-container">
                  <img src="hypertension.png" alt="Blood Pressure" className="HistoryImage1" />
                  <img src="oxygen.png" alt="Oxygen Saturation" className="HistoryImage1" /></div>
                <div className="HistoryHeader-container">
                  <h4 className="HistoryHeader-title">Blood Pressure</h4>
                  <h4 className="HistoryHeader-title">Oxygen Saturation</h4>
                </div>
                <div className="HistoryDetails-container">
                  {Blood1 !== 0 ? (
                    <>
                      <div className="HistoryValue">{Blood1}</div>
                    </>
                  ) : (
                    <div className="HistoryValue"> 0 </div>
                  )}
                  {oxygen !== 0 ? (
                    <>
                      <div className="HistoryValue">{oxygen}</div>
                    </>
                  ) : (
                    <div className="HistoryValue"> 0 </div>
                  )}
                </div>
                <div className="HistoryTilte-contaniner">
                  <div className="HistoryTilte">Normal Range</div>
                  <div className="HistoryTilte">Normal Range</div>
                </div>
                <div className="HistoryRange-container">
                  <div className="HistoryRange">120/80 - 140/90</div>
                  <div className="HistoryRange">95 - 100</div>
                </div>
               <div className="HistoryImage-container">
                  <img src="heart.png" alt="Heart Rate" className="HistoryImage" />
                  <img src="Thermometer.png" alt="Body Temperature" className="HistoryImage" /></div>
                <div className="HistoryHeader-container1 ">
                  <h4 className="HistoryHeader-title1">Heart Rate</h4>
                  <h4 className="HistoryHeader-title1">Body Temperature</h4>
                </div>
                <div className="HistoryDetails-container">
                  {HR !== 0 ? (
                    <>
                      <div className="HistoryValue">{HR}</div>
                    </>
                  ) : (
                    <div className="HistoryValue">0</div>
                  )}
                  {Temperature !== 0 ? (
                    <>
                      <div className="HistoryValue">{Temperature}</div>
                    </>
                  ) : (
                    <div className="HistoryValue">0</div>
                  )}
                </div>
                <div className="HistoryTilte-contaniner">
                  <div className="HistoryTilte">Normal Range</div>
                  <div className="HistoryTilte">Normal Range</div>
                </div>
                <div className="HistoryRange-container1">
                  <div className="HistoryRange1">60 - 90</div>
                  <div className="HistoryRange1">96 F - 98.4 F</div>
                </div>
                <div className="HistoryImage-container">
                  <img src="lungs.png" alt="Respiration Rate" className="HistoryImage" />
                  <img src="bmi_icon.png" alt="Body Mass Index" className="HistoryImage" /></div>
                <div className="HistoryHeader-container">
                  <h4 className="HistoryHeader-title">Respiration Rate</h4>
                  <h4 className="HistoryHeader-title">Body Mass Index</h4>
                </div>
                <div className="HistoryDetails-container">
                  {Respiration !== 0 ? (
                    <>
                      <div className="HistoryValue">{Respiration}</div>
                      {/* <div className="result">{setRespriationValue}</div> */}
                    </>
                  ) : (
                    <div className="HistoryValue"> 0 </div>
                  )}
                  {bmi !== 0 ? (
                    <>
                      {/* <div className="value">{bmi.toFixed(2)}</div> */}
                      <div className="HistoryValue">{bmi}</div>
                      {/* <div className="result">{setBmiValue}</div> */}
                    </>
                  ) : (
                    <div className="HistorValue"> 0 </div>
                  )}
                </div>
                <div className="HistoryTilte-contaniner">
                  <div className="HistoryTilte">Normal Range</div>
                  <div className="HistoryTilte">Normal Range</div>
                </div>








                <div className="HistoryRange-container2">
                  <div className="HistoryRange2">12 - 20</div>
                  <div className="HistoryRange2">18.5 - 25</div>
                </div>
              </div>








              <center><h3 className="HistoryECGIntervelText">Electrocardiogram</h3></center>








              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                <svg width={500} height={350} style={svgStyle}>
                  {/* X-Axis */}
                  <line x1={49} y1={250} x2={300} y2={250} stroke="black" strokeWidth="2" />
                  {/* X-Axis Label (centered) */}








                  <text x={165} y={300} textAnchor="middle" fontSize="14px" fontWeight="bold">
                    (Seconds)
                  </text>
                  <text x={53} y={270} textAnchor="end" fontSize="14px">
                    0
                  </text>
                  <text x={94.5} y={270} textAnchor="end" fontSize="14px">
                    0.2
                  </text>
                  <text x={131} y={270} textAnchor="end" fontSize="14px">
                    0.4
                  </text>
                  <text x={167} y={270} textAnchor="end" fontSize="14px">
                    0.6
                  </text>
                  <text x={203} y={270} textAnchor="end" fontSize="14px">
                    0.8
                  </text>
                  <text x={237} y={270} textAnchor="end" fontSize="14px">
                    1.0
                  </text>
                  <text x={274} y={270} textAnchor="end" fontSize="14px">
                    1.2
                  </text>
                  <text x={308} y={270} textAnchor="end" fontSize="14px">
                    1.4
                  </text>
                  {/* <text x={335} y={270} textAnchor="end" fontSize="14px">
                    1.6
                  </text>
                  <text x={370} y={270} textAnchor="end" fontSize="14px">
                    1.8
                  </text> */}








                  {/* Y-Axis */}
                  <line x1={50} y1={250} x2={50} y2={50} stroke="black" strokeWidth="2" />
                  {/* Y-Axis Label (centered) */}
                  <text x={35} y={188} textAnchor="middle" fontSize="14px" fontWeight="bold" transform="rotate(-90, 10, 175)">(Milli-Volts)</text>








                  {/* Optional labels for Y-axis */}
                  <text x={40} y={250} textAnchor="end">0</text>
                  <text x={40} y={193} textAnchor="end">1</text>
                  <text x={40} y={125} textAnchor="end">2</text>
                  <text x={40} y={60} textAnchor="end">3</text>








                  {/* Horizontal lines with increased spacing */}
                  <line x1={50} y1={270 - HorizontalLineSpacing} x2={300} y2={270 - HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
                  <line x1={50} y1={285 - 2 * HorizontalLineSpacing} x2={300} y2={285 - 2 * HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
                  <line x1={50} y1={300 - 3 * HorizontalLineSpacing} x2={300} y2={300 - 3 * HorizontalLineSpacing} stroke="black" strokeWidth="2" />








                  {/* Render the ECG line series */}
                  <path d={ecgPath} stroke="#0276cb" strokeWidth="2.5" fill="none" />
                  {/* Render the vertical lines */}
                  {verticalLines}
                </svg>
              </div>








              <div style={{ marginTop: '5px' }}>
                <center><h3 className="HistoryECGIntervelText1">ECG Intervals</h3></center>








                <div className="HistoryContainer-image">








                  <div className="HistoryHeader-container">
                    <h3 className="HistoryHeader-title2">QT Interval</h3>
                    <h3 className="HistoryHeader-title2">ST Segment</h3>
                  </div>








                  <div className="HistoryDetails-container">
                    <div className="HistoryValue"> {qt} </div>
                    <div className="HistoryValue"> {ST} </div>
                  </div>








                  <div className="HistoryTilte-contaniner">
                    <div className="HistoryTilteT">Normal Range</div>
                    <div className="HistoryTilteT">Normal Range</div>
                  </div>








                  <div className="HistoryRange-container1">
                    <div className="HistoryRange5">0.06 - 01.2 Sec</div>
                    <div className="HistoryRange5">0.08 Sec</div>
                  </div>








                  <div className="HistoryHeader-container">
                    <h3 className="HistoryHeader-title2">PR Interval</h3>
                    <h3 className="HistoryHeader-title2">QRS Interval</h3>
                  </div>








                  <div className="HistoryDetails-container">
                    <div className="HistoryValue"> {Pr} </div>
                    <div className="HistoryValue"> {Qrs} </div>
                  </div>








                  <div className="HistoryTilte-contaniner">
                    <div className="HistoryTilteT">Normal Range</div>
                    <div className="HistoryTilteT">Normal Range</div>
                  </div>








                  <div className="HistoryRange-container1">
                    <div className="HistoryRange6">0.12 - 0.20 Sec</div>
                    <div className="HistoryRange6">0.06 - 0.10 Sec</div>
                  </div>
                </div>
              </div>








              <div
                style={{
                  position: "absolute",
                  top: "23em",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
              </div>
            </div>
          </div>
        </Modal>


      </div>


      <footer className="historyFooter"
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
        <div style={{ color: "orange", display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>YourVitals, Inc. </div>
        <div style={{ color: "#ffffff" }}>
          © 2023, All Rights Reserved.
        </div>


        <div style={{ alignItems: 'center' }}>
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
    </div>  );
};


export default History;




