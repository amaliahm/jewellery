


const clients = [
    {
      id: 1,
      nom: "faycel 34".toUpperCase(),
      ville: "bba".toUpperCase(),
      wilaya: "bba".toUpperCase(),
      telephone: "0661252532",
      "chiffre d'affaire": "203,500.00",
      "total or": "166.00",
      "total vo": "360.00",
      "total va": "150,000.00",
      "total perte": "11.68",
      "total ro": "0.00",
      "total ra": "0.00",
      "reste o": "-182.32",
      "reste a": "53,500.00",
    },
    {
      id: 2,
      nom: "fares".toUpperCase(),
      ville: "el khroub".toUpperCase(),
      wilaya: "25 constantine".toUpperCase(),
      telephone: "0560121491",
      "chiffre d'affaire": "960,000.00",
      "total or": "1,125.00",
      "total vo": "760.80",
      "total va": "810,000.00",
      "total perte": "40.13",
      "total ro": "0.00",
      "total ra": "0.00",
      "reste o": "504.33",
      "reste a": "150,000.00",
    },
    {
      id: 3,
      nom: "nasreddine".toUpperCase(),
      ville: "bab el ouad".toUpperCase(),
      wilaya: "16 alger".toUpperCase(),
      telephone: "0550232363",
      "chiffre d'affaire": "766,000.00",
      "total or": "1,015.00",
      "total vo": "300.00",
      "total va": "450,000.00",
      "total perte": "-2.40",
      "total ro": "250.00",
      "total ra": "100,000.00",
      "reste o": "462.62",
      "reste a": "216,000.00",
    },
    {
      id: 4,
      nom: "zahir19".toUpperCase(),
      ville: "setif".toUpperCase(),
      wilaya: "setif".toUpperCase(),
      telephone: "002135658",
      "chiffre d'affaire": "919,000.00",
      "total or": "1,365.00",
      "total vo": "800.00",
      "total va": "500,000.00",
      "total perte": "20.55",
      "total ro": "50.00",
      "total ra": "50,000.00",
      "reste o": "535.55",
      "reste a": "369,000.00",
    },
  ];



  const articles = [
    {
      article: 'dh'.toUpperCase(),
      designation: 'duo el hadj'.toUpperCase(),
      'prix u': 500,
      'qte stock': 0,
      'valeur stock': 0.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'ln'.toUpperCase(),
      designation: 'les noms'.toUpperCase(),
      'prix u': 1000,
      'qte stock': -71,
      'valeur stock': -71000.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'mss'.toUpperCase(),
      designation: 'msayes samir'.toUpperCase(),
      'prix u': 500,
      'qte stock': -480,
      'valeur stock': -240000.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'mn'.toUpperCase(),
      designation: 'massif noufel'.toUpperCase(),
      'prix u': 700,
      'qte stock': -150,
      'valeur stock': -105000.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'mk'.toUpperCase(),
      designation: 'massif kamel'.toUpperCase(),
      'prix u': 600,
      'qte stock': -540,
      'valeur stock': -324000.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'imp b'.toUpperCase(),
      designation: 'importation batail'.toUpperCase(),
      'prix u': 1250,
      'qte stock': -300,
      'valeur stock': -375000.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'imp l'.toUpperCase(),
      designation: 'importation lux'.toUpperCase(),
      'prix u': 1350,
      'qte stock': -100,
      'valeur stock': -135000.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'imp ext l'.toUpperCase(),
      designation: 'importation extrat lux'.toUpperCase(),
      'prix u': 1800,
      'qte stock': 0,
      'valeur stock': 0.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'mb'.toUpperCase(),
      designation: 'massif benour'.toUpperCase(),
      'prix u': 650,
      'qte stock': 0,
      'valeur stock': 0.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'pr'.toUpperCase(),
      designation: 'parure'.toUpperCase(),
      'prix u': 950,
      'qte stock': 150,
      'valeur stock': 142500.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
    {
      article: 'pk'.toUpperCase(),
      designation: 'parure kamel'.toUpperCase(),
      'prix u': 700,
      'qte stock': 0,
      'valeur stock': 0.00,
      'stock min': 150,
      alert: "stock faible!!!".toUpperCase(),
    },
  ]

  const utilisateurs = [
    {
      id: 1,
      name: "amalia".toUpperCase(),
      email: "minouhemadi35@gmail.com".toUpperCase(),
      phone: "555555555",
      access: "admin",
    },
    {
      id: 2,
      name: "client".toUpperCase(),
      email: "client@gmail.com".toUpperCase(),
      phone: "88888888",
      access: "user",
    },
    {
      id: 3,
      name: "manager".toUpperCase(),
      email: "manager@gmail.com".toUpperCase(),
      phone: "9999999",
      access: "manager",
    },
  ];


  export {clients, articles, utilisateurs}