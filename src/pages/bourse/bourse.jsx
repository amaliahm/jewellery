import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import { columns_bourse } from "./data";


const style = {
  color: 'var(--brand-1)',
  border: '1px solid var(--brand-1)',
  marginBottom: '10px',
  marginRight: '10px'
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

const Caisse = () => {
  const gridRef = useRef();
  const navigate = useNavigate()
  const colors = useStyle()


  const [tous, setTous] = useState([])
  const [entrer, setEntrer] = useState([])
  const [sortie, setSortie] = useState([])
  const [data, setData] = useState(0)

  useEffect(() => {
    const fetchAllData = async () => {
      const data = result.data.bourse
      setTous(data)
      const interIn = []
      const interOut = []
      Object.keys(data).map((e, i) => {
        if (data[e].mouvement == 'ENTRER') {
          interIn.unshift(data[e])
        }
        if (data[e].mouvement == 'SORTIE') {
          interOut.unshift(data[e])
        }
      })
      setSortie(interOut)
      setEntrer(interIn)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(tous);
  }

  return (
    <>
      <NavigationBar name="bourse d'or" />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "50px",
            height: '75vh',
            width: '95vw',
            marginBottom: '20px'
        }}>
              <Button sx={data == 0 ? style_clicked : style} onClick={() => {setData(0)}}>tous</Button>
              <Button sx={data == 1 ? style_clicked : style} onClick={() => {setData(1)}}>entrer</Button>
              <Button sx={data == 2 ? style_clicked : style} onClick={() => {setData(2)}}>sortie</Button>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { navigate('/bourse/add')}}
              >ajouter mouvement</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data == 1 ? entrer : data == 2 ? sortie : tous}
              columnDefs={columns_bourse}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default Caisse;


