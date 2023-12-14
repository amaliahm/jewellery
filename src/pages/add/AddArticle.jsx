import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook } from "react-icons/fi";
import axios from "axios";
import { api } from "../../backend";

const AddArticle = ({ isOpen, setIsOpen }) => {
    const [article, addArticle] = useState({
        article: '',
        "designation d'article" : '',
        'prix unitaire': '',
        "stock min": '',
    })

    const handleChange = (e) => {
        addArticle(c => ({...c, [e.target.name] : e.target.value}))
    }
    
    const handleClick = async e => {
        e.preventDefault();
        const between = article.article != '' && article["designation d'article"] != '' && article['prix unitaire'] != '' && article["valeur de stock"] != ''
        if (between) {
            const addArticle = {
                table: 'articles',
                data: article
            }
            try {
                const result = await axios.post(api, addArticle)
                if(result.status === 200) {
                    setIsOpen(false)
                    addArticle({
                        article: '',
                        "designation d'article" : '',
                        'prix unitaire': '',
                        "valeur de stock": '',
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
                        <h2>ajouter article</h2>
                        <div className="modal-content">
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">designation d'article</p>
                                <div className="input">
                                    <input type='text' name="designation d'article" 
                                      placeholder="designation d'article"
                                      value={article["designation d'article"]} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">article</p>
                                <div className="input">
                                    <input type='text' name='article' 
                                      placeholder='article' 
                                      value={article.article} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">prix unitaire</p>
                                <div className="input">
                                    <input type='text' name='prix unitaire' 
                                      placeholder='prix unitaire' 
                                      value={article['prix unitaire']} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="modal-content__row"  >
                                <p className="model-content__titre">stock min</p>
                                <div className="input">
                                    <input type='text' name='stock min' 
                                      placeholder='stock min' 
                                      value={article['stock min']} onChange={handleChange} required/>
                                </div>
                            </div>

                            <div className="modal-content__btns">
                            <button type="button" onClick={() => {
                                    setIsOpen(false)
                                    addArticle({
                                        article: '',
                                        "designation d'article" : '',
                                        'prix unitaire': '',
                                        "stock min": '',
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

export default AddArticle