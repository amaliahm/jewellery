import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { view_achat_articles_fournisseur, view_versement_fournisseur, view_retour_fournisseur } from "../../backend";
import { columns_achats } from "../achats/data";
import { columns_versement_f } from "../versements/data";
import { columns_retours_fournisseur } from "../retours/data";
import { columns_article } from "../articles/data";
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
  const [achat, setAchat] = useState([])
  const [versement, setVersement] = useState([])
  const [retour, setRetour] = useState([])
  const [article, setArticle] = useState([])
  const [click, setClick] = useState(0)  
  const id = parseInt(location.pathname.split('/')[2])

  const getAchat = () => {

    console.log(view_achat_articles_fournisseur)
    const inter = []
    const __inter = []
    Object.keys(view_achat_articles_fournisseur).map(e => {
        if (view_achat_articles_fournisseur[e].id_fournisseur === id) {
            inter.push({
              'achat total n=°': view_achat_articles_fournisseur[e]['achat total n=°'],
              'date total achat': view_achat_articles_fournisseur[e].date_total_achat,
              id_total_achat: view_achat_articles_fournisseur[e].id_total_achat,
              piece_achat: view_achat_articles_fournisseur[e].piece_achats,
              valeur_achats: view_achat_articles_fournisseur[e].valeur_achats,
              ancien_solde_achat: view_achat_articles_fournisseur[e].anciene_solde_achats,
              nouveau_solde_achat: view_achat_articles_fournisseur[e].nouveau_solde_achats,
            })
            __inter.push({
              nom_famille: view_achat_articles_fournisseur[e].nom_famille,
              nom_article: view_achat_articles_fournisseur[e].nom_article,
              prix_achat: view_achat_articles_fournisseur[e].prix_achat,
              quantite_stock: view_achat_articles_fournisseur[e].quantite_stock,
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
    setAchat(uniqueArray)

    const uniqueObjectsSet__ = new Set();

    const uniqueArray__ = __inter.filter(obj => {
      const stringRepresentation = JSON.stringify(obj);
      if (!uniqueObjectsSet__.has(stringRepresentation)) {
        uniqueObjectsSet__.add(stringRepresentation);
        return true;
      }
      return false;
    });
    setArticle(uniqueArray__)
  }

  const getVersement = () => {
    const inter = []
    Object.keys(view_versement_fournisseur).map(e => {
        if (view_versement_fournisseur[e].id_fournisseur === id) {
            inter.push({
              'versement fournisseur n=°': view_versement_fournisseur[e]['versement fournisseur n=°'],
              date: view_versement_fournisseur[e].date,
              versement_or: view_versement_fournisseur[e].versement_or,
              versement_argent: view_versement_fournisseur[e].versement_argent,
              ancien_solde: view_versement_fournisseur[e].ancien_solde,
              nouveau_solde: view_versement_fournisseur[e].nouveau_solde,
            })
        }
    })
    setVersement(inter)
  }


  const getRetour = () => {
    const inter = []
    console.log(view_retour_fournisseur)
    Object.keys(view_retour_fournisseur).map(e => {
        if (view_retour_fournisseur[e].id_fournisseur === id) {
            inter.push({
              'retour fournisseur n=°': view_retour_fournisseur[e]['retour fournisseur n=°'],
              date: view_retour_fournisseur[e].date,
              retour_or: view_retour_fournisseur[e].retour_or,
              retour_argent: view_retour_fournisseur[e].retour_argent,
              ancien_solde: view_retour_fournisseur[e].ancien_solde,
              nouveau_solde: view_retour_fournisseur[e].nouveau_solde,
            })
        }
    })
    setRetour(inter)
  }

  useEffect(() => {
    getAchat()
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
              <Button sx={click == 0 ? style_clicked : style} onClick={() => {setClick(0)}}>les achats</Button>
              <Button sx={click == 1 ? style_clicked : style} onClick={() => {setClick(1)}}>les versements</Button>
              <Button sx={click == 2 ? style_clicked : style} onClick={() => {setClick(2)}}>les retours</Button>
              <Button sx={click == 3 ? style_clicked : style} onClick={() => {setClick(3)}}>les articles</Button>

            <AgGridReact className="clear"
              ref={gridRef}
              rowData={click == 0 ? achat : click == 1 ? versement : click == 2 ? retour : article}
              columnDefs={click == 0 ? columns_achats : click == 1 ? columns_versement_f : click == 2 ? columns_retours_fournisseur : columns_article}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default TableData;