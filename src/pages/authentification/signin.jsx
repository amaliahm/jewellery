import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import ResetPassword from "../home/ResetPassword";
import AlertMessage from "../home/alertMessage";
import LoadingComponent from "../home/loader";

const SigninComponent = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [reset, setReset] = useState(false)

  const [signInEmail, setInEmail] = useState('');
  const [signInPassword, setInPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('Error')

  
  const navigate = useNavigate()
  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      if (userCredential.user.emailVerified){
        navigate("/home");
      }
      else {
        setError('Please verify your email')
        setIsOpen(true)
      }
    }).catch((error) => {
        console.log(error)
        setError('Error, failed to login')
        setIsOpen(true)
    })
    setLoading(false);
}
    return (
    loading ? <LoadingComponent /> : <div className="form-container sign-in-container">
      <AlertMessage isOpen={isOpen} setIsOpen={setIsOpen} message={error} />
      <form action='#' className='form-registration'>
        <h1 className='m-0'>Sign in</h1>
        <div className="input">
          <i className="fa-regular fa-at fa-xl"></i>
          <input type='email' name='' placeholder='email' ref={emailRef} required/>
          <span className='input-border'></span>
        </div>
        <div className="input">
          <i className="fa-solid fa-lock fa-xl"></i>
          <input type='password' name='' placeholder='password' ref={passwordRef} required/>
          <span className='input-border'></span>
        </div>
        <a href='#' className='forget-password'>forget password? <span onClick={() => setReset(true)}>reset</span></a>
        <ResetPassword isOpen={reset} setIsOpen={setReset} />
        <button className='submit' type="button" onClick={() => {
            setLoading(true)
            signIn(emailRef.current.value, passwordRef.current.value)
        }}>sign in</button>
      </form>
    </div>
    )
}

export default SigninComponent