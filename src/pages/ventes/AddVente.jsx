import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_vente, client, result, view_achat_articles_fournisseur } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import SelectedArticle from "../home/SelectedArticle";
import SelectedClient from "../home/SelectedClient";
import SelectedFamille from "../home/SelectedFamille";
import Notification from "../home/notification";
import { add_vente, columns_add_vente } from "./data";

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

const AddVente = () => {
    const colors = useStyle()
    const [vente, setVente] = useState(add_vente)
    const [famille, setFamille] = useState([])
    const [articles, setArticles] = useState([])
    const [done, setDone] = useState(false)
    const [allVente, setAllVente] = useState([])
    const navigate = useNavigate()
    const [val, setVal] = useState(false)
    const currentDate = new Date();
    const gridRef = useRef();
    const defaultColDef = useMemo(() => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
    }))

    useEffect(() => {
        const fetchAllData = async () => {
          let inter = []
          Object.keys(view_achat_articles_fournisseur).map((e, i) => {
            inter.push({
              id_famille: view_achat_articles_fournisseur[e].id_famille,
              nom_famille: view_achat_articles_fournisseur[e].nom_famille,
            })
          })
          
          const uniqueObjectsSet = new Set();
    
          const uniqueArray = inter.filter(obj => {
            const stringRepresentation = JSON.stringify(obj);
            if (!uniqueObjectsSet.has(stringRepresentation)) {
              uniqueObjectsSet.add(stringRepresentation);
              return true;
            }
            return false;
          });
          setFamille(uniqueArray)
        }
        fetchAllData()
    }, [])
    
    const handleClick = async e => {
      console.log(vente)
      setDone(true)
      addText()
    }
    const handleValidate = async e => {
      e.preventDefault();
      console.log(allVente)
      let total_quantite = 0
      let total_argent = 0
      let ancien_solde = articles[0].solde
      Object.keys(allVente).map((e, i) => {
        total_quantite += allVente[e].quantite
        total_argent += allVente[e].total
      })
      allVente.unshift({
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois: String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee: String(currentDate.getFullYear()),
        total_argent: total_argent,
        total_quantite: total_quantite,
        ancien_solde: ancien_solde,
        nombre_piece: allVente.length
      })
      setVal(true)
      setTimeout(() => {
        setDone(false)
        navigate('/ventes')
      }, 2000)
      try {
          const result = await axios.post(api_add_vente, allVente)
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
      const inter = allVente
      inter.unshift(vente)
      setAllVente(inter)
      if (gridRef.current) {
        gridRef.current.api.setGridOption('rowData', allVente);
      }
      setTexts([...texts, newText])
    };

    return (
        <>
            <NavigationBar name="ajouter vente" />
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
                <SelectedClient name='client' options={client} setValue={setVente} valeur={vente}/>
              </FormControl>
              <div className="select-article">
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <SelectedFamille name='famille' options={famille} setValue={setVente} valeur={vente} setArticles={setArticles}/>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedArticle name="article"  options={articles} setValue={setVente} valeur={vente}/>
                </FormControl>
              </div>
              <div className="select-article">

                <TextField 
                    id={"outlined-controlled"}
                    label='prix_unitaire' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setVente(r => ({
                        ...r,
                        prix_unitaire: parseFloat(e.target.value),
                        total: Math.abs(parseFloat(vente.quantite)) * parseFloat(e.target.value),
                      }))
                    }}
                    value={vente.prix_unitaire}
                ></TextField>
                <TextField 
                    id="outlined-controlled"
                    label='quantite' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setVente(r => ({
                        ...r,
                        quantite: parseFloat(e.target.value),
                        total: Math.abs(parseFloat(e.target.value)) * parseFloat(vente.prix_unitaire),
                      }))
                    }}
                    value={vente.quantite}
                ></TextField>
                <TextField 
                    disabled
                    id="outlined"
                    label='total' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    onChange={() => {}}
                    className={colors.root}
                    value={vente.total}
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
                disabled={vente.id_article === '' || vente.id_client === '' ||vente.total === 0 || vente.total === ''}
                >ajouter vente</Button>
           
            </div>
            {val && <Notification name={'Tous les ventes ont été ajoutés'}/>}
              {done && 
                <div 
                className="ag-theme-quartz-dark"
                style={{
                  marginTop: "50px",
                  height: `calc(25vh + ${allVente.length} * 5vh)`,
                  width: '95vw',
                  marginBottom: '80px'
                }}> 
                  <AgGridReact className="clear"
                  ref={gridRef}
                  rowData={allVente}
                  columnDefs={columns_add_vente}
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

export default AddVente