import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { view_retour_client, view_retour_fournisseur } from "../../backend";
import NavigationBar from "../home/NavigationBar";

const style = {
  color: 'var(--brand-1)',
  border: '1px solid var(--brand-1)',
  marginBottom: '10px',
  marginRight: '10px'
}

const style_clicked = {
  color: 'var(--bg-color-1)',
  background: 'var(--brand-1)',
  border: '1px solid var(--brand-1)',
  marginBottom: '10px',
  marginRight: '10px',
  '&:hover': {
      background: 'var(--brand-1)',
  }
}

const Retour = () => {

  const columns_retour_f = [
    {
      field: "retour fournisseur n=°",
      headerName: "RETOUR FOURNISSEUR N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nom",
      headerName: "FOURNISSEUR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "ancien_solde",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour_argent",
      headerName: "RETOUR ARGENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour_or",
      headerName: "RETOUR OR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nouveau_solde",
      headerName: "NOUVEAU SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
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
          background: `${!params.data.delete_retour ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_retour ? '1px solid var(--brand-1)' : 'transparent'}`
          }
        }} 
        onClick={() => {
          !params.data.delete_retour ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.delete_retour && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];

  const columns_retour_c = [
    {
      field: "retour client n=°",
      headerName: "RETOUR CLIENT N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nom",
      headerName: "CLIENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "ancien_solde",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour_argent",
      headerName: "RETOUR ARGENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour_or",
      headerName: "RETOUR OR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nouveau_solde",
      headerName: "NOUVEAU SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
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
          background: `${!params.data.delete_retour ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_retour ? '1px solid var(--brand-1)' : 'transparent'}`
          }
        }} 
        onClick={() => {
          !params.data.delete_retour ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.delete_retour && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [fournisseurs, setFournisseurs] = useState([])
  const [data, setData] = useState(0)

  useEffect(() => {
    const fetchAllData = async () => {
      let inter = []
      Object.keys(view_retour_fournisseur).map((e, i) => {
        inter.push({
          type: 'fournisseur',
          delete_retour: view_retour_fournisseur[e].delete_retour_fournisseur,
          id_person: view_retour_fournisseur[e].id_fournisseur,
          'retour fournisseur n=°': view_retour_fournisseur[e]['retour fournisseur n=°'],
          id: view_retour_fournisseur[e].id_retour_fournisseur,
          date: view_retour_fournisseur[e].date,
          nom: view_retour_fournisseur[e].nom_fournisseur,
          ancien_solde: view_retour_fournisseur[e].ancien_solde,
          retour_argent: view_retour_fournisseur[e].retour_argent,
          retour_or: view_retour_fournisseur[e].retour_or,
          nouveau_solde: view_retour_fournisseur[e].nouveau_solde,
        })
      })
      setFournisseurs(inter)
      inter = []
      Object.keys(view_retour_client).map((e, i) => {
        inter.push({
          type: 'client',
          delete_retour: view_retour_client[e].delete_retour_client,
          id_person: view_retour_client[e].id_client,
          'retour client n=°': view_retour_client[e]['retour client n=°'],
          id: view_retour_client[e].id_retour_client,
          date: view_retour_client[e].date,
          nom: view_retour_client[e].nom_client,
          ancien_solde: view_retour_client[e].ancien_solde,
          retour_argent: view_retour_client[e].retour_argent,
          retour_or: view_retour_client[e].retour_or,
          nouveau_solde: view_retour_client[e].nouveau_solde,
        })
      })
      setClients(inter)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const cellClickListner = (params) => {
    navigate(`/retours/${params.data.id}`, {state: params.data})
  }

  const getRowStyle = (params) => {
    if (params.data.delete_retour) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  return (
    <>
      <NavigationBar name="les retours" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "90px",
            height: '75vh',
            width: '95vw',
            marginBottom: '100px'
        }}>
              <Button sx={data == 0 ? style_clicked : style} onClick={() => {setData(0)}}>clients</Button>
              <Button sx={data == 1 ? style_clicked : style} onClick={() => {setData(1)}}>fournisseurs</Button>
              <Button sx={style} 
              onClick={() => { navigate('/retours/add-retour') }}
              >ajouter retour</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data == 0 ? clients : fournisseurs}
              columnDefs={data == 0 ? columns_retour_c : columns_retour_f}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Retour;


