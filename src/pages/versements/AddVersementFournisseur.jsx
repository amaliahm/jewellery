import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { view_achat_articles_fournisseur } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { columns_ajouter_versement_fournisseur } from "./data";
import { api_add_versement_fournisseur } from "../../backend";
import Notification from "../home/notification";
import axios from "axios";


const AddVersementFournisseur = () => { 


  const gridRef = useRef();
  const navigate = useNavigate()


  const [data, setData] = useState([])
  const [add, setAdd] = useState()
  const [done, setDone] = useState(false)
  console.log(view_achat_articles_fournisseur)

  useEffect(() => {
    const fetchAllData = () => {
      let inter = []
      Object.keys(view_achat_articles_fournisseur).map((e, i) => {
        if (inter.length === 0
           && !view_achat_articles_fournisseur[e].delete_total_achat
           && !view_achat_articles_fournisseur[e].achat_versed
           ) {
          inter.push({
            id_total_achat: view_achat_articles_fournisseur[e].id_total_achat,
            delete_total_achat: view_achat_articles_fournisseur[e].delete_total_achat,
            'achat total n=°': view_achat_articles_fournisseur[e]['achat total n=°'],
            date: view_achat_articles_fournisseur[e].date_total_achat,

            id_fournisseur: view_achat_articles_fournisseur[e].id_fournisseur,
            id_titre: view_achat_articles_fournisseur[e].id_titre,
            titre: view_achat_articles_fournisseur[e].titre,
            
            total_quantite_achats: view_achat_articles_fournisseur[e].total_quantite_achats,
            solde: view_achat_articles_fournisseur[e].solde,
            nom_fournisseur: view_achat_articles_fournisseur[e].nom_fournisseur,
            valeur_achats: view_achat_articles_fournisseur[e].nouveau_solde_achats - view_achat_articles_fournisseur[e].anciene_solde_achats,
          })
        } else {
          inter.map((element, index) => {
            if (element.id_total_achat !== view_achat_articles_fournisseur[e].id_total_achat 
              && !view_achat_articles_fournisseur[e].delete_total_achat
              && !view_achat_articles_fournisseur[e].achat_versed
              ) {
              inter.push({
                delete_total_achat: view_achat_articles_fournisseur[e].delete_total_achat,
                'achat total n=°': view_achat_articles_fournisseur[e]['achat total n=°'],
                date: view_achat_articles_fournisseur[e].date_total_achat,
                id_total_achat: view_achat_articles_fournisseur[e].id_total_achat,
                id_fournisseur: view_achat_articles_fournisseur[e].id_fournisseur,
                id_titre: view_achat_articles_fournisseur[e].id_titre,
                titre: view_achat_articles_fournisseur[e].titre,
                solde: view_achat_articles_fournisseur[e].solde,
                total_quantite_achats: view_achat_articles_fournisseur[e].total_quantite_achats,
                nom_fournisseur: view_achat_articles_fournisseur[e].nom_fournisseur,
                valeur_achats: view_achat_articles_fournisseur[e].nouveau_solde_achats - view_achat_articles_fournisseur[e].anciene_solde_achats,
              })
            }
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
  console.log(add)

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const cellClickListner = (params) => {
    console.log(params.data.id_total_achat)
    setAdd(params.data)
  }


  const handleClick = async e => {
    e.preventDefault();
    console.log(add)
    try {
        setDone(true)
        setTimeout(() => {
            setDone(false)
            navigate('/versements')
        }, 2000)
        const result = await axios.post(api_add_versement_fournisseur, add)
        if(result.status === 200) {
        }
    } catch (e) {
        console.log(e)
        return
    }
}

  const getRowStyle = (params) => {
    if (params.data === add) {
      return { background: 'gray' };
    }
    return null;
  };

  return (
    <>
      <NavigationBar name="ajouter versement" />
      {done && <Notification name={'le versement a été ajoutée'} />}
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
              onClick={handleClick}
              disabled={add === undefined}
              >ajouter versement</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_ajouter_versement_fournisseur}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
              onRowClicked={cellClickListner}
            />
        </div>
    </>
  );
};

export default AddVersementFournisseur;


