import * as React from 'react';
import { useState } from "react";
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { TextField } from "@mui/material"
import { makeStyles } from "@mui/styles";
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import TableData from './restData';

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

const UpdateClient = () => {
    const colors = useStyle()
    const location = useLocation()
    const [modal, setModal] = useState(false);
    const [m_delete, setM_Delete] = useState(false)
    const [data, setData] = useState({
      id: location.state.id,
      nom: location.state.nom,
      wilaya: location.state.wilaya,
      ville: location.state.ville,
      telephone: location.state.telephone,
      email: location.state.email,
      titre: location.state.titre,
      'chiffre d\'affaire': location.state['chiffre d\'affaire'],
      'total or': location.state['total or'],
      'total versement or': location.state['total vo'],
      'total versement argent': location.state['total va'],
      'total perte': location.state['total perte'],
      'total retour or': location.state['total ro'],
      'total retour argent': location.state['total ra'],
      'reste or': location.state['reste o'],
      'reste argent': location.state['reste a'],
    })

    return (
        <>
          <NavigationBar name={data.nom}/>
          <div className="add">
            {Object.keys(data).slice(1).map(value => (
                   <TextField 
                   id={"outlined-controlled"}
                   label={value} variant="outlined"
                   sx={{
                     borderColor: "transparent",
                     margin: '10px'
                   }}
                   name={value}
                   className={colors.root}
                   onChange={() => {}}
                   value={data[value]}
                   disabled
                   />
            ))}
            <div style={{
              height: '50px',
              width: '100px',
              position: 'absolute',
              right: '10px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
              <i className="fa-solid fa-pen fa-xl" style={{color: 'var(--brand-1)'}} onClick={() => setModal(true)}></i>
              <i className="fa-solid fa-trash fa-xl" style={{color: 'red'}} onClick={() => setM_Delete(true)}></i>
            </div>
            <ModalUpdate
              setShowModal={setModal}
              showModal={modal}
              detail={data}
              colors={colors.root}
              setDetail={setData}
            />
            <ModalDelete
              setDelete={setM_Delete}
              _delete={m_delete}
              detail={data}
              colors={colors.root}
            />
          </div>
          <TableData nom={data.nom} />
        </>
    )
}

export default UpdateClient