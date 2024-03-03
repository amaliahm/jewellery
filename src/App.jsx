import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './pages/authentification/auth';
import PrivateRoute from './pages/home/PrivateRoute.jsx';
import add_routes from './pages/home/add_routes.jsx';
import Home from './pages/home/home.jsx';
import './pages/home/index.css';
import LoadingComponent from './pages/home/loader.jsx';
import routes from './pages/home/route.jsx';
import { ColorModeContext, useMode } from './theme.js';
import Produits from './pages/articles/produits.jsx';
import Lock from './pages/home/Lock.jsx';
import update_routes from './pages/home/update_route.jsx';
import AchatImportation from './pages/achat_importation/AchatImportation.jsx';
import VersementImportation from './pages/versement_importation/VersementImportation.jsx';
import Titre from './pages/titre/titre.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const [theme, colorMode] = useMode();
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, [])


  return (
    <>
    {isLoading ? <LoadingComponent /> : <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Router>
          
            <Routes>
              {/* <Route path="*" element={<PageNotFound />} /> */}
              <Route key='/private route' element={<PrivateRoute />}>
                <Route key='home' element={<Home />} path='/home' exact/>
                <Route key='titre' element={<Titre />} path='/titres' exact/>
                <Route key='produits-nom' path='/produits/:id'action={({ params }) => {}} element={<Produits />} exact/>
                <Route key='/importations/achat' path='/importations/achat_importation' action={({ params }) => {}} element={<AchatImportation />} exact/>
                <Route key='/importations/versement' path='/importations/versement_importation' action={({ params }) => {}} element={<VersementImportation />} exact/>
                {update_routes.map((e, i) => (
                  <Route key={i} path={e.to} action={({ params }) => {}} element={e.component} exact/>
                ))}
                {add_routes.map((e, i) => (
                    <Route key={i} element={e.component} path={e.to} exact/>
                ))}
                {routes.map((e) => (
                  <>
                    {e.name != 'home' && <Route key={e.key} element={e.component} path={e.to} exact/>}
                  </>
                ))}
              </Route>
              <Route path='/' element={<Auth />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>}
    </>
  )
}

export default App
