import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SelectedMenu from '../home/SelectedMenu';
import { FormControl } from '@mui/material';
import axios from 'axios';
import Notification from '../home/notification';
import { useState } from "react";
import { TextField } from "@mui/material"
import { useEffect } from 'react';
import { fournisseur, client, api } from "../../backend";
import SelectedArticle from "../home/SelectedArticle";
import SelectedFournisseur from "../home/SelectedFournisseur";
import SelectedClient from "../home/SelectedClient";

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
    const [inter, setInter] = useState(detail)
    const [articles, setArticles] = useState([])
    console.log(detail)
    console.log(inter)

    useEffect(() => {
      setInter(detail);
    }, [detail]);

    const [confirm, setConfirm] = useState(false)
  
    const update = async (data) => {
      try {
          const result = await axios.put(api + `commands/${detail.id_command}`, data)
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
              Update {inter['command n=°']}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <SelectedFournisseur name='fournisseur' options={fournisseur} setValue={setInter} valeur={inter} setArticles={setArticles} show={false}/>
              </FormControl>
              <div className="select-article">
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedArticle name="nom d'article"  options={articles} setValue={setInter} valeur={inter}/>
                </FormControl>
              </div>

               <FormControl sx={{ m: 1, minWidth: 150 }}>
                 <SelectedClient name='client' options={client} setValue={setInter} valeur={inter} show={false}/>
               </FormControl>

            <TextField 
              id={"outlined-read-only-input"}
              label='observation' variant="outlined"
              type='text'
              sx={style_textField}
              name='observation'
              className={props.colors}
              onChange={(e) => {
                setInter(c => ({...c, observation : e.target.value}))
              }}
              defaultValue={inter.observation}
              />
            <Box sx={button_box}>
              <Button sx={button_style} onClick={handleClose}>annuler</Button>
              <Button 
                sx={confirme_button_style}
                onClick={hanldeConfirm}
                disabled={inter.id_client === "" || inter.id_fournisseur === '' || inter.id_article == '' || inter.observation === ''}
              >confirmer</Button>
            </Box>
          </Box>
        </Modal>
        {confirm && <Notification name={'Les modifications sont été enregitrées'}/>}
      </div>
    );
  }