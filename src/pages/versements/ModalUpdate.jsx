import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl } from '@mui/material';
import { api } from '../../backend';
import axios from 'axios';
import Notification from '../home/notification';
import { useState, useEffect } from "react";
import { TextField } from "@mui/material"
import SelectedFournisseur from '../home/SelectedFournisseur';
import { result } from "../../backend";
import SelectedMenu from '../home/SelectedMenu';
import SelectedClient from '../home/SelectedClient';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
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
          const result = await axios.put(api + `versements/${props.detail.id}`, data)
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
      props.setDetail(d => ({
        ...d,
        ...inter,
        'net 750': ((parseFloat(inter['or v']) - parseFloat(inter.fonte)) * parseFloat(inter.titre) / 750).toFixed(2),
        ecart: (parseFloat(inter['or v']) - ((parseFloat(inter['or v']) - parseFloat(inter.fonte)) * parseFloat(inter.titre) / 750)).toFixed(2),
      }))
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
              Update {inter.type === 'client' ? inter['versement client n=°'] : inter['versement fournisseur n=°']}
            </Typography>
            <div className={div_style}>

            {Object.keys(inter).slice(7).map((e, i) => (
                <>
                {(i === 0 || i === 1 || i === 4 || i === 8 || i === 10) && <TextField 
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