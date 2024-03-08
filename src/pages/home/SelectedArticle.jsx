import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from "react";

function SelectedArticle({name, options, setValue ,valeur}) {

    const onSelect = (e) => {
      setValue({
        ...valeur, 
        nom_famille : options[e.target.value].nom_famille,
        id_article : options[e.target.value].id_article,
        nom_article : options[e.target.value].nom_article,
        prix_unitaire: parseInt(options[e.target.value].prix_unitaire),
        quantite: parseInt(options[e.target.value].quantite_stock),
        total : Math.abs(parseFloat(options[e.target.value].quantite_stock)) * parseFloat(options[e.target.value].prix_unitaire),
      })
    }
  
    return (
      <>
        <FormControl sx={{ marginTop: '2px', minWidth: 250 }} onSelect={() => {
            console.log('hey')
          }}>
          <InputLabel id="demo-simple-select-label" >{name}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-helper"
              label={name}
              onChange={onSelect}
            >
              {Object.keys(options).map((e, i) => (
                 <MenuItem value={e} key={i} >{options[e].nom_article}</MenuItem>
              ))}
            </Select>
          </FormControl>
      </>
    );
  }

export default SelectedArticle