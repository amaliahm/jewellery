import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FiActivity } from "react-icons/fi";


const ShowArticle = ({ 
    isOpen,
    setIsOpen,
    detail
 }) => {

    const mes_articles = [
        {
            nom: 'article',
            valeur: detail.article,
        },
        {
            nom: 'designation',
            valeur: detail.designation,
        },
        {
            nom: 'prix u',
            valeur: detail['prix u'],
        },
        {
            nom: 'qte stock',
            valeur: detail['qte stock'],
        },
        {
            nom: 'valeur stock',
            valeur: detail['valeur stock'],
        },
        {
            nom: 'stock min',
            valeur: detail['stock min'],
        },
        {
            nom: 'alert',
            valeur: detail.alert,
        },
    ]
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
                        <FiActivity className="modal-bg-icon" />
                        <div className="modal-content">
                            {mes_articles.map((article, index) => (
                                <div className="modal-content__row" key={index} >
                                   <p className="model-content__titre">{article.nom}</p>
                                   <p className="model-content__description">{article.valeur}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ShowArticle