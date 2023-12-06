import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { utilisateurs } from "../../data";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="0px" sx={{
        paddingLeft: "20px"
      }}>
      <Header title="les utilisateurs" />
      <Box
        m="-10px"
        height="85vh"
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
        }}
      >
        <DataGrid checkboxSelection rows={utilisateurs} columns={columns_users} />
      </Box>
    </Box>
  );
};

export default Users;