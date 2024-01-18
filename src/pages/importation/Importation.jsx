import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";
import ModalAdd from "./ModalAdd";
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

const column = {
    flex: 0.5,
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
}

const style = {
    background: 'var(--brand-1)',
    marginBottom: '5px',
    padding: '15px',
    '&:hover' : {
      border: '1px solid var(--brand-1)',
    }
}

const Importation = () => {
  const colors = useStyle()

  const columns_importation = [
    { 
        field: "importateur", 
        headerName: "IMPORTATEUR",
        ...column, 
    },
    {
      field: "total versement $",
      headerName: "TOTAL VERSEMENT $",
      ...column,
    },
    {
      field: "reste poid 24k",
      headerName: "RESTE POID 24K",
      ...column,
    },
    {
      field: "reste $",
      headerName: "RESTE $",
      ...column,
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
        sx={style} 
        onClick={() => {cellClickListner(params)}}
        >
          <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()


  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const fetchAllData = async () => {
      const data = result.data.importation
      setData(data)
    }
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
  }))

  const cellClickListner = (params) => {
    navigate(`/importations/${params.data.id}`, {state: params.data})
  }

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);


  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(data);
  }

  return (
    <>
      <ModalAdd
              setShowModal={setModal}
              showModal={modal}
              detail={data}
              colors={colors.root}
              setDetail={setData}
            />
      <NavigationBar name="les importations" />

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
              onClick={() => { setModal(true) }}
              >ajouter importateur</Button>
              <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={onBtExport}
              >telecharger excel</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_importation}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
            />
            </div>
    </>
  );
};

export default Importation;


