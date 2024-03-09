
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { TextField } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { view_reparation } from "../../backend";
import { useNavigate } from "react-router-dom";

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

const Reparation = () => {

  const columns_reparations = [
    { 
        field: "reparation n=°", 
        headerName: "REPARATION N=°", 
        flex: 0.5,
        minWidth: 200,
        maxWidth: 300,
        headerAlign: 'left'
    },
    {
      field: "client",
      headerName: "CLIENT",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "poids",
      headerName: "POIDS",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "fournisseur",
      headerName: "FOURNISEEUR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
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
          background: `${!params.data.deleted_reparation ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_reparation ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.deleted_reparation ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.deleted_reparation && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];




  const getRowStyle = (params) => {
    if (params.data.deleted_reparation) {
      return { background: '#db4f4a' };
    }
    return null;
  };


    const colors = useStyle()
    const location = useLocation()
    const [m_delete, setM_Delete] = useState(false)
    const [gridApi, setGridApi] = useState(null);
    const [state, setState] = useState(location.state)
    const navigate = useNavigate()

    console.log(view_reparation)
    console.log(state)
    useEffect(() => {
      const fetchAllData = () => {
        let inter = []
        Object.keys(view_reparation).map((e, i) => {
          if (view_reparation[e].id_magasin === state.id) {
            inter.push({
              id_magasin: state.id,
              id_client: view_reparation[e].id_client,
              id_fournisseur: view_reparation[e].id_fournisseur,
              nom_magasin: state.magasin,
              deleted_reparation: view_reparation[e].deleted_reparation,
              deleted_magasin: view_reparation[e].deleted_magasin,
              id_reparation: view_reparation[e].id_reparation,
              'reparation n=°': view_reparation[e]['reparation n=°'],
              date: view_reparation[e].date,
              client: view_reparation[e].nom_client,
              client_titre: view_reparation[e].client_titre,
              prix_client: view_reparation[e].prix_client,
              poids: view_reparation[e].poid_reparation,
              fournisseur: view_reparation[e].nom_fournisseur,
              prix_fournisseur: view_reparation[e].prix_fournisseur,
              fournisseur_titre: view_reparation[e].fournisseur_titre,
              observation: view_reparation[e].observation,
            })
          }
        })
        setData(inter)
      }
      fetchAllData()
    }, [2000])
    const gridRef = useRef();


  const [data, setData] = useState([])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }))

  const onGridReady = (params) => {
    setGridApi(params.api);
  }

  const cellClickListner = (params) => {
    console.log(params)
    navigate(`/magasins/${params.data.id_magasin}/${params.data.id_reparation}`, {state: params.data})
  }

  return (
    <>
      <NavigationBar name={`les reparations de ${state.magasin}`} />
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
              onClick={() => { 
                setM_Delete(true)
                navigate(`/magasins/${state.id}/add-reparation`, {state: state})
              }}
              >ajouter reparation</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_reparations}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              onGridReady={onGridReady}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
}

export default Reparation