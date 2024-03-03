import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from "../home/NavigationBar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Button } from '@mui/material';
import ModalUpdate from './ModalUpdateFamille';
import ModalDelete from './ModalDeleteFamille';
import { makeStyles } from "@mui/styles";
import { view_produits } from '../../backend';

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

  const display_famille =[
    {
      field: "id_article",
      headerName: "ARTICLE N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "nom_article",
      headerName: "ARTICLE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "nom_fournisseur",
      headerName: "FOURNISSEUR",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "quantite_stock",
      headerName: "QUANTITE DE STOCK",
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
          background: `${!params.data.deleted_article ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_article ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.deleted_article ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.deleted_article && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];

  const getRowStyle = (params) => {
    if (params.data.deleted_article) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  const colors = useStyle()
  const gridRef = useRef();
  const location = useLocation();
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [state, setState] = useState(location.state.nom_famille)
  const [article, setArticle] = useState([])
  const [del, setDel] = useState(false)

  useEffect(() => {
    const fetchAllData = () => {
      let inter = []
      Object.keys(view_produits).map((e, i) => {
        if (view_produits[e].id_famille === location.state.id_famille && view_produits[e].id_article !== null) {
          inter.push(view_produits[e])
        }
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
      console.log(uniqueArray)
      setArticle(uniqueArray)
    }
    fetchAllData()
  }, [2000])

    const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))


  const cellClickListner = (params) => {
    navigate(`/produits/${location.state.id_famille}/${params.data.id_article}`, {state: params.data})
  }

    return (
      <>
      {modal && <ModalUpdate
              setShowModal={setModal}
              showModal={modal}
              detail={state}
              colors={colors.root}
              setDetail={setState}
              id={location.state.id_famille}
            />}
      {del && <ModalDelete
              setShowModal={setDel}
              showModal={del}
              detail={state}
              colors={colors.root}
              id={location.state.id_famille}
            />}
        <NavigationBar name={`famille : ${state}`} />
        
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
        onClick={() => { navigate(`/produits/${location.state.id_famille}/add`, {state: location.state}) }}
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
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={article}
              columnDefs={display_famille}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
      </>
    )
}

export default Produits