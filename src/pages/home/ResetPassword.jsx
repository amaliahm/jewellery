import { AnimatePresence, motion } from "framer-motion";
import React, {useState} from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { email } from "../../assets/icons";
import { app } from "../../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const button_box = {
    display: 'flex',
    width: '90%',
    justifyContent: 'space-between',
    p: 0.5,
    margin: 'auto',
}

const button_style = {
  color: 'white',
  bgcolor: 'var(--bg-color-1)',
  border: '1px solid var(--brand-1)',
};

const confirme_button_style = {
  bgcolor: 'var(--brand-1)',
  border: '1px solid var(--brand-1)',
  '&:hover' : {
    color: 'white',
  },
  '&:disabled' : {
    bgcolor: 'transparent',
  }
};

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
                              <i className="fa-regular fa-at fa-xl"></i>
                              <input type='email' name='' placeholder='email' value={resetEmail} onChange={(e) => setEmail(e.target.value)}/>
                              <span className='input-border'></span>
                            </div>
                            <Box sx={button_box}>
                              <Button sx={button_style} onClick={() => setIsOpen(false)}>annuler</Button>
                              <Button 
                                sx={confirme_button_style}
                                onClick={() => {
                                    if(resetEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                                        const user = getAuth(app)
                                        sendPasswordResetEmail(user, resetEmail)
                                        setIsOpen(false)
                                    } 
                                }}
                                disabled={resetEmail === ""}
                              >send email</Button>
                            </Box>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ResetPassword