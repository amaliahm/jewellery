import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { email, password, user } from "../../assets/icons";
import AlertMessage from "../components/alertMessage";
import LoadingComponent from "../components/loader";
import { app } from "../../firebase";
import { getAdmins } from '../../firebase';

const SignupComponent = () => {
    const [signUpEmail, setUpEmail] = useState('');
    const [signUpUsername, setUpUsername] = useState('');
    const [signUpPassword, setUpPassword] = useState('');

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
            setMessage("error, user not found")
            setIsOpen(true)
        }
        setIsLoading(false)
    }
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('Error')
    const [isLoading, setIsLoading] = useState(false)

    const signUp = (email, password) => {
        setIsOpen(true)
        setIsLoading(false);
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setMessage("Please verify your email")
            var _user = auth.currentUser;
            sendEmailVerification(_user).then((value) => { });
        }).catch((error) => {
            setIsOpen(false)
            console.log(error)
            if (firebase.auth().currentUser == null) {
                setMessage('Error, please verify your information')
            }
        })
    }
    return (
        isLoading ? <LoadingComponent /> : <div className='form-container sign-up-container'>
            <form  action='#' className='form-registration'>
                <h1 className='m-0'>Create Account</h1>
                <div className="input">
                    <img src={user} alt='user' />
                    <input type='text' name='' placeholder='user' value={signUpUsername} onChange={(e) => setUpUsername(e.target.value)} />
                    <span className='input-border'></span>
                </div>
                <div className="input">
                    <img src={email} alt='email' />
                    <input type='email' name='' placeholder='email' value={signUpEmail} onChange={(e) => setUpEmail(e.target.value)} />
                    <span className='input-border'></span>
                </div>
                <div className="input">
                    <img src={password} alt='password' />
                    <input type='password' name='' placeholder='password' value={signUpPassword} onChange={(e) => setUpPassword(e.target.value)} />
                    <span className='input-border'></span>
                </div>

                <button className='submit' onClick={() => {
                    setIsLoading(true)
                    checkAdmin(signUpUsername, signUpEmail, signUpPassword)
                }} >
                    sign up
                </button>
                <AlertMessage isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
            </form>
        </div>
    )
}

export default SignupComponent