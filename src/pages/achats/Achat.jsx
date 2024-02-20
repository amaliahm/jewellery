import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { view_achat_articles_fournisseur } from "../../backend";
import NavigationBar from "../home/NavigationBar";



const Achat = () => {

  const columns_achats = [
    { 
        field: "achat total n=°", 
        headerName: "ACHAT total N=°", 
        flex: 0.5,
        minWidth: 200,
        maxWidth: 300,
        headerAlign: 'left'
    },
    {
      field: "date_total_achat",
      headerName: "DATE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nom_fournisseur",
      headerName: "FOURNISSEUR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "piece_achats",
      headerName: "NOMBRE DES PIECES",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "valeur_achats",
      headerName: "PRIX",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "anciene_solde_achats",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "nouveau_solde_achats",
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
          background: `${!params.data.delete_total_achat ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_total_achat ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.delete_total_achat ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.delete_total_achat && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()


  const [data, setData] = useState([])

  useEffect(() => {
    const fetchAllData = () => {
      let inter = []
      Object.keys(view_achat_articles_fournisseur).map((e, i) => {
        inter.push({
          id_total_achat: view_achat_articles_fournisseur[e].id_total_achat,
          delete_total_achat: view_achat_articles_fournisseur[e].delete_total_achat,
          'achat total n=°': view_achat_articles_fournisseur[e]['achat total n=°'],
          date_total_achat: view_achat_articles_fournisseur[e].date_total_achat,
          nom_fournisseur: view_achat_articles_fournisseur[e].nom_fournisseur,
          piece_achats: view_achat_articles_fournisseur[e].piece_achats,
          valeur_achats: view_achat_articles_fournisseur[e].nouveau_solde_achats - view_achat_articles_fournisseur[e].anciene_solde_achats,
          anciene_solde_achats: view_achat_articles_fournisseur[e].anciene_solde_achats,
          nouveau_solde_achats: view_achat_articles_fournisseur[e].nouveau_solde_achats,
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
    navigate(`/achats/${params.data.id_total_achat}`)
  }

  const getRowStyle = (params) => {
    if (params.data.delete_total_achat) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  return (
    <>
      <NavigationBar name="les achats" />
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
              onClick={() => { navigate('/achats/add-achat') }}
              >ajouter achat</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_achats}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Achat;


