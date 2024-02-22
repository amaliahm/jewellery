import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_charge } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import Notification from "../home/notification";
import SelectedType from "../home/SelectedType";

const add_charge = {
    jour: '',
    mois: '',
    annee: '',
    id_type: '',
    designation: '',
    montant: 0,
    utilisateur: '',
  }

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

const AddCommand = () => {
    const colors = useStyle()
    const [charge, setCharge] = useState(add_charge)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();

    useEffect(() => {
        setCharge(v => ({
          ...v,
          jour: String(currentDate.getDate()).padStart(2, '0'),
          mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
          annee : String(currentDate.getFullYear())
        }))
      }, [2000])

    const handleValidate = async e => {
      e.preventDefault();
      console.log(charge)
      setDone(true)
      setTimeout(() => {
        setDone(false)
        navigate('/charges')
      }, 2000)
      try {
          const result = await axios.post(api_add_charge, charge)
          if(result.status === 200) {
          }
      } catch (e) {
          console.log(e)
          return
      }
    }

    return (
        <>
            <NavigationBar name="ajouter charge" />
            <div className="text-field-done" >
              <form>
                <TextField 
                    disabled
                    id="outlined-disabled"
                    label={`${charge.jour}-${charge.mois}-${charge.annee}`} variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name='date'
                    className={colors.root}
                ></TextField>
              </form>
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedType setValue={setCharge} valeur={charge} />
                </FormControl>
              <div className="select-article">

                <TextField 
                    id={"outlined-controlled"}
                    label='designation' variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setCharge(r => ({
                        ...r,
                        designation: e.target.value,
                      }))
                    }}
                    value={charge.designation}
                ></TextField>
                <TextField 
                    id="outlined-controlled"
                    label='montant' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setCharge(r => ({
                        ...r,
                        montant: parseFloat(e.target.value)
                      }))
                    }}
                    value={charge.montant}
                ></TextField>
                <TextField 
                    id={"outlined-controlled"}
                    label='utilisateur' variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setCharge(r => ({
                        ...r,
                        utilisateur: e.target.value,
                      }))
                    }}
                    value={charge.utilisateur}
                ></TextField>
              </div>
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
                onClick={handleValidate}
                disabled={charge.id_sous_type === ''||charge.montant === 0 || charge.utilisateur === '' || charge.designation === ''}
                >ajouter charge</Button>
           
            </div>
            {done && <Notification name={"Charge a été ajoutée"}/>}
        </>
    )
}

export default AddCommand