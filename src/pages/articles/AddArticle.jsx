import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_article } from "../../backend";
import { titre } from '../../data';
import { display, wilayas } from "../../wilaya";
import NavigationBar from "../home/NavigationBar";
import SelectedMenu from "../home/SelectedMenu";
import SelectedFournisseur from '../home/SelectedFournisseur'
import Notification from "../home/notification";
import { add_article } from "./data";
import { useLocation } from "react-router-dom";
import { result } from "../../backend";

const useStyle = makeStyles({
    root: {
        "& label.Mui-focused": {
          color: "white"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#12f7d6",
          }
        }
      }
})

const AddArticle = () => {
    const colors = useStyle()
    const location = useLocation()
    const [article, setArticle] = useState({
        ...add_article,
        famille: location.state.nom,
    })
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const [fournisseur, setFournisseur] = useState([])

    useEffect(() => {
        const fetchAllData = async () => {
            let __fournisseur = result.data.fournisseurs
            setFournisseur(__fournisseur)
        }
        fetchAllData()
    }, [])

    const handleChange = (e) => {
        setArticle(c => ({...c, [e.target.name] : e.target.value.toUpperCase()}))
    }
    
    const handleClick = async e => {
        e.preventDefault();
        setArticle(a => ({
            ...a,
            'prix unitaire': parseFloat(article["prix unitaire"])
        }))
        const inter = location.state.articles
        inter.unshift(article)
        setDone(true)
        setTimeout(() => {
            setDone(false)
            navigate(`/produits/${location.state.id}`, { state : { nom: location.state.nom, id: location.state.id, articles: inter } })
        }, 2000)
        try {
            const result = await axios.post(api_add_article, article)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    
    return (
        <>
            <NavigationBar name={"ajouter article"} />
            <div className="add">
                {done && <Notification name={article.article + ' a été ajoutée'} />}
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setArticle} valeur={article} show={false}/>
                </FormControl>
                {Object.keys(article).slice(1).map((key, index) => (
                    <>
                    {(index > 0) 
                    ? <TextField 
                        id={"outlined-controlled"}
                        label={key} variant="outlined"
                        type={index >= 3 ? 'number' : 'text'}
                        sx={{
                          borderColor: "transparent",
                          margin: '10px'
                        }}
                        name={key}
                        className={colors.root}
                        onChange={handleChange}
                        value={article[key]}
                    />
                    : <TextField 
                    disabled
                    id={"outlined-read-only-input"}
                    label={key} variant="outlined"
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name={key}
                    className={colors.root}
                    value={article[key]}
                />}
                </>))}
                <Button 
                sx={{
                    color: 'var(--brand-1)',
                    border: '1px solid var(--brand-1)',
                    marginBottom: '10px',
                    marginRight: '10px',
                    position: 'absolute',
                    right: '0',
                    bottom: '0',
                }} 
                onClick={handleClick}
                disabled={article.fournisseur === "" || article["designation d'article"] === "" || article.article === '' || article["prix unitaire"] === ''|| article["prix unitaire"] === '0' }
                >ajouter article</Button>
            </div>
        </>
    )
}

export default AddArticle