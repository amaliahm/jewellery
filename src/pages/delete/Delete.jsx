import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fournisseur } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { RowNode } from "ag-grid-community";

const TrashPage = () => {
  const columns = [
    {
      field: "element",
      headerName: "",
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
          <i className="fa-solid fa-trash-arrow-up fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>
        </Button>
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
          background: 'red',
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: '1px solid red',
          }
        }} 
        onClick={() => {cellClickListner(params)}}
        >
          <i className="fa-solid fa-trash fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>
        </Button>
    },
  ]
  

  const cellClickListner = (params) => {
    // navigate(`/fournisseurs/${params.data.id_fournisseur}`, {state: params.data.id_fournisseur})
  }
  const gridRef = useRef();
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setData(fournisseur)
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
      <NavigationBar name="les fournisseurs" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "30px",
            height: '75vh',
            width: '80vw',
        }}>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              onGridReady={onGridReady}
            />
            </div>
    </>
  );
};

export default TrashPage;