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
    const [fournisseur, setFournisseur] = useState([])
    const [famille, setFamille] = useState([])
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const fetchAllData = async () => {
            let data = result.data.articles
            setArticles(data)
            let __fournisseur = result.data.fournisseurs
            setFournisseur(__fournisseur)
            const famille = [...new Set(
                data.map(item => item.famille))]
                setFamille(famille)
            }
            fetchAllData()
    }, [])
  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `produits/${props.famille}/${props.detail.id}`, data)
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
      setShowModal(false)
      setConfirm(true)
      setTimeout(() => {
        setConfirm(false)
      }, 2000)
      await update(inter)
    }

    function displayFamille(name) {
        const result = []
        Object.keys(articles).map((e, i) => {
          if (articles[e].famille === name) {
            result.push(articles[e]["article"] )
          }
        })
        return result
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
              Update {inter["article"]}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setInter} valeur={inter} show={false}/>
            </FormControl>
            <TextField 
              id={"outlined-controlled"}
              label="article" variant="outlined"
              type='text'
              sx={style_textField}
              name="article"
              className={props.colors}
              onChange={(e) => {
                setInter(c => ({
                    ...c,
                    "article": e.target.value.toUpperCase(),
                }))
              }}
              value={inter["article"]}
             />
             <TextField 
               id={"outlined-controlled"}
               label="designation d'article" variant="outlined"
               type='text'
               sx={style_textField}
               name="designation d'article"
               className={props.colors}
               onChange={(e) => {
                 setInter(c => ({
                     ...c,
                     "designation d'article": e.target.value.toUpperCase(),
                 }))
               }}
               value={inter["designation d'article"]}
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
                }))
              }}
              value={inter['prix unitaire']}
             />
            <TextField 
              id={"outlined-controlled"}
              label='stock min' variant="outlined"
              type='text'
              sx={style_textField}
              name='stock min'
              className={props.colors}
              onChange={() => {
                setInter(c => ({
                    ...c,
                    "stock min": e.target.value,
                }))
              }}
              value={inter['stock min']}
              />
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter.famille === "" || inter["article"] === '' || inter.fournisseur == '' || inter['quantite de stock'] === 0 || inter['prix unitaire'] === 0}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }