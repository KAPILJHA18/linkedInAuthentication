import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";


const LoginPage = () => {
  const [ token, setToken ] = useToken()
  const [errorMessage , setErrorMessage] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const history = useHistory()

    const onloginClick = async () =>{
        const response = await axios.post('/api/login', {
          email:emailValue,
          password:passwordValue
        })

        const {token } = response.data
        setToken(token)
        history.push('/')
    }
  return (
    <div className="content-container">
      <h1>LoginPage</h1>
      {errorMessage && <div className="fail">{errorMessage}</div> }
      <input placeholder="email" onChange={e => setEmailValue(e.target.value)}/>
      <input placeholder="password" type="password" onChange={e => setPasswordValue(e.target.value)} />
      <hr />
      <button disabled={!emailValue || !passwordValue} onClick={onloginClick}>Log In</button>
      <button onClick={()=> history.push('/forgot-password')} >Forgot Password</button>
      <button onClick={()=> history.push('/signup')} >Don't have an Account? Sign Up</button>
    </div>
  );
};

export default LoginPage;
