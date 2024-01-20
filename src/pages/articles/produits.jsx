import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from "../home/NavigationBar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Button } from '@mui/material';
import ModalUpdate from './ModalUpdateFamille';
import ModalDelete from './ModalDeleteFamille';
import { makeStyles } from "@mui/styles";

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


const Produits = () => {
  const colors = useStyle()
  const gridRef = useRef();
  const location = useLocation();
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [nom, setNom] = useState(location.state.nom)
  const [del, setDel] = useState(false)

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
    navigate(`/produits/${location.state.id}/${e.data.id}`, { state : { nom: e.data["designation d'article"],id: location.state.id, detail: e.data } })
  })

    return (
      <>
      <ModalUpdate
              setShowModal={setModal}
              showModal={modal}
              detail={nom}
              colors={colors.root}
              setDetail={setNom}
              id={location.state.id}
            />
      <ModalDelete
              setShowModal={setDel}
              showModal={del}
              detail={nom}
              colors={colors.root}
              id={location.state.id}
            />
        <NavigationBar name={`famille : ${nom}`} />
        
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "50px",
            height: '75vh',
            width: '95vw',
            marginBottom: '20px'
        }}>
        <Button sx={{
          color: 'var(--brand-1)',
          border: '1px solid var(--brand-1)',
          marginBottom: '10px',
          marginRight: '10px'
        }} 
        onClick={(e) => { navigate(`/produits/${location.state.id}/add`, {state: {nom: location.state.nom, id: location.state.id, articles: location.state.articles}}) }}
        >ajouter article</Button>
        <Button sx={{
          color: 'var(--brand-1)',
          border: '1px solid var(--brand-1)',
          marginBottom: '10px',
          marginRight: '10px'
        }} 
        onClick={() => { setModal(true) }}
        >modifier</Button>
        <Button sx={{
          color: 'var(--brand-1)',
          border: '1px solid var(--brand-1)',
          marginBottom: '10px',
          marginRight: '10px'
        }} 
        onClick={() => { setDel(true) }}
        >supprimer</Button>
        <Button sx={{
          color: 'var(--brand-1)',
          border: '1px solid var(--brand-1)',
          marginBottom: '10px',
          marginRight: '10px'
        }} 
        >telecharger excel</Button>
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