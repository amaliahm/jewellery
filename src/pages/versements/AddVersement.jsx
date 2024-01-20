import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_versement} from "../../backend";
import { titre } from '../../data';
import NavigationBar from "../home/NavigationBar";
import SelectedMenu from "../home/SelectedMenu";
import Notification from "../home/notification";
import { add_versement } from "./data";
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

const style = {
  borderColor: "transparent",
  margin: '10px'
}

const AddVersement = () => {
    const colors = useStyle()
    const [versement, setVersement] = useState(add_versement)
    const [done, setDone] = useState(false)
    const [client, setClient] = useState()
    const [fournisseur, setFournisseur] = useState()
    const navigate = useNavigate()
    const currentDate = new Date();
    const person = ['client', 'fournisseur']

    const fetchAllData = async () => {
      let inter = []
      let data = result.data.fournisseurs
      Object.keys(data).map((e, i) => {
        inter.push(data[e].nom)
      })
      setFournisseur(inter)
      data = result.data.clients
      inter = []
      Object.keys(data).map((e, i) => {
        inter.push(data[e].nom)
      })
      setClient(inter)
    }
    useEffect(() => {
      setVersement(v => ({
        ...v,
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee : String(currentDate.getFullYear())
      }))
      fetchAllData()
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
            const result = await axios.post(api_add_versement, versement)
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
                    <SelectedMenu name='person' options={person} setValue={setVersement} valeur={versement} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='nom' options={versement.person == 'client' ? client : versement.person == 'fournisseur' ? fournisseur : []} setValue={setVersement} valeur={versement}/>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='titre' options={titre} setValue={setVersement} valeur={versement}/>
                </FormControl>
                {Object.keys(versement).slice(6).map((key, index) => (
                    <>
                    {(index <= 3) && 
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
                disabled={versement.titre === "" || versement.person === '' || versement.nom === '' }
                >ajouter versement</Button>
            </div>
        </>
    )
}

export default AddVersement