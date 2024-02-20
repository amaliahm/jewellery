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
import { useState } from "react";
import { TextField } from "@mui/material"
import { useEffect } from 'react';

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

export default function ModalUpdate({showModal, setShowModal,detail, ...props}) {
    const handleClose = () => setShowModal(false);
    const [inter, setInter] = useState({})

    useEffect(() => {
      setInter({
        id_client: detail.id_client,
        nom: detail.nom,
        telephone: detail.telephone,
        email: detail.email,
        adresse: detail.adresse,
        ville: detail.ville,
        wilaya: detail.wilaya,
      });
    }, [detail]);

    const [confirm, setConfirm] = useState(false)
  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `clients/${detail.id}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
    const handleChange = (e) => {
      setInter(c => ({...c, [e.target.name] : e.target.value}))
    }
  
    const hanldeConfirm = async () => {
      props.setDetail(d => ({
        ...d,
        ...inter,
      }))
      setShowModal(false)
      setConfirm(true)
      setTimeout(() => {
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
              Update {inter.nom}
            </Typography>
            <TextField 
              id={"outlined-read-only-input"}
              label='nom' variant="outlined"
              type='text'
              sx={style_textField}
              name='nom'
              className={props.colors}
              onChange={handleChange}
              defaultValue={inter.nom}
              />
            <TextField 
              id={"outlined-read-only-input"}
              label='telephone' variant="outlined"
              type='number'
              sx={style_textField}
              name='telephone'
              className={props.colors}
              onChange={handleChange}
              defaultValue={inter.telephone}
             />
            <TextField 
              id={"outlined-read-only-input"}
              label='email' variant="outlined"
              sx={style_textField}
              name='email'
              className={props.colors}
              onChange={handleChange}
              defaultValue={inter.email}
              />
            <TextField 
              id={"outlined-read-only-input"}
              label='adresse' variant="outlined"
              sx={style_textField}
              name='adresse'
              className={props.colors}
              onChange={handleChange}
              defaultValue={inter.adresse}
              />
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <SelectedMenu name='wilaya' options={wilayas} setValue={setInter} valeur={inter}/>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <SelectedMenu name='ville' options={display(inter.wilaya)} setValue={setInter} valeur={inter}/>
              </FormControl>
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter.wilaya === "" || inter.ville === '' || inter.nom == '' || inter.telephone === ''}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }