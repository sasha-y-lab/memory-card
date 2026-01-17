import { useState } from 'react';

function Button(props) {
  const buttonStyle = {
    color: props.color,
    fontSize: props.fontSize + 'px',
    width: props.width,
  };

  return (
    <button
      type={props.type || "button"}
      style={buttonStyle}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

function Personal({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  // ✅ Add these state variables for errors
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const toggleView = () => {
    setIsVisible(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // Email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Valid email required (must include @)");
      valid = false;
    } else {
      setEmailError("");
    }

    // Phone validation (format 111-111-1111)
    if (!phoneNumber || !/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
      setPhoneError("Phone number must be in format 416-123-1111");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!valid) return;

    onSubmit({ firstName, lastName, email, phoneNumber });
    setIsVisible(false);
  };

  return (
    <>
      <header>
        <h1>Upload Your CV</h1>
      </header>

<div id="personalSection">
      <div id="header2">
        <h3>
          Personal Information{" "}
          <Button
            type="button"
            text={isVisible ? "Hide" : "View"}
            color="blue"
            fontSize={12}
            width="70px"
            onClick={toggleView}
          />
        </h3>
      </div>
      </div>

      {isVisible && (
        <div id="formbox">
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Jane"
              />
            </label>

            <label>
              Last Name:
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </label>
            {emailError && <div style={{ color: "red", fontSize: "12px" }}>{emailError}</div>}

            <label>
              Phone:
              <input
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="416-123-1111"
              />
            </label>
            {phoneError && <div style={{ color: "red", fontSize: "12px" }}>{phoneError}</div>}

            <Button text="Update" color="blue" fontSize={12} width="70px" type="submit" />
          </form>
        </div>
      )}
    </>
  );
}

export default Personal;
