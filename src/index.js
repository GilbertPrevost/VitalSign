import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import TakeVitals from './TakeVitals';
import reportWebVitals from './reportWebVitals';
import CameraVitals from './cameraVitals';
import HomePage from './homePage';
import History from './history';
import OtpPage from './otp';
import Password from './passWord';
import NewUserVerification from './newUserOtp';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/new-user" element={<NewUserVerification/>} />
        <Route path="/verification" element={<Password/>} />
        <Route path="/otp" element={<OtpPage/>} />
        <Route path="/Home-Page" element={<HomePage/>} />
        <Route path="/takevitals" element={<TakeVitals/>} />
        <Route path="/Camera" element={<CameraVitals/>} />
        {/* <Route path="/graph" element={<ECGChart/>} /> */}
        <Route path="/history" element={<History/>} />
        {/* <Route path="/homePage" element={<Hpage/>} /> */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
