import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SelectedMenu from '../home/SelectedMenu';
import { wilayas, display } from '../../wilaya';
import { FormControl } from '@mui/material';
import { api } from '../../backend';
import axios from 'axios';
import Notification from '../home/notification';
import { useState, useEffect } from "react";
import { TextField } from "@mui/material"
import SelectedFournisseur from '../home/SelectedFournisseur';
import { result } from "../../backend";

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

export default function ModalUpdate({showModal, setShowModal, ...props}) {
    const handleClose = () => setShowModal(false);
    const [inter, setInter] = useState(props.detail)
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
    }, [])
  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `importations/achat_importation/${props.detail.id_achat_importation}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
    const hanldeConfirm = async () => {
      props.setDetail(d => ({
        ...d,
        ...inter,
      }))
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
            minHeight: 300,
          }}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{mb: '20px'}}>
              Update {inter['achat importation n=°']}
            </Typography>
            <TextField 
              id={"outlined-controlled"}
              label='poid 18k' variant="outlined"
              type='number'
              sx={style_textField}
              name='pid 18k'
              className={props.colors}
              onChange={(e) => {
                setInter(c => ({
                    ...c,
                    'poid 18k': parseFloat(e.target.value),
                    'poid 24k': (parseFloat(e.target.value) * 750 / 1000).toFixed(2),
                    total: parseFloat(e.target.value) * inter['prix unitaire']
                }))
              }}
              value={inter['poid 18k']}
             />
             <TextField 
               id={"outlined"}
               label='poid 24k' variant="outlined"
               type='number'
               sx={style_textField}
               name='poid 24k'
               className={props.colors}
               onChange={() => {}}
               value={inter['poid 24k']}
               disabled
               />
            <TextField 
              id={"outlined-controlled"}
              label='prix unitaire' variant="outlined"
              type='number'
              sx={style_textField}
              name='prix unitaire'
              className={props.colors}
              onChange={(e) => {
                setInter(c => ({
                    ...c,
                    'prix unitaire': parseFloat(e.target.value),
                    total: (inter['poid 18k'] * parseFloat(e.target.value)).toFixed(2)
                }))
              }}
              value={inter['prix unitaire']}
             />
            <TextField 
              id={"outlined"}
              label='total' variant="outlined"
              type='number'
              sx={style_textField}
              name='total'
              className={props.colors}
              onChange={() => {}}
              value={inter.total}
              disabled
              />
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter['poid 18k'] === 0 || inter['prix unitaire'] === 0}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }