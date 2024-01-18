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
import { titre } from '../../data';
import SelectedMenu from '../home/SelectedMenu';

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
    const [confirm, setConfirm] = useState(false)
    const [fournisseur, setFournisseur] = useState([])

    useEffect(() => {
        const fetchAllData = async () => {
            let __fournisseur = result.data.fournisseurs
            setFournisseur(__fournisseur)
            }
            fetchAllData()
    }, [])
  
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
        [e.target.name] : parseInt(e.target.value),
      }))
    }
  
    const hanldeConfirm = async () => {
      console.log(inter)
      props.setDetail(d => ({
        ...d,
        ...inter,
        'net 750': ((parseInt(inter['or v']) - parseInt(inter.fonte)) * parseInt(inter.titre) / 750).toFixed(3),
        ecart: (parseInt(inter['or v']) - ((parseInt(inter['or v']) - parseInt(inter.fonte)) * parseInt(inter.titre) / 750)).toFixed(3),
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
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{mb: '20px',}}>
              Update {inter['versement n=°']}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setInter} valeur={inter} show={false}/>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <SelectedMenu name='titre' options={titre} setValue={setInter} valeur={inter}/>
            </FormControl>
            <div className={div_style}>

            {Object.keys(inter).slice(4).map((e, i) => (
                <>
                {(i <= 5) && <TextField 
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
                disabled={inter.fournisseur === "" || inter.titre === '' || inter['versement argent'] === 0 || inter['versement or'] === 0 || inter['retour argent'] === 0 || inter['retour or'] === 0 || inter['or v'] === 0 || inter['fonte'] === 0}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }