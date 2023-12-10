import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook } from "react-icons/fi";
import { clients } from "../../data";
import axios from "axios";

const AddClient = ({ isOpen, setIsOpen }) => {
    const [client, setClient] = useState({
        nom: '',
        ville: '',
        wilaya: '',
        telephone: '',
    })

    const handleChange = (e) => {
        setClient(c => ({...c, [e.target.name] : e.target.value}))
    }
    
    const handleClick = async e => {
        e.preventDefault();
        const between = client.nom != '' && client.ville != '' && client.wilaya != '' && client.telephone != '' && client.telephone.length == 10
        if (between) {
            const addClient = {
                table: 'clients',
                data: client
            }
            try {
                await axios.post('http://localhost:8800/home', addClient)
            } catch (e) {
                console.log(e)
                return
            }
            setIsOpen(false)
        }
    }
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
                                    <input type='text' name='nom' 
                                      placeholder='nom' 
                                      value={client.nom} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">ville</p>
                                <div className="input">
                                    <input type='text' name='ville' 
                                      placeholder='ville' 
                                      value={client.ville} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">wilaya</p>
                                <div className="input">
                                    <input type='text' name='wilaya' 
                                      placeholder='wilaya' 
                                      value={client.wilaya} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">telephone</p>
                                <div className="input">
                                    <input type='text' name='telephone' 
                                      placeholder='06...' 
                                      value={client.telephone} onChange={handleChange} required/>
                                </div>
                            </div>

                            <div className="modal-content__btns">
                            <button type="button" onClick={() => {
                                    setIsOpen(false)
                                }}
                                    className="btn-secondary">
                                    annuler
                                </button>
                            <button type="button" onClick={handleClick}
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