import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { api } from '../../backend';
import axios from 'axios';
import Notification from '../home/notification';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

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


export default function ModalDelete({_delete, setDelete, type, ...props}) {
    const handleClose = () => setDelete(false);
    const [supprimer, setSupprimer] = useState(false)
    const navigate = useNavigate()
    console.log(props.detail)
  
    const hanldeDelete = async () => {
      setSupprimer(true)
      setTimeout(() => {
        setDelete(false)
        setSupprimer(false)
        navigate( '/achats')
      }, 2000)
      let to_delete = {
        type: type,
        ...props.detail
      }
      try {
        const result = await axios.delete(type === 'total_achats' ? api + `achats/${props.detail.id_total_achat}`  : api + `achats/${props.detail.id_achat}/${props.detail.id_achat}` , {data: to_delete})
        if(result.status === 200) {
        }
      } catch (error) {
          return
      }
    }
  
    return (
      <div>
        <Modal
          open={_delete}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            ...style,
            width: 500,
            p: 4
          }}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{mb: '20px'}}>
              Supprimer l'achat!!
            </Typography>
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeDelete}
              >supprimer</Button>
            </Box>
          </Box>
        </Modal>
        {supprimer && <Notification name={`cette achat a été supprimée'`}/>}
      </div>
    );
  }