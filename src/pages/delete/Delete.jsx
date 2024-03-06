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
  view_versement_fournisseur,
  client, 
  view_produits,
  view_retour_fournisseur,
  view_retour_client,
  magasin,
  view_reparation,
  titres,
  view_charge} from "../../backend";
import NavigationBar from "../home/NavigationBar";
import ModalDelete from "./ModalDelete";
import ModalRestore from "./ModalRestore";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  root: {
      "& label.Mui-focused": {
        color: "white"
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#12f7d6",
        }
      }
    }
})

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
        onClick={() => {
          setR_data(params.data)
          setRestore(true)
        }}
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
        onClick={() => {
          setSupprimer(true)
          setS_data(params.data)
        }}
        >
          <i className="fa-solid fa-trash fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>
        </Button>
    },
  ]
  
  const gridRef = useRef();
  const [data, setData] = useState([])
  const [gridApi, setGridApi] = useState(null);
  const [restore, setRestore] = useState(false)
  const [supprimer, setSupprimer] = useState(false)
  const [r_data, setR_data] = useState([])
  const [s_data, setS_data] = useState([])

  useEffect(() => {
    const inter = []
    const fetchAllData = async () => {

      Object.keys(client).map((e, i) => {
        if (client[e].is_deleted) {
          inter.push({
            element: 'client',
            data: client[e].nom_client,
            id: client[e].id_client,
            date: ''
          })
        }
      })


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

      Object.keys(view_produits).map((e, i) => {
        if (view_produits[e].deleted_famille) {
          inter.push({
            element: 'famille',
            data: view_produits[e].nom_famille,
            id: view_produits[e].id_famille,
            date: '',
          })
        }
        if (view_produits[e].deleted_article) {
          inter.push({
            element: "article",
            data: view_produits[e].nom_article,
            id: view_produits[e].id_article,
            date: '',
          })
        }
      })

      Object.keys(view_retour_fournisseur).map((e, i) => {
        if (view_retour_fournisseur[e].delete_retour_fournisseur) {
          inter.push({
            element: 'retour fournisseur',
            data: view_retour_fournisseur[e]['retour fournisseur n=°'],
            id: view_retour_fournisseur[e].id_retour_fournisseur,
            date: view_retour_fournisseur[e].date,
          })
        }
      })

      Object.keys(view_retour_client).map((e, i) => {
        if (view_retour_client[e].delete_retour_client) {
          inter.push({
            element: 'retour client',
            data: view_retour_client[e]['retour client n=°'],
            id: view_retour_client[e].id_retour_client,
            date: view_retour_client[e].date,
          })
        }
      })

      Object.keys(magasin).map((e, i) => {
        if (magasin[e].is_deleted) {
          inter.push({
            element: 'magasin',
            data: magasin[e].nom_magasin,
            id: magasin[e].id_magasin,
            date: '',
          })
        }
      })

      Object.keys(view_reparation).map((e, i) => {
        if (view_reparation[e].deleted_reparation) {
          inter.push({
            element: 'reparation',
            data: view_reparation[e]['reparation n=°'],
            id: view_reparation[e].id_reparation,
            date: view_reparation[e].date,
          })
        }
      })

      Object.keys(view_charge).map((e, i) => {
        if (view_charge[e].deleted_charge) {
          inter.push({
            element: 'charge',
            data: view_charge[e]['charge n=°'],
            id: view_charge[e].id_charge,
            date: view_charge[e].date,
          })
        }
        if (view_charge[e].deleted_type) {
          inter.push({
            element: 'type',
            data: view_charge[e].nom_type,
            id: view_charge[e].id_type,
            date: '',
          })
        }
        if (view_charge[e].deleted_sous_type) {
          inter.push({
            element: 'sous type',
            data: view_charge[e].nom_sous_type,
            id: view_charge[e].id_sous_type,
            date: '',
          })
        }
      })

      Object.keys(titres).map((e, i) => {
        if (titres[e].is_deleted) {
          inter.push({
            element: 'titre',
            data: titres[e].titre,
            id: titres[e].id_titre,
            date: '',
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

  const colors = useStyle()


  

 

  return (
    <>
      <NavigationBar name="trash" />
      {supprimer && <ModalDelete
              delete_={supprimer}
              setDelete_={setSupprimer}
              detail={s_data}
              all_data={data}
              setAllData={setData}
              colors={colors.root}
            />}
      {restore && <ModalRestore
              restore={restore}
              setRestore={setRestore}
              detail={r_data}
              all_data={data}
              setAllData={setData}
              colors={colors.root}
            />}
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