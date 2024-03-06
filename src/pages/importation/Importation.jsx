import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../home/NavigationBar";
import ModalAdd from "./ModalAdd";
import { makeStyles } from "@mui/styles";
import { view_importation } from "../../backend";

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
        field: "nom_importateur", 
        headerName: "IMPORTATEUR",
        ...column, 
    },
    {
      field: "poid 18k",
      headerName: "POID 18",
      ...column,
    },
    {
      field: "poid 24k",
      headerName: "POID 24",
      ...column,
    },
    {
      field: "versement argent",
      headerName: "VERSEMENT ARGENT",
      ...column,
    },
    {
      field: "versement or 24k",
      headerName: "VERSEMENT OR 24K",
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
        sx={{
          background: `${!params.data.deleted_importation ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_importation ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.deleted_importation ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.deleted_importation && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()


  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const fetchAllData = () => {
      let inter = []
      Object.keys(view_importation).map((e, i) => {
        inter.push({
          id_importation: view_importation[e].id_importation,
          deleted_importation: view_importation[e].deleted_importation,
          nom_importateur: view_importation[e].nom_importateur,
          'poid 18k': view_importation[e].total_poid_18,
          'poid 24k': view_importation[e].total_poid_24,
          'total facon': view_importation[e].total_facon,
          'versement or 24k': view_importation[e].total_versement_or_24,
          'versement argent': view_importation[e].total_versement_argent,
          'reste poid 24k': view_importation[e].importation_reste_poid_24,
          'reste argent': view_importation[e].importation_reste_argent,
        })
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
    enableRowGroup: true,
  }))

  const cellClickListner = (params) => {
    console.log(params.data)
    navigate(`/importations/${params.data.id_importation}`, {state: params.data})
  }

  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(data);
  }

  const getRowStyle = (params) => {
    if (params.data.deleted_importation) {
      return { background: '#db4f4a' };
    }
    return null;
  };

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
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_importation}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Importation;


