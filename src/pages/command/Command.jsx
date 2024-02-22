import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { view_command } from "../../backend";
import NavigationBar from "../home/NavigationBar";


const Command = () => {

const columns_command = [
  {
    field: "command n=°",
    headerName: "COMMAND N°",
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
    field: "nom_fournisseur",
    headerName: "FOURNISSEUR",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "nom_article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "nom_client",
    headerName: "CLIENT",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "nom_magasin",
    headerName: "MAGASIN",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
  {
    field: "observation",
    headerName: "OBSERVATION",
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
        background: `${!params.data.deleted_command ? 'var(--brand-1)' : 'transparent'} `,
        marginBottom: '5px',
        padding: '15px',
        '&:hover' : {
          border: `${!params.data.deleted_command ? '1px solid var(--brand-1)' : 'transparent'}`,
        }
      }} 
      onClick={() => {
        !params.data.deleted_command ? cellClickListner(params) : console.log()
      }}
      >
        {!params.data.deleted_command && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
      </Button>
  },
];
  const gridRef = useRef();
  const navigate = useNavigate()
  const [data, setData] = useState([])
  console.log(view_command)

  useEffect(() => {
    const fetchAllData = () => {
      let inter = []
      Object.keys(view_command).map((e, i) => {
        console.log(view_command[e])
        if(view_command[e].id_command !== null && view_command[e].id_command !== undefined) {
          inter.push(view_command[e])
        }
      })
      const uniqueObjectsSet = new Set();

      const uniqueArray = inter.filter(obj => {
        const stringRepresentation = JSON.stringify(obj);
        if (!uniqueObjectsSet.has(stringRepresentation)) {
          uniqueObjectsSet.add(stringRepresentation);
          return true;
        }
        return false;
      });
      setData(uniqueArray)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  })) 

  const cellClickListner = (params) => {
    navigate(`/commands/${params.data.id_command}`, {state: params.data})
  }

  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api
  }

  const getRowStyle = (params) => {
    if (params.data.deleted_command) {
      return { background: '#db4f4a' };
    }
    return null;
  };


  
  return (
    <>
      <NavigationBar name="les commands" />
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
              onClick={() => { navigate('/commands/add-command') }}
              >ajouter command</Button>
            <AgGridReact 
              ref={gridRef}
              rowData={data}
              columnDefs={columns_command}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              onGridReady={onGridReady}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Command;