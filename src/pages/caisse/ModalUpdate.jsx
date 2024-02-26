import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { api } from '../../backend';
import axios from 'axios';
import Notification from '../home/notification';
import { useState } from "react";
import { TextField } from "@mui/material"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'var(--bg-color-2)',
  border: '1px solid var(--brand-1)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 3,
};

const div_style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
}

const button_box = {
  display: 'flex',
  width: '50%',
  justifyContent: 'space-between',
  p: 1,
  margin: 'auto',
}

const button_style = {
  color: 'white',
  bgcolor: 'var(--bg-color-1)',
  border: '1px solid var(--brand-1)',
};

const confirme_button_style = {
  bgcolor: 'var(--brand-1)',
  border: '1px solid var(--brand-1)',
  '&:hover' : {
    color: 'white',
  },
  '&:disabled' : {
    bgcolor: 'transparent',
  }
};

const style_textField = {
  borderColor: "transparent",
  margin: '5px',
}

export default function ModalUpdate({showModal, setShowModal, ...props}) {
    const handleClose = () => setShowModal(false);
    const [inter, setInter] = useState(props.detail)
    const [confirm, setConfirm] = useState(false)

  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `caisse/${props.detail.id_caisse}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
    const hanldeConfirm = async () => {
      console.log(inter)
      setInter(i => ({
        ...i,
        CUMP: 
        inter.mouvement === 'ENTRER' ? ((parseFloat(inter.ancien_valeur) + parseFloat(inter.total) ) / parseFloat(inter.quantite_restant)).toFixed(2)
        : ((parseFloat(inter.ancien_valeur) - parseFloat(inter.total) ) / parseFloat(inter.quantite_restant)).toFixed(2),
        valeur_restant: parseFloat(inter.quantite_restant) * inter.mouvement === 'ENTRER' ? ((parseFloat(inter.ancien_valeur) + parseFloat(inter.total) ) / parseFloat(inter.quantite_restant)).toFixed(2)
        : ((parseFloat(inter.ancien_valeur) - parseFloat(inter.total) ) / parseFloat(inter.quantite_restant)).toFixed(2),
      }))
      props.setDetail(inter)
      setConfirm(true)
      setTimeout(() => {
        setConfirm(false)
        setShowModal(false)
      }, 2000)
      await update(inter)
    }
    
    return (
      <div>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
        <Modal
          open={showModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            ...style,
            minHeight: 300,
          }}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{mb: '20px',}}>
              Update l'operation
            </Typography>
            <div className={div_style}>
            <TextField 
                 id={"outlined-controlled"}
                 label='quantite' variant="outlined"
                 type='number'
                 sx={style_textField}
                 name='quantite'
                 className={props.colors}
                 onChange={(e) => {
                     setInter(c => ({
                         ...c,
                         quantite: parseFloat(e.target.value),
                         total: parseFloat(e.target.value) * parseFloat(inter.prix_unitaire),
                         quantite_restant: inter.mouvement === 'ENTRER' ? parseFloat(inter.ancien_quantite) + parseFloat(e.target.value) : parseFloat(inter.ancien_quantite) - parseFloat(e.target.value),
                     }))
                 }}
                 value={inter.quantite}
                />
                <TextField 
                 id={"outlined-controlled"}
                 label='prix_unitaire' variant="outlined"
                 type='number'
                 sx={style_textField}
                 name='prix_unitaire'
                 className={props.colors}
                 onChange={(e) => {
                     setInter(c => ({
                         ...c,
                         prix_unitaire: parseFloat(e.target.value),
                         total: parseFloat(e.target.value) * parseFloat(inter.quantite),
                     }))
                 }}
                 value={inter.prix_unitaire}
                />

                <TextField 
                  id={"outlined-controlled"}
                  label='total' variant="outlined"
                  type='number'
                  sx={style_textField}
                  name='total'
                  disabled
                  className={props.colors}
                  value={inter.total}
                 />
                 

            </div>
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter.total === 0}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }