const columns_receptions = [
    { 
        field: "reception total n=°", 
        headerName: "RECEPTION TOTAL N=°", 
        flex: 0.5,
        minWidth: 200,
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
      field: "nombre_piece",
      headerName: "nombre de piece",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "ancien_solde",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "total",
      headerName: "TOTAL",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "nouveau_solde",
      headerName: "NOUVEAU SOLDE",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
  ];
  
  const columns_add_reception = [
    {
      field: "nom_article",
      headerName: "L'ARTICLE",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "quantite",
      headerName: "QUANTITE",
      flex: 1,
      minWidth: 150,
      maxWidth: 2500,
      headerAlign: 'left'
    },
    {
      field: "prix vente facon",
      headerName: "PRIX VENTE FACON",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "prix achat facon",
      headerName: "PRIX ACHAT FACON",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "montant achat",
      headerName: "MONTANT ACHAT",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "montant vente",
      headerName: "MONTANT VENTE",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
  ];
  
    
  const add_reception = {
    id_article: '',
    id_fournisseur: '',
    id_titre: '',
    quantite: 0,
    chutte: 0,
    'prix achat': 0,
    'prix vente': 0,
    'prix achat facon': 0,
    'prix vente facon': 0,
    'montant achat': 0,
    'montant vente': 0,
  }
  
  export {
    columns_receptions,
    add_reception,
    columns_add_reception
  }