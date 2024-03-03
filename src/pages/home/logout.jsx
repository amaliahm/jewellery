import { AnimatePresence, motion } from "framer-motion";
import React, {useState} from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const button_box = {
    display: 'flex',
    width: '70%',
    justifyContent: 'space-between',
    p: 1,
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
const LogOutComponent = ({ out, setOut }) => {
    const navigate = useNavigate()
    return (
        <AnimatePresence>
            {out && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOut(false)}
                    className="modal">
                    <motion.div
                        initial={{ scale: 0, rotate: "14.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="modal-out">
                        <FiMail className="modal-bg-icon" />
                        <div className="modal-content">
                            <p className="modal-content__titre">Want to log out!!</p>
                            <Box sx={button_box}>
                              <Button sx={button_style} onClick={() => setOut(false)}>annuler</Button>
                              <Button 
                                sx={confirme_button_style}
                                onClick={() => {
                                    setOut(false)
                                    auth.signOut()
                                    navigate('/')
                                }}
                              >log out</Button>
                            </Box>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LogOutComponent