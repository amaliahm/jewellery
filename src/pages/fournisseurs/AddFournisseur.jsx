import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_fournisseur } from "../../backend";
import { result } from "../../backend";
import { display, wilayas } from "../../wilaya";
import NavigationBar from "../home/NavigationBar";
import SelectedMenu from "../home/SelectedMenu";
import Notification from "../home/notification";
import { add_fournisseur } from "./data";


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

const AddFournisseur = () => {
    const colors = useStyle()
    const [fournisseur, setFournisseur] = useState(add_fournisseur)
    const [done, setDone] = useState(false)
    const [titre, setTitre] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAllData = () => {
            let data = result.data.titre
            let inter = []
            Object.keys(data).map(e => {
                inter.push(data[e].titre)
            })
            setTitre(inter)
        }
        fetchAllData()
    }, [2000])

    const handleChange = (e) => {
        setFournisseur(c => ({...c, [e.target.name] : e.target.value}))
    }
    
    const handleClick = async e => {
        e.preventDefault();
        try {
            setDone(true)
            setTimeout(() => {
                setDone(false)
                navigate('/fournisseurs')
            }, 2000)
            const result = await axios.post(api_add_fournisseur, fournisseur)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    
    return (
        <>
            <NavigationBar name="ajouter fournisseur" />
            <div className="add">
                {done && <Notification name={fournisseur.nom + ' a été ajoutée'} />}
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='wilaya' options={wilayas} setValue={setFournisseur} valeur={fournisseur} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='ville' options={display(fournisseur.wilaya)} setValue={setFournisseur} valeur={fournisseur}/>
                </FormControl>
                {Object.keys(fournisseur).map((key, index) => (
                    <>
                    {(index == 0 || (index > 2 && index != 4)) 
                    ? <TextField 
                        id={"outlined-read-only-input"}
                        label={key} variant="outlined"
                        type={index == 3 ? 'number' : 'text'}
                        sx={{
                          borderColor: "transparent",
                          margin: '10px'
                        }}
                        name={key}
                        className={colors.root}
                        onChange={handleChange}
                        defaultValue={fournisseur[key]}
                    ></TextField>
                    : <>
                      {index == 4 &&
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <SelectedMenu name={key} options={titre} setValue={setFournisseur} valeur={fournisseur}/>
                        </FormControl>}
                    </>}
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
                disabled={fournisseur.wilaya === "" || fournisseur.ville === '' || fournisseur.titre === '' || fournisseur.nom === '' || fournisseur.telephone === '' || fournisseur.telephone.length > 10}
                >ajouter fournisseur</Button>
            </div>
        </>
    )
}

export default AddFournisseur