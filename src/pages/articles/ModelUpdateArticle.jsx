import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl } from '@mui/material';
import { api } from '../../backend';
import axios from 'axios';
import Notification from '../home/notification';
import { useState } from "react";
import { TextField } from "@mui/material"
import { useEffect } from 'react';
import { fournisseur } from '../../backend';
import SelectedFournisseur from '../home/SelectedFournisseur';

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
        id_fournisseur: detail.id_fournisseur,
        id_article: detail.id_article,
        fournisseur: detail.nom_fournisseur,
        nom_article: detail.nom_article,
        'prix achat': detail['prix achat'],
        'prix vente': detail['prix vente'],
        'stock min': detail['stock min'],
        'valeur de stock': detail['valeur de stock'],
        'mode de gestion': detail['mode de gestion'],
      });
    }, [detail]);

    const [confirm, setConfirm] = useState(false)
  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `produits/${detail.id_famille}/${detail.id_article}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
    const handleChange = (e) => {
      setInter(c => ({...c, [e.target.name] : e.target.value.toUpperCase()}))
    }
  
    const handlePrixChange = (e) => {
      setInter(c => ({...c, [e.target.name] : parseFloat(e.target.value)}))
    }
  
    const hanldeConfirm = async () => {
      props.setDetail(d => ({
        ...d,
        id_fournisseur: inter.id_fournisseur,
        id_article: inter.id_article,
        fournisseur: inter.fournisseur,
        nom_article: inter.nom_article,
        'prix achat': inter['prix achat'],
        'prix vente': inter['prix vente'],
        'stock min': inter['stock min'],
        'valeur de stock': inter['valeur de stock'],
        'mode de gestion': inter['mode de gestion'],
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
              Update {inter.nom}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setInter} valeur={inter} show={false} bool_article={false}/>
            </FormControl>
            {Object.keys(inter).slice(3).map((value , index)=> (
              <>
              {index <= 5 &&  <TextField 
                id={"outlined-controlled"}
                label={value} variant="outlined"
                type={index === 0 || index === 5 ? 'text' : 'number'}
                sx={style_textField}
                name={value}
                className={props.colors}
                onChange={index === 0 || index === 5 ? handleChange : handlePrixChange}
                value={inter[value]}
                />}
              </>
              ))}
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter.nom_article === "" || inter['prix achat'] === 0 || inter['prix vente'] === 0}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }