import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook } from "react-icons/fi";
import axios from "axios";
import { api } from "../../backend";

const AddFournissuer = ({ isOpen, setIsOpen }) => {
    const [fournisseur, setFournisseur] = useState({
        nom: '',
        ville: '',
        wilaya: '',
        telephone: '',
    })

    const handleChange = (e) => {
        setFournisseur(c => ({...c, [e.target.name] : e.target.value}))
    }
    
    const handleClick = async e => {
        e.preventDefault();
        const between = fournisseur.nom != '' && fournisseur.ville != '' && fournisseur.wilaya != '' && fournisseur.telephone != '' && fournisseur.telephone.length <= 10
        if (between) {
            const addFournisseur = {
                table: 'fournisseurs',
                data: fournisseur
            }
            try {
                const result = await axios.post(api, addFournisseur)
                if(result.status === 200) {
                    setIsOpen(false)
                    setFournisseur({
                        nom: '',
                        ville: '',
                        wilaya: '',
                        telephone: '',
                    })
                }
            } catch (e) {
                console.log(e)
                return
            }
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
                        <p>ajouter fournisseur</p>
                        <div className="modal-content">
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">nom</p>
                                <div className="input">
                                    <input type='text' name='nom' 
                                      placeholder='nom' 
                                      value={fournisseur.nom} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">ville</p>
                                <div className="input">
                                    <input type='text' name='ville' 
                                      placeholder='ville' 
                                      value={fournisseur.ville} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">wilaya</p>
                                <div className="input">
                                    <input type='text' name='wilaya' 
                                      placeholder='wilaya' 
                                      value={fournisseur.wilaya} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">telephone</p>
                                <div className="input">
                                    <input type='text' name='telephone' 
                                      placeholder='06...' 
                                      value={fournisseur.telephone} onChange={handleChange} required/>
                                </div>
                            </div>

                            <div className="modal-content__btns">
                            <button type="button" onClick={() => {
                                    setIsOpen(false)
                                    setFournisseur({
                                        nom: '',
                                        ville: '',
                                        wilaya: '',
                                        telephone: '',
                                    })
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

export default AddFournissuer