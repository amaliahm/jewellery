import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook } from "react-icons/fi";
import { clients } from "../../data";

const UpdateClient = ({ isOpen, setIsOpen, row}) => {
    const [client, setClient] = useState({
        nom: '',
        ville: '',
        wilaya: '',
        telephone: '',
    })
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
                        className="modal-box-article">
                        <FiBook className="modal-bg-icon" />
                        <form action="#">
                        <div className="modal-content">
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">nom</p>
                                <div className="input">
                                    <input type='text' name=''
                                      value={row.nom} onChange={(e) => row.nom = e.target.value} />
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">ville</p>
                                <div className="input">
                                    <input type='text' name=''
                                      value={row.ville} onChange={(e) => setClient(c => ({ ...row, ...{ville: e.target.value} }))} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">wilaya</p>
                                <div className="input">
                                    <input type='text' name='' 
                                      value={row.wilaya} onChange={(e) => setClient(c => ({ ...row, ...{wilaya: e.target.value} }))} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">telephone</p>
                                <div className="input">
                                    <input type='text' name='' 
                                      value={row.telephone} onChange={(e) => setClient(c => ({ ...row, ...{telephone: e.target.value} }))} required/>
                                </div>
                            </div>
                            
                            
                            
                            <div className="modal-content__btns">
                            <button type="button" onClick={() => {
                                    setIsOpen(false)
                                }}
                                    style={{
                                        color: 'white',
                                        borderColor: 'red',
                                        backgroundColor: 'red'
                                    }}
                                    >
                                    supprimer
                                </button>
                            <button type="button" onClick={() => {
                                setIsOpen(false)
                                }}
                                    className="btn-primary">
                                    modifier
                                </button>
                            </div>
                        </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UpdateClient