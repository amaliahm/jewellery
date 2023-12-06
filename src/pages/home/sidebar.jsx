import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, useTheme } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { links, sidebar } from "../../index.jsx";
import { tokens } from "../../theme";
import LoadingComponent from "../components/loader.jsx";
import { logoutButton } from '../../assets/icons/index.jsx';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import { getAuth, signOut } from 'firebase/auth';


const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const Item = ({icon, nom, open, to}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return (
      <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
      }}
      >
        <ListItemIcon 
      sx={{
        minWidth: 0,
        mr: open ? 1 : 'auto',
        justifyContent: 'center',
      }}
      >
        <img style={{
            maxHeight: 30,
          }} 
            src={icon} 
            alt={icon} />
      </ListItemIcon>
      <ListItemText primary={nom.toUpperCase()} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    );
  };

const SideBarComponent = () => {
  const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [Loading, setLoading] = useState(false);
    function changeLoading() {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState(0);

    const logout = () => {
      const user = getAuth(app)
        user.signOut()
    }

    return (
      <Box sx={{
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
              },
            }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{
            background: '#141b2d',
          }}>
          {!open ? <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ...(open && { display: 'none' }),
              }}
            >
              <ChevronRightIcon />
            </IconButton>
             : <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>}
          </DrawerHeader>
          

          <List className="sidebar" theme={theme}>
            {sidebar.map((e, index) => (
              <ListItem 
              className={ `pro-sidebar-inner item-sidebar${selected == index ? '-hover' : ''}`
              } 
              key={e.nom} 
              disablePadding 
              sx={{ display: 'block' }}
              onClick={() => {
                setSelected(index)
                setLoading(true)
                changeLoading()
              }}
              >
                
                <Item 
                icon={e.icon}
                nom={e.nom}
                open={open}
                />
              </ListItem>
            ))}
            <ListItem 
              className='pro-sidebar-inner item-sidebar'
              disablePadding 
              sx={{ display: 'block' }}
              onClick={() => {
                logout()
                navigate('/auth')
                setLoading(true)
              }}
              >
                
                <Item
                icon={logoutButton}
                nom={'logout'}
                open={open}
                />
              </ListItem>
          </List>
          
        </Drawer>
        <main className="content">
          {Loading && <LoadingComponent />}
          {links.map((e, index) => (
            selected == index ?  <e.to  key={index}/> : <div key={index}></div>
          ))}
        </main>
      </Box>
    );
}

export default SideBarComponent