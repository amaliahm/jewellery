import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../home/NavigationBar";
import ModalAdd from "./ModalAdd";
import { makeStyles } from "@mui/styles";
import { magasin } from "../../backend";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import { export_details_to_pdf } from "../home/telechargerMagasin";

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

const Magasin = () => {
  const colors = useStyle()

  const columns_magasin = [
    { 
        field: "nom_magasin", 
        headerName: "MAGASIN",
        ...column, 
    },
    {
      field: "nombre reparation",
      headerName: "NOMBRE DE REPARATION",
      ...column,
    },
    {
      field: "poids",
      headerName: "POIDS",
      ...column,
    },
    {
      field: "argent",
      headerName: "ARGENT",
      ...column,
    },
    { 
      field: "modifier",
      headerName: "MODIFIER",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left',
      cellRenderer : (params) => 
        <Button
        sx={{
          background: `${!params.data.deleted_magasin ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_magasin ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          if (!params.data.deleted_magasin) {
            setModifier(true)
            setDataUpdate(params.data)
          }
        }}
        >
          {!params.data.deleted_magasin && <i className="fa-solid fa-pen fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
    {
      field: "supprimer",
      headerName: "SUPPRIMER",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left',
      cellRenderer : (params) => 
        <Button
        sx={{
          background: `${!params.data.deleted_magasin ? 'red' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_magasin ? '1px solid red' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          if (!params.data.deleted_magasin) {
            setData_delete(params.data)
            setM_Delete(true)
          }
        }}
        >
          {!params.data.deleted_magasin && <i className="fa-solid fa-trash fa-xl" style={{color: 'white'}} ></i>}
        </Button>
    },
    {
      field: "download",
      headerName: "DOWNLOAD",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left',
      cellRenderer : (params) => 
        <Button
        sx={{
          background: `${!params.data.deleted_magasin ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_magasin ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          if (!params.data.deleted_magasin) {
            export_details_to_pdf(params.data) 
          }
        }}
        >
          {!params.data.deleted_magasin && <i className="fa-solid fa-download fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
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
          background: `${!params.data.deleted_magasin ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_magasin ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.deleted_magasin ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.deleted_magasin && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];
  


  const gridRef = useRef();
  const navigate = useNavigate()


  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [modifier, setModifier] = useState(false)
  const [m_delete, setM_Delete] = useState(false)
  const [dataUpdate, setDataUpdate] = useState([])
  const [data_delete, setData_delete] = useState([])

  useEffect(() => {
    const fetchAllData = () => {
      let inter = []
      Object.keys(magasin).map((e, i) => {
        inter.push({
          id_magasin: magasin[e].id_magasin,
          deleted_magasin: magasin[e].is_deleted,
          nom_magasin: magasin[e].nom_magasin,
          'nombre reparation': magasin[e].nombre_reparation,
          poids: magasin[e].poids,
          argent: magasin[e].argent,
        })
      })
      setData(inter)
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
    navigate(`/magasins/${params.data.id_magasin}`, {state: {
      id: params.data.id_magasin,
      magasin: params.data.nom_magasin
    }})
  }

  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(data);
  }

  const getRowStyle = (params) => {
    if (params.data.deleted_magasin) {
      return { background: '#db4f4a' };
    }
    return null;
  };

  return (
    <>
      {modal && <ModalAdd
              setShowModal={setModal}
              showModal={modal}
              detail={data}
              colors={colors.root}
              setDetail={setData}
            />}
      {modifier && <ModalUpdate
              setShowModal={setModifier}
              showModal={modifier}
              detail={dataUpdate}
              all_data={data}
              colors={colors.root}
              setDetail={setData}
            />}
      {m_delete && <ModalDelete
              setDelete={setM_Delete}
              _delete={m_delete}
              detail={data_delete}
              colors={colors.root}
              all_data={data}
              setDetail={setData}
            />}
      <NavigationBar name="les magasins" />

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
        >ajouter magasin</Button>
            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_magasin}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
    </>
  );
};

export default Magasin;


