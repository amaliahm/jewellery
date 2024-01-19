import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { useLocation } from "react-router-dom";



const AchatImportation = () => {

  const columns_achat_importation = [
    { 
        field: "date", 
        headerName: "DATE", 
        flex: 0.5,
        minWidth: 200,
        maxWidth: 300,
        headerAlign: 'left'
    },
    {
      field: "poid 18k",
      headerName: "POID 18K",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "poid 24k",
      headerName: "POID 24K",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "prix unitaire",
      headerName: "PRIX UNITAIRE",
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
  const location = useLocation()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
      const data = result.data.achat_importation
      let inter = []
      Object.keys(data).map((e, i) => {
        if (data[e].importateur == location.state) {
          inter.push(data[e])
        }
      })
      setData(inter)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const cellClickListner = (params) => {
    navigate(`/importations/achat_importation/${params.data.id}`, {state: params.data})
  }

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <>
      <NavigationBar name={`les achats de ${location.state}`} />
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
              onClick={() => { navigate('/importations/achat_importation/add', {state: location.state}) }}
              >ajouter</Button>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={onBtExport}
              >telecharger excel</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_achat_importation}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default AchatImportation;


