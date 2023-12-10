import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState, useRef } from "react";
import { email, password, user } from "../../assets/icons";
import AlertMessage from "../components/alertMessage";
import LoadingComponent from "../components/loader";
import { auth } from "../../firebase";
import { getAdmins } from '../../firebase';

const SignupComponent = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [admins, setAdmins] = useState([]);

    const fetchData = async () => {
        const res = await getAdmins()
        setAdmins([...res])
    }
  
    useEffect(() => {
      fetchData()
    }, [])

    const checkAdmin = (nom, email, password) => {
        console.log(nom, email)
        let find = false;
        admins.map((e) => {
            console.log(e)
            if (e.nom == nom && e.email == email) {
                console.log("yeaaaaaaas")
                signUp(email, password)
                find = true
                
            }
        })
        if (!find) {
            console.log("nooooooooo")
            setError("Error, user not found")
            setIsOpen(true)
        }
        setLoading(false)
    }

    const signUp = (email, password) => {
        if (password <= 8) {
            setError('Short password')
            setIsOpen(true)
            return
        }
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setError("Verify your email")
            sendEmailVerification(auth.currentUser).then((value) => { });
        }).catch((error) => {
            if (firebase.auth().currentUser == null) {
                setError('Error, failed to create account')
                setIsOpen(true)
            }
        })
        setLoading(false);
    }

    return (
        loading ? <LoadingComponent /> : <div className='form-container sign-up-container'>
            <AlertMessage isOpen={isOpen} setIsOpen={setIsOpen} message={error} />
            <form action="#" className='form-registration'>
                <h1 className='m-0'>Create Account</h1>
                <div className="input">
                    <img src={user} alt='user' />
                    <input type='text' name='' placeholder='user' ref={usernameRef} required/>
                    <span className='input-border'></span>
                </div>
                <div className="input">
                    <img src={email} alt='email' />
                    <input type='email' name='' placeholder='email' ref={emailRef} required />
                    <span className='input-border'></span>
                </div>
                <div className="input">
                    <img src={password} alt='password' />
                    <input type='password' name='' placeholder='password' ref={passwordRef} required />
                    <span className='input-border'></span>
                </div>

                <button className='submit' type="button" onClick={() => {
                    setLoading(true)
                    checkAdmin(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
                }} >
                    sign up
                </button>
                
            </form>
        </div>
    )
}

export default SignupComponent