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

export default function ModalUpdate({showModal, setShowModal, ...props}) {
    const handleClose = () => setShowModal(false);
    const [inter, setInter] = useState(props.detail)
    const [confirm, setConfirm] = useState(false)


  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `magasins`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
  
    const hanldeConfirm = async () => {
        let my_data = []
        Object.keys(props.all_data).map((e, i) => {
            console.log(props.all_data[e])
            if(props.all_data[e].id_magasin !== inter.id_magasin) {
                my_data.push(props.all_data[e])
            } 
        })
        my_data.unshift(inter)
      props.setDetail(my_data)
      console.log(props.all_data)
      console.log(props.detail)
      console.log(my_data)
      console.log(inter)
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
              Update {inter.nom_magasin}
            </Typography>
            <TextField 
              id={"outlined-controlled"}
              label='magasin' variant="outlined"
              type='text'
              sx={style_textField}
              name='magasin'
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
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }