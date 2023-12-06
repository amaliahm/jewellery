import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, getFirestore} from "firebase/firestore"
import { useState, useEffect } from "react";


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






export { app, getAdmins}