import React from 'react'
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';


function SelectedMenu({name , options, setValue ,valeur}) {

    const onSelect = (e) => {
      setValue({...valeur, [name] : e.target.value})
    }
  
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
              {options.map((e, i) => (
                 <MenuItem value={e} key={i} >{e}</MenuItem>
              ))}
            </Select>
          </FormControl>
      </>
    );
  }

export default SelectedMenu