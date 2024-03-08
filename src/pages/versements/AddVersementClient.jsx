import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_versement_client } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import Notification from "../home/notification";
import { add_versement } from "./data";
import { client } from "../../backend";
import SelectedClient from "../home/SelectedClient";


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

const AddVersementClient = () => {
    const colors = useStyle()
    const [versement, setVersement] = useState(add_versement)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();

    useEffect(() => {
      setVersement(v => ({
        ...v,
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee : String(currentDate.getFullYear())
      }))
    }, [2000])

    const handleChange = (e) => {
        setVersement(c => ({
          ...c,
          [e.target.name] : parseFloat(e.target.value),
        }))
        console.log(versement)
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
            setDone(true)
            setTimeout(() => {
                setDone(false)
                navigate('/versements')
            }, 2000)
            const result = await axios.post(api_add_versement_client, versement)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    console.log(versement)
    
    return (
        <>
            <NavigationBar name="ajouter versement" />
            <div className="add">
                {done && <Notification name={'le versement a été ajoutée'} />}
                <TextField 
                    disabled
                    id="outlined"
                    label={`${versement.jour}-${versement.mois}-${versement.annee}`} variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name='date'
                    className={colors.root}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedClient name='client' options={client} setValue={setVersement} valeur={versement}/>
                </FormControl>
                {Object.keys(versement).slice(7).map((key, index) => (
                    <>
                    { (index <= 1) &&
                    <TextField 
                        key={index}
                        id={"outlined-controlled"}
                        label={key} variant="outlined"
                        type='number'
                        sx={style}
                        name={key}
                        className={colors.root}
                        onChange={handleChange}
                        value={versement[key]}/>}
                </>))}
                    <TextField 
                       id={"outlined-controlled"}
                       label= 'fonte' variant="outlined"
                       type='number'
                       sx={style}
                       name= 'fonte'
                       className={colors.root}
                       onChange={(e) => {
                        setVersement(v => ({
                          ...v,
                          fonte: parseFloat(e.target.value),
                          'net 750': ((versement['or v'] - parseFloat(e.target.value)) * versement.titre / 750).toFixed(3),
                          ecart: (versement['or v'] -((versement['or v'] - parseFloat(e.target.value)) * versement.titre / 750)).toFixed(3),
                        }))
                       }}
                       value={versement.fonte}
                    />
                    <TextField 
                       id={"outlined-controlled"}
                       label= 'or v' variant="outlined"
                       type='number'
                       sx={style}
                       name= 'or v'
                       className={colors.root}
                       onChange={(e) => {
                        setVersement(v => ({
                          ...v,
                          'or v': parseFloat(e.target.value),
                          'net 750': ((parseFloat(e.target.value) - versement.fonte) * versement.titre / 750).toFixed(3),
                          ecart: (parseFloat(e.target.value) - ((parseFloat(e.target.value) - versement.fonte) * versement.titre / 750)).toFixed(3),
                        }))
                       }}
                       value={versement['or v']}
                    />
                    <TextField 
                       disabled
                       id={"outlined"}
                       label= 'net 750' variant="outlined"
                       type='number'
                       sx={style}
                       className={colors.root}
                       value={versement['net 750']}
                    />
                    <TextField 
                       disabled
                       id={"outlined"}
                       label= 'titre' variant="outlined"
                       type='number'
                       sx={style}
                       className={colors.root}
                       value={versement.titre}
                    />
                    <TextField 
                       disabled
                       id={"outlined"}
                       label= 'ecart' variant="outlined"
                       type='number'
                       sx={style}
                       className={colors.root}
                       value={versement.ecart}
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
                disabled={versement.id_client === ''}
                >ajouter versement</Button>
            </div>
        </>
    )
}

export default AddVersementClient