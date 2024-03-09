import html2pdf from 'html2pdf.js'
import { download_logo } from '../../assets/images';
import { fournisseur } from '../../backend';




const generateHtmlTable = (data, name) => {

  const body_style = `
    width: 100vw;
    height: 100vh;
    font-family: 'Courier Prime', monospace;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    color: #000;
    gap: 20px;
    font-weight: 700;
    font-style: normal;
  `;

  const logo_div_style = `
    height: 150px;
    width: 100%;
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
  `;

  const titre_style = `
    font-family: 'Courier Prime', monospace;
    text-transform: uppercase;
    color: #202C3D;
    font-size: 50px;
  `;

  const logo_style = `
    height: 130px;
    width: 130px;
    border: 2px solid #000;
    border-radius: 50%;
    margin-right: 10px;
  `;

  const entreprise_div_style = `
    height: 120px;
    width: 100%;
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
  `;

  const entreprise_nom_style = `
    font-family: 'Courier Prime', monospace;
    text-transform: uppercase;
    color: #000;
    font-size: 20px;
    font-weight: 700;
  `;

  const reste_entreprise_nom_style = `
    font-family: 'Courier Prime', monospace;
    color: #000;
    margin-left: 15px;
    font-size: 14px;
  `;

  const info_div_style = `
    margin: 30px 10px 30px;
    height: 150px;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const info_half_div_style = `
    height: 130px;
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: left;
  `;

  const info_other_half_div_style = `
    height: 130px;
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
  `;

  const info_head_half_div_style = `
    width: 48%;
    height: 100%;
    padding-top: 10px
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: left;
  `;

  const tableau_div_style = `
    height: 200px;
    width: 100%;
    margin: 10px;
    margin-bottom: 200px;
  `;

  const tableStyles = `
    border-collapse: collapse;
    height: 100%;
    font-family: 'Courier Prime', monospace;
    color: #000;
    margin-left: 10px;
    text-transform: uppercase;
    margin-bottom: 10px;
  `;

  const thStyles = `
    border: 1px solid #ddd;
    color: white;
    padding: 10px;
    background-color: #202C3D;
    font-family: 'Courier Prime', monospace;
    text-align: left;
    min-width: 170px;
    width: fit-content;
    text-transform: capitalize;
  `;
  
  const tdStyles = `
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    font-family: 'Courier Prime', monospace;
    min-width: 100px;
    width: fit-content;
    color: #000;
  `;

  const last_div_style = `
    height: 20px;
    width: 40%;
    color: #202C3D;
    margin: 10px 10px 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  `;

  const signature_style = `
    font-family: 'Mrs Saint Delafield';
    letter-spacing: 2px;
    font-size: 30px;
    text-wrap: nowrap;
    color: #000;
    margin: 50px 10px 20px 450px;
  `
  const currentDate = new Date();
  const current_date = `<p style="${reste_entreprise_nom_style}"> ${String(currentDate.getFullYear())}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} </p>`
  
  const signature = `<h6 style="${signature_style}"> EURL BN ZAHAV </h6>`

    return `
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Mrs+Saint+Delafield&display=swap" rel="stylesheet">
      <link rel="icon" type="image/svg+xml" href="./src/assets/images/logo.png" />
      <title>eurl bn zahav</title>
    </head>
    <body style="${body_style}">
    <div style="${logo_div_style}">
      <p style="${titre_style}">bon ${name} </p>
      <div style="${logo_style}"></div>
    </div>
    <div style="${entreprise_div_style}">
      <p style="${entreprise_nom_style}">eurl bn zahav:</p>
      <p style="${reste_entreprise_nom_style}">ViLLAGE CELESTE, Bouzareah, ALGER</p>
      <p style="${reste_entreprise_nom_style}">+213...</p>
      <p style="${reste_entreprise_nom_style}">eurlbnzahav@gmail.com</p>
    </div>
    <div style="${info_div_style}">
      <div style="${info_half_div_style}">
        <div style="${info_head_half_div_style}">
          <p style="${reste_entreprise_nom_style}">DATE</p>
          <p style="${reste_entreprise_nom_style}">Bon ${name} n=° </p>
          <p style="${reste_entreprise_nom_style}">Date d'opération </p>
        </div>
        <div style="${info_head_half_div_style}">
          <p style="${reste_entreprise_nom_style}">${current_date}</p>
          <p style="${reste_entreprise_nom_style}">${data['versement importation n=°']}</p>
          <p style="${reste_entreprise_nom_style}">${data.date} </p>
        </div>
      </div>
      <div style="${info_other_half_div_style}">
        <p style="${entreprise_nom_style}">distinataire:</p>
        <p style="${reste_entreprise_nom_style}">${data.nom_importateur}</p>
      </div>
    </div>
    <div style="${tableau_div_style}">
      <table style="${tableStyles}" border="1">
        <thead>
          <th style="${thStyles}">poid 24k</th>
          <th style="${thStyles}">titre</th>
          <th style="${thStyles}">versement</th>
        </thead>
        <tbody> 
           <tr>
              <td style="${tdStyles}">${data['poid 24k']}</td>
              <td style="${tdStyles}">${data.titre}</td>
              <td style="${tdStyles}">${data.versement}$</td>
           </tr>
        </tbody>
      </table>
    </div>
    ${signature}
    </body>
    </html>
    `;
  };
  
  const exportBonToPdf = (data, name) => {
    console.log(data)
    exportAllDataToPdf(data, name);
  };
  
  
  const exportAllDataToPdf = (data, name) => {
    const htmlContent = generateHtmlTable(data, name);
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
    exportBonToPdf
}