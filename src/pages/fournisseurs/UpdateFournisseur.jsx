import * as React from 'react';
import { useState, useEffect } from "react";
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { TextField } from "@mui/material"
import { makeStyles } from "@mui/styles";
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import TableData from './restData';
import { fournisseur } from '../../backend';
import { export_details_to_pdf } from '../home/telecharger_details';

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

const UpdateFournisseur = () => {
    const colors = useStyle()
    const location = useLocation()
    const [modal, setModal] = useState(false);
    const [m_delete, setM_Delete] = useState(false)
    const [data, setData] = useState({})
    const [supprimer, setSupprimer] = useState(false)

    useEffect(() => {
      const fetchAllData = () => {
        Object.keys(fournisseur).map((e, i) => {
          if (fournisseur[i].id_fournisseur === location.state) {
            setData({
              id_fournisseur: fournisseur[i].id_fournisseur,
              is_deleted: fournisseur[i].is_deleted,
              nom: fournisseur[i].nom_fournisseur,
              wilaya: fournisseur[i].wilaya,
              ville: fournisseur[i].ville,
              adresse: fournisseur[i].adresse,
              titre: fournisseur[i].valeur,
              telephone: fournisseur[i].telephone,
              email: fournisseur[i].email,
              solde: fournisseur[i].solde,
              'or': fournisseur[i].total_or,
              'versement or': fournisseur[i].total_versement_or,
              'versement argent': fournisseur[i].total_versement_argent,
              'perte': fournisseur[i].total_perte,
              'retour or': fournisseur[i].total_retour_or,
              'retour argent': fournisseur[i].total_retour_argent,
              'reste or': fournisseur[i].reste_or,
              'reste argent': fournisseur[i].reste_argent,
              NRC: fournisseur[i].NRC,
              NIF: fournisseur[i].NIF,
              NIS: fournisseur[i].NIS,
              'n=° article': fournisseur[i].N_art,
            })
          }
        })
      }
      fetchAllData()
    }, [2000])
    
    return (
        <>
          <NavigationBar name={data.nom}/>
          <div className="add">
            {Object.keys(data).slice(2).map((value, index) => (
                   <TextField 
                   key={index}
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
              <i className="fa-solid fa-download fa-xl" style={{color: 'var(--brand-1)'}} onClick={() => export_details_to_pdf(data)}></i>
              {!supprimer && !data.is_deleted &&  <>
              <i className="fa-solid fa-pen fa-xl" style={{color: 'var(--brand-1)'}} onClick={() => setModal(true)}></i>
              <i className="fa-solid fa-trash fa-xl" style={{color: 'red'}} onClick={() => setM_Delete(true)}></i>
              </>}
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
              supprimer={supprimer}
              setSupprimer={setSupprimer}
            />
          </div>
          <TableData />
        </>
    )
}

export default UpdateFournisseur