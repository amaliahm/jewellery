import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "./Header";
import { useState, useEffect } from "react";
import UpdateClient from "../update/UpdateClient";
import { result } from "../../backend";

const columns_clients = [
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
];



const Clients = () => {
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
      const clients = result.data.clients
      setIsCol(false)
      setData(clients)
    }
    setInterval(fetchAllData, 2000)
  }, [2000])
  

  return (
    <Box m="0px" sx={{
        paddingLeft: "20px"
      }}>
      <Header
        title="les clients"
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
          columns={columns_clients}
          components={{ Toolbar: GridToolbar,}}
          onRowClick={handleRow}
        />
      </Box>
      {isOpen && <UpdateClient isOpen={isOpen} setIsOpen={setIsOpen} row={row}/>}
    </Box>
  );
};

export default Clients;