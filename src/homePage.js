import React, { useState, useRef } from "react";
import "./App.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

Modal.setAppElement("#root");

function HomePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(Number);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [bmiDescription, setBMIDescription] = useState("");

  const [oxygen, setOxygenValue] = useState("0");
  const [Blood, setBloodValue] = useState("0");
  const [Respiration, setRespriationValue] = useState("0");
  const [Temperature, setTempValue] = useState("0");
  const [heart, setHeartValue] = useState("0");

  const [oxygen1, setOxygenValue1] = useState("");
  const [Blood1, setBloodValue1] = useState("");
  const [Respiration1, setRespriationValue1] = useState("");
  const [Temperature1, setTempValue1] = useState("");
  const [heart1, setHeartValue1] = useState("");


  const [bmi, setBMI] = useState(null);

  const navigate = useNavigate();

  const takeVitalSigns = () => {
    setModalIsOpen(true);
  };

  const GoToEcg = () => {
    navigate("/graph");

  };

  const GoToHistory = () => {
    navigate("/history");

  };


  const closeDialog = () => {
    setModalIsOpen(true);
    // calculateBMI();
    // RandomOxygenValue();
    // bloodpre();
    // RespirationRate();
    // BodyTemperature();
    // HeartRate();
  };

  const validateForm = () => {
    if (!gender || age <= 0 || height <= 0 || weight <= 0) {
      setValidationError(true);
    } else {
      setValidationError(false);
      calculateBMI();
      navigate("/takevitals");

      // navigate("/graph");
    }
  };

  const RandomOxygenValue = () => {
    let oxygen = ""
    setOxygenValue1(oxygen);
    const randomValue = Math.floor(Math.random() * (100 - 95 + 1)) + 95;
    setOxygenValue(String(randomValue));

  };

  const bloodpre = () => {
    let blood = ""
    setBloodValue1(blood);
    const systolic = Math.floor(Math.random() * (140 - 120 + 1)) + 120;
    const diastolic = Math.floor(Math.random() * (90 - 80 + 1)) + 80;
    const bloodPressureValue = `${systolic}/${diastolic}`;
    setBloodValue(String(bloodPressureValue));
  };

  const RespirationRate = () => {
    let blood = ""
    setRespriationValue1(blood);
    const randomValue = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    setRespriationValue(String(randomValue));
  };

  const BodyTemperature = () => {
    let blood = ""
    setTempValue1(blood);
    const randomValue = Math.floor(Math.random() * (98.4 - 96 + 1)) + 96;
    setTempValue(String(randomValue));
  };

  const HeartRate = () => {
    let blood = ""
    setHeartValue1(blood);
    const randomValue = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
    setHeartValue(String(randomValue));
  };


  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue);

      let bmiResult = "";
      if (bmiValue < 18.5) {
        bmiResult = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        bmiResult = "Normal Weight";
      } else if (bmiValue >= 25 && bmiValue < 30) {
        bmiResult = "Overweight";
      } else {
        bmiResult = "Obese";
      }
      setBMIDescription(bmiResult);
    }
  };


  const [hasPerformedInitialSetup, setHasPerformedInitialSetup] = useState(false);

  var isSuccess = true;

  isSuccess = localStorage.getItem('isSuccess');

  // Perform initial setup only once when isSuccess becomes true
  if (isSuccess && hasPerformedInitialSetup) {
    setHasPerformedInitialSetup(true);
    calculateBMI();
    RandomOxygenValue();
    bloodpre();
    RespirationRate();
    BodyTemperature();
    HeartRate();
    localStorage.setItem('isSuccess', false);
  }


  return (
    <div className="container">
      <div className="header">
        <div>
          <h2>Vital Signs</h2>
        </div>
      </div>

      <div className="content">
        <div className="section">
          <img src="hypertension.png" alt="Blood Pressure" />
          <div className="details">
            <h3>Blood Pressure</h3>
            {Blood !== 0 ? (

              <>
                <div className="value">{Blood}</div>
                <div className="result">{setBloodValue}</div>
              </>
            ) : (
              <div className="value"> 0 </div>
            )}
            <div className="range">120/80 - 140/90</div>
          </div>
        </div>


        <div className="section">
          <img src="oxygen.png" alt="Oxygen Saturation" />
          <div className="details">
            <h3>Oxygen Saturation</h3>
            {oxygen !== 0 ? (

              <>
                <div className="value">{oxygen}</div>
                <div className="result">{setOxygenValue}</div>
              </>
            ) : (
              <div className="value"> 0 </div>
            )}
            <div className="range">95 - 100</div>
          </div>
        </div>


        <div className="section">
          <img src="heart.png" alt="Heart Rate" />
          <div className="details">
            <h3>Heart Rate</h3>
            {heart !== 0 ? (

              <>
                <div className="value">{heart}</div>
                <div className="result">{setHeartValue}</div>
              </>
            ) : (
              <div className="value"> 0 </div>
            )}
            <div className="range">60 - 90</div>
          </div>
        </div>


        <div className="section">
          <img src="Thermometer.png" alt="Body Temperature" />
          <div className="details">
            <h3>Body Temperature</h3>
            {Temperature !== 0 ? (

              <>
                <div className="value">{Temperature}</div>
                <div className="result">{setTempValue}</div>
              </>
            ) : (
              <div className="value"> 0 </div>
            )}
            <div className="range">96 F - 98.4 F</div>
          </div>
        </div>


        <div className="section">
          <img src="lungs.png" alt="Respiration Rate" />
          <div className="details">
            <h3>Respiration Rate</h3>
            {Respiration !== null ? (

              <>
                <div className="value">{Respiration}</div>
                <div className="result">{setRespriationValue}</div>
              </>
            ) : (
              <div className="value">0</div>
            )}
            <div className="range">12 - 20</div>
          </div>
        </div>


        <div className="section">
          <img src="bmi_icon.png" alt="Body Mass Index" />
          <div className="details">
            <h3>Body Mass Index</h3>
            {bmi !== null ? (

              <>
                <div className="value">{bmi.toFixed(2)}</div>
                <div className="result">{bmiDescription}</div>
              </>
            ) : (
              <div className="value">0</div>
            )}
            <div className="range">18.5 - 25</div>
          </div>
        </div>

      </div>
      <div className="footer">
        <button className="button" onClick={takeVitalSigns}>
          Take Vital Signs
        </button>

        <button className="button" onClick={GoToHistory}>
          Vital Sign History
        </button>

        <button className="button" onClick={GoToEcg}>
          ECG
        </button>

        <button className="button">Save</button>

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeDialog}
        contentLabel="Take Vital Signs"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "-30px",
            }}
          >
            <button
              className="close-button"
              onClick={() => {
                closeDialog();
                setModalIsOpen(false);
              }}
              style={{
                background: "#3399FF",
                color: "white",
                fontWeight: "bold",
                padding: "1px 10px",
                fontSize: "12px",
                margin: "5px",
              }}
            >
              x
            </button>
          </div>
          <h2>Take Vital Signs</h2>
          <form>
            <div
              id="dialog_box"
              style={{ width: "100%", background: "url('dialog_box.jpg')" }}
            >
              <div
                id="header"
                style={{
                  width: "100%",
                  height: "40px",
                  background: "#3399FF",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2
                  style={{
                    margin: "0",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Confirm and / or Edit your profile
                </h2>
              </div>

              <div
                style={{ width: "100%", height: "1px", background: "white" }}
              ></div>
              <div
                id="profile_section"
                style={{ margin: "7px", textAlign: "center" }}
              >
                <h3
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Gender
                </h3>
                <select
                  id="edtgender"
                  value={gender}
                  style={{
                    width: "100%",
                    height: "35px",
                    marginBottom: "5px",
                    textAlign: "center",
                  }}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select the Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <h3
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Age
                </h3>
                <input
                  id="edtage"
                  type="number"
                  style={{
                    width: "100%",
                    height: "35px",
                    marginBottom: "5px",
                    textAlign: "center",
                  }}
                  placeholder="Enter the Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />

                <h3
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Height (CM)
                </h3>
                <input
                  id="edtheight"
                  type="number"
                  style={{
                    width: "100%",
                    height: "35px",
                    marginBottom: "5px",
                    textAlign: "center",
                  }}
                  placeholder="Enter the Height in Centimeters"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />

                <h3
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Weight (KG)
                </h3>
                <input
                  id="edtweight"
                  type="number"
                  style={{
                    width: "100%",
                    height: "35px",
                    marginBottom: "5px",
                    textAlign: "center",
                  }}
                  placeholder="Enter the Weight in Kilograms"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div
                style={{ width: "100%", height: "1px", background: "grey" }}
              ></div>

              <div
                id="proceed_section"
                style={{ textAlign: "center", margin: "3px", marginTop: "5px" }}
              >
                <p style={{ color: "black", fontWeight: "bold" }}>
                  If necessary, you can edit your profile before proceeding.
                </p>
                <button
                  type="button"
                  className="button"
                  style={{
                    background: "#3399FF",
                    color: "white",
                    fontWeight: "bold",
                    padding: "1px 10px",
                    fontSize: "12px",
                    margin: "5px",
                  }}
                  onClick={validateForm}
                >
                  Proceed
                </button>
                {validationError && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Please fill in all required fields correctly.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
