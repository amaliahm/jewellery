import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useMemo, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { add_achat_importation, columns_add_achat_importation } from "./data";
import { api_add_achat_importation } from "../../backend";
import axios from "axios";
import Notification from "../home/notification";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
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

const AddAchatImportation = () => {
    const colors = useStyle()
    const location = useLocation()
    const [achatImp, setAchatImp] = useState({
        ...add_achat_importation,
        importateur: location.state,
    })
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
        setAchatImp(a => ({
            ...a,
            jour: String(currentDate.getDate()).padStart(2, '0'),
            mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
            annee : String(currentDate.getFullYear())
        }))
    }, [])
    
    const handleClick = async e => {
      setDone(true)
      setAchatImp({
        ...achatImp,
        'poid 18k': 0,
        'poid 24k': 0,
        'prix unitaire': 0,
        total: 0,
      })
      addText()
    }
    const handleValidate = async e => {
      e.preventDefault();
      setVal(true)
      setTimeout(() => {
        setDone(false)
        navigate('/importations/achat_importation', {state: allAchat[0].importateur})
      }, 2000)
      try {
          const result = await axios.post(api_add_achat_importation, allAchat)
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
      inter.unshift(achatImp)
      setAllAchat(inter)
      if (gridRef.current) {
        gridRef.current.api.setGridOption('rowData', allAchat);
      }
      setTexts([...texts, newText])
    };

    return (
        <>
            <NavigationBar name={`ajouter achat pour ${location.state}`} />
            <div className="text-field-done" >
              <form>
                <TextField 
                    disabled
                    id="outlined-disabled"
                    label={`${achatImp.jour}-${achatImp.mois}-${achatImp.annee}`} variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name='date'
                    className={colors.root}
                ></TextField>
              </form>
              <div className="select-article">
                <TextField 
                    id="outlined-controlled"
                    label='poid 18k' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    className={colors.root}
                    onChange={(e) => {
                      setAchatImp(r => ({
                        ...r,
                        'poid 18k': parseFloat(e.target.value),
                        'poid 24k': (parseFloat(e.target.value) * 750 / 1000).toFixed(3),
                        total: (parseFloat(e.target.value) * achatImp['prix unitaire']).toFixed(3),
                      }))
                    }}
                    value={achatImp['poid 18k']}
                ></TextField>
                <TextField 
                    disabled
                    id="outlined"
                    label='poid 24k' variant="outlined"
                    type='number'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    onChange={() => {}}
                    className={colors.root}
                    value={achatImp['poid 24k']}
                ></TextField>
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
                      setAchatImp(r => ({
                        ...r,
                        'prix unitaire': parseFloat(e.target.value),
                        total: (achatImp['poid 18k'] * parseFloat(e.target.value)).toFixed(3),
                      }))
                    }}
                    value={achatImp['prix unitaire']}
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
                    value={achatImp.total}
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
                disabled={achatImp.importateur === "" || achatImp['poid 18k'] === 0 || achatImp['poid 18k'] === '' || achatImp['prix unitaire'] == 0 || achatImp['prix unitaire'] === ''}
                >ajouter</Button>
           
            </div>
            {val && <Notification name={'Tous les achats d\'importation ont été ajoutés'}/>}
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
                  columnDefs={columns_add_achat_importation}
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

export default AddAchatImportation