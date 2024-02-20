import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { view_vente_articles_client } from "../../backend";
import NavigationBar from "../home/NavigationBar";



const Ventes = () => {

  const columns_ventes = [
    { 
        field: "vente total n=°", 
        headerName: "VENTE total N=°", 
        flex: 0.5,
        minWidth: 200,
        maxWidth: 300,
        headerAlign: 'left'
    },
    {
      field: "date_total_vente",
      headerName: "DATE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nom_client",
      headerName: "CLIENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "piece_ventes",
      headerName: "NOMBRE DES PIECES",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "valeur_ventes",
      headerName: "PRIX",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "anciene_solde_ventes",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "nouveau_solde_ventes",
      headerName: "NOUVEAU SOLDE",
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
          background: `${!params.data.delete_total_vente ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_total_vente ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.delete_total_vente ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.delete_total_vente && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()


  const [data, setData] = useState([])

  useEffect(() => {
    const fetchAllData = () => {
      let inter = []
      Object.keys(view_vente_articles_client).map((e, i) => {
        inter.push({
          delete_total_vente: view_vente_articles_client[e].delete_total_vente,
          id_total_vente: view_vente_articles_client[e].id_total_vente,
          'vente total n=°': view_vente_articles_client[e]['vente total n=°'],
          date_total_vente: view_vente_articles_client[e].date_total_vente,
          nom_client: view_vente_articles_client[e].nom_client,
          piece_ventes: view_vente_articles_client[e].piece_ventes,
          valeur_ventes: view_vente_articles_client[e].nouveau_solde_ventes - view_vente_articles_client[e].anciene_solde_ventes,
          anciene_solde_ventes: view_vente_articles_client[e].anciene_solde_ventes,
          nouveau_solde_ventes: view_vente_articles_client[e].nouveau_solde_ventes,
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
      setData(uniqueArray)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const cellClickListner = (params) => {
    navigate(`/ventes/${params.data.id_total_vente}`)
  }

  const getRowStyle = (params) => {
    if (params.data.delete_total_vente) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  

  return (
    <>
      <NavigationBar name="les ventes" />
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
              onClick={() => { navigate('/ventes/add-vente') }}
              >ajouter vente</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_ventes}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Ventes;


