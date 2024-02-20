import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { fournisseur, client } from "../../backend";
import { useLocation } from "react-router-dom";
import { columns_fournisseurs } from "../fournisseurs/data";
import { columns_clients } from "../clients/data";

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
  const [fournisseur__, setFournisseur] = useState([])
  const [client__, setClient] = useState([])
  const [click, setClick] = useState(0)  
  const id = parseInt(location.pathname.split('/')[2])

  const getFournisseur = () => {
    const inter = []
    Object.keys(fournisseur).map(e => {
        if (fournisseur[e].id_titre === id) {
            inter.push(fournisseur[e])
        }
    })
    setFournisseur(inter)
  }

  const getClient = () => {
    const inter = []
    Object.keys(client).map(e => {
        if (client[e].id_titre === id) {
            inter.push(client[e])
        }
    })
    setClient(inter)
  }

  useEffect(() => {
    getFournisseur()
    getClient()
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
            height: '70vh',
            width: '95vw',
            marginBottom: '60px',
        }}>
              <Button sx={click == 0 ? style_clicked : style} onClick={() => {setClick(0)}}>fournisseurs</Button>
              <Button sx={click == 1 ? style_clicked : style} onClick={() => {setClick(1)}}>clients</Button>

            <AgGridReact className="clear"
              ref={gridRef}
              rowData={click == 0 ? fournisseur__ :  client__}
              columnDefs={click == 0 ? columns_fournisseurs : columns_clients}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default TableData;