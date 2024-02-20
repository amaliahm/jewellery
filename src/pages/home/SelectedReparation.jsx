import React from 'react'
import { InputLabel, Select, MenuItem, FormControl, Box } from '@mui/material';
import { client, fournisseur } from '../../backend';


function SelectedReparation({setValue ,valeur}) {

    const onSelectFournisseur = (e) => {
        setValue({
          ...valeur, 
          id_fournisseur : fournisseur[e.target.value].id_fournisseur,
          'titre fournisseur': fournisseur[e.target.value].valeur
        })
      }
    const onSelectClient = (e) => {
      setValue({
        ...valeur, 
        id_client : client[e.target.value].id_client,
        'titre client': client[e.target.value].valeur
      })
    }
  
    return (
      <Box sx={{minWidth: 250, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: '20px' }} >
      <FormControl sx={{ marginLeft: '20px', minWidth: 250 }} onSelect={() => {
          console.log('hey')
        }}>
        <InputLabel id="demo-simple-select-label" >fournisseur</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label='fournisseur'
            onChange={onSelectFournisseur}
          >
            {Object.keys(fournisseur).map((e, i) => (
               <MenuItem value={e} key={i} >{fournisseur[e].nom_fournisseur}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ marginLeft: '20px', minWidth: 250 }} onSelect={() => {
            console.log('hey')
          }}>
          <InputLabel id="demo-simple-select-label" >client</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label='client'
              onChange={onSelectClient}
            >
              {Object.keys(client).map((e, i) => (
                 <MenuItem value={e} key={i} >{client[e].nom_client}</MenuItem>
              ))}
            </Select>
          </FormControl>
      </Box>
    );
  }

export default SelectedReparation