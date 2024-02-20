
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { makeStyles } from "@mui/styles";
import ModalDelete from './ModalDelete';
import { view_achat_articles_fournisseur } from '../../backend';
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { exportBonToPdf } from "../home/telechargerBon";

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

const UpdateAchat = () => {

  const columns_achats = [
    { 
        field: "achat n=°", 
        headerName: "ACHAT N=°", 
        flex: 0.5,
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
          background: `${!params.data.delete_achat ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.delete_achat ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.delete_achat ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.delete_achat && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];



  const getRowStyle = (params) => {
    if (params.data.delete_achat) {
      return { background: '#db4f4a' };
    }
    return null;
  };


    const colors = useStyle()
    const location = useLocation()
    const [m_delete, setM_Delete] = useState(false)
    const [data_delete, setDataDelete] = useState()  
    const gridRef = useRef();
    const navigate =useNavigate()
    const id = parseInt(location.pathname.split('/')[2])
    useEffect(() => {
      const fetchAllData = () => {
        let inter = []
        Object.keys(view_achat_articles_fournisseur).map((e, i) => {
          if (view_achat_articles_fournisseur[e].id_total_achat === id) {
            inter.push({
              delete_total_achat: view_achat_articles_fournisseur[e].delete_total_achat,
              delete_achat: view_achat_articles_fournisseur[e].delete_achat,
              id_total_achat: view_achat_articles_fournisseur[e].id_total_achat,
              id_achat: view_achat_articles_fournisseur[e].id_achat,
              id_article: view_achat_articles_fournisseur[e].id_article,
              'achat n=°': view_achat_articles_fournisseur[e]['achat n=°'],
              prix_unitaire: view_achat_articles_fournisseur[e].prix_unitaire_achat,
              quantite: view_achat_articles_fournisseur[e].quantite_achat,
              total: view_achat_articles_fournisseur[e].total_achat,
              nom_article: view_achat_articles_fournisseur[e].nom_article,
              id_fournisseur: view_achat_articles_fournisseur[e].id_fournisseur,
              nom: view_achat_articles_fournisseur[e].nom_fournisseur,
              wilaya: view_achat_articles_fournisseur[e].wilaya,
              ville: view_achat_articles_fournisseur[e].ville,
              telephone: view_achat_articles_fournisseur[e].telephone,
              adresse: view_achat_articles_fournisseur[e].adresse,
              date: view_achat_articles_fournisseur[e].date_total_achat,
              achat_numero: view_achat_articles_fournisseur[e]['achat total n=°'],
            })
          }
        })
        setData(inter)
      }
      fetchAllData()
    }, [2000])


  const [data, setData] = useState([])
  const [type, setType] = useState('')

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }))

  const cellClickListner = (params) => {
    navigate(`/achats/${params.data.id_total_achat}/${params.data.id_achat}`, {state: params.data})
  }

  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(data);
  }

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
           {true && <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { 
                setM_Delete(true)
                setType('total_achats')
              }}
              >supprimer l'achat</Button>}
               <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { exportBonToPdf(data, "d'achat") }}
              >bon d'achat</Button>

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

export default UpdateAchat