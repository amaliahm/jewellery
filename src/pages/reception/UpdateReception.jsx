
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { makeStyles } from "@mui/styles";
import ModalDelete from './ModalDelete';
import { view_reception } from '../../backend';
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { exportBonToPdf } from "../home/telechargerBon";

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

const UpdateReception = () => {

  const columns_receptions = [
    {
      field: "nom_article",
      headerName: "L'ARTICLE",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "prix_achat_facon",
      headerName: "PRIX ACHAT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "quantite",
      headerName: "QUANTITE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "total",
      headerName: "TOTAL",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
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
          background: `${!params.data.deleted_reception ? 'var(--brand-1)' : 'transparent'} `,
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: `${!params.data.deleted_reception ? '1px solid var(--brand-1)' : 'transparent'}`,
          }
        }} 
        onClick={() => {
          !params.data.deleted_reception ? cellClickListner(params) : console.log()
        }}
        >
          {!params.data.deleted_reception && <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>}
        </Button>
    },
  ];



  const getRowStyle = (params) => {
    if (params.data.deleted_reception) {
      return { background: '#db4f4a' };
    }
    return null;
  };


    const colors = useStyle()
    const location = useLocation()
    const [m_delete, setM_Delete] = useState(false)
    const gridRef = useRef();
    const navigate =useNavigate()
    useEffect(() => {
      const fetchAllData = () => {
        let inter = []
        console.log(location.state)
        console.log(view_reception)
        Object.keys(view_reception).map((e, i) => {
          if (view_reception[e].id_total_reception === location.state) {
            inter.push(view_reception[e])
          }
        })
        setData(inter)

      }
      fetchAllData()
    }, [2000])


  const [data, setData] = useState([])
  const [type, setType] = useState('')

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }))

  const cellClickListner = (params) => {
    // navigate(`/receptions/${params.data.deleted_reception}/${params.data.id_reception}`, {state: params.data})
  }

  if (gridRef.current) {
    gridRef.current.api.setRowData([]);
    gridRef.current.api.setRowData(data);
  }

  return (
    <>
      <NavigationBar name={"les receptions"} />
        <div 
        className="ag-theme-quartz-dark"
        style={{
            marginTop: "50px",
            height: '75vh',
            width: '95vw',
            marginBottom: '20px'
        }}>
           {true && <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { 
                setM_Delete(true)
                setType('total_receptions')
              }}
              >supprimer cette reception</Button>}
               <Button sx={{
                color: 'var(--brand-1)',
                border: '1px solid var(--brand-1)',
                marginBottom: '10px',
                marginRight: '10px'
              }} 
              onClick={() => { exportBonToPdf(data, "de reception") }}
              >bon de reception</Button>

            <AgGridReact className="clear"
              ref={gridRef}
              rowData={data}
              columnDefs={columns_receptions}
              defaultColDef={defaultColDef}
              rowGroupPanelShow='always'
              pagination={true}
              getRowStyle={getRowStyle}
            />
            </div>
            {m_delete && <ModalDelete
              setDelete={setM_Delete}
              _delete={m_delete}
              detail={data}
              colors={colors.root}
              setDetail={setData}
              type={type}
            />}
    </>
  );
}

export default UpdateReception