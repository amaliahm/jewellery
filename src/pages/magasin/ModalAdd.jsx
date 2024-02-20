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
import { add_magasin } from './data';

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
  margin: '10px',
}

export default function ModalAdd({showModal, setShowModal, ...props}) {
    const handleClose = () => setShowModal(false);
    const [inter, setInter] = useState(add_magasin)
    const [confirm, setConfirm] = useState(false)


  
    const update = async (data) => {
      try {
          const result = await axios.post(api + 'magasins', data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
  
    const hanldeConfirm = async () => {
      const local_var = props.detail
      local_var.unshift(inter)
      props.setDetail(local_var)
      setConfirm(true)
      setTimeout(() => {
        setShowModal(false)
        setConfirm(false)
      }, 2000)
      await update(inter)
      setInter(add_magasin)
    }

    return (
      <div>
        <Modal
          open={showModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            ...style,
            minHeight: 200,
          }}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{mb: '20px'}}>
              Ajouter magasin {inter.nom_magasin}
            </Typography>
            <TextField 
              id={"outlined-controlled"}
              label='magasin' variant="outlined"
              type='text'
              sx={style_textField}
              name='nom_magasin'
              className={props.colors}
              onChange={(e) => {
                setInter(c => ({
                    ...c,
                    nom_magasin: e.target.value.toUpperCase(),
                }))
              }}
              value={inter.nom_magasin}
             />
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter.nom_magasin === "" }
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={inter.nom_magasin + ' a été enregitrées'}/>}
      </div>
    );
  }