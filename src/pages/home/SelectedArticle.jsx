import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, {useState} from "react";

function SelectedArticle({name, options, setValue ,valeur, rest}) {
    const onSelect = (e) => {
      // setValue({
        // ...valeur, 
        // [name] : options[e.target.value],
        // 'prix unitaire': parseInt(options[e.target.value]["prix unitaire"]),
        // quantite: parseInt(options[e.target.value]["qte stock"]),
        // total : Math.abs(options[e.target.value]["qte stock"]) * options[e.target.value]["prix unitaire"],
      // })
      Object.keys(rest).map((key, i) => {
        if (rest[key].famille === valeur.famille && rest[key]["designation d'article"] === options[e.target.value]) {
          setValue({
            ...valeur,
            [name] : options[e.target.value],
            'prix unitaire': parseInt(rest[key]["prix unitaire"]),
            quantite: parseInt(rest[key]["qte stock"]),
            total : Math.abs(rest[key]["qte stock"]) * rest[key]["prix unitaire"],
          })
        }
      })
      console.log(valeur)
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
              {Object.keys(options).map((e, i) => (
                 <MenuItem value={e} key={i} >{options[e]}</MenuItem>
              ))}
            </Select>
          </FormControl>
      </>
    );
  }

export default SelectedArticle