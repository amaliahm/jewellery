import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { caisse } from "../../backend";
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

const Caisse = () => {

  const columns_caisse = [
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
      field: "mouvement",
      headerName: "MOUVMENT",
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
      field: "prix_unitaire",
      headerName: "PRIX UNITAIRE",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "total",
      headerName: "VALEUR",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "quantite_restant",
      headerName: "QUANTITE DE STOCK RESTANT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 300,
      maxWidth: 450,
      headerAlign: 'left',
    },
    {
      field: "CUMP",
      headerName: "CUMP",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "valeur_restant",
      headerName: "VALEUR DE STOCK RESTANT",
      flex: 1,
      minWidth: 300,
      maxWidth: 400,
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
          background: `${!params.data.deleted_caisse ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_caisse ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.deleted_caisse ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.deleted_caisse && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];



  const cellClickListner = (params) => {
    navigate(`/caisse/${params.data.id_caisse}`, {state: params.data})
  }

  const getRowStyle = (params) => {
    if (params.data.deleted_caisse) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  const gridRef = useRef();
  const navigate = useNavigate()
  const colors = useStyle()


  const [tous, setTous] = useState([])
  const [entrer, setEntrer] = useState([])
  const [sortie, setSortie] = useState([])
  const [data, setData] = useState(0)

  useEffect(() => {
    const fetchAllData = async () => {
      const inter = caisse
      setTous(inter)
      const interIn = []
      const interOut = []
      Object.keys(inter).map((e, i) => {
        if (inter[e].mouvement === 'ENTRER') {
          interIn.unshift(inter[e])
        }
        if (inter[e].mouvement === 'SORTIE') {
          interOut.unshift(inter[e])
        }
      })
      setSortie(interOut)
      setEntrer(interIn)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(tous);
  }

  return (
    <>
      <NavigationBar name="Caisse" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "50px",
            height: '75vh',
            width: '95vw',
            marginBottom: '20px'
        }}>
              <Button sx={data == 0 ? style_clicked : style} onClick={() => {setData(0)}}>tous</Button>
              <Button sx={data == 1 ? style_clicked : style} onClick={() => {setData(1)}}>entrer</Button>
              <Button sx={data == 2 ? style_clicked : style} onClick={() => {setData(2)}}>sortie</Button>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { navigate('/caisse/add')}}
              >ajouter mouvement</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data == 1 ? entrer : data == 2 ? sortie : tous}
              columnDefs={columns_caisse}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Caisse;


