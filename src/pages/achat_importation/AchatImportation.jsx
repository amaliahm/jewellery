import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result, view_importation } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { useLocation } from "react-router-dom";



const AchatImportation = () => {

  const columns_achat_importation = [
    { 
        field: "achat importation n=°", 
        headerName: "ACHAT IMPORTATION N=°", 
        flex: 0.5,
        minWidth: 280,
        maxWidth: 350,
        headerAlign: 'left'
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
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
          background: `${!params.data.deleted_achat ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_achat ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.deleted_achat ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.deleted_achat && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()
  const location = useLocation()
  const [data, setData] = useState([])
  const [importation, setImportation] = useState(location.state)
  console.log(view_importation)

  useEffect(() => {
    const fetchAllData = () => {
       let inter = []
       Object.keys(view_importation).map((e, i) => {
         if (importation.id_importation === view_importation[e].id_importation && view_importation[e].id_achat_importation !== null) {
           inter.push({
             id_achat_importation: view_importation[e].id_achat_importation,
             nom_importateur: importation.nom_importateur,
             id_importation: importation.id_importation,
             deleted_achat: view_importation[e].deleted_achat,
             'achat importation n=°': view_importation[e]['achat importation n=°'],
             date: view_importation[e].achat_date,
             'poid 18k': view_importation[e].achat_poid_18,
             'poid 24k': view_importation[e].achat_poid_24,
             'prix unitaire': view_importation[e].achat_prix,
             total: view_importation[e].total_achat,
           })
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
    enableRowGroup: true,
  }))
  console.log(data)

  const cellClickListner = (params) => {
    navigate(`/importations/achat_importation/${params.data.id_achat_importation}`, {state: params.data})
  }

  const getRowStyle = (params) => {
    if (params.data.deleted_achat) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  return (
    <>
      <NavigationBar name={`les achats de ${importation.nom_importateur}`} />
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
              onClick={() => { navigate('/importations/achat_importation/add', {state: importation}) }}
              >ajouter</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_achat_importation}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default AchatImportation;


