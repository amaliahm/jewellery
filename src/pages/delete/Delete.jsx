import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { view_importation, 
  view_achat_articles_fournisseur, 
  view_vente_articles_client,
  view_command ,
  view_versement_client,
  view_versement_fournisseur} from "../../backend";
import NavigationBar from "../home/NavigationBar";

const TrashPage = () => {
  const columns = [
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
      field: "element",
      headerName: "ELEMENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 300,
      maxWidth: 350,
      headerAlign: 'left',
    },
    {
      field: "data",
      headerName: "DATA",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 400,
      maxWidth: 450,
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
    
  }
  const gridRef = useRef();
  const [data, setData] = useState([])
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const inter = []
    const fetchAllData = async () => {
      Object.keys(view_importation).map((e, i) => {
        if (view_importation[e].deleted_importation) {
          inter.push({
            element: 'importation',
            data: view_importation[e].nom_importateur,
            id: view_importation[e].id_importation,
            date: '',
          })
        }
        if (view_importation[e].deleted_achat) {
          inter.push({
            element: "achat d'importation",
            data: view_importation[e]['achat importation n=°'],
            id: view_importation[e].id_achat_importation,
            date: view_importation[e].achat_date,
          })
        }
        if (view_importation[e].deleted_versement) {
          inter.push({
            element: "versement d'importation",
            data: view_importation[e]['versement importation n=°'],
            id: view_importation[e].id_versement_importation,
            date: view_importation[e].versement_date,
          })
        }
      })

      Object.keys(view_achat_articles_fournisseur).map((e, i) => {
        if (view_achat_articles_fournisseur[e].delete_total_achat) {
          inter.push({
            element: 'achat total',
            data: view_achat_articles_fournisseur[e]['achat total n=°'],
            id: view_achat_articles_fournisseur[e].id_total_achat,
            date: view_achat_articles_fournisseur[e].date_total_achat,
          })
        }
        if (view_achat_articles_fournisseur[e].delete_achat) {
          inter.push({
            element: "achat",
            data: view_achat_articles_fournisseur[e]['achat n=°'],
            id: view_achat_articles_fournisseur[e].id_achat,
            date: view_achat_articles_fournisseur[e].date_total_achat,
          })
        }
        if (view_achat_articles_fournisseur[e].delete_fournisseur) {
          inter.push({
            element: "fournisseur",
            data: view_achat_articles_fournisseur[e].nom_fournisseur,
            id: view_achat_articles_fournisseur[e].id_fournisseur,
            date: '',
          })
        }
      })
      
      Object.keys(view_vente_articles_client).map((e, i) => {
        if (view_vente_articles_client[e].delete_total_vente) {
          inter.push({
            element: 'vente total',
            data: view_vente_articles_client[e]['vente total n=°'],
            id: view_vente_articles_client[e].id_total_vente,
            date: view_vente_articles_client[e].date_total_vente,
          })
        }
        if (view_vente_articles_client[e].delete_vente) {
          inter.push({
            element: "vente",
            data: view_vente_articles_client[e]['vente n=°'],
            id: view_vente_articles_client[e].id_vente,
            date: view_vente_articles_client[e].date_total_vente,
          })
        }
      })

      Object.keys(view_command).map((e, i) => {
        if (view_command[e].deleted_command) {
          inter.push({
            element: 'commande',
            data: view_command[e]['command n=°'],
            id: view_command[e].id_command,
            date: view_command[e].date,
          })
        }
      })

      Object.keys(view_versement_client).map((e, i) => {
        if (view_versement_client[e].delete_versement_client) {
          inter.push({
            element: 'versement client',
            data: view_versement_client[e]['versement client n=°'],
            id: view_versement_client[e].id_versement_client,
            date: view_versement_client[e].date,
          })
        }
      })

      Object.keys(view_versement_fournisseur).map((e, i) => {
        if (view_versement_fournisseur[e].delete_versement_fournisseur) {
          inter.push({
            element: 'versement fournisseur',
            data: view_versement_fournisseur[e]['versement fournisseur n=°'],
            id: view_versement_fournisseur[e].id_versement_fournisseur,
            date: view_versement_fournisseur[e].date,
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
  }))


  const onGridReady = (params) => {
    setGridApi(params.api);
  }



  

 

  return (
    <>
      <NavigationBar name="trash" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "60px",
            height: '85vh',
            width: '90vw',
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



// DELIMITER //
// CREATE TRIGGER achat_importation_delete
// BEFORE DELETE ON achat_importation
// FOR EACH ROW
// BEGIN
//     UPDATE importation
//     SET poid_18 = poid_18 - OLD.poid_18, poid_24 = poid_24 - OLD.poid_24, total_facon = total_facon - OLD.total
//     WHERE id_importation = OLD.id_importation;
// END;