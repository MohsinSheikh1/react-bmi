import "./App.css";
import { useState } from "react";
import healthy from "./assets/healthy.png";
import overweight from "./assets/overweight.png";
import underweight from "./assets/underweight.png";

function App() {
  const messages = {
    underweight:
      "You are underweight. Consider professional advice for healthy weight gain. 🌱",
    normal: "Congratulations! Your BMI is normal. ⚖️",
    overweight:
      "You are overweight. Balance nutrition and exercise for a healthy weight. ⚖️",
    obese: "You are obese. Prioritize health with balanced habits. 🏋️‍♂️🥗",
    initial:
      "Check your BMI now! Enter your details and click 'Calculate.' 📊💪",
  };

  const errors = {
    invalid: "Please enter valid weight and height",
    negative: "Negative weights and heights aren't possible",
    zero: "Weight and height should not be 0.",
    highWeight: "Weight should not be greater than 1000lbs.",
    highHeight: "Height should not be greater than 120in.",
  };

  //states
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [message, setMessage] = useState(messages.initial);
  const [error, setError] = useState("");
  const [img, setImg] = useState(healthy);

  //functions
  const displayMessages = function (bmi) {
    if (bmi < 18.5) {
      setMessage(messages.underweight);
      setImg(underweight);
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setMessage(messages.normal);
      setImg(healthy);
    } else if (bmi >= 25 && bmi <= 29.9) {
      setMessage(messages.overweight);
      setImg(overweight);
    } else if (bmi >= 30) {
      setMessage(messages.obese);
      setImg(overweight);
    }
  };

  const validateInput = function (height, weight) {
    if (height === 0 || weight === 0) {
      setError(errors.zero);
      return false;
    } else if (height < 0 || weight < 0) {
      setError(errors.negative);
      return false;
    } else if (isNaN(height) || isNaN(weight)) {
      setError(errors.invalid);
      return false;
    } else if (weight > 1000) {
      setError(errors.highWeight);
      return false;
    } else if (height > 120) {
      setError(errors.highHeight);
      return false;
    }

    return true;
  };

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!validateInput(height, weight)) return;
    setError("");
    let bmi = (weight / (height * height)) * 703;
    setBmi(bmi.toFixed(1));

    displayMessages(bmi);
  };

  let reload = () => {
    setHeight(0);
    setWeight(0);
    setBmi(0);
    setMessage(messages.initial);
    setError("");
    setImg(healthy);
  };

  return (
    <div className="App">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            <p className="error">{error}</p>
          </div>
          <div>
            <button className="btn" type="submit">
              Calculate
            </button>
          </div>
        </form>
        <button className="btn btn-outline" onClick={reload}>
          Reload
        </button>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <h4>{message}</h4>
        </div>

        <div className="img-container">
          <img src={img} alt="Representing bmi" />
        </div>
      </div>
    </div>
  );
}

export default App;
