import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_reparation } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import Notification from "../home/notification";
import { add_reparation } from "./data";
import { client, fournisseur } from "../../backend";
import SelectedReparation from "../home/SelectedReparation";
import { useLocation } from "react-router-dom";


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

const AddReparation = () => {
    const colors = useStyle()
    const location = useLocation()
    const [reparation, setReparation] = useState({
        ...add_reparation,
        id: location.state.id,
        magasin: location.state.magasin,
    })
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();

    useEffect(() => {
      setReparation(v => ({
        ...v,
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee : String(currentDate.getFullYear())
      }))
    }, [2000])

    const handleChange = (e) => {
        setReparation(c => ({
          ...c,
          [e.target.name] : parseFloat(e.target.value),
        }))
        console.log(reparation)
    }

    const handleObservation = (e) => {
        setReparation(c => ({
          ...c,
          [e.target.name] : e.target.value,
        }))
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
            setDone(true)
            setTimeout(() => {
                setDone(false)
                navigate(`/magasins/${reparation.id}`, {state: {
                    id: reparation.id,
                    magasin: reparation.magasin,
                }})
            }, 2000)
            const result = await axios.post(api_add_reparation, reparation)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    console.log(reparation)
    
    return (
        <>
            <NavigationBar name="ajouter reparation" />
            <div className="add">
                {done && <Notification name={'reparation a été ajoutée'} />}
                <TextField 
                    disabled
                    id="outlined"
                    label={`${reparation.jour}-${reparation.mois}-${reparation.annee}`} variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name='date'
                    className={colors.root}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedReparation setValue={setReparation} valeur={reparation} />
                </FormControl>
                {Object.keys(reparation).slice(7).map((key, index) => (
                    <TextField 
                        key={index}
                        id={"outlined-controlled"}
                        label={key} variant="outlined"
                        type={index === 5 ? 'text' : 'number'}
                        sx={style}
                        name={key}
                        className={colors.root}
                        onChange={index === 5 ? handleObservation : handleChange}
                        value={reparation[key]}/>
                ))}
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
                disabled={reparation.id_client === '' || reparation.id_fournisseur === '' || reparation['prix client'] === 0 || reparation['prix fournisseur'] === 0 || reparation['titre client'] === '' || reparation['titre fournisseur'] === '' || reparation.poids === 0 || reparation.observation === ''}
                >ajouter reparation</Button>
            </div>
        </>
    )
}

export default AddReparation