import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../backend";
import NavigationBar from "../home/NavigationBar";

const Clients = () => {
  const columns_clients = [
    {
      field: "nom_client",
      headerName: "NOM",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left',
    },
    {
      field: "wilaya",
      headerName: "WILAYA",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "ville",
      headerName: "VILLE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "telephone",
      headerName: "TELEPHONE",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "solde",
      headerName: "solde",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
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
  ]
  
  const cellClickListner = (params) => {
    navigate(`/clients/${params.data.id_client}`, {state: params.data.id_client})
  }

  const getRowStyle = (params) => {
    if (params.data.is_deleted) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  const gridRef = useRef();
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setData(client)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }))

  const onGridReady = (params) => {
    setGridApi(params.api);
  } 

  return (
    <>
      <NavigationBar name="les clients" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "30px",
            height: '75vh',
            width: '95vw',
        }}>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { 
                navigate('/clients/add-client') 
              }}
              >ajouter client</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_clients}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
              onGridReady={onGridReady}
            />
            </div>
    </>
  );
};

export default Clients;