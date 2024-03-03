import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { view_vente_articles_client, view_versement_client, view_retour_client } from "../../backend";
import { columns_ventes } from "../ventes/data";
import { columns_versement_c } from "../versements/data";
import { columns_retours_client } from "../retours/data";
import { useLocation } from "react-router-dom";

const style = {
    color: 'var(--brand-1)',
    border: '1px solid var(--brand-1)',
    marginBottom: '10px',
    marginRight: '10px',
}

const style_clicked = {
    color: 'var(--bg-color-1)',
    background: 'var(--brand-1)',
    border: '1px solid var(--brand-1)',
    marginBottom: '10px',
    marginRight: '10px',
    '&:hover': {
        background: 'var(--brand-1)',
    }
}

const TableData = () => {
  const location = useLocation()
  const gridRef = useRef();
  const [vente, setVente] = useState([])
  const [versement, setVersement] = useState([])
  const [retour, setRetour] = useState([])
  const [click, setClick] = useState(0)  
  const id = parseInt(location.pathname.split('/')[2])

  const getVente = () => {

    console.log(view_vente_articles_client)
    const inter = []
    Object.keys(view_vente_articles_client).map(e => {
        if (view_vente_articles_client[e].id_client === id) {
          inter.push({
            'vente total n=°': view_vente_articles_client[e]['vente total n=°'],
            'date total vente': view_vente_articles_client[e].date_total_vente,
            id_total_vente: view_vente_articles_client[e].id_total_vente,
            piece_vente: view_vente_articles_client[e].piece_ventes,
            total_vente: view_vente_articles_client[e].nouveau_solde_ventes - view_vente_articles_client[e].anciene_solde_ventes,
            ancien_solde_vente: view_vente_articles_client[e].anciene_solde_ventes,
            nouveau_solde_vente: view_vente_articles_client[e].nouveau_solde_ventes,
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
    setVente(uniqueArray)
  }

  const getVersement = () => {
    const inter = []
    console.log(view_versement_client)
    Object.keys(view_versement_client).map(e => {
        if (view_versement_client[e].id_client === id) {
            inter.push({
              'versement client n=°': view_versement_client[e]['versement client n=°'],
              date: view_versement_client[e].date,
              versement_or: view_versement_client[e].versement_or,
              versement_argent: view_versement_client[e].versement_argent,
              ancien_solde: view_versement_client[e].ancien_solde,
              nouveau_solde: view_versement_client[e].nouveau_solde,
            })
        }
    })
    setVersement(inter)
  }


  const getRetour = () => {
    const inter = []
    Object.keys(view_retour_client).map(e => {
        if (view_retour_client[e].id_client === id) {
            inter.push({
              'retour client n=°': view_retour_client[e]['retour client n=°'],
              date: view_retour_client[e].date,
              retour_or: view_retour_client[e].retour_or,
              retour_argent: view_retour_client[e].retour_argent,
              ancien_solde: view_retour_client[e].ancien_solde,
              nouveau_solde: view_retour_client[e].nouveau_solde,
            })
        }
    })
    setRetour(inter)
  }

  useEffect(() => {
    getVente()
    getVersement()
    getRetour()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  })) 



  return (
    <>
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "30px",
            height: '40vh',
            width: '95vw',
            marginBottom: '60px',
        }}>
              <Button sx={click == 0 ? style_clicked : style} onClick={() => {setClick(0)}}>les ventes</Button>
              <Button sx={click == 1 ? style_clicked : style} onClick={() => {setClick(1)}}>les versements</Button>
              <Button sx={click == 2 ? style_clicked : style} onClick={() => {setClick(2)}}>les retours</Button>

            <AgGridReact className="clear"
              ref={gridRef}
              rowData={click == 0 ? vente : click == 1 ? versement : retour}
              columnDefs={click == 0 ? columns_ventes : click == 1 ? columns_versement_c : columns_retours_client}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default TableData;