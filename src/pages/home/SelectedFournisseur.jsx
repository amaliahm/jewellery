import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { view_achat_articles_fournisseur } from '../../backend';
import { view_produits } from '../../backend';

function SelectedFournisseur({ name, options, setValue, valeur, show = true, bool_article= true, ...props }) {

  const [v, setV] = useState({});

  const article = (id_fournisseur, solde) => {
    console.log(view_produits)
    console.log(view_achat_articles_fournisseur)
    let articles = []
    Object.keys(view_produits).map((e, i) => {
      if (view_produits[e].id_fournisseur === id_fournisseur) {
        articles.push({
          id_article: view_produits[e].id_article,
          nom_article: view_produits[e].nom_article,
          prix_unitaire: view_produits[e].prix_achat,
          quantite_stock: view_produits[e].quantite_stock,
          solde: solde,
        })
      }
    })

    const uniqueObjectsSet = new Set();

    const uniqueArray = articles.filter(obj => {
      const stringRepresentation = JSON.stringify(obj);
      if (!uniqueObjectsSet.has(stringRepresentation)) {
        uniqueObjectsSet.add(stringRepresentation);
        return true;
      }
      return false;
    });
    props.setArticles(uniqueArray)
  }

  const onSelect = (e) => {
      setValue({
        ...valeur,
        id_fournisseur : options[e.target.value].id_fournisseur,
        solde : parseFloat(options[e.target.value].solde)
     })
    if (bool_article) article(options[e.target.value].id_fournisseur, parseFloat(options[e.target.value].solde))
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
            <MenuItem value={e} key={i}>{options[e].nom_fournisseur}</MenuItem>
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

export default SelectedFournisseur