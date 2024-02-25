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
import {FormControl} from '@mui/material';
import SelectedMenu from '../home/SelectedMenu';

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
    const niveau_de_stock = ['local', 'person']

  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `casse/${props.detail.id_casse}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
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
              Update {inter['casse n=°']}
            </Typography>
            <div className={div_style}>
            <TextField 
                  id={"outlined-controlled"}
                  label='poid' variant="outlined"
                  type='number'
                  sx={style_textField}
                  name='poid'
                  className={props.colors}
                  onChange={(e) => {
                    if (inter.operation === 'achat' || inter.operation === 'vente') {
                        setInter(c => ({
                            ...c,
                            poid : parseFloat(e.target.value),
                            total: parseFloat(e.target.value).toFixed(2) * inter.prix,
                            nouveau_solde : parseFloat(e.target.value).toFixed(2) * inter.prix + inter.ancien_solde,
                        }))
                    } else {
                        setInter(c => ({
                            ...c,
                            poid : parseFloat(e.target.value)
                        }))
                        }
                  }}
                  value={inter.poid}
                 />
                 {(inter.operation === 'achat' || inter.operation === 'vente') && <TextField 
                  id={"outlined-controlled"}
                  label='prix' variant="outlined"
                  type='number'
                  sx={style_textField}
                  name='prix'
                  className={props.colors}
                  onChange={(e) => {
                      setInter(c => ({
                          ...c,
                          prix : parseFloat(e.target.value),
                          total: parseFloat(e.target.value).toFixed(2) * inter.poid,
                          nouveau_solde : parseFloat(e.target.value).toFixed(2) * inter.poid + inter.ancien_solde,
                      }))
                  }}
                  value={inter.prix}
                 />}
                 {(inter.operation === 'achat' || inter.operation === 'vente') ? <TextField 
                  id={"outlined-controlled"}
                  label='total' variant="outlined"
                  type='number'
                  sx={style_textField}
                  name='total'
                  disabled
                  className={props.colors}
                  value={inter.total}
                 /> : <TextField 
                 id={"outlined-controlled"}
                 label='total' variant="outlined"
                 type='number'
                 sx={style_textField}
                 name='total'
                 className={props.colors}
                 onChange={(e) => {
                     setInter(c => ({
                         ...c,
                         total: parseFloat(e.target.value),
                         prix: parseFloat(e.target.value),
                         nouveau_solde : inter.ancien_solde - parseFloat(e.target.value).toFixed(2) ,
                     }))
                 }}
                 value={inter.total}
                />}

                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='niveau_stock' options={niveau_de_stock} setValue={setInter} valeur={inter} />
                </FormControl>
                <TextField 
                  id={"outlined-controlled"}
                  label='nouveau_solde' variant="outlined"
                  type='number'
                  sx={style_textField}
                  name='nouveau_solde'
                  disabled
                  className={props.colors}
                  value={inter.nouveau_solde}
                 />
                <TextField 
                 id={"outlined-controlled"}
                 label='observation' variant="outlined"
                 type='text'
                 sx={style_textField}
                 name='observation'
                 className={props.colors}
                 onChange={(e) => {
                     setInter(c => ({
                         ...c,
                         observation: e.target.value
                     }))
                 }}
                 value={inter.observation}
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