import * as React from 'react';
import { useState } from "react";
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { TextField } from "@mui/material"
import { makeStyles } from "@mui/styles";
import TableData from './restData';
import ModalUpdate from './ModelUpdateArticle';
import ModalDelete from './ModelDeleteArticle';

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

const UpdateArticle = () => {
    const colors = useStyle()
    const location = useLocation()
    const [modal, setModal] = useState(false);
    const [m_delete, setM_Delete] = useState(false)
    const [data, setData] = useState({
      id: location.state.detail.id,
      famille: location.state.detail.famille,
      fournisseur: location.state.detail.fournisseur,
      "designation d'article": location.state.detail.article,
      article: location.state.detail["designation d'article"],
      "prix unitaire": location.state.detail["prix unitaire"],
      "quantite de stock": location.state.detail["qte stock"],
      "valeur de stock": location.state.detail["valeur de stock"],
      "stock min": location.state.detail["stock min"],
      alert: location.state.detail.alert
    })

    return (
        <>
          <NavigationBar name={location.state.nom}/>
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
              famille={location.state.id}
            />
            <ModalDelete
              setDelete={setM_Delete}
              _delete={m_delete}
              detail={data}
              colors={colors.root}
              famille={location.state.id}
            />
          </div>
          <TableData nom={location.state.nom} />
        </>
    )
}

export default UpdateArticle