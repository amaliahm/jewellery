import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "./Header";
import { useState, useEffect } from "react";
import axios from 'axios'
import { api } from "../../backend";
import { result } from "../../backend";

const columns_ventes = [
  { 
      field: "vente n=°", 
      headerName: "VENTE N=°", 
      flex: 0.5,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
  },
  {
    field: "date",
    headerName: "DATE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 80,
    maxWidth: 150,
    headerAlign: 'left'
  },
  {
    field: "designation d'article",
    headerName: "DESIGNATION D'ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 300,
    maxWidth: 400,
    headerAlign: 'left'
  },
  {
    field: "qte",
    headerName: "QTE",
    flex: 1,
    minWidth: 80,
    maxWidth: 150,
    headerAlign: 'left'
  },
  {
    field: "pu",
    headerName: "PU",
    flex: 1,
    minWidth: 80,
    maxWidth: 150,
    headerAlign: 'left'
  },
  {
    field: "total",
    headerName: "TOTAL",
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "client",
    headerName: "CLIENT",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
];



const Ventes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [isCol, setIsCol] = useState(true)
  const [row, setRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleRow = (table) => {
    const clickedRow = table.row
    setRow(clickedRow)
    setIsOpen(true);
  }

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
      const ventes = result.data.ventes
      setIsCol(false)
      setData(ventes)
    }
    setInterval(fetchAllData, 2000)
  }, [2000])
  
  return (
    <Box m="0px" sx={{
        paddingLeft: "20px"
      }}>
      <Header
        title="les ventes"
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
          columns={columns_ventes}
          components={{ Toolbar: GridToolbar, }}
          onRowClick={handleRow}
        />
      </Box>
    </Box>
  );
};

export default Ventes;


