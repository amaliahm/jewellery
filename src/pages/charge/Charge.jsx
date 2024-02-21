import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import { view_charge } from "../../backend";
import NavigationBar from "../home/NavigationBar";


const Charge = () => {

const columns_charge = [
  {
    field: "charge n=°",
    headerName: "CHARGE N°",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "date",
    headerName: "DATE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "designation",
    headerName: "DESIGNATION",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "nom_type",
    headerName: "TYPE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "nom_sous_type",
    headerName: "SOUS TYPE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "montant",
    headerName: "MONTANT",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "utilisateur",
    headerName: "UTILISATEUR",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
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
  const [data, setData] = useState(view_charge)

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  })) 

  const cellClickListner = (params) => {
    // navigate(`/charges/${params.data.id}`, {state: params.data})
  }

  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api
  }


  
  return (
    <>
      <NavigationBar name="les charges" />
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
              // onClick={() => { navigate('/charges/add-charge') }}
              >ajouter charge</Button>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => navigate('/charges/types')}
              >les types</Button>
            <AgGridReact 
              ref={gridRef}
              rowData={data}
              columnDefs={columns_charge}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              onGridReady={onGridReady}
            />
            </div>
    </>
  );
};

export default Charge;