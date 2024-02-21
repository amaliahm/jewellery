import React, { useEffect, useState } from 'react';
import CardType from './CardType';
import AddType from './ModalAdd';
import NavigationBar from "../home/NavigationBar";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import { makeStyles } from "@mui/styles";
import { view_charge } from '../../backend';

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

const Type = () => {
  const colors = useStyle()
  const [type, setType] = useState([])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    console.log(view_charge)
    const fetchAllData = async () => {
     let inter = []
     Object.keys(view_charge).map(e => {
      inter.push({
        nombre_sous_type: view_charge[e].nombre_sous_type,
        nom_type: view_charge[e].nom_type,
        id_type: view_charge[e].id_type,
        deleted_type: view_charge[e].deleted_type
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
      setType(uniqueArray)
      console.log(uniqueArray)
    }
    fetchAllData()
  }, [2000])

  const filteredType = type.filter(obj =>
    Object.keys(obj).some(key =>
      obj[key].toString().toLowerCase().includes(search)
    )
  );

    return (
      <>
      {modal && <AddType
              setShowModal={setModal}
              showModal={modal}
              detail={type}
              colors={colors.root}
              setDetail={setType}
              id='5'
              type='type'
              nom_type='nom_type'
              path='charges/types'
            />}
        <NavigationBar name="les type" />
        <div className='nav-search-add'>

          <Button
           onClick={() => { setModal(true) }}
           sx={{
              color: 'var(--brand-1)',
              border: '1px solid var(--brand-1)',
          }} >ajouter type</Button>
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
          {filteredType.map((e, i) => (
            <CardType 
              key={i} 
              piece={e.nombre_sous_type}
              nom={e.nom_type} 
              id={e.id_type}
              deleted={e.deleted_type}
              />
          ))}
        </div>
      </>
    )
}

export default Type