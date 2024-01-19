import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_versement_importation} from "../../backend";
import { titre } from '../../data';
import NavigationBar from "../home/NavigationBar";
import SelectedMenu from "../home/SelectedMenu";
import Notification from "../home/notification";
import { add_versement_importation } from "./data";
import { result } from "../../backend";
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

const AddVersementImportation = () => {
    const colors = useStyle()
    const location = useLocation()
    const [verImp, setVerImp] = useState({
      ...add_versement_importation,
      importateur: location.state,
    })
    const [done, setDone] = useState(false)
    const [client, setClient] = useState()
    const [fournisseur, setFournisseur] = useState()
    const navigate = useNavigate()
    const currentDate = new Date();


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
      setVerImp(v => ({
        ...v,
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee : String(currentDate.getFullYear()),
        'poid 24k' : verImp['poid 18k'] * verImp.titre / 1000,
        versement : verImp['versement €'] === 0 ? verImp['versement $'] : (verImp['change €/$'] * verImp['versement €']),
      }))
      fetchAllData()
    }, [2000])
    
    const handleClick = async e => {
        e.preventDefault();
        try {
            setDone(true)
            setTimeout(() => {
                setDone(false)
                // navigate('/importations/versement_importation', {state: location.state})
            }, 2000)
            const result = await axios.post(api_add_versement_importation, verImp)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    
    return (
        <>
            <NavigationBar name={`ajouter versement pour ${location.state}`} />
            <div className="add">
                {done && <Notification name={'le versement a été ajoutée'} />}
                <TextField 
                    disabled
                    id="outlined"
                    label={`${verImp.jour}-${verImp.mois}-${verImp.annee}`} variant="outlined"
                    type='text'
                    sx={style}
                    name='date'
                    className={colors.root}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <SelectedMenu name='titre' options={titre} setValue={setVerImp} valeur={verImp}/>
                </FormControl>
                <TextField 
                    id="outlined-controlled"
                    label='poid 18k' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'poid 18k': parseFloat(e.target.value),
                        'poid 24k': (parseFloat(e.target.value) * verImp.titre / 1000).toFixed(3),
                      }))
                    }}
                    type='number'
                    sx={style}
                    name='poid 18k'
                    className={colors.root}
                    value={verImp['poid 18k']}
                />
                <TextField 
                    disabled
                    id="outlined"
                    label='poid 24k' variant="outlined"
                    type='number'
                    sx={style}
                    name='poid 24k'
                    className={colors.root}
                    value={verImp['poid 24k']}
                />
                <TextField 
                    id="outlined-controlled"
                    label='versement €' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'versement €': parseFloat(e.target.value),
                        versement: parseFloat(e.target.value) === 0 ? verImp['versement $'] : (parseFloat(e.target.value) * verImp['change €/$']),
                      }))}}
                    type='number'
                    sx={style}
                    name='versement €'
                    className={colors.root}
                    value={verImp['versement €']}
                />
                <TextField 
                    id="outlined-controlled"
                    label='change €/$' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'change €/$': parseFloat(e.target.value),
                        versement: verImp['versement €'] === 0 ? verImp['versement $'] : (verImp['versement €'] * parseFloat(e.target.value)),
                      }))}}
                    type='number'
                    sx={style}
                    name='change €/$'
                    className={colors.root}
                    value={verImp['change €/$']}
                />
                <TextField 
                    id="outlined-controlled"
                    label='versement $' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'versement $': parseFloat(e.target.value),
                        versement: verImp['versement €'] === 0 ? parseFloat(e.target.value) : (verImp['versement €'] * verImp['change €/$']),
                      }))}}
                    type='number'
                    sx={style}
                    name='versement $'
                    className={colors.root}
                    value={verImp['versement $']}
                />
                <TextField 
                    disabled
                    id="outlined"
                    label='versement' variant="outlined"
                    type='number'
                    sx={style}
                    name='versement'
                    className={colors.root}
                    value={verImp.versement}
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
                disabled={verImp.titre === "" }
                >ajouter versement</Button>
            </div>
        </>
    )
}

export default AddVersementImportation