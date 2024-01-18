import { AnimatePresence, motion } from "framer-motion";
import React, {useState} from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { email } from "../../assets/icons";
import { app } from "../../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate()
    const [resetEmail, setEmail] = useState('')
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="modal">
                    <motion.div
                        initial={{ scale: 0, rotate: "14.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="modal-box">
                        <FiMail className="modal-bg-icon" />
                        <div className="modal-content">
                            <div className="input">
                              <img src={email} alt='email'/>
                              <input type='email' name='' placeholder='email' value={resetEmail} onChange={(e) => setEmail(e.target.value)}/>
                              <span className='input-border'></span>
                            </div>
                            <div className="modal-content__btns">
                            <button onClick={() => {
                                    setIsOpen(false)
                                }}
                                    className="btn-secondary">
                                    return
                                </button>
                                <button onClick={() => {
                                    if(resetEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                                        const user = getAuth(app)
                                        sendPasswordResetEmail(user, resetEmail)
                                        setIsOpen(false)
                                    } 
                                }}
                                    className="btn-primary">
                                    send email
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ResetPassword