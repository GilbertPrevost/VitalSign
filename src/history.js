import React from 'react';
import './App.css';

const History = () => {
    const headerStyle = {
        backgroundColor: 'navy',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '35px',
    };

    const rectangleStyle = {
        width: '350px',
        height: '230px',
        backgroundColor: 'white',
        border: '2px solid black',
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'column',
    };

    const topContentStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    };

    const bottomContentStyle = {
        padding: '10px',
        textAlign: 'left',
    };

    const boldTextStyle = {
        fontWeight: 'bold',
    };

    const rectangles = Array(5).fill(null);

    return (
        <div>
            <div style={headerStyle}>VITAL SIGN HISTORY</div>

            {rectangles.map((_, index) => (
                <div key={index} style={rectangleStyle}>
                    <div style={topContentStyle}>
                        <div style={{ flex: '1' }}>
                            <p><span style={boldTextStyle}>Date:</span> January 1, 2023</p>
                            <p><span style={boldTextStyle}>Time:</span> 10:00 AM</p>
                            <p><span style={boldTextStyle}>HR:</span> 75 bpm</p>
                            <p><span style={boldTextStyle}>BP:</span> 120/80 mmHg</p>
                        </div>
                        <div style={{ flex: '1' }}>
                            <p><span style={boldTextStyle}>O2 Level:</span>98</p>
                            <p><span style={boldTextStyle}>BodyTemp:</span>98.6°F</p>
                            <p><span style={boldTextStyle}>Respiration:</span>12</p>
                            <p><span style={boldTextStyle}>BMI:</span>21.67</p>
                        </div>
                    </div>
                    <div style={bottomContentStyle}>
                        <div><span style={boldTextStyle}>ECG</span></div>
                        <div><span style={boldTextStyle}>
                            QT:</span> 0.75
                            <span style={boldTextStyle}>PR:</span> 0.12s
                            <span style={boldTextStyle}>ST:</span> 0.06s
                            <span style={boldTextStyle}>QRS:</span> 0.06s
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;
