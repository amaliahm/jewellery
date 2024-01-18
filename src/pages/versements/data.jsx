const columns_versement_f = [
    {
      field: "versement n=°",
      headerName: "VERSEMENT N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 300,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "fournisseur",
      headerName: "FOURNISSEUR",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "versement or",
      headerName: "VERSEMENT OR",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "versement argent",
      headerName: "VERSEMENT ARGENT",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour or",
      headerName: "RETOUR OR",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "retour argent",
      headerName: "RETOUR ARGENT",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "or v",
      headerName: "OR V",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "fonte",
      headerName: "FONTE",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "titre",
      headerName: "TITRE",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "net 750",
      headerName: "NET 750",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "ecart",
      headerName: "ECART",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
  ];

  const columns_versement_c = [
    {
      field: "versement n=°",
      headerName: "VERSEMENT N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "client",
      headerName: "CLIENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "versement or",
      headerName: "VERSEMENT OR",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "versement argent",
      headerName: "VERSEMENT ARGENT",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour or",
      headerName: "RETOUR OR",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "retour argent",
      headerName: "RETOUR ARGENT",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "or v",
      headerName: "OR V",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "fonte",
      headerName: "FONTE",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "titre",
      headerName: "TITRE",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "net 750",
      headerName: "NET 750",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "ecart",
      headerName: "ECART",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
  ];
const add_versement = {
  jour: '',
  mois: '',
  annee: '',
  person: '',
  nom: '',
  titre: '',
  "versement or" : 0,
  "versement argent": 0,
  "retour or": 0,
  "retour argent": 0,
  "or v": 0,
  fonte: 0,
  "net 750": 0,
  ecart: 0,
}


export {
    columns_versement_f,
    columns_versement_c,
    add_versement
}