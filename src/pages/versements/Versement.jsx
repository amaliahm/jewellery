import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
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
      field: "versement n=°",
      headerName: "VERSEMENT N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 300,
      maxWidth: 350,
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
      field: "fournisseur",
      headerName: "FOURNISSEUR",
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

  const columns_versement_c = [
    {
      field: "versement n=°",
      headerName: "VERSEMENT N=°",
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
      field: "client",
      headerName: "CLIENT",
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
  


  const gridRef = useRef();
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [fournisseurs, setFournisseurs] = useState([])
  const [data, setData] = useState(0)

  useEffect(() => {
    const fetchAllData = async () => {
      let data = result.data.versement_c
      setClients(data)
      data = result.data.versement_f
      setFournisseurs(data)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const cellClickListner = (params) => {
    navigate(`/versements/${params.data.id}`, {state: params.data})
  }

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <>
      <NavigationBar name="les versements" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "50px",
            height: '75vh',
            width: '95vw',
            marginBottom: '100px'
        }}>
              <Button sx={data == 0 ? style_clicked : style} onClick={() => {setData(0)}}>clients</Button>
              <Button sx={data == 1 ? style_clicked : style} onClick={() => {setData(1)}}>fournisseurs</Button>
              <Button sx={style} 
              onClick={() => { navigate('/versements/add-versement') }}
              >ajouter versement</Button>
              <Button sx={style} 
              onClick={onBtExport}
              >telecharger excel</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data == 0 ? clients : fournisseurs}
              columnDefs={data == 0 ? columns_versement_c : columns_versement_f}
              defaultColDef={defaultColDef}
              onCellClicked={cellClickListner}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default Versement;


