import { FormControl, InputLabel, TextField, MenuItem, Select } from '@mui/material';
import React, {useState} from 'react';


function SelectedClient({name, options, setValue ,valeur, show = true}) {
  const [v, setV] = useState({})

    const onSelect = (e) => {
      setValue({...valeur, [name] : options[e.target.value].nom})
      setV(options[e.target.value])
    }
  
    return (
      <>
        <FormControl sx={{ marginTop: '2px', minWidth: 250, maxWidth: 350 }} onSelect={() => {
            console.log('hey')
          }}>
          <InputLabel id="demo-simple-select-label" >{name}</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label={name}
              onChange={onSelect}
              disabled={Object.keys(v).length !== 0 && show}
            >
              {Object.keys(options).map((e, i) => (
                 <MenuItem value={e} key={i} >{options[e].nom}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {show && Object.keys(v).length !== 0 && <div className="show-fournisseur">
            <TextField 
              sx={{
                marginTop: '20px',
                marginRight: '20px',
                maxWidth: 200,
              }}
              id="standard-disabled" 
              label="Adresse" 
              variant="standard" 
              defaultValue={v.wilaya + ' ' + v.ville} 
              disabled/>
              <TextField 
              sx={{
                marginTop: '20px',
                marginRight: '20px',
                maxWidth: 200,
              }}
              id="standard-disabled" 
              label="Telephone" 
              variant="standard" 
              defaultValue={v.telephone} 
              disabled/>
              <TextField 
              sx={{
                marginTop: '20px',
                marginRight: '20px',
                maxWidth: 200,
              }}
              id="standard-disabled" 
              label="Chiffre d'affaire" 
              variant="standard" 
              defaultValue={v["chiffre d'affaire"]} 
              disabled/>
              <TextField 
              sx={{
                marginTop: '20px',
                marginRight: '20px',
                maxWidth: 200,
              }}
              id="standard-disabled" 
              label="Reste d'argent" 
              variant="standard" 
              defaultValue={v["reste a"]} 
              disabled/>
              <TextField 
              sx={{
                marginTop: '20px',
                marginRight: '20px',
                maxWidth: 200,
              }}
              id="standard-disabled" 
              label="Reste d'or" 
              variant="standard" 
              defaultValue={v["reste o"]} 
              disabled/>
          </div>}
      </>
    );
  }

export default SelectedClient