import React, { useEffect, useState } from 'react';
import CardSousType from './CardSousType';
import AddType from './ModalAdd';
import NavigationBar from "../home/NavigationBar";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import { makeStyles } from "@mui/styles";
import { view_charge } from '../../backend';
import { useLocation } from 'react-router-dom';
import ModalUpdate from './ModalUpdate';
import ModalDelete from './ModalDelete';

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
const style_buttons = {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
}

const UpdateType = () => {
  const colors = useStyle()
  const [sousType, setSousType] = useState([])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const location = useLocation()
  const [state, setState] = useState({
    nom: location.state.nom_type,
    id: location.state.id_type,
  })
  const [modify, setModify] = useState(false)
  const [delete_, setDelete] = useState(false)

  useEffect(() => {
    const fetchAllData = async () => {
     let inter = []
     Object.keys(view_charge).map(e => {
        if (view_charge[e].id_type === state.id && view_charge[e].id_sous_type !== null) {
            inter.push({
              nom_sous_type: view_charge[e].nom_sous_type,
              id_sous_type: view_charge[e].id_sous_type,
              deleted_sous_type: view_charge[e].deleted_sous_type
            })
            console.log(view_charge[e])
        }
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
      setSousType(uniqueArray)
      console.log(uniqueArray)
    }
    fetchAllData()
  }, [2000])

  const filteredSousType = sousType.filter(obj =>
    Object.keys(obj).some(key =>
      obj[key].toString().toLowerCase().includes(search)
    )
  );

    return (
      <>
      {modal && <AddType
              setShowModal={setModal}
              showModal={modal}
              detail={sousType}
              colors={colors.root}
              setDetail={setSousType}
              id={state.id}
              type='sous type'
              nom_type='nom_sous_type'
              path={`charges/types/${state.id}`}
            />}
        {modify && <ModalUpdate
              setShowModal={setModify}
              showModal={modify}
              type='type'
              detail={state}
              id={state.id}
              colors={colors.root}
              setDetail={setState}
            />}
      {delete_ && <ModalDelete
              setDelete={setDelete}
              _delete={delete_}
              detail={state}
              setDetail={setState}
              colors={colors.root}
              id={state.id}
              type='type'
            />}
        <NavigationBar name={`sous type de ${state.nom}`} />
        <div className='nav-search-add'>
            <div style={style_buttons}>

        <Button
           onClick={() => { setModal(true) }}
           sx={{
              color: 'var(--brand-1)',
              border: '1px solid var(--brand-1)',
          }} >ajouter sous type</Button>
          <Button
           onClick={() => { setModify(true) }}
           sx={{
              color: 'var(--brand-1)',
              border: '1px solid var(--brand-1)',
          }} >modifier</Button>
          <Button
           onClick={() => { setDelete(true) }}
           sx={{
              color: 'var(--brand-1)',
              border: '1px solid var(--brand-1)',
          }} >supprimer</Button>
            </div>
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
          {filteredSousType.map((e, i) => (
            <CardSousType 
              key={i} 
              nom={e.nom_sous_type} 
              id={e.id_sous_type}
              id_type={state.id}
              deleted={e.deleted_sous_type}
              />
          ))}
        </div>
      </>
    )
}

export default UpdateType