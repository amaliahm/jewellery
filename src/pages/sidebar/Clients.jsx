import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { clients, columns_clients } from "../../data";
import { tokens } from "../../theme";
import Header from "./Header";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";


const Circle = () => {
  const percentage = 70;
  return (
    <CircularProgressbar 
    value={percentage}
    text={`${percentage}%`}
    styles={
      buildStyles({
        rotation: 0.25,
        strokeLinecap: 'butt',
        textSize: '16px',
        pathTransitionDuration: 0.5,
        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
        textColor: '#788',
        trailColor: '#d6d6d6',
        backgroundColor: '#3e98c7',
      })
    }
    />
  )
}




const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCol, setIsCol] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsCol(false)
    }, 4000);
  }, [])

  

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
          rows={isCol ? [] : clients}
          columns={columns_clients}
          components={{ Toolbar: GridToolbar,}}
        />
      </Box>
    </Box>
  );
};

export default Clients;