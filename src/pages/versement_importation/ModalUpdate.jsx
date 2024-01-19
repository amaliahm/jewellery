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
import { titre } from '../../data';

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
    const [verImp, setVerImp] = useState(props.detail)
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
          const result = await axios.put(api + `importations/versement_importation/${props.detail.id}`, data)
          if(result.status === 200) {
          }
      } catch (error) {
          return
      }
    }
  
    const handleChange = (e) => {
      setVerImp(c => ({
        ...c,
        [e.target.name] : e.target.value,
        total: verImp.qte * verImp.pu
      }))
    }
  
    const hanldeConfirm = async () => {
      props.setDetail(d => ({
        ...d,
        ...verImp,
      }))
      setShowModal(false)
      setConfirm(true)
      setTimeout(() => {
        setConfirm(false)
      }, 2000)
      await update(verImp)
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
              Update cet versement
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <SelectedMenu name='titre' options={titre} setValue={setVerImp} valeur={verImp}/>
            </FormControl>
                <TextField 
                    id="outlined-controlled"
                    label='poid 18k' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'poid 18k': parseFloat(e.target.value),
                        'poid 24k': (parseFloat(e.target.value) * verImp.titre / 1000).toFixed(3),
                      }))
                    }}
                    type='number'
                    sx={style_textField}
                    name='poid 18k'
                    className={props.colors}
                    value={verImp['poid 18k']}
                />
                <TextField 
                    disabled
                    id="outlined"
                    label='poid 24k' variant="outlined"
                    type='number'
                    sx={style_textField}
                    name='poid 24k'
                    className={props.colors}
                    value={verImp['poid 24k']}
                />
                <TextField 
                    id="outlined-controlled"
                    label='versement €' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'versement €': parseFloat(e.target.value),
                        versement: parseFloat(e.target.value) === 0 ? verImp['versement $'] : (parseFloat(e.target.value) * verImp['change €/$']),
                      }))}}
                    type='number'
                    sx={style_textField}
                    name='versement €'
                    className={props.colors}
                    value={verImp['versement €']}
                />
                <TextField 
                    id="outlined-controlled"
                    label='change €/$' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'change €/$': parseFloat(e.target.value),
                        versement: verImp['versement €'] === 0 ? verImp['versement $'] : (verImp['versement €'] * parseFloat(e.target.value)),
                      }))}}
                    type='number'
                    sx={style_textField}
                    name='change €/$'
                    className={props.colors}
                    value={verImp['change €/$']}
                />
                <TextField 
                    id="outlined-controlled"
                    label='versement $' variant="outlined"
                    onChange={(e) => {
                      setVerImp(v => ({
                        ...v,
                        'versement $': parseFloat(e.target.value),
                        versement: verImp['versement €'] === 0 ? parseFloat(e.target.value) : (verImp['versement €'] * verImp['change €/$']),
                      }))}}
                    type='number'
                    sx={style_textField}
                    name='versement $'
                    className={props.colors}
                    value={verImp['versement $']}
                />
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={verImp.famille === "" || verImp["designation d'article"] === '' || verImp.fournisseur == '' || verImp.qte === 0 || verImp.pu === 0}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }