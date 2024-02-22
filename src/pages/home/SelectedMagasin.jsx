import React from 'react'
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';


function SelectedMagasin({ name, options, setValue ,valeur}) {
  console.log(options)
    const onSelect = (e) => {
      setValue({
        ...valeur,
        id_magasin : options[e.target.value].id_magasin,
      })
    }
    console.log(valeur)
  
    return (
      <>
        <FormControl sx={{ marginTop: '2px', minWidth: 250 }} onSelect={() => {
            console.log('hey')
          }}>
          <InputLabel id="demo-simple-select-label" >{name}</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label={name}
              onChange={onSelect}
            >
              {Object.keys(options).map((e, i) => (
                 <MenuItem value={e} key={i} >{options[e].nom_magasin}</MenuItem>
              ))}
            </Select>
          </FormControl>
      </>
    );
  }

export default SelectedMagasin