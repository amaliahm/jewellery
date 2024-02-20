import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_versement_importation} from "../../backend";
import NavigationBar from "../home/NavigationBar";
import SelectedMenu from "../home/SelectedMenu";
import Notification from "../home/notification";
import { add_versement_importation } from "./data";
import { titres } from "../../backend";
import { useLocation } from "react-router-dom";
import SelectedTitre from "../home/SelectedTitre";


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
      nom_importateur: location.state.nom_importateur,
      id_importation: location.state.id_importation,
      devise: '$',
    })
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();
    console.log(location.state)
    const devise = ['$', '€']



    useEffect(() => {

    const url__ = 'https://v6.exchangerate-api.com/v6/fa05ca6ac00994824abd2edd/latest/EUR'

    fetch(url__)
       .then(response => response.json())
       .then(data => {
        const valeur = data.conversion_rates.USD
        console.log(valeur)
        setVerImp(v => ({
          ...v,
          'change €/$': valeur,
          jour: String(currentDate.getDate()).padStart(2, '0'),
          mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
          annee : String(currentDate.getFullYear()),
          'poid 24k' : verImp['poid 18k'] * verImp.titre / 1000,
          'versement $' : verImp.devise === '€' ? (verImp['change €/$'] * verImp['versement €']) : (verImp['change €/$'] * verImp['versement €']),
          versement : verImp.devise === '$' ? verImp['versement $'] : (verImp['change €/$'] * verImp['versement €']),
        }))
       })
       .catch(error => {
          console.error('Error fetching exchange rates:', error);
       });
      
    }, [2000])
    
    const handleClick = async e => {
        e.preventDefault();
        try {
            setDone(true)
            setTimeout(() => {
                setDone(false)
                navigate('/importations/versement_importation', {state: location.state})
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
            <NavigationBar name={`ajouter versement pour ${location.state.nom_importateur}`} />
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
                  <SelectedTitre id='titre' name='titre' options={titres} setValue={setVerImp} valeur={verImp}/>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <SelectedMenu name='devise' options={devise} setValue={setVerImp} valeur={verImp}/>
                </FormControl>
                <TextField 
                    id="outlined-controlled"
                    label='poid 18k' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'poid 18k': parseFloat(e.target.value),
                        'poid 24k': parseFloat(e.target.value) * verImp.titre / 1000,
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
                {verImp.devise === '$' && <TextField 
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
                />}

                
                {verImp.devise === '€' && <>
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
                </>}
                
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