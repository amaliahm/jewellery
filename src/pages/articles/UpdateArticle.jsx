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
      id_fournisseur: location.state.id_fournisseur,
      id_famille: location.state.id_famille,
      deleted_article: location.state.deleted_article,
      id_article: location.state.id_article,
      nom_article: location.state.nom_article,
      fournisseur: location.state.nom_fournisseur,
      'prix achat': location.state.prix_achat,
      'prix vente': location.state.prix_vente,
      'prix moyenne': location.state.prix_moyenne,
      'quantite de stock': location.state.quantite_stock,
      'stock min': location.state.stock_min,
      'valeur de stock': location.state.valeur_stock,
      'mode de gestion': location.state.mode_de_gestion,
    })

    return (
        <>
          <NavigationBar name={data.nom_article}/>
          <div className="add">
            {Object.keys(data).slice(4).map(value => (
                   <TextField 
                   id={"outlined-controlled"}
                   label={value} variant="outlined"
                   sx={{
                     borderColor: "transparent",
                     margin: '10px'
                   }}
                   name={value}
                   className={colors.root}
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
            {modal && <ModalUpdate
              setShowModal={setModal}
              showModal={modal}
              detail={data}
              colors={colors.root}
              setDetail={setData}
            />}
            {m_delete && <ModalDelete
              setDelete={setM_Delete}
              _delete={m_delete}
              detail={data}
              colors={colors.root}
              famille={location.state.id}
            />}
          </div>
          <TableData reste={data} />
        </>
    )
}

export default UpdateArticle