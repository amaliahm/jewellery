import { AnimatePresence, motion } from "framer-motion";
import React, {useState} from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const LogOutComponent = ({ out, setOut }) => {
    const navigate = useNavigate()
    const [resetEmail, setEmail] = useState('')
    return (
        <AnimatePresence>
            {out && (
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
                        className="modal-out">
                        <FiMail className="modal-bg-icon" />
                        <div className="modal-content">
                            <p className="modal-content__titre">Want to log out!!</p>
                            <div className="modal-content__btns">
                            <button onClick={() => {
                                    setOut(false)
                                }}
                                    className="btn-secondary">
                                    return
                                </button>
                                <button onClick={() => {
                                    setOut(false)
                                    auth.signOut()
                                    navigate('/auth')
                                }}
                                    className="btn-primary">
                                    log out
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LogOutComponent