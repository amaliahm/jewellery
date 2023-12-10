import { Box, useTheme } from "@mui/material";
import { DataGrid, GridEditDateCell, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "./Header";
import { useState, useEffect } from "react";
import axios from 'axios'
import {  Typography } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";


const columns_fournisseurs = [
  { 
      field: "id", 
      headerName: "ID", 
      flex: 0.5,
      minWidth: 50,
      maxWidth: 80,
      headerAlign: 'left'
  },
  {
    field: "nom",
    headerName: "NOM",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "ville",
    headerName: "VILLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "wilaya",
    headerName: "WILAYA",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "telephone",
    headerName: "TELEPHONE",
    flex: 1,
    minWidth: 150,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "chiffre d'affaire",
    headerName: "CHIFFRE D'AFFAIRE",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "total or",
    headerName: "TOTAL OR",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "total vo",
    headerName: "TOTAL VO",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "total va",
    headerName: "TOTAL VA",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "total perte",
    headerName: "TOTAL PERTE",
    flex: 1,
    minWidth: 130,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "total ro",
    headerName: "TOTAL RO",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "total ra",
    headerName: "TOTAL RA",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "reste o",
    headerName: "REST O",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    headerAlign: 'left'
  },
  {
    field: "reste a",
    headerName: "REST A",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    headerAlign: 'left'
  },
  // {
  //   field: "update",
  //   headerName: "update".toUpperCase(),
  //   flex: 1,
  //   minWidth: 200,
  //   maxWidth: 300,
  //   headerAlign: 'center',
  //   renderCell: () => {
  //     return (
  //       <Box
  //         width="60%"
  //         m="0 auto"
  //         p="5px"
  //         display="flex"
  //         justifyContent="center"
  //         backgroundColor={colors.greenAccent[700]}
  //         borderRadius="4px"
  //         sx={{
  //           '&:hover' : {
  //             bgcolor : colors.greenAccent[600],
  //             cursor: 'pointer'
  //           }
  //         }}
  //         onClick={() => {
  //           console.log('clicked update')
  //         }}
  //       >
  //         <Typography 
  //           color={colors.grey[100]} sx={{ ml: "5px" }}
            
  //         >
  //             update
  //         </Typography>
  //       </Box>
  //     );
  //   },
  // },
  // {
  //   field: "delete",
  //   headerName: "delete".toUpperCase(),
  //   flex: 1,
  //   minWidth: 200,
  //   maxWidth: 300,
  //   headerAlign: 'center',
  //   renderCell: () => {
  //     return (
  //       <Box
  //         width="60%"
  //         m="0 auto"
  //         p="5px"
  //         display="flex"
  //         justifyContent="center"
  //         backgroundColor={colors.redAccent[500]}
  //         borderRadius="4px"
  //         sx={{
  //           '&:hover' : {
  //             bgcolor : colors.redAccent[600],
  //             cursor: 'pointer'
  //           }
  //         }}
  //         onClick={() => {
  //           console.log('clicked delete')
  //         }}
  //       >
  //         <GridDeleteIcon />
  //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
  //             delete
  //         </Typography>
  //       </Box>
  //     );
  //   },
  // },
];

const Fournisseurs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  



  const [isCol, setIsCol] = useState(true)


  const [data, setData] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get('http://localhost:8800/home')
        setData(res.data.fournisseurs)
        setIsCol(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchAllData()
  }, [])

  

  return (
    <Box m="0px" sx={{
        paddingLeft: "20px"
      }}>
      <Header
        title="les fournisseurs"
      />
      <Box
        m="-10px"
        height="90vh"
        width="90vw"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: '#3e0df2cc',
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: '#3e0df2cc',
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          rows={isCol ? [] : data}
          columns={columns_fournisseurs}
          components={{ Toolbar: GridToolbar,}}
        />
      </Box>
    </Box>
  );
};

export default Fournisseurs;