import { Box, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { utilisateurs } from "./data";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { result } from "../../backend";
import NavigationBar from "../home/NavigationBar";

const Utilisateurs = () => {
  const theme = useTheme();
  const columns_users = [
    { 
        field: "id",
        headerName: "ID",
        minWidth: 100,
        maxWidth: 200,
        headerAlign: 'left'
    },
    {
      field: "name",
      headerName: "Name".toUpperCase(),
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "phone",
      headerName: "Phone Number".toUpperCase(),
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "email",
      headerName: "Email".toUpperCase(),
      flex: 1,
      minWidth: 300,
      maxWidth: 400,
      headerAlign: 'left'
    },
    {
      field: "accessLevel",
      headerName: "l'etat".toUpperCase(),
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'center',
      cellRenderer: (params) => {
        return (
          <Button
            sx={{
              mt: '5px',
              padding: '15px',
              height: '20px',
              width: '60%',
              display: 'flex',
              justifyContent: 'center',
              background:`${params.data.access  === "admin"
              ? '#1e5245'
              : params.data.access === "manager"
              ? '#2e7c67'
              : '#4cceac'}`,
            }}
            // borderRadius="4px"
          >
            {params.data.access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {params.data.access === "manager" && <SecurityOutlinedIcon />}
            {params.data.access === "user" && <LockOpenOutlinedIcon />}
            <Typography color='white' sx={{ mt: "5px" }}>
              {params.data.access}
            </Typography>
          </Button>
        );
      },
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
          background: 'var(--brand-1)',
          marginBottom: '5px',
          padding: '15px',
          '&:hover' : {
            border: '1px solid var(--brand-1)',
          }
        }} 
        onClick={() => {cellClickListner(params)}}
        >
          <i className="fa-solid fa-arrow-right fa-xl" style={{color: 'var(--bg-color-2)'}} ></i>
        </Button>
    },
  ];



  const gridRef = useRef();
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const fetchAllData = async () => {
  //   const data = result.data.utilisateurs
  //   setData(data)
  }
  useEffect(() => {
    fetchAllData()
  }, [2000])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    // floatingFilter: true,
  })) 

  const cellClickListner = (params) => {
    // navigate(`/utilisateurs/${params.data.id}`, {state: params.data})
  }

  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api
  }  

  return (
        <>
          <NavigationBar name="gestion des utilisateurs" />
            <div 
            className="ag-theme-quartz-dark"
            style={{
                marginTop: "30px",
                height: '75vh',
                width: '95vw',
            }}>
                  <Button sx={{
                    color: 'var(--brand-1)',
                    border: '1px solid var(--brand-1)',
                    marginBottom: '10px',
                    marginRight: '10px'
                  }} 
                  // onClick={() => { navigate('/utilisateurs/add-utilisateur') }}
                  >ajouter utilisateur</Button>
                  <Button sx={{
                    color: 'var(--brand-1)',
                    border: '1px solid var(--brand-1)',
                    marginBottom: '10px',
                    marginRight: '10px'
                  }} 
                  onClick={() => {
                    // exportDataToPdf(data, gridApi, 'les utilisateurs')
                  }}
                  >telecharger pdf</Button>
                <AgGridReact 
                  ref={gridRef}
                  rowData={utilisateurs}
                  columnDefs={columns_users}
                  defaultColDef={defaultColDef}
                  rowGroupPanelShow='always'
                  pagination={true}
                  onGridReady={onGridReady}
                />
                </div>
        </>
  );
};

export default Utilisateurs;