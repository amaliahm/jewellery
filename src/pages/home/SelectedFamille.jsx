import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { view_achat_articles_fournisseur } from '../../backend';
import { view_produits } from '../../backend';

function SelectedFamille({ name, options, setValue, valeur, show = true, ...props }) {

  const [v, setV] = useState({});

  const article = (id_famille) => {
    console.log(view_produits)
    let articles = []
    Object.keys(view_produits).map((e, i) => {
      if (view_produits[e].id_famille === id_famille) {
        articles.push({
          nom_famille: view_produits[e].nom_famille,
          id_article: view_produits[e].id_article,
          nom_article: view_produits[e].nom_article,
          prix_vente: view_produits[e].prix_vente,
          quantite_stock: view_produits[e].quantite_stock,
          solde: valeur.solde,
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
        id_famille : options[e.target.value].id_famille
     })
     article(options[e.target.value].id_famille)
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
        >
          {Object.keys(options).map((e, i) => (
            <MenuItem value={e} key={i}>{options[e].nom_famille}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectedFamille