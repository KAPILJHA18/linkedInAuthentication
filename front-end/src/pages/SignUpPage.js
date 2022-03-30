import React, { useState } from "react";
import { HashRouter, useHistory } from "react-router-dom";

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const history = useHistory();

  const onSignupClick = async () => {
    console.log("clicked");
  };
  return (
    <div className="content-container">
      <h1>Sign Up Page</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input placeholder="email" onChange={(e) => setEmailValue(e.target.value)} value={emailValue}/>
      <input placeholder="password" type="password" onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue} />
      <input placeholder="Confim password" type="password" onChange={(e) => setConfirmPasswordValue(e.target.value)} value={confirmPasswordValue} />
      <hr />
      <button disabled={!emailValue || !passwordValue || passwordValue !== confirmPasswordValue} onClick={onSignupClick}>
        Log In
      </button>
      <button onClick={() => history.push("/login")}>Already have an account? Log In</button>
    </div>
  );
};

export default SignUpPage;
