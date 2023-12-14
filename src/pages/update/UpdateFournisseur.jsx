import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook } from "react-icons/fi";
import axios from "axios";
import { api } from "../../backend";

const UpdateFournisseur = ({ isOpen, setIsOpen, row}) => {
    const [fournisseur, setFournisseur] = useState( row)

    const [isDelete, setIsDelete] = useState(false)

    const handleChange = (e) => {
        setFournisseur(c => ({...c, [e.target.name] : e.target.value}))
    }

    const update = async (first, second) => {
        let between = (first.nom != '' && first.ville != '' && first.wilaya != '' && first.telephone != '' && first.telephone.length <= 10)
        if (between) {
            between = (first.nom == second.nom && first.ville == second.ville && first.wilaya == second.wilaya && first.telephone == second.telephone)
            if(!between) {
                const data = { table: 'fournisseurs', data: first }
                console.log(data)
                try {
                    const result = await axios.put(api, data)
                    if(result.status === 200) {
                        console.log(result)
                        setIsOpen(false)
                        setIsDelete(false)
                    } else {
                        console.log('errrrrrror')
                    }
                } catch (error) {
                    return
                }
            }
        }
    }
    const deleteFunction = async () => {
        const data = {table: 'fournisseurs', data: row}
        console.log(data)
        try {
            const result = await axios.delete(api, {data: data})
            if(result.status === 200) {
                setIsOpen(false)
                setIsDelete(false)
            }
        } catch (error) {
            return
        }
        console.log(data)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        setIsOpen(false)
                        setIsDelete(false)
                    }}
                    className="modal">
                    <motion.div
                        initial={{ scale: 0, rotate: "14.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="modal-box-article modal-box-article-u-s">
                        <FiBook className="modal-bg-icon" />
                        <form action="#">
                           
                        <div className="modal-content modal-u-s">

                            {Object.keys(fournisseur).slice(1).map((value, index) => (
                                <div className="modal-content__row" key={index}>
                                    <p className="model-content__titre"> {value} </p>
                                    <div className="input">
                                        {(index <= 3 ) ?
                                        <input type='text' 
                                          name={value}
                                          value={ fournisseur[value]} onChange={handleChange}/>
                                        : <input type='text' 
                                          name={value}
                                          value={ fournisseur[value]} onChange={() => {}}/>}
                                    </div>
                                </div>
                            ))}
                            { isDelete
                            ? <div className="modal-content__btns">
                               
                                 <button type="button" onClick={() => deleteFunction()}
                                     style={{
                                         color: 'white',
                                         borderColor: 'red',
                                         backgroundColor: 'red'
                                     }}
                                     >
                                     supprimer ce fournisseur!!
                                 </button>
                             </div>
                            : <div className="modal-content__btns">
                               
                               <button type="button" onClick={() => {setIsDelete(true)}}
                                   style={{
                                       color: 'white',
                                       borderColor: 'red',
                                       backgroundColor: 'red'
                                   }}
                                   >
                                   supprimer
                               </button>
                               <button type="button" onClick={() => {update({id: row.id , ...fournisseur}, row)}}
                                   className="btn-primary">
                                   modifier
                               </button>
                           </div>}
                        </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UpdateFournisseur