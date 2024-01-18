import React, { useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from "../home/NavigationBar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Button } from '@mui/material';



const Produits = () => {
  const gridRef = useRef();
  const location = useLocation();
  const navigate = useNavigate()

  const display_famille =[
    {
      field: "article",
      headerName: "DESIGNATION",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "designation d'article",
      headerName: "ARTICLE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "fournisseur",
      headerName: "FOURNISSEUR",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
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
        onClick={() => {cellClickListner(params)}}
        >
          <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>
        </Button>
    },
  ];

  
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const cellClickListner = useCallback(e => {
    navigate(`/produits/${location.state.nom}/${e.data.id}`, { state : { nom: e.data["designation d'article"], detail: e.data } })
  })



    return (
      <>
        <NavigationBar name={`famille : ${location.state.nom}`} />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "50px",
            height: '75vh',
            width: '95vw',
            marginBottom: '20px'
        }}>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={location.state.articles}
              columnDefs={display_famille}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
      </>
    )
}

export default Produits