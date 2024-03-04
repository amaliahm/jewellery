import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fournisseur } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { exportDataToPdf } from "../home/telecharger_table";

const Fournisseurs = () => {
  const columns_fournisseurs = [
    {
      field: "nom_fournisseur",
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
    navigate(`/fournisseurs/${params.data.id_fournisseur}`, {state: params.data.id_fournisseur})
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
  const [filtered, setFiltered] = useState(false)

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

  

  const onFilterChanged = () => {
    const filteredRows = gridApi.getModel().rowsToDisplay;
    setFiltered(true)
    let inter = []
    Object.keys(filteredRows).map((e, i) => {
      inter.push(filteredRows[e].data)
    })
    return inter
  };



  

 

  return (
    <>
      <NavigationBar name="les fournisseurs" />
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
                navigate('/fournisseurs/add-fournisseur') 
              }}
              >ajouter fournisseur</Button>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => {
                const inter = filtered ? onFilterChanged() : data
                let download_data = []
                Object.keys(inter).map((e, i) => {
                  download_data.push({
                    nom: inter[e].nom_fournisseur,
                    ville: inter[e].ville,
                    wilaya: inter[e].wilaya,
                    solde: inter[e].solde,
                    or: inter[e].total_or,
                  })
                })
                console.log(data)
                console.log(download_data)
                exportDataToPdf(download_data, gridApi, 'les fournisseurs')
              }}
              >telecharger pdf</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_fournisseurs}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
              onGridReady={onGridReady}
              onFilterChanged={onFilterChanged}
            />
            </div>
    </>
  );
};

export default Fournisseurs;