import React from 'react'
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';


function SelectedTitre({ name, options, setValue ,valeur}) {
  console.log(options)
    const onSelect = (e) => {
      setValue({
        ...valeur,
        id_titre : options[e.target.value].id_titre,
        titre: parseFloat(options[e.target.value].titre)
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
                 <MenuItem value={e} key={i} >{options[e].titre}</MenuItem>
              ))}
            </Select>
          </FormControl>
      </>
    );
  }

export default SelectedTitre