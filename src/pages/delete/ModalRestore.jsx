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


export default function ModalRestore({restore, setRestore, detail, all_data, setAllData, ...props}) {
    const handleClose = () => setRestore(false);
    const [confirme, setConfirme] = useState(false)
    console.log(detail)
  
    const hanldeDelete = async () => {
      setConfirme(true)
      const inter = []
      Object.keys(all_data).map((e, i) => {
        if (all_data[e] !== detail) {
            inter.push(all_data[e])
        }
      })
      setAllData(inter)
      
      setTimeout(() => {
        setRestore(false)
        setConfirme(false)
        
      }, 2000)
      let to_delete = {
        type:  'restore',
        ...detail
      }
      try {
        const result = await axios.delete( api + `trash` , {data: to_delete})
        if(result.status === 200) {
        }
      } catch (error) {
          return
      }
    }
  
    return (
      <div>
        <Modal
          open={restore}
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
              Restore {detail.data}!!
            </Typography>
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeDelete}
              >restore</Button>
            </Box>
          </Box>
        </Modal>
        {confirme && <Notification name={`${detail.data} n'a pas été supprimée'`}/>}
      </div>
    );
  }