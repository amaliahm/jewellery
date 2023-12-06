import Header from "./Header"
import * as React from 'react'
import { Card, Box, CardActions, CardContent, Button, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme";
import { articles } from "../../data";
import ShowArticle from "../components/showArticle";


const Articles = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [detail, setDetail] = React.useState({})
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="0px" sx={{
            paddingLeft: "100px",
            background: `${colors.primary[500]} !important`,
          }}>
            <Header title='les articles' />
            <Box sx={{ 
                marginRight: "50px",
                minWidth: 275 ,
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: '15px',
                overflowY: "scroll",
                padding: '20px'
            }}>
                {articles.map((e) => (

            
                <Card 
                 variant="outlined"
                 sx={{
                     padding: "10px",
                     height: "150px",
                    width: "200px",
                }}
                className="article-card"
                > 
                    <React.Fragment>
                  <CardContent>
                      
                    <Typography sx={{zIndex: 5}} variant="h3" component="div">
                      {e.article}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"
                    onClick={() => {
                      setIsOpen(true)
                      setDetail(e)
                    }}
                   sx={{
                     background: `${colors.primary[400]} !important`,
                     color: "#fff",
                      padding: "5px 15px"
                    }}
                    >
                      <Typography variant="h6" >
                      plus details
                    </Typography>
                    </Button>
                  </CardActions>
                </React.Fragment>
                </Card>
                ))}
                <ShowArticle 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                detail={detail}/>
            </Box>
        </Box>
    )
}

export default Articles