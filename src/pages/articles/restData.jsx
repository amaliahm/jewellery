import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { result } from "../../backend";
import { columns_achats } from "../achats/data";
import { columns_ventes } from "../ventes/data";

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

const TableData = ({nom}) => {
  const gridRef = useRef();
  const [achat, setAchat] = useState([])
  const [vente, setVente] = useState([])
  const [click, setClick] = useState(0)
  console.log(nom)

  const getAchat = () => {
    const data = result.data.achats
    const inter = []
    Object.keys(data).map((e, i) => {
        if (data[e]["designation d'article"] === nom) {
            inter.push(data[e])
        }
    })
    setAchat(inter)
  }

  const getVersement = () => {
    const data = result.data.ventes
    const inter = []
    Object.keys(data).map((e, i) => {
        if (data[e]["designation d'article"] === nom) {
            inter.push(data[e])
        }
    })
    setVente(inter)
  }

  useEffect(() => {
    getAchat()
    getVersement()
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
              columnDefs={click == 0 ? columns_achats : columns_ventes}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default TableData;