import Header from "./Header"
import React, {useState, useEffect} from 'react'
import { Card, Box, CardActions, CardContent, Button, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme";
import ShowArticle from "../components/showArticle";
import { result } from "../../backend";



const Articles = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [detail, setDetail] = useState({})
  const [articles, setArticles] = useState({
    article: '',
    "designation d'article" : '',
    'prix unitaire': '',
    'qte stock' : '',
    "valeur de stock": '',
    "stock min": '',
    alert: ''
  })
  useEffect(() => {
    const fetchAllData = async () => {
      const data = result.data.articles
      // setIsCol(false)
      setArticles(data)
    }
    fetchAllData()
    // setInterval(fetchAllData, 2000)
  }, [2000])
  
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
                {Object.keys(articles).map((e, index) => (

            
                <Card 
                 variant="outlined"
                 sx={{
                     padding: "10px",
                     height: "150px",
                    width: "200px",
                }}
                className="article-card"
                key={index}
                > 
                    <React.Fragment>
                  <CardContent>
                      
                    <Typography sx={{zIndex: 5}} variant="h3" component="div">
                      {articles[e]['article']}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"
                    onClick={() => {
                      setIsOpen(true)
                      setDetail(articles[e])
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