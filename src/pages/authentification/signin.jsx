import React, {useState, useEffect} from "react";
import { email, password } from "../../assets/icons";
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoadingComponent from "../components/loader";
import AlertMessage from "../components/alertMessage";
import { useNavigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";

const SigninComponent = () => {

  const [signInEmail, setInEmail] = useState('');
  const [signInPassword, setInPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [reset, setReset] = useState(false)
  const [message, setMessage] = useState('Error')

  
  const navigate = useNavigate()
  const signIn = (email, password) => {
    const auth = getAuth(app);
    setIsLoading(false);
    setIsOpen(true)
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        if (userCredential.user.emailVerified){
          navigate("/home");
        }
         else setMessage('Please verify your email')
    }).catch((error) => {
        console.log(error)
        setMessage('Error, please verify your information')
    })
}
    return (
    isLoading ? <LoadingComponent /> : <div className="form-container sign-in-container">
      <form action='#' className='form-registration'>
        <h1 className='m-0'>Sign in</h1>
        <div className="input">
          <img src={email} alt='email'/>
          <input type='email' name='' placeholder='email' value={signInEmail} onChange={(e) => setInEmail(e.target.value)}/>
          <span className='input-border'></span>
        </div>
        <div className="input">
          <img src={password} alt='password'/>
          <input type='password' name='' placeholder='password' value={signInPassword} onChange={(e) => setInPassword(e.target.value)}/>
          <span className='input-border'></span>
        </div>
        <a href='#' className='forget-password'>forget password? <span onClick={() => setReset(true)}>reset</span></a>
        <ResetPassword isOpen={reset} setIsOpen={setReset} />
        <button className='submit' type="submit" onClick={() => {
            setIsLoading(true)
            signIn(signInEmail, signInPassword)
        }}>sign in</button>
        {message != "Error" && <AlertMessage isOpen={isOpen} setIsOpen={setIsOpen} message={message} />}
      </form>
    </div>
    )
}

export default SigninComponent