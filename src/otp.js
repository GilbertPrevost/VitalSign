import React, { useState } from 'react';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
// import { useNavigate } from 'react-router-dom';


function OtpPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);


    const handlePhoneNumberChange = (value, country) => {
        setPhoneNumber(value);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };


    return (
        <div className="App">
            <header style={{ backgroundImage: 'url("Indian-Girls.jpg")', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="yourvitals_logo_panner.png" alt="yourVitals" style={{ width: '300px', height: '100px' }} />
            </header>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
                <div style={{ width: '300px', marginBottom: '20px' }}>
                    <label htmlFor="password" style={{ fontWeight: 'bold' }}>Please enter the OTP just send to your Mobile Number</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            style={{ width: '100%', padding: '5px', height: '25px' }}
                        />
                        {/* <button
                            onClick={togglePasswordVisibility}
                            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ fontSize: '20px' }} />
                        </button> */}
                    </div>
                </div>


                {/* <div style={{ display: 'flex', alignItems: 'center', width: '300px', marginBottom: '10px' }}>
                    <label htmlFor="rememberMe" style={{ fontWeight: 'bold', marginRight: '127px' }}>Remember Me:</label>
                    <Switch
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={toggleRememberMe}
                        onColor="#020753"
                        offColor="#ccc"
                    />
                </div> */}


                <div style={{ display: 'flex', justifyContent: 'center', width: '300px' }}>
                    {/* <div style={{ marginRight: '20px' }}>
                        <button
                            style={{ backgroundColor: 'navy', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '10px', fontWeight: 'bold' }}
                            onClick={() => {


                            }}
                        >
                            Back
                        </button>
                    </div> */}
                    <div>
                        <button
                            style={{ backgroundColor: 'navy', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '10px', fontWeight: 'bold' }}
                            onClick={() => {


                            }}
                        >
                            REGISTER
                        </button>
                    </div>
                </div>




                {/* <button
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'navy',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginLeft: '250px',
                    }}
                    onClick={() => {


                    }}
                >
                    Forget Password
                </button> */}
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
            </footer>
            <div>
                <p>
                    <strong style={{ color: 'orange' }}>YourVitals, Inc. </strong>
                    <span style={{ color: '#454e6f' }}>©2023, All Rights Reserved.</span>
                </p>
            </div>
        </div>
    );
}


export default OtpPage;
