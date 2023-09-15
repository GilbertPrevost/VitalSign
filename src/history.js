import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";




const History = () => {
    const [vitalSigns, setVitalSigns] = useState([]);
    const [guid, setguid] = useState(localStorage.getItem('guid'));

    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const loginUrl = "https://staycured-clinic.azurewebsites.net/API/PatientVitalSigns/GetDetails_V2";
    // const rectangles = Array(length).fill(null);

    const historyHeaderStyle = {
        backgroundColor: 'navy',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '35px',
    };

    const historyRectangleStyle = {
        width: '320px', // Make the width 100% for mobile
        height: '270px',
        backgroundColor: 'white',
        border: '2px solid black',
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
        fontWeight: 'bold',
    };

     useEffect(() => {
            setguid(localStorage.getItem('guid'));
            callVitalsHistoryOnLoad();
          }, []);

    var requestBody = {
            PatientGUID: guid
          };

    const callVitalsHistoryOnLoad = () => {
        console.log('Function called when component is loaded');
        console.log("requesting",requestBody);


        axios
            .post(proxyURL + loginUrl, requestBody, {
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

    return (
        <div>
            <div style={historyHeaderStyle}>VITAL SIGN HISTORY</div>

            {vitalSigns.map((vitalSign, index) => (
                <div key={index} style={historyRectangleStyle}>
                    <div style={historyTopContentStyle}>
                        <div style={{ flex: '1' }}>
                            <p><span style={historyBoldTextStyle}>Date:</span> {vitalSign.onlyDate}</p>
                            <p><span style={historyBoldTextStyle}>Time:</span> {vitalSign.onlyTime}</p>
                            <p><span style={historyBoldTextStyle}>HR:</span> {vitalSign.heartRate}</p>
                            <p><span style={historyBoldTextStyle}>BP:</span> {vitalSign.bloodPressure}</p>
                            <p><span style={historyBoldTextStyle}>ECG</span></p>
                            <p><span style={historyBoldTextStyle}>QT:</span> {vitalSign.qtinterval}</p>
                            <p><span style={historyBoldTextStyle}>PR:</span> {vitalSign.printerval}</p>
                        </div>
                        <div style={{ flex: '1' }}>
                            <p><span style={historyBoldTextStyle}>O2 Level:</span>{vitalSign.oxygenLevel}</p>
                            <p><span style={historyBoldTextStyle}>BodyTemp:</span>{vitalSign.bodyTemprature}</p>
                            <p><span style={historyBoldTextStyle}>Respiration:</span>{vitalSign.respirationRate}</p>
                            <p><span style={historyBoldTextStyle}>BMI:</span>{vitalSign.bodyMassIndex}</p>
                            <p style={{ color: '#ffffff' }}><span style={historyBoldTextStyle}>ECG</span></p>
                            <p><span style={historyBoldTextStyle}>ST:</span> {vitalSign.stinterval}</p>
                            <p><span style={historyBoldTextStyle}>QRS:</span> {vitalSign.qrsinterval}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;
