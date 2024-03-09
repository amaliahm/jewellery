
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { makeStyles } from "@mui/styles";
import ModalDelete from './ModalDelete';
import { view_vente_articles_client } from '../../backend';
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { exportBonToPdf } from "../home/telechargerBonVente";

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

const UpdateVente = () => {

  const columns_ventes = [
    { 
        field: "vente n=°", 
        headerName: "VENTE N=°", 
        flex: 0.5,
        minWidth: 200,
        maxWidth: 300,
        headerAlign: 'left'
    },
    {
      field: "nom_famille",
      headerName: "FAMILLE",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nom_article",
      headerName: "L'ARTICLE",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "prix_unitaire",
      headerName: "PRIX UNITAIRE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "quantite",
      headerName: "QUANTITE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "total",
      headerName: "TOTAL",
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
          background: `${!params.data.delete_vente ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_vente ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.delete_vente ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.delete_vente && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];

  const navigate = useNavigate()
  const getRowStyle = (params) => {
    if (params.data.delete_vente) {
      return { background: '#db4f4a' };
    }
    return null;
  };


    const colors = useStyle()
    const location = useLocation()
    const [m_delete, setM_Delete] = useState(false)
    const [data_delete, setDataDelete] = useState()
    const [gridApi, setGridApi] = useState(null);
    const id = parseInt(location.pathname.split('/')[2])
    useEffect(() => {
      const fetchAllData = () => {
        let inter = []
        Object.keys(view_vente_articles_client).map((e, i) => {
          if (view_vente_articles_client[e].id_total_vente === id) {
            inter.push({
              delete_total_vente: view_vente_articles_client[e].delete_total_vente,
              delete_vente: view_vente_articles_client[e].delete_vente,
              id_total_vente: view_vente_articles_client[e].id_total_vente,
              id_vente: view_vente_articles_client[e].id_vente,
              id_article: view_vente_articles_client[e].id_article,
              'vente n=°': view_vente_articles_client[e]['vente n=°'],
              prix_unitaire: view_vente_articles_client[e].prix_unitaire_vente,
              quantite: view_vente_articles_client[e].quantite_vente,
              total: view_vente_articles_client[e].total_vente,
              nom_famille: view_vente_articles_client[e].nom_famille,
              nom_article: view_vente_articles_client[e].nom_article,
              id_fournisseur: view_vente_articles_client[e].id_fournisseur,
              nom: view_vente_articles_client[e].nom_client,
              wilaya: view_vente_articles_client[e].wilaya,
              ville: view_vente_articles_client[e].ville,
              telephone: view_vente_articles_client[e].telephone,
              adresse: view_vente_articles_client[e].adresse,
              date: view_vente_articles_client[e].date_total_vente,
              vente_numero: view_vente_articles_client[e]['vente total n=°'],
            })
          }
        })
        setData(inter)
      }
      fetchAllData()
    }, [2000])
    const gridRef = useRef();


  const [data, setData] = useState([])
  const [type, setType] = useState('')

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }))

  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(data);
  }
  const cellClickListner = (params) => {
    navigate(`/ventes/${params.data.id_total_vente}/${params.data.id_vente}`, {state: params.data})
  }


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
           {true && <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { 
                setM_Delete(true)
                setType('total_ventes')
              }}
              >supprimer le vente</Button>}
               <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { exportBonToPdf(data, "de vente") }}
              >bon de vente</Button>

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
            {m_delete && <ModalDelete
              setDelete={setM_Delete}
              _delete={m_delete}
              detail={data}
              colors={colors.root}
              setDetail={setData}
              type={type}
            />}
    </>
  );
}

export default UpdateVente