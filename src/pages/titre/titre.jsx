import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { makeStyles } from "@mui/styles";
import ModalAdd from "./addTitre";
import ModalDelete from "./deleteTitre";
import ModalUpdate from "./updateTitre";


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

const Titre = () => {
  const [add, setAdd] = useState(false)
  const [update, setUpdate] = useState(false)
  const [supprimer, setSupprimer] = useState(false)
  const [data, setData] = useState('')

  const columns_titre = [
    {
      field: "titre",
      headerName: "TITRE",
      flex: 1,
      minWidth: 850,
      maxWidth: 900,
      headerAlign: 'left'
    },
    {
      field: "plus details",
      headerName: "",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      headerAlign: 'left',
      cellRenderer : (params) => 
        <Button
        sx={{
          background: 'var(--brand-1)',
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: '1px solid var(--brand-1)',
          }
        }} 
        onClick={() => {
          setData(params.data)
          setUpdate(true)
        }}
        >
          <i className="fa-solid fa-pen fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>
        </Button>
    },
    {
      field: "plus details",
      headerName: "",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      headerAlign: 'left',
      cellRenderer : (params) => 
        <Button
        sx={{
          background: 'red',
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: '1px solid red',
          }
        }} 
        onClick={() => {
          setData(params.data)
          setSupprimer(true)
        }}
        >
          <i className="fa-solid fa-trash fa-xl" style={{color: 'white'}} ></i>
        </Button>
    },
  ];

  const [titre, setTitre] = useState([])
  const gridRef = useRef();
  const colors = useStyle()

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const fetchAllData = () => {
    const data = result.data.titre
    setTitre(data)
  }

  useEffect(() => {
    fetchAllData()
  }, [2000])
 

  return (
    <>
      <ModalAdd
              setShowModal={setAdd}
              showModal={add}
              detail={titre}
              colors={colors.root}
              setDetail={setTitre}
            />
      
            <ModalDelete
              setDelete={setSupprimer}
              _delete={supprimer}
              detail={data}
              all={titre}
              colors={colors.root}
              setDetail={setTitre}
            />
        
            <ModalUpdate
              setShowModal={setUpdate}
              showModal={update}
              detail={data}
              colors={colors.root}
              setDetail={setTitre}
              all={titre}
            />
      <NavigationBar name="les titres" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "50px",
            height: '75vh',
            width: '80vw',
            marginBottom: '20px'
        }}>
            <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { 
                setAdd(true) 
              }}
              >ajouter titre</Button>
            <AgGridReact
              ref={gridRef}
              rowData={titre}
              columnDefs={columns_titre}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default Titre;


