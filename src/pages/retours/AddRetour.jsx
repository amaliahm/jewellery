import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_retour } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import Notification from "../home/notification";
import { add_retour } from "./data";
import { client, fournisseur } from "../../backend";
import SelectedClient from "../home/SelectedClient";
import SelectedFournisseur from "../home/SelectedFournisseur";
import SelectedMenu from "../home/SelectedMenu";


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

const AddRetour = () => {
    const colors = useStyle()
    const [retour, setRetour] = useState(add_retour)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();
    const person = ['client', 'fournisseur']

    useEffect(() => {
      setRetour(v => ({
        ...v,
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee : String(currentDate.getFullYear())
      }))
    }, [2000])

    const handleChange = (e) => {
        setRetour(c => ({
          ...c,
          [e.target.name] : parseFloat(e.target.value),
        }))
        console.log(retour)
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
            setDone(true)
            setTimeout(() => {
                setDone(false)
                navigate('/retours')
            }, 2000)
            const result = await axios.post(api_add_retour, retour)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    console.log(retour)
    
    return (
        <>
            <NavigationBar name="ajouter retour" />
            <div className="add">
                {done && <Notification name={'retour a été ajoutée'} />}
                <TextField 
                    disabled
                    id="outlined"
                    label={`${retour.jour}-${retour.mois}-${retour.annee}`} variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name='date'
                    className={colors.root}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='person' options={person} setValue={setRetour} valeur={retour} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    {retour.person === 'client' && <SelectedClient name='client' options={client} setValue={setRetour} valeur={retour}/>}
                    {retour.person === 'fournisseur' &&<SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setRetour} valeur={retour} bool_article={false}/>}
                </FormControl>
                {Object.keys(retour).slice(8).map((key, index) => (
                    <>
                    { (index < 2) &&
                    <TextField 
                        key={index}
                        id={"outlined-controlled"}
                        label={key} variant="outlined"
                        type='number'
                        sx={style}
                        name={key}
                        className={colors.root}
                        onChange={handleChange}
                        value={retour[key]}/>}
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
                disabled={retour.solde === '' || retour['retour or'] === 0 || retour['retour argent'] === 0}
                >ajouter retour</Button>
            </div>
        </>
    )
}

export default AddRetour