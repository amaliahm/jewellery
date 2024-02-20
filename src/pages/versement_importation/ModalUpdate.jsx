import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SelectedMenu from '../home/SelectedMenu';
import { FormControl } from '@mui/material';
import { api } from '../../backend';
import axios from 'axios';
import Notification from '../home/notification';
import { useState, useEffect } from "react";
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
    const devise = ['$', '€']

    useEffect(() => {
    }, [])
  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `importations/versement_importation/${props.detail.id_versement_importation}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
    const hanldeConfirm = async () => {
      setInter(i => ({
        ...i,
        'poid 24k' : inter['poid 18k'] * inter.titre / 1000,
        versement : inter.devise === '$' ? inter['versement $'] : (inter['change €/$'] * inter['versement €']),
      }))
      props.setDetail(d => ({
        ...d,
        'change €/$': inter['change €/$'],
        'poid 18k': inter['poid 18k'],
        'poid 24k': inter['poid 24k'],
        titre: inter.titre,
        versement: inter.versement,
        'versement $': inter['versement $'],
        'versement €': inter['versement €'],
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
              Update {inter['versement importation n=°']}
            </Typography>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <SelectedMenu name='devise' options={devise} setValue={setInter} valeur={inter}/>
                </FormControl>
                <TextField 
                    id="outlined-controlled"
                    label='poid 18k' variant="outlined"
                    onChange={(e) => {
                      setInter(v => ({
                        ...v,
                        'poid 18k': parseFloat(e.target.value),
                        'poid 24k': parseFloat(e.target.value) * inter.titre / 1000,
                      }))
                    }}
                    type='number'
                    sx={style_textField}
                    name='poid 18k'
                    className={props.colors}
                    value={inter['poid 18k']}
                />
                <TextField 
                    disabled
                    id="outlined"
                    label='poid 24k' variant="outlined"
                    type='number'
                    sx={style_textField}
                    name='poid 24k'
                    className={props.colors}
                    value={inter['poid 24k']}
                />
                {inter.devise === '$' && <TextField 
                    id="outlined-controlled"
                    label='versement $' variant="outlined"
                    onChange={(e) => {
                      setInter(v => ({
                        ...v,
                        'versement $' : inter.devise === '€' ? (inter['change €/$'] * inter['versement €']) : parseFloat(e.target.value),
                        versement : inter.devise === '$' ? parseFloat(e.target.value) : (inter['change €/$'] * inter['versement €']),

                      }))}}
                    type='number'
                    sx={style_textField}
                    name='versement $'
                    className={props.colors}
                    value={inter['versement $']}
                />}

                
                {inter.devise === '€' && <>
                <TextField 
                    id="outlined-controlled"
                    label='versement €' variant="outlined"
                    onChange={(e) => {
                      setInter(v => ({
                        ...v,
                        'versement €': parseFloat(e.target.value),
                        versement : inter.devise === '$' ? inter['versement $'] : (inter['change €/$'] * parseFloat(e.target.value)),
                      }))}}
                    type='number'
                    sx={style_textField}
                    name='versement €'
                    className={props.colors}
                    value={inter['versement €']}
                />
                <TextField 
                    id="outlined-controlled"
                    label='change €/$' variant="outlined"
                    onChange={(e) => {
                      setInter(v => ({
                        ...v,
                        'change €/$': parseFloat(e.target.value),
                        versement : inter.devise === '$' ? inter['versement $'] : (parseFloat(e.target.value) * inter['versement €']),
                      }))}}
                    type='number'
                    sx={style_textField}
                    name='change €/$'
                    className={props.colors}
                    value={inter['change €/$']}
                />
                </>}
                
                <TextField 
                    disabled
                    id="outlined"
                    label='versement' variant="outlined"
                    type='number'
                    sx={style_textField}
                    name='versement'
                    className={props.colors}
                    value={inter.versement}
                />
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter['poid 18k'] === 0 || inter.versement === 0}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }