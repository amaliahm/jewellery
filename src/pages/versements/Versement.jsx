import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result, view_versement_client, view_versement_fournisseur } from "../../backend";
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

const Versement = () => {

  const columns_versement_f = [
    {
      field: "versement fournisseur n=°",
      headerName: "VERSEMENT FOURNISSEUR N=°",
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
      field: "ancien solde",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "versement argent",
      headerName: "VERSEMENT ARGENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "versement or",
      headerName: "VERSEMENT OR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nouveau solde",
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
          background: `${!params.data.delete_versement ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_versement ? '1px solid var(--brand-1)' : 'transparent'}`
          }
        }} 
        onClick={() => {
          !params.data.delete_versement ? cellClickListnerFournisseur(params) : console.log()
        }}
        >
          {!params.data.delete_versement && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];

  const columns_versement_c = [
    {
      field: "versement client n=°",
      headerName: "VERSEMENT CLIENT N=°",
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
      field: "ancien solde",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "versement argent",
      headerName: "VERSEMENT ARGENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "versement or",
      headerName: "VERSEMENT OR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nouveau solde",
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
          background: `${!params.data.delete_versement ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_versement ? '1px solid var(--brand-1)' : 'transparent'}`
          }
        }} 
        onClick={() => {
          !params.data.delete_versement ? cellClickListnerClient(params) : console.log()
        }}
        >
          {!params.data.delete_versement && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [fournisseurs, setFournisseurs] = useState(view_versement_fournisseur)
  const [data, setData] = useState(0)

  useEffect(() => {
    const fetchAllData = async () => {
      let inter = []
      Object.keys(view_versement_fournisseur).map((e, i) => {
        inter.push({
          type: 'fournisseur',
          delete_versement: view_versement_fournisseur[e].delete_versement_fournisseur,
          'versement fournisseur n=°': view_versement_fournisseur[e]['versement fournisseur n=°'],
          id: view_versement_fournisseur[e].id_versement_fournisseur,
          date: view_versement_fournisseur[e].date,
          nom: view_versement_fournisseur[e].nom_fournisseur,
          'ancien solde': view_versement_fournisseur[e].ancien_solde,
          'versement argent': view_versement_fournisseur[e].versement_argent,
           'versement or': view_versement_fournisseur[e].versement_or,
          'nouveau solde': view_versement_fournisseur[e].nouveau_solde,
          'ancien solde casse': view_versement_fournisseur[e].ancien_solde_casse,
          'versement casse': view_versement_fournisseur[e].versement_casse,
          'nouveau solde casse': view_versement_fournisseur[e].nouveau_solde_casse,
          ecart: view_versement_fournisseur[e].ecart,
          titre: view_versement_fournisseur[e].titre,
          fonte: view_versement_fournisseur[e].fonte,
          'net 750': view_versement_fournisseur[e].net_750,
          'or v': view_versement_fournisseur[e].or_v,
        })
      })
      setFournisseurs(inter)
      inter = []
      Object.keys(view_versement_client).map((e, i) => {
        inter.push({
          type: 'client',
          delete_versement: view_versement_client[e].delete_versement_client,
          'versement client n=°': view_versement_client[e]['versement client n=°'],
          id: view_versement_client[e].id_versement_client,
          date: view_versement_client[e].date,
          nom: view_versement_client[e].nom_client,
          'ancien solde': view_versement_client[e].ancien_solde,
          'versement argent': view_versement_client[e].versement_argent,
          'versement or': view_versement_client[e].versement_or,
          'nouveau solde': view_versement_client[e].nouveau_solde,
          'ancien solde casse': view_versement_client[e].ancien_solde_casse,
          'versement casse': view_versement_client[e].versement_casse,
          'nouveau solde casse': view_versement_client[e].nouveau_solde_casse,
          ecart: view_versement_client[e].ecart,
          titre: view_versement_client[e].titre,
          fonte: view_versement_client[e].fonte,
          'net 750': view_versement_client[e].net_750,
          'or v': view_versement_client[e].or_v,
          
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

  const cellClickListnerClient = (params) => {
    navigate(`/versements/${params.data.id}`, {state: params.data})
  }

  const cellClickListnerFournisseur = (params) => {
    navigate(`/versements/${params.data.id}`, {state: params.data})
  }
  console.log(clients)
  console.log(fournisseurs)



  const getRowStyle = (params) => {
    if (params.data.delete_versement) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  return (
    <>
      <NavigationBar name="les versements" />
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
              onClick={() => { navigate('/versements/add-versement-client') }}
              >ajouter versement client</Button>
              <Button sx={style} 
              onClick={() => { navigate('/versements/add-versement-fournisseur') }}
              >ajouter versement fournisseur</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data == 0 ? clients : fournisseurs}
              columnDefs={data == 0 ? columns_versement_c : columns_versement_f}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Versement;


