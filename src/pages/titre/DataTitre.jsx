import * as React from 'react';
import { useState, useEffect } from "react";
import NavigationBar from "../home/NavigationBar"
import { useLocation } from "react-router-dom"
import { TextField, Button } from "@mui/material"
import { makeStyles } from "@mui/styles";
import ModalDelete from './deleteTitre';
import ModalUpdate from './updateTitre';
import { useNavigate } from 'react-router-dom';
import TableData from './resteData';


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

const style ={
  marginTop: '80px',
  marginRight: '10px',
  width: '95vw',
  padding: '10px',
}

const UpdateTitre = () => {
    const colors = useStyle()
    const location = useLocation()
    const [modal, setModal] = useState(false);
    const [m_delete, setM_Delete] = useState(false)
    const [data, setData] = useState(location.state)

    return (
        <>
          <NavigationBar name={`titre: ${data.titre}`}/>
          <div style={style}>
          </div>
          <div className="add" style={{marginTop: '10px', background: 'rgba(255, 255, 255, 0)'}} >
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
            <TableData />
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

export default UpdateTitre