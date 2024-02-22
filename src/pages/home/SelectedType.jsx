import React, { useState } from 'react'
import { InputLabel, Select, MenuItem, FormControl, Box } from '@mui/material';
import { view_charge } from '../../backend';
import { useEffect } from 'react';


function SelectedType({setValue ,valeur}) {
    const [type, setType] = useState([])
    const [sousType, setSousType] = useState([])

    useEffect(() => {
        console.log(view_charge)
        const fetchAllData = async () => {
         let inter = []
         Object.keys(view_charge).map(e => {
          inter.push({
            nom_type: view_charge[e].nom_type,
            id_type: view_charge[e].id_type,
          })
         })
          const uniqueObjectsSet = new Set();
    
          const uniqueArray = inter.filter(obj => {
            const stringRepresentation = JSON.stringify(obj);
            if (!uniqueObjectsSet.has(stringRepresentation)) {
              uniqueObjectsSet.add(stringRepresentation);
              return true;
            }
            return false;
          });
          setType(uniqueArray)
        }
        fetchAllData()
      }, [2000])

    const chooseSousType = (id) => {
         let inter = []
         Object.keys(view_charge).map(e => {
            if (view_charge[e].id_type === id) {
                inter.push({
                  nom_sous_type: view_charge[e].nom_sous_type,
                  id_sous_type: view_charge[e].id_sous_type,
                })
            }
         })
          const uniqueObjectsSet = new Set();
    
          const uniqueArray = inter.filter(obj => {
            const stringRepresentation = JSON.stringify(obj);
            if (!uniqueObjectsSet.has(stringRepresentation)) {
              uniqueObjectsSet.add(stringRepresentation);
              return true;
            }
            return false;
          });
          return uniqueArray
    }

    const onSelectType = (e) => {
        setSousType(chooseSousType(type[e.target.value].id_type))
      }
    const onSelectSousType = (e) => {
      setValue({
        ...valeur, 
        id_sous_type : sousType[e.target.value].id_sous_type,
      })
    }
  
    return (
      <Box sx={{minWidth: 250, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: '20px' }} >
      <FormControl sx={{ marginLeft: '20px', minWidth: 250 }} onSelect={() => {
          console.log('hey')
        }}>
        <InputLabel id="demo-simple-select-label" >type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label='fournisseur'
            onChange={onSelectType}
          >
            {Object.keys(type).map((e, i) => (
               <MenuItem value={e} key={i} >{type[e].nom_type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ marginLeft: '20px', minWidth: 250 }} onSelect={() => {
            console.log('hey')
          }}>
          <InputLabel id="demo-simple-select-label" >sous type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label='client'
              onChange={onSelectSousType}
            >
              {Object.keys(sousType).map((e, i) => (
                 <MenuItem value={e} key={i} >{sousType[e].nom_sous_type}</MenuItem>
              ))}
            </Select>
          </FormControl>
      </Box>
    );
  }

export default SelectedType