import React, { useEffect, useState } from 'react';
import { result } from "../../backend";
import Famille from "./card"
import NavigationBar from "../home/NavigationBar";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import AddFamille from './AddFamille';
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
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const fetchAllData = async () => {
      let data = result.data.articles
      setArticles(data)
      // const __data = result.data.familles
      // const famille = [...new Set(
      //   __data.map(item => item.famille))]
        setFamille(result.data.familles)
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
      <AddFamille
              setShowModal={setModal}
              showModal={modal}
              detail={famille}
              colors={colors.root}
              setDetail={setFamille}
            />
        <NavigationBar name="les produits" />
        <div className='nav-search-add'>

          <Button
           onClick={() => { setModal(true) }}
           sx={{
              color: 'var(--brand-1)',
              border: '1px solid var(--brand-1)',
          }} >ajouter famille</Button>
          <TextField 
            id={"outlined-controlled"}
             variant="outlined"
            type='text'
            sx={{
              borderColor: "transparent",
            }}
            className={colors.root}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          ></TextField>
        </div>
        <div className="add" style={{
          marginTop: '10px'
        }}>
          {Object.keys(famille).filter(f => f.includes(search)).map((e, i) => (
            <Famille 
              key={i} 
              nom={famille[e].famille} 
              id={famille[e].id}
              famille={displayFamille(famille[e].famille)}
              />
          ))}
        </div>
      </>
    )
}

export default Articles