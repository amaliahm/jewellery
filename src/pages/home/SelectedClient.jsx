import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';

function SelectedClient({ name, options, setValue, valeur, show = true, ...props }) {

  const [v, setV] = useState({});

  const onSelect = (e) => {
      setValue({
        ...valeur,
        id_client : options[e.target.value].id_client,
        id_titre : options[e.target.value].id_titre,
        titre : options[e.target.value].valeur,
        solde : parseFloat(options[e.target.value].solde),
     })
    setV(options[e.target.value])
  };

  return (
    <>
      <FormControl sx={{ marginTop: '2px', minWidth: 250, maxWidth: 350 }} onSelect={() => {
        console.log('hey');
      }}>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label={name}
          onChange={onSelect}
          disabled={Object.keys(v).length !== 0 && show}
        >
          {Object.keys(options).map((e, i) => (
            <MenuItem value={e} key={i}>{options[e].nom_client}</MenuItem>
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
          label="wilaya"
          variant="standard"
          defaultValue={v.wilaya}
          disabled />
          <TextField
          sx={{
            marginTop: '20px',
            marginRight: '20px',
            maxWidth: 200,
          }}
          id="standard-disabled"
          label="ville"
          variant="standard"
          defaultValue={v.ville}
          disabled />
          <TextField
          sx={{
            marginTop: '20px',
            marginRight: '20px',
            maxWidth: 200,
          }}
          id="standard-disabled"
          label="telephone"
          variant="standard"
          defaultValue={v.telephone}
          disabled />
        <TextField
          sx={{
            marginTop: '20px',
            marginRight: '20px',
            maxWidth: 200,
          }}
          id="standard-disabled"
          label="solde"
          variant="standard"
          defaultValue={v.solde}
          disabled />
        <TextField
          sx={{
            marginTop: '20px',
            marginRight: '20px',
            maxWidth: 200,
          }}
          id="standard-disabled"
          label="Reste d'argent"
          variant="standard"
          defaultValue={v.reste_argent}
          disabled />
        <TextField
          sx={{
            marginTop: '20px',
            marginRight: '20px',
            maxWidth: 200,
          }}
          id="standard-disabled"
          label="Reste d'or"
          variant="standard"
          defaultValue={v.reste_or}
          disabled />
      </div>}
    </>
  );
}

export default SelectedClient