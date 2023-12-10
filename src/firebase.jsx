import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, getFirestore} from "firebase/firestore"
import React, { useState, useEffect, useContext } from "react";
import 'firebase/auth'
import { getAuth, sendEmailVerification } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDRCZICHh9gaVRccwd6t7RbT43Tx51nLr0",
    authDomain: "jewellery-78c20.firebaseapp.com",
    databaseURL: "https://jewellery-78c20-default-rtdb.firebaseio.com",
    projectId: "jewellery-78c20",
    storageBucket: "jewellery-78c20.appspot.com",
    messagingSenderId: "399056522338",
    appId: "1:399056522338:web:8d799b4afe45ca54fc553b",
    measurementId: "G-K8PEZPYE22"
};

let database = false;




const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)



const getDatabase = () => {
    if (!database) {
        database = getFirestore(app)
    }
    return database
}

const getAdmins  = async () => {
    const docs_ref = await getDocs(collection(getDatabase(), "admin"))
    const res = []
    docs_ref.forEach(e => {
        const admin = e._document.data.value.mapValue.fields
        res.push({
            nom: admin.nom.stringValue,
            email: admin.email.stringValue
        })
    })  
    return res
}


const AuthContext = React.createContext()

function useAuth() {
    return useContext(AuthContext)
}




function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)



function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

function logout() {
    return auth.signOut()
}

function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
}

function verifyEmail() {
    sendEmailVerification(auth.currentUser).then((value) => {})
}

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })
    return unsubscribe
}, [])



const value = {
    currentUser,
    login,
    
    logout,
    resetPassword,
    verifyEmail,
}

return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
)
}




export { app, getAdmins,auth, useAuth, AuthProvider}