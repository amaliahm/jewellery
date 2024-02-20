import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { columns_achat_article } from "../achats/data";
import { columns_vente_article } from "../ventes/data";
import { view_achat_articles_fournisseur, view_vente_articles_client } from "../../backend";

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

const TableData = ({reste}) => {
  const gridRef = useRef();
  const [achat, setAchat] = useState([])
  const [vente, setVente] = useState([])
  console.log(reste)
  const [click, setClick] = useState(0)

  const getAchat = () => {

    console.log(view_achat_articles_fournisseur)
    const inter = []
    Object.keys(view_achat_articles_fournisseur).map(e => {
        if (view_achat_articles_fournisseur[e].id_fournisseur === reste.id_fournisseur) {
            inter.push({
              'achat n=°': view_achat_articles_fournisseur[e]['achat n=°'],
              date: view_achat_articles_fournisseur[e].date_total_achat,
              prix_unitaire: view_achat_articles_fournisseur[e].prix_unitaire_achat,
              total: view_achat_articles_fournisseur[e].total_achat,
              quantite_achat: view_achat_articles_fournisseur[e].quantite_achat,
            })
        }
    })
    setAchat(inter)
  }

  const getvente = () => {
    console.log(view_vente_articles_client)
    const inter = []
    Object.keys(view_vente_articles_client).map(e => {
      if (view_vente_articles_client[e].id_article === reste.id_article) {
        inter.push({
          'vente n=°': view_vente_articles_client[e]['vente n=°'],
          date: view_vente_articles_client[e].date_total_vente,
          prix_unitaire: view_vente_articles_client[e].prix_unitaire_vente,
          total: view_vente_articles_client[e].total_vente,
          quantite_vente: view_vente_articles_client[e].quantite_vente,
        })
      }
    })
    setVente(inter)
   
  }

  useEffect(() => {
    getAchat()
    getvente()
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
              <Button sx={click == 1 ? style_clicked : style} onClick={() => {setClick(1)}}>les ventes</Button>

            <AgGridReact className="clear"
              ref={gridRef}
              rowData={click == 0 ? achat : vente}
              columnDefs={click == 0 ? columns_achat_article : columns_vente_article}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default TableData;