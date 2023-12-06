import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook } from "react-icons/fi";
import { clients } from "../../data";

const AddClient = ({ isOpen, setIsOpen }) => {
    const [client, setClient] = useState({
        id: clients.length + 1,
        nom: '',
        ville: '',
        wilaya: '',
        telephone: '',
        "chiffre d'affaire": "0",
        "total or": "0",
        "total vo": "0",
        "total va": "0",
        "total perte": "0",
        "total ro": "0",
        "total ra": "0",
        "reste o": "0",
        "reste a": "0",
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
                                      placeholder='amalia' 
                                      value={client.nom} onChange={(e) => setClient(c => ({ ...client, ...{nom: e.target.value} }))}/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">ville</p>
                                <div className="input">
                                    <input type='text' name='' 
                                      placeholder='ville' 
                                      value={client.ville} onChange={(e) => setClient(c => ({ ...client, ...{ville: e.target.value} }))}/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">wilaya</p>
                                <div className="input">
                                    <input type='text' name='' 
                                      placeholder='wilaya' 
                                      value={client.wilaya} onChange={(e) => setClient(c => ({ ...client, ...{wilaya: e.target.value} }))}/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">telephone</p>
                                <div className="input">
                                    <input type='text' name='' 
                                      placeholder='06...' 
                                      value={client.telephone} onChange={(e) => setClient(c => ({ ...client, ...{telephone: e.target.value} }))}/>
                                </div>
                            </div>
                            
                            
                            
                            <div className="modal-content__btns">
                            <button onClick={() => {
                                    setIsOpen(false)
                                }}
                                    className="btn-secondary">
                                    annuler
                                </button>
                            <button onClick={() => {
                                clients.push(client)
                                setIsOpen(false)
                                }}
                                    className="btn-primary">
                                    ajouter
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

export default AddClient