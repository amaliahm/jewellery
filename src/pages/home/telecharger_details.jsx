import html2pdf from 'html2pdf.js'
import { download_logo } from '../../assets/images';


const generateHtmlTable = (data) => {

  const headerStyles = `
    margin: 60px 0 40px 20px;
    text-align: left;
    text-transform: upperCase;
    color: #000;
  `;

  const body_style = `
    width: 100vw;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 200px;
    color: #000;
  `;

  const signature_style = `
    font-family: 'Mrs Saint Delafield';
    letter-spacing: 2px;
    font-size: 30px;
    text-wrap: nowrap;
    color: #000;
    margin: 180px 10px 20px 450px;
  `;

  const div_info_style = `
    color: #000;
    width: 170vw;
    padding: 10px;
    height: fit-content;
    min-height: 200px;
    margin-top: 40px;
    border-radius: 20px;
  `;
  const div_info_hear_style = `
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: #202C3D;
    text-transform: uppercase;
    padding-left: 20px;
    padding-top: 12px;
    margin-bottom: 20px;
    color: white;
  `

  const detail_style = `
    width: 100%;
    height: 100%;
    display: grid;
    gap: 20px;
    color: #000;
  `

  const element_style = `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #000;
  `

  const element_style_p = `
    width: 25%;
    margin-right: 20px;
    text-transform: uppercase;
    padding: 10px;
    color: #000;
  `
  const element_style_span = `
    border: 2px solid rgba(128, 128, 128, 0.5);
    padding: 10px;
    min-width: 50%;
    max-width: 70%;
    border-radius: 10px;
    color: #000;
  `
    
  const date = new Date()
  const temps = `${date.getDay() == 0 ? 'Dimanche ': date.getDay() == 1 ? 'Lundi ':date.getDay() == 2 ? 'Mardi ':date.getDay() == 3 ? 'Mercredi ':date.getDay() == 4 ? 'Jeudi ':date.getDay() == 5 ? 'Vendredi ': 'Samedi'} ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  const time_partie = `<p style="${headerStyles}"> ${temps} </p>`

    const pageTitleHtml = `<h4 style="${headerStyles}">nom d'utilisateur </h4>`;
    
    const signature = `<h6 style="${signature_style}"> EURL BN ZAHAV </h6>`
  
    return `
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Grape+Nuts&family=Fleur+De+Leah&family=Gamja+Flower&family=Monsieur+La+Doulaise&family=Mrs+Saint+Delafield&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,800&display=swap" rel="stylesheet">
      <link rel="icon" type="image/svg+xml" href="./src/assets/images/logo.png" />
      <title>bouzian jewellery</title>
    </head>
    <body style="${body_style}">
    ${time_partie}
    ${pageTitleHtml}
    <div style="${div_info_style}">
      <div style="${div_info_hear_style}">
        <p>informations</p>
      </div>
      <div style="${detail_style}">
        <div style="${element_style}">
          <p style="${element_style_p}">nom</p>
          <span style="${element_style_span}">${data.nom}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">titre</p>
          <span style="${element_style_span}">${data.titre}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">NIF</p>
          <span style="${element_style_span}">${data.NIF}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">NIS</p>
          <span style="${element_style_span}">${data.NIS}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">NRC</p>
          <span style="${element_style_span}">${data.NRC}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">numero d'artcile</p>
          <span style="${element_style_span}">${data['n=° article']}</span>
        </div>
      </div>
    </div>
    <div style="${div_info_style}">
      <div style="${div_info_hear_style}">
        <p>cordonnées</p>
      </div>
      <div style="${detail_style}">
        <div style="${element_style}">
          <p style="${element_style_p}">telephone</p>
          <span style="${element_style_span}">${data.telephone}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">email</p>
          <span style="${element_style_span}">${data.email}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">wilaya</p>
          <span style="${element_style_span}">${data.wilaya}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">ville</p>
          <span style="${element_style_span}">${data.ville}</span>
        </div>
        <div style="${element_style}">
          <p style="${element_style_p}">adresse</p>
          <span style="${element_style_span}">${data.adresse}</span>
        </div>
      </div>
    </div>
    <div style="${div_info_style}">
       <div style="${div_info_hear_style}">
         <p>compte</p>
       </div>
       <div style="${detail_style}">
         <div style="${element_style}">
           <p style="${element_style_p}">chiffre d'affaire</p>
           <span style="${element_style_span}">${data.solde}</span>
         </div>
         <div style="${element_style}">
           <p style="${element_style_p}">total or</p>
           <span style="${element_style_span}">${data.or}</span>
         </div>
       </div>
    </div>
    ${signature}
    </body>
    </html>
    `;
  };
  
  
  
  const export_details_to_pdf = (data) => {
    console.log(data)
    exportAllDataToPdf(data);
  };
  
  
  
  const exportAllDataToPdf = (allData) => {
    const htmlContent = generateHtmlTable(allData);
    exportHtmlToPdf(htmlContent);
  };
  
  const exportHtmlToPdf = (htmlContent) => {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
  
    html2pdf(element, {
      margin: 5,
      filename: `eurl bn zahav.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };
  
export {
    export_details_to_pdf 
}