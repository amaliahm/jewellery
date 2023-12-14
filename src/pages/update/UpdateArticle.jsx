import { AnimatePresence, motion } from "framer-motion";
import React, {useState} from "react";
import { FiActivity } from "react-icons/fi";
import axios from "axios";
import { api } from "../../backend";


const UpdateArticle = ({ isOpen, setIsOpen, detail }) => {
    const [article, setArticle] = useState(detail)

    const [isDelete, setIsDelete] = useState(false)

    const handleChange = (e) => {
        setArticle(c => ({...c, [e.target.name] : e.target.value}))
    }

    const update = async (first, second) => {
        let between = (first.article != '' && first["designation d'article"] != '' && first['prix unitaire'] != '' && first["stock min"] != '')
        if (between) {
            between = (first.article == second.article && first["designation d'article"] == second["designation d'article"] && first['prix unitaire'] == second['prix unitaire'] && first["stock min"] == second["stock min"])
            if(!between) {
                const data = { table: 'articles', data: first }
                try {
                    console.log(data)
                    const result = await axios.put(api, data)
                    console.log(result)
                    if(result.status === 200) {
                        setIsOpen(false)
                        setIsDelete(false)
                    }
                } catch (error) {
                    console.log(error)
                    return
                }
            }
        }
    }
    const deleteFunction = async () => {
        const data = {table: 'articles', data: detail}
        console.log(data)
        try {
            const result = await axios.delete(api, {data: data})
            console.log(result)
            if(result.status === 200) {
                setIsOpen(false)
                setIsDelete(false)
            }
        } catch (error) {
            console.log(error)
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
                        <FiActivity className="modal-bg-icon" />
                        <form action="#">
                        <h2>Article</h2>
                            <div className="modal-content modal-u-s">
                                {Object.keys(article).slice(1).map((value, index) => (
                                    // <div className="modal-content__row" key={index} >
                                    //    <p className="model-content__titre">{article}</p>
                                    //    <p className="model-content__description">{detail[article]}</p>
                                    // </div>
                                     <div className="modal-content__row" key={index}>
                                     <p className="model-content__titre"> {value} </p>
                                     <div className="input">
                                         {(index <= 2 || index == 5 ) ?
                                         <input type='text' 
                                           name={value}
                                           value={article[value]} onChange={handleChange}/>
                                         : <input type='text' 
                                           name={value}
                                           value={article[value]} onChange={() => {}}/>}
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
                                         supprimer cette article!!
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
                                   <button type="button" onClick={() => {
                                        update({id: detail.id , ...article}, detail)
                                    }}
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
    );
}

export default UpdateArticle