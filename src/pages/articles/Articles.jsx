import React, { useEffect, useState } from 'react';
import { result } from "../../backend";
import Famille from "./card"
import NavigationBar from "../home/NavigationBar";
import { TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  root: {
      "& label.Mui-focused": {
        color: "white"
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#12f7d6",
        }
      }
    }
})

const Articles = () => {
  const colors = useStyle()
  const [famille, setFamille] = useState([])
  const [articles, setArticles] = useState({})
  const [search, setSearch] = useState('')
  useEffect(() => {
    const fetchAllData = async () => {
      const data = result.data.articles
      setArticles(data)
      const famille = [...new Set(
        data.map(item => item.famille))]
        setFamille(famille)
    }
    fetchAllData()
  }, [2000])

  function displayFamille(name) {
    const result = []
    Object.keys(articles).map((e, i) => {
      if (articles[e].famille === name) {
        result.push(articles[e] )
      }
    })
    return result
  }

    return (
      <>
        <NavigationBar name="les produits" />
          <TextField 
            id={"outlined-controlled"}
             variant="outlined"
            type='text'
            sx={{
              borderColor: "transparent",
              marginTop: '100px',
            }}
            className={colors.root}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          ></TextField>
        <div className="add">
          {famille.filter(f => f.includes(search)).map((e, i) => (
            <Famille 
              key={i} 
              nom={e} 
              famille={displayFamille(e)}
              />
          ))}
        </div>
      </>
    )
}

export default Articles