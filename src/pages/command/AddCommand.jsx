import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../home/NavigationBar";
import Notification from "../home/notification";
import { fournisseur, client, magasin, api_add_command } from "../../backend";
import SelectedArticle from "../home/SelectedArticle";
import SelectedFournisseur from "../home/SelectedFournisseur";
import SelectedClient from "../home/SelectedClient";
import SelectedMagasin from "../home/SelectedMagasin";

const add_command = {
    jour: '',
    mois: '',
    annee: '',
    id_magasin: '',
    id_article: '',
    id_client: '',
    id_fournisseur: '',
    observation : '',
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
    const [command, setCommand] = useState(add_command)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();
    const [articles, setArticles] = useState([])

    useEffect(() => {
        setCommand(v => ({
          ...v,
          jour: String(currentDate.getDate()).padStart(2, '0'),
          mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
          annee : String(currentDate.getFullYear())
        }))
      }, [2000])

    const handleValidate = async e => {
      e.preventDefault();
      console.log(command)
      setDone(true)
      setTimeout(() => {
        setDone(false)
        navigate('/commands')
      }, 2000)
      try {
          const result = await axios.post(api_add_command, command)
          if(result.status === 200) {
          }
      } catch (e) {
          console.log(e)
          return
      }
    }

    return (
        <>
            <NavigationBar name="ajouter command" />
            <div className="text-field-done" >
              <form>
                <TextField 
                    disabled
                    id="outlined-disabled"
                    label={`${command.jour}-${command.mois}-${command.annee}`} variant="outlined"
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
                <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setCommand} valeur={command} setArticles={setArticles} show={false}/>
              </FormControl>
              <div className="select-article">
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedArticle name="nom d'article"  options={articles} setValue={setCommand} valeur={command}/>
                </FormControl>
              </div>

               <FormControl sx={{ m: 1, minWidth: 150 }}>
                 <SelectedClient name='client' options={client} setValue={setCommand} valeur={command} show={false}/>
               </FormControl>

               <FormControl sx={{ m: 1, minWidth: 150 }}>
                 <SelectedMagasin name='magasin' options={magasin} setValue={setCommand} valeur={command}/>
               </FormControl>
              <div className="select-article">
                <TextField 
                    id={"outlined-controlled"}
                    label='observation' variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setCommand(r => ({
                        ...r,
                        observation: e.target.value,
                      }))
                    }}
                    value={command.observation}
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
                disabled={command.id_fournisseur === ''|| command.id_client === '' || command.id_article === '' || command.id_magasin === '' || command.observation === ''}
                >ajouter command</Button>
           
            </div>
            {done && <Notification name={"Command a été ajoutée"}/>}
        </>
    )
}

export default AddCommand