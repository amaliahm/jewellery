import * as React from 'react';
import { useState } from "react";
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { TextField } from "@mui/material"
import { makeStyles } from "@mui/styles";
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import { exportBonToPdf } from '../home/telechargerBonVersement';
import { client, fournisseur } from '../../backend';

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

const UpdateVersement = () => {
    const colors = useStyle()
    const location = useLocation()
    const [modal, setModal] = useState(false);
    const [m_delete, setM_Delete] = useState(false)
    const [data, setData] = useState(location.state)

    console.log(data)

    return (
        <>
          <NavigationBar name={data.type === 'client' ? data['versement client n=°'] :  data['versement fournisseur n=°']}/>
          <div className="add">
            {Object.keys(data).slice(5).map(value => (
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
              <i className="fa-solid fa-download fa-xl" style={{color: 'var(--brand-1)'}} onClick={() => {
                let data__ = data
                if (data.type === 'client') {
                  Object.keys(client).map((e, i) => {
                    if (client[e].id_client === data.id_client) {
                      data__ = ({
                        ...data__,
                        wilaya: client[e].wilaya,
                        ville: client[e].ville,
                        adresse: client[e].adresse,
                        telephone: client[e].telephone
                      })
                    }
                  })
                  exportBonToPdf(data__, "de versement client")
                } else {
                  Object.keys(fournisseur).map((e, i) => {
                    if (fournisseur[e].id_fournisseur === data.id_fournisseur) {
                      data__ = ({
                        ...data__,
                        wilaya: fournisseur[e].wilaya,
                        ville: fournisseur[e].ville,
                        adresse: fournisseur[e].adresse,
                        telephone: fournisseur[e].telephone
                      })
                    }
                  })
                  exportBonToPdf(data__, "de versement fournisseur")
                }
                console.log(data__.type)
              }}></i>
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
            />}
          </div>
        </>
    )
}

export default UpdateVersement