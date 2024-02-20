import React, { useEffect, useState } from 'react';
import { result } from "../../backend";
import Famille from "./card"
import NavigationBar from "../home/NavigationBar";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import AddFamille from './AddFamille';
import { makeStyles } from "@mui/styles";
import { view_produits } from '../../backend';

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
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    console.log(view_produits)
    const fetchAllData = async () => {
     let inter = []
     Object.keys(view_produits).map(e => {
      inter.push({
        nombre_piece: view_produits[e].nombre_piece,
        nom_famille: view_produits[e].nom_famille,
        id_famille: view_produits[e].id_famille,
        deleted_famille: view_produits[e].deleted_famille
      })
     })
      const uniqueObjectsSet = new Set();

      const uniqueArray = inter.filter(obj => {
        const stringRepresentation = JSON.stringify(obj);
        if (!uniqueObjectsSet.has(stringRepresentation)) {
          uniqueObjectsSet.add(stringRepresentation);
          return true;
        }
        return false;
      });
      setFamille(uniqueArray)
      console.log(uniqueArray)
    }
    fetchAllData()
  }, [2000])

  const filteredFamille = famille.filter(obj =>
    Object.keys(obj).some(key =>
      obj[key].toString().toLowerCase().includes(search)
    )
  );

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
          marginTop: '10px',
          background: 'rgba(255, 255, 255, 0)',
        }}>
          {filteredFamille.map((e, i) => (
            <Famille 
              key={i} 
              piece={e.nombre_piece}
              nom={e.nom_famille} 
              id={e.id_famille}
              deleted={e.deleted_famille}
              />
          ))}
        </div>
      </>
    )
}

export default Articles