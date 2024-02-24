import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_casse } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import Notification from "../home/notification";
import { add_casse } from "./data";
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

const AddCasse = () => {
    const colors = useStyle()
    const [casse, setCasse] = useState(add_casse)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();
    const person = ['client', 'fournisseur']
    const niveau_de_stock = ['local', 'person']
    const operation_client = ['vente', 'versement client']
    const operation_fournisseur = ['achat', 'versement fournisseur']

    useEffect(() => {
      setCasse(v => ({
        ...v,
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee : String(currentDate.getFullYear())
      }))
    }, [2000])


    const handleClick = async e => {
        e.preventDefault();
        try {
            setDone(true)
            setTimeout(() => {
                setDone(false)
                navigate('/casse')
            }, 2000)
            const result = await axios.post(api_add_casse, casse)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    console.log(casse)
    
    return (
        <>
            <NavigationBar name="ajouter casse" />
            <div className="add">
                {done && <Notification name={"L'operation a été ajoutée"} />}
                <TextField 
                    disabled
                    id="outlined"
                    label={`${casse.jour}-${casse.mois}-${casse.annee}`} variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name='date'
                    className={colors.root}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='person' options={person} setValue={setCasse} valeur={casse} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    {casse.person === 'client' && <SelectedClient name='nom' options={client} setValue={setCasse} valeur={casse}/>}
                    {casse.person === 'fournisseur' &&<SelectedFournisseur name='nom' options={fournisseur} setValue={setCasse} valeur={casse} bool_article={false}/>}
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='operation' options={casse.person === 'client' ? operation_client : operation_fournisseur} setValue={setCasse} valeur={casse} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='niveau_de_stock' options={niveau_de_stock} setValue={setCasse} valeur={casse} />
                </FormControl>
                {(casse.operation === 'achat' || casse.operation === 'vente') ?  <TextField 
                        id={"outlined-controlled"}
                        label='prix' variant="outlined"
                        type='number'
                        sx={style}
                        name='prix'
                        className={colors.root}
                        onChange={(e) => {
                            setCasse(c => ({
                                ...c,
                                prix : parseFloat(e.target.value),
                                total : parseFloat(e.target.value) * casse.poid,
                              }))}}
                        value={casse.prix}/> 
                    : <TextField 
                    id={"outlined-controlled"}
                    label='argent' variant="outlined"
                    type='number'
                    sx={style}
                    name='argent'
                    className={colors.root}
                    onChange={(e) => {
                        setCasse(c => ({
                            ...c,
                            argent : parseFloat(e.target.value),
                          }))}}
                    value={casse.argent}/>}
                <TextField 
                        id={"outlined-controlled"}
                        label='poid' variant="outlined"
                        type='number'
                        sx={style}
                        name='poid'
                        className={colors.root}
                        onChange={(e) => {
                            setCasse(c => ({
                                ...c,
                                poid : parseFloat(e.target.value),
                                total : parseFloat(e.target.value) * casse.prix,
                              }))}}
                        value={casse.poid}/>
                {(casse.operation === 'achat' || casse.operation === 'vente') && <TextField 
                        id={"outlined-controlled"}
                        disabled
                        label='total' variant="outlined"
                        type='number'
                        sx={style}
                        name='total'
                        className={colors.root}
                        value={casse.total}/>}
                    
                <TextField 
                        id={"outlined-controlled"}
                        label='observation' variant="outlined"
                        type='text'
                        sx={style}
                        name='observation'
                        className={colors.root}
                        onChange={(e) => {
                            setCasse(c => ({
                                ...c,
                                observation: e.target.value
                            }))
                        }}
                        value={casse.observation}/>
                
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
                disabled={casse.person === 'client' ? casse.id_client === '' : casse.id_fournisseur === '' || casse.operation === '' || casse.person === '' || casse.poid === 0}
                >ajouter l'operation</Button>
            </div>
        </>
    )
}

export default AddCasse