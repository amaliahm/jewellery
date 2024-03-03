import React from "react";
import NavigationBar from "./NavigationBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Lock from "./Lock";
import Elements from "./elements";

function Home() {
  const navigate = useNavigate()
    return (
                <>
                  {/* <Lock /> */}
                  <NavigationBar />
                  <Elements />
                  {/* <div className="add" >
                    <Button sx={{
                      color: 'var(--bg-color-1)',
                      background: 'var(--brand-1)',
                      border: '1px solid var(--brand-1)',
                      marginBottom: '10px',
                      marginRight: '10px',
                      '&:hover': {
                          background: 'var(--brand-1)',
                      }
                    }}
                    onClick={() => { navigate('/titres') }}
                    >les titres</Button>
                  </div> */}
                </>
    )
}

export default Home