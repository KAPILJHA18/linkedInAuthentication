import React, { useState } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from 'axios'

const SignUpPage = () => {
  const [token, setToken] = useToken()
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const history = useHistory();

  const onSignupClick = async () => {
    const response  = await axios.post('/api/signup', {
      email:emailValue,
      password:passwordValue, 
    })

    const {token} = response.data
    setToken(token)

    history.push('/')
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
