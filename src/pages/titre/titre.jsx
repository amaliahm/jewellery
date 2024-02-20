import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../home/NavigationBar";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { makeStyles } from "@mui/styles";
import ModalAdd from "./addTitre";
import { titres } from "../../backend";


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
  const navigate = useNavigate()

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
          background: `${!params.data.is_deleted ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.is_deleted ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.is_deleted ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.is_deleted && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];

  const [titre, setTitre] = useState(titres)
  const gridRef = useRef();
  const colors = useStyle()

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))
  useEffect(() => {
  }, [2000])



  const cellClickListner = (params) => {
    navigate(`/titres/${params.data.id_titre}`, {state: params.data})
  }


  const getRowStyle = (params) => {
    if (params.data.is_deleted) {
      return { background: '#db4f4a' };
    }
    return null;
  };
 

  return (
    <>
      <ModalAdd
              setShowModal={setAdd}
              showModal={add}
              detail={titre}
              colors={colors.root}
              setDetail={setTitre}
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
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Titre;


