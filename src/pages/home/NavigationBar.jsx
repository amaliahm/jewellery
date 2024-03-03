import { AppBar, CssBaseline, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import LogOutComponent from './logout';

const NavigationBar = ({name = 'home'}) => {
  const [logout, setLogout] = useState(false)


    return (
        <React.Fragment>
            <CssBaseline />
          <AppBar 
            sx={{
                background: "rgba(255,255,255,0.2)",
                top: '10px',
                margin: '0 auto',
                borderRadius: '10px',
                backdropFilter: 'blur(8px)',
                cursor: "pointer",
                height: "60px"
            }}
            
          >
            <Toolbar >
                <div className="where-me" >
                  <Header
                    title={name}
                  />
                  <i 
                    className='fa-solid fa-arrow-right-from-bracket fa-2x'
                    onClick={() => {
                      setLogout(true)
                    }}
                    ></i>
                </div>
            </Toolbar>
          </AppBar>
            {logout && <LogOutComponent out={logout} setOut={setLogout} />}
        </React.Fragment>
    )
}

export default NavigationBar