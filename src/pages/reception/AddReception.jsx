import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_reception, fournisseur, titres, view_achat_articles_fournisseur } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import SelectedFournisseur from "../home/SelectedFournisseur";
import Notification from "../home/notification";
import { add_reception, columns_add_reception } from "./data";
import SelectedArticleReception from "../home/SelectedArticleReception";
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

const AddReception = () => {
    const colors = useStyle()
    const [reception, setReception] = useState(add_reception)
    const [articles, setArticles] = useState([])
    const [done, setDone] = useState(false)
    const [allReception, setAllReception] = useState([])
    const navigate = useNavigate()
    const [val, setVal] = useState(false)
    const currentDate = new Date();
    const gridRef = useRef();
    const defaultColDef = useMemo(() => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
    }))
    
    const handleClick = async e => {
      setDone(true)
      addText()
    }
    const handleValidate = async e => {
      e.preventDefault();
      console.log(allReception)
      let total_quantite = 0
      let montant = 0
      let ancien_solde = articles[0].solde
      Object.keys(allReception).map((e, i) => {
        total_quantite += allReception[e].quantite
        montant += allReception[e]['montant achat']
      })
      allReception.unshift({
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois: String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee: String(currentDate.getFullYear()),
        montant: montant,
        total_quantite: total_quantite,
        ancien_solde: ancien_solde,
        nombre_piece: allReception.length
      })
      setVal(true)
      setTimeout(() => {
        setDone(false)
        navigate('/receptions')
      }, 2000)
      try {
          const result = await axios.post(api_add_reception, allReception)
          if(result.status === 200) {
          }
      } catch (e) {
          console.log(e)
          return
      }
    }
    const [texts, setTexts] = useState([]);

    const addText = () => {
      const newText = `Text ${texts.length + 1}`;
      const inter = allReception
      inter.unshift(reception)
      setAllReception(inter)
      if (gridRef.current) {
        gridRef.current.api.setGridOption('rowData', allReception);
      }
      setTexts([...texts, newText])
    };

    return (
        <>
            <NavigationBar name="ajouter reception" />
            <div className="text-field-done" >
              <form>
                <TextField 
                    disabled
                    id="outlined-disabled"
                    label={`${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getFullYear())}`} variant="outlined"
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
                <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setReception} valeur={reception} setArticles={setArticles}/>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <SelectedTitre name='titre' options={titres} setValue={setReception} valeur={reception}/>
              </FormControl>
              <div className="select-article">
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedArticleReception name="nom d'article" options={articles} setValue={setReception} valeur={reception}/>
                </FormControl>
              </div>
              <div className="select-article">
                <TextField 
                    id={"outlined-controlled"}
                    label='quantite' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='quantite'
                    onChange={(e) => {
                      setReception(r => ({
                        ...r,
                        quantite: parseFloat(e.target.value),
                        'montant achat': parseFloat(e.target.value) * reception['prix achat facon'],
                        'montant vente': parseFloat(e.target.value) * reception['prix vente facon'],
                      }))
                    }}
                    value={reception.quantite}
                ></TextField>
                <TextField 
                    id={"outlined-controlled"}
                    label='chutte' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='chutte'
                    onChange={(e) => {
                      setReception(r => ({
                        ...r,
                        chutte: parseFloat(e.target.value)
                      }))
                    }}
                    value={reception.chutte}
                ></TextField>
                <TextField 
                    disabled
                    id={"outlined-controlled"}
                    label='prix achat' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='prix achat'
                    value={reception['prix achat']}
                ></TextField>
                <TextField 
                    disabled
                    id={"outlined-controlled"}
                    label='prix vente' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='prix vente'
                    value={reception['prix vente']}
                ></TextField>
                <TextField 
                    id={"outlined-controlled"}
                    label='prix achat facon' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='prix achat facon'
                    onChange={(e) => {
                      setReception(r => ({
                        ...r,
                        'prix achat facon': parseFloat(e.target.value),
                        'montant achat': parseFloat(e.target.value) * reception.quantite,
                      }))
                    }}
                    value={reception['prix achat facon']}
                ></TextField>
                <TextField 
                    id={"outlined-controlled"}
                    label='prix vente facon' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='prix vente facon'
                    onChange={(e) => {
                      setReception(r => ({
                        ...r,
                        'prix vente facon': parseFloat(e.target.value),
                        'montant vente': parseFloat(e.target.value) * reception.quantite,
                      }))
                    }}
                    value={reception['prix vente facon']}
                ></TextField>
                <TextField 
                    id={"outlined-controlled"}
                    label='montant achat' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='montant achat'
                    value={reception['montant achat']}
                ></TextField>
                <TextField 
                    id={"outlined-controlled"}
                    label='montant vente' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    name='montant vente'
                    value={reception['montant vente']}
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
                onClick={handleClick}
                disabled={reception.id_article === '' || reception.id_fournisseur === '' ||reception.id_titre === '' || reception['montant chat'] === 0 || reception['montant vente'] === 0}
                >ajouter achat</Button>
           
            </div>
            {val && <Notification name={'Tous les receptions ont été ajoutés'}/>}
              {done && 
                <div 
                className="ag-theme-quartz-dark"
                style={{
                  marginTop: "50px",
                  height: `calc(25vh + ${allReception.length} * 5vh)`,
                  width: '95vw',
                  marginBottom: '80px'
                }}> 
                  <AgGridReact className="clear"
                  ref={gridRef}
                  rowData={allReception}
                  columnDefs={columns_add_reception}
                  defaultColDef={defaultColDef}
                  rowGroupPanelShow='always'
                  />
                  <Button
                    sx={{
                        bgcolor: 'var(--brand-1)',
                        border: '1px solid var(--brand-1)',
                        marginBottom: '10px',
                        marginRight: '10px',
                        position: 'relative',
                        top: '20px',
                        '&:hover' : {
                          color: 'white'
                        }
                    }} 
                    onClick={handleValidate}
                    >validate</Button>
                </div>
              }
        </>
    )
}

export default AddReception