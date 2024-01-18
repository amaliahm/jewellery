import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { result } from "../../backend";
import { columns_achats } from "../achats/data";
import { columns_versement_f } from "../versements/data";
import { columns_versement_c } from "../versements/data";
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
  const [vente, setVente] = useState([])
  const [ver, setVer] = useState([])
  const [click, setClick] = useState(0)

  const getVente = () => {
    const data = result.data.ventes
    const inter = []
    Object.keys(data).map((e, i) => {
        if (data[e].client === nom) {
            inter.push(data[e])
        }
    })
    setVente(inter)
  }

  const getVersement = () => {
    const data = result.data.versement_c
    const inter = []
    Object.keys(data).map((e, i) => {
        if (data[e].client === nom) {
            inter.push(data[e])
        }
    })
    setVer(inter)
  }

  useEffect(() => {
    getVente()
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
              <Button sx={click == 0 ? style_clicked : style} onClick={() => {setClick(0)}}>les ventes</Button>
              <Button sx={click == 1 ? style_clicked : style} onClick={() => {setClick(1)}}>les versements</Button>

            <AgGridReact className="clear"
              ref={gridRef}
              rowData={click == 0 ? vente : ver}
              columnDefs={click == 0 ? columns_ventes : columns_versement_c}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default TableData;