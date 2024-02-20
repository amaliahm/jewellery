import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_article } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import SelectedMenu from "../home/SelectedMenu";
import SelectedFournisseur from '../home/SelectedFournisseur'
import Notification from "../home/notification";
import { add_article } from "./data";
import { useLocation } from "react-router-dom";
import { result } from "../../backend";
import { fournisseur } from "../../backend";

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

const style = {
    borderColor: "transparent",
    margin: '10px'
}

const AddArticle = () => {
    const colors = useStyle()
    const location = useLocation()
    const [article, setArticle] = useState({
        ...add_article,
        ...location.state,
    })
    const [done, setDone] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
    }, [])

    const handleChange = (e) => {
        setArticle(c => ({...c, [e.target.name] : e.target.value.toUpperCase()}))
    }

    const handlePrixChange = (e) => {
        setArticle(c => ({...c, [e.target.name] : parseFloat(e.target.value)}))
    }
    
    const handleClick = async e => {
        e.preventDefault();
        setDone(true)
        console.log(location.state)
        console.log(article)
        setTimeout(() => {
            setDone(false)
            navigate(`/produits/${location.state.id_famille}`, { state : location.state })
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
            <NavigationBar name={`article pour ${location.state.nom_famille}`} />
            <div className="add">
                {done && <Notification name={article.article + ' a été ajoutée'} />}
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setArticle} valeur={article} show={false} bool_article={false}/>
                </FormControl>
                <TextField 
                    id={"outlined-controlled"}
                    label='article' variant="outlined"
                    type='text'
                    sx={style}
                    name='article'
                    className={colors.root}
                    onChange={handleChange}
                    value={article.article}
                />
                <TextField 
                    id={"outlined-controlled"}
                    label='prix achat' variant="outlined"
                    type='number'
                    sx={style}
                    name='prix achat'
                    className={colors.root}
                    onChange={handlePrixChange}
                    value={article['prix achat']}
                />
                <TextField 
                    id={"outlined-controlled"}
                    label='prix vente' variant="outlined"
                    type='number'
                    sx={style}
                    name='prix vente'
                    className={colors.root}
                    onChange={handlePrixChange}
                    value={article['prix vente']}
                />
                <TextField 
                    id={"outlined-controlled"}
                    label='valeur de stock' variant="outlined"
                    type='number'
                    sx={style}
                    name='valeur de stock'
                    className={colors.root}
                    onChange={handlePrixChange}
                    value={article['valeur de stock']}
                />
                <TextField 
                    id={"outlined-controlled"}
                    label='stock min' variant="outlined"
                    type='text'
                    sx={style}
                    name='stock min'
                    className={colors.root}
                    onChange={handlePrixChange}
                    value={article['stock min']}
                />
                <TextField 
                    id={"outlined-controlled"}
                    label='mode de gestion' variant="outlined"
                    type='text'
                    sx={style}
                    name='mode de gestion'
                    className={colors.root}
                    onChange={handleChange}
                    value={article['mode de gestion']}
                />
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
                disabled={article.id_fournisseur === "" || article.article === "" || article['prix achat'] === 0 || article["prix vente"] === 0 }
                >ajouter article</Button>
            </div>
        </>
    )
}

export default AddArticle