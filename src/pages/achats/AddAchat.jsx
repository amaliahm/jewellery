import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useMemo, useRef, useState, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import SelectedFournisseur from "../home/SelectedFournisseur";
import SelectedArticle from "../home/SelectedArticle";
import SelectedMenu from "../home/SelectedMenu";
import { add_achat, columns_add_achat } from "./data";
import { api_add_achat } from "../../backend";
import axios from "axios";
import Notification from "../home/notification";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";

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

const AddAchat = () => {
    const colors = useStyle()
    const [achat, setAchat] = useState(add_achat)
    const [fournisseur, setFournisseur] = useState([])
    const [famille, setFamille] = useState([])
    const [articles, setArticles] = useState([])
    const [done, setDone] = useState(false)
    const [allAchat, setAllAchat] = useState([])
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
        setAchat(a => ({
            ...a,
            jour: String(currentDate.getDate()).padStart(2, '0'),
            mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
            annee : String(currentDate.getFullYear())
        }))
        const fetchAllData = async () => {
            let data = result.data.articles
            setArticles(data)
            let __fournisseur = result.data.fournisseurs
            setFournisseur(__fournisseur)
            data = result.data.familles
            const famille = [...new Set(
                data.map(item => item.famille))]
                setFamille(famille)
            
              }
              fetchAllData()
    }, [])

    function displayFamille(name) {
        const result = []
        Object.keys(articles).map((e, i) => {
          if (articles[e].famille === name) {
            result.push(articles[e]["designation d'article"] )
          }
        })
        return result
    }
    
    const handleClick = async e => {
      setDone(true)
      addText()
    }
    const handleValidate = async e => {
      e.preventDefault();
      console.log(allAchat)
      setVal(true)
      setTimeout(() => {
        setDone(false)
        navigate('/achats')
      }, 2000)
      try {
          const result = await axios.post(api_add_achat, allAchat)
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
      const inter = allAchat
      inter.unshift(achat)
      setAllAchat(inter)
      if (gridRef.current) {
        gridRef.current.api.setGridOption('rowData', allAchat);
      }
      setTexts([...texts, newText])
    };

    return (
        <>
            <NavigationBar name="ajouter achat" />
            <div className="text-field-done" >
              <form>
                <TextField 
                    disabled
                    id="outlined-disabled"
                    label={`${achat.jour}-${achat.mois}-${achat.annee}`} variant="outlined"
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
                <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setAchat} valeur={achat}/>
              </FormControl>
              <div className="select-article">
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name="famille"  options={famille} setValue={setAchat} valeur={achat}/>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedArticle name="article"  options={displayFamille(achat.famille)} setValue={setAchat} valeur={achat} rest={articles}/>
                </FormControl>
              </div>
              <div className="select-article">

                <TextField 
                    id={"outlined-controlled"}
                    label='prix unitaire' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setAchat(r => ({
                        ...r,
                        'prix unitaire': parseFloat(e.target.value),
                        total: Math.abs(achat.quantite) * parseFloat(e.target.value),
                      }))
                    }}
                    value={achat['prix unitaire']}
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
                      setAchat(r => ({
                        ...r,
                        quantite: parseFloat(e.target.value),
                        total: Math.abs(parseFloat(e.target.value)) * achat['prix unitaire'],
                      }))
                    }}
                    value={achat.quantite}
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
                    value={achat.total}
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
                disabled={achat.famille === "" || achat.article === '' || achat.fournisseur === '' || achat.quantite === '' || achat.quantite == 0 || achat['prix unitaire'] == 0 || achat['prix unitaire'] === ''}
                >ajouter achat</Button>
           
            </div>
            {val && <Notification name={'Tous les achats ont été ajoutés'}/>}
              {done && 
                <div 
                className="ag-theme-quartz-dark"
                style={{
                  marginTop: "50px",
                  height: `calc(25vh + ${allAchat.length} * 5vh)`,
                  width: '95vw',
                  marginBottom: '80px'
                }}> 
                  <AgGridReact className="clear"
                  ref={gridRef}
                  rowData={allAchat}
                  columnDefs={columns_add_achat}
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

export default AddAchat