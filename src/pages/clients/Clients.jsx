import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { exportDataToPdf } from "../home/telecharger";


const Clients = () => {

const columns_clients = [
  {
    field: "nom",
    headerName: "NOM",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
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
    field: "wilaya",
    headerName: "WILAYA",
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
    field: "email",
    headerName: "EMAIL",
    flex: 1,
    minWidth: 300,
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
  const [data, setData] = useState([])

  const fetchAllData = async () => {
    const data = result.data.clients
    setData(data)
  }
  useEffect(() => {
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    // floatingFilter: true,
  })) 

  const cellClickListner = (params) => {
    navigate(`/clients/${params.data.id}`, {state: params.data})
  }

  const processRowGroup = (params) => {
    // You can customize the row data here
    // For example, you can format the date or manipulate the data before exporting
    return params.node.group ? params.node.key : params.data;
  };

  const processHeader = (params) => {
    // You can customize the header names here
    // For example, you can change the header names or add additional information
    return params.column.getColDef().headerName;
  };

  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api
  }



  const exportFilteredDataToHtml = () => {
    let filteredData = [];

    if (gridApi && gridApi.isAnyFilterPresent()) {
      gridApi.forEachNodeAfterFilter((node) => {
        filteredData.push(node.data);
      });
    } else {
      filteredData = data
    }
    
    // Iterate over filtered rows

      const htmlContent = generateHtmlTable(filteredData);
      const blob = new Blob([htmlContent], { type: 'text/html' });

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);

      // Create a downloadable link
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'eurl bhn zahav.html';
      document.body.appendChild(a);

      // Trigger a click on the link to start the download
      a.click();

      // Remove the link from the DOM
      document.body.removeChild(a);
  };

  
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
              onClick={() => { navigate('/clients/add-client') }}
              >ajouter client</Button>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => {
                exportDataToPdf(data, gridApi, 'les client')
              }}
              >telecharger pdf</Button>
            <AgGridReact 
              ref={gridRef}
              rowData={data}
              columnDefs={columns_clients}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              onGridReady={onGridReady}
            />
            </div>
    </>
  );
};

export default Clients;