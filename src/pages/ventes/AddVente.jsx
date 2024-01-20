import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useMemo, useRef, useState, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import SelectedArticle from "../home/SelectedArticle";
import SelectedMenu from "../home/SelectedMenu";
import { add_vente, columns_add_vente } from "./data";
import { api_add_vente } from "../../backend";
import axios from "axios";
import Notification from "../home/notification";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
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

const AddVente = () => {
    const colors = useStyle()
    const [vente, setVente] = useState(add_vente)
    const [client, setClient] = useState([])
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
        setVente(a => ({
            ...a,
            jour: String(currentDate.getDate()).padStart(2, '0'),
            mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
            annee : String(currentDate.getFullYear())
        }))
        const fetchAllData = async () => {
            let data = result.data.articles
            setArticles(data)
            let __client = result.data.clients
            setClient(__client)
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
      console.log(allVente)
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
                    label={`${vente.jour}-${vente.mois}-${vente.annee}`} variant="outlined"
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
                    <SelectedMenu name="famille"  options={famille} setValue={setVente} valeur={vente}/>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedArticle name="article"  options={displayFamille(vente.famille)} setValue={setVente} valeur={vente} rest={articles}/>
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
                      setVente(r => ({
                        ...r,
                        'prix unitaire': parseInt(e.target.value),
                        total: Math.abs(vente.quantite) * parseInt(e.target.value),
                      }))
                    }}
                    value={vente['prix unitaire']}
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
                        quantite: parseInt(e.target.value),
                        total: Math.abs(parseInt(e.target.value)) * vente['prix unitaire'],
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
                disabled={vente.famille === "" || vente.article === '' || vente.client === '' || vente.quantite === '' || vente.quantite == 0 || vente['prix unitaire'] == 0 || vente['prix unitaire'] === ''}
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