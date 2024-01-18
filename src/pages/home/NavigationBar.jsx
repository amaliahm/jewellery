import { AppBar, CssBaseline, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import routes from './route';
import { auth } from '../../firebase';

const NavigationBar = ({name = 'home'}) => {
  
  const [notOpen, setNotOpen] = useState(true)
  const navigate = useNavigate()


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
                  <div className="nav-items"
                    style={{
                      height: !notOpen ? '570px' : '40px'
                    }}
                  >
                    <div className="humberger" data-name="home" onClick={() => setNotOpen(!notOpen)}>
                      {notOpen ?  <i className="fa-solid fa-bars fa-xl"></i> : <i className="fa-solid fa-xmark fa-xl"></i>}
                      
                    </div>
                      {routes.map((e, index) => (
                         <i 
                          key={index}
                          className={`fa-solid fa-1x fa-` + e.icon }
                          data-name={e.name}
                          onClick={() => {
                            navigate(e.to)
                            setNotOpen(true)
                          }}
                        ></i>
                      ))}
                      <i key='logout'
                          className='arrow-right-from-bracket'
                          onClick={() => {
                            auth.signOut()
                            navigate('/')
                            setNotOpen(true)
                          }}
                      ></i>
                  </div>
                  <Header
                    title={name}
                  />
                  <i 
                    className='fa-solid fa-lock fa-2x'
                    onClick={() => {
                      navigate('/lock')
                    }}
                    ></i>
                </div>
            </Toolbar>
          </AppBar>
        </React.Fragment>
    )
}

export default NavigationBar