import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AlertMessage = ({ isOpen, setIsOpen, message }) => {
    const navigate = useNavigate()
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
                        <div className="modal-content">
                            <p className="model-content__description">{message}</p>
                            <div className="modal-content__btns">
                                <button onClick={() => {
                                    setIsOpen(false)
                                    navigate('/')
                                }}
                                    className="btn-primary">
                                    go back!!
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default AlertMessage