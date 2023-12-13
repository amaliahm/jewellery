import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './pages/authentification/auth';
import LoadingComponent from './pages/components/loader.jsx';
import FirstPage from './pages/home/firstPage.jsx';
import { ColorModeContext, useMode } from './theme.js';
import PrivateRoute from './pages/components/PrivateRoute.jsx';


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
              <Route element={<PrivateRoute />}>
                <Route element={<FirstPage />} path='/home' exact/>
              </Route>
              <Route path='/auth' element={<Auth />} />
              
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>}
    </>
  )
}

export default App
