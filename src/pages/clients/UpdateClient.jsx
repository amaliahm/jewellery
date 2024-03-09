import * as React from 'react';
import { useState, useEffect } from "react";
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { TextField } from "@mui/material"
import { makeStyles } from "@mui/styles";
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import TableData from './restData';
import { client } from '../../backend';
import { export_details_to_pdf } from '../home/telecharger_details';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    const [data, setData] = useState({})
    const [supprimer, setSupprimer] = useState(false)

    useEffect(() => {
      const fetchAllData = () => {
        Object.keys(client).map((e, i) => {
          if (client[i].id_client === location.state) {
            setData({
              id_client: client[i].id_client === null ? '' : client[i].id_client,
              is_deleted: client[i].is_deleted === null ? '' : client[i].is_deleted,
              nom: client[i].nom_client === null ? '' : client[i].nom_client,
              wilaya: client[i].wilaya === null ? '' : client[i].wilaya,
              ville: client[i].ville === null ? '' : client[i].ville,
              adresse: client[i].adresse === null ? '' : client[i].adresse,
              titre: client[i].valeur === null ? '' : client[i].valeur,
              telephone: client[i].telephone === null ? '' : client[i].telephone,
              email: client[i].email === null ? '' : client[i].email,
              solde: client[i].solde === null ? '' : client[i].solde,
              'or': client[i].total_or === null ? '' : client[i].total_or,
              'versement or': client[i].total_versement_or === null ? '' : client[i].total_versement_or,
              'versement argent': client[i].total_versement_argent === null ? '' : client[i].total_versement_argent,
              'perte': client[i].total_perte === null ? '' : client[i].total_perte,
              'retour or': client[i].total_retour_or === null ? '' : client[i].total_retour_or,
              'retour argent': client[i].total_retour_argent === null ? '' : client[i].total_retour_argent,
              'reste or': client[i].reste_or === null ? '' : client[i].reste_or,
              'reste argent': client[i].reste_argent === null ? '' : client[i].reste_argent,
              NRC: client[i].NRC === null ? '' : client[i].NRC,
              NIF: client[i].NIF === null ? '' : client[i].NIF,
              NIS: client[i].NIS === null ? '' : client[i].NIS,
              'n=° article': client[i].N_art === null ? '' : client[i].N_art,
            })
          }
        })
      }
      fetchAllData()
    }, [2000])

    const handleDownload = async () => {
      const pdf = new jsPDF();
      const content = document.getElementById('pdf-content');
      const canvas = await html2canvas(content);
      pdf.setFont('Courier Prime');
      pdf.text('This is styled text', 10, 200, { align: 'right' });
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20, { align: 'center' });
      pdf.text(`Time: ${new Date().toLocaleTimeString()}`, 10, 30);
      pdf.text('Name: John Doe', 10, 40);
      pdf.save('eurl bn zahav.pdf');
    };

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
              <i className="fa-solid fa-download fa-xl" style={{color: 'var(--brand-1)'}} onClick={() => export_details_to_pdf(data) }></i>
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

export default UpdateClient