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

export default function ModalUpdate({showModal, setShowModal, detail, ...props}) {
    const handleClose = () => setShowModal(false);
    const [inter, setInter] = useState(detail)
    const [confirm, setConfirm] = useState(false)
    console.log(inter)


  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `titres/${data.id_titre}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
  
    const hanldeConfirm = async () => {
      props.setDetail(inter)
      setInter({})
      setConfirm(true)
      setTimeout(() => {
        setShowModal(false)
        setConfirm(false)
      }, 2000)
      await update(inter)
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
              Update {inter.titre}
            </Typography>
            <TextField 
              id={"outlined-controlled"}
              label='titre' variant="outlined"
              type='number'
              sx={style_textField}
              name='titre'
              className={props.colors}
              onChange={(e) => {
                setInter(c => ({
                    id_titre: detail.id_titre,
                    titre: parseFloat(e.target.value),
                }))
              }}
              value={inter.titre}
             />
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter.titre === "" || inter.titre === "0"}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }