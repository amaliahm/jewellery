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
    console.log(props.detail)
    const [confirm, setConfirm] = useState(false)

  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `retours/${props.detail.id}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
    const handleChange = (e) => {
      setInter(c => ({
        ...c,
        [e.target.name] : parseFloat(e.target.value),
      }))
    }
  
    const hanldeConfirm = async () => {
      console.log(inter)
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
              Update {inter.type === 'client' ? inter['retour client n=°'] : inter['retour fournisseur n=°']}
            </Typography>
            <div className={div_style}>

            {Object.keys(inter).slice(8).map((e, i) => (
                <>
                {(i <= 1) && <TextField 
                  id={"outlined-controlled"}
                  label={e} variant="outlined"
                  type='number'
                  sx={style_textField}
                  name={e}
                  className={props.colors}
                  onChange={handleChange}
                  value={inter[e]}
                 />}
                </>
            ))}
            </div>
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }