import html2pdf from 'html2pdf.js'
import { download_logo } from '../../assets/images';


const generateHtmlTable = (filterData, gridApi, name) => {
    let data = filterData

    const tableStyles = `
    border-collapse: collapse;
    height: 100%;
    font-family: Arial, sans-serif;
    color: #000;
    margin-left: 10px;
    text-transform: uppercase;
    margin-bottom: 10px;
  `;

  const table_total_style = `
    border-collapse: collapse;
    height: 100%;
    font-family: Arial, sans-serif;
    color: #000;
    margin: 200px 40px 10px auto;
    text-transform: uppercase;
  `;
  
  const thStyles = `
    border: 1px solid #ddd;
    color: white;
    padding: 10px;
    background-color: #AD9551;
    text-align: left;
    min-width: 145px;
    width: fit-content;
    text-transform: capitalize;
  `;
  
  const total_th_style = `
    border: 1px solid #ddd;
    color: #000;
    padding: 10px;
    background-color: rgba(128, 128, 128, 0.5);
    text-align: left;
    min-width: 150px;
    width: fit-content;
    text-transform: capitalize;
  `;
  
  const tdStyles = `
    border: 1px solid #ddd;
    padding: 10px;
    min-width: 100px;
    width: fit-content;
    color: #000;
  `;
  
  const headerStyles = `
    margin: 60px 0 20px 0;
    text-align: center;
    font-family: 'Gamja Flower';
    text-transform: upperCase;
    color: #000;
  `;
  
  const logo_style = `
    text-align: left;
    text-transform: upperCase;
    font-family: 'Protest Riot';
    font-size: 16px;
    color: #292f36;
  `;

  const logo_div = `
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    algin-items: center;
  `;
  
  const logo_image_style = `
    height: 150px;
    width: 150px;
    background: url('https://drive.google.com/file/d/1JRcMN-exaJG6OnjQbfksS-4Xyl37qf2Y/view?usp=drive_link');
    background-position: center center;
    background-size: 100% 100%;
    border: 2px solid black;
    border-radius: 50%
  `;
  
  const body_style = `
    width: 100vw;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 200px;
  `;

  const signature_style = `
    font-family: 'Mrs Saint Delafield';
    letter-spacing: 2px;
    font-size: 30px;
    text-wrap: nowrap;
    color: #000;
    margin: 180px 10px 20px 450px;
  `
    
    const logoTitle = `
    <div >
      <h1 style="${logo_style}">eurl bn zahav</h1>
      <h1 style="${logo_style}">bouzareah</h1>
      <h1 style="${logo_style}">alger</h1>
    </div>
    `;
    
    const logo = 
    `<div style="${logo_div}">
      ${logoTitle}
      <div style="${logo_image_style}"></div>
    </div>`
    const pageTitleHtml = `<h1 style="${headerStyles}">${name}</h1>`;
    const tableHeader = Object.keys(data[0]).map((key) => `<th style="${thStyles}">${key}</th>`).join('');
    const tableBody = data.map((row) => {
      const rowCells = Object.values(row).map((value, index) => `<td style="${tdStyles}">${value}</td>`).join('');
      return `<tr>${rowCells}</tr>`;
    }).join('');
    

    let total_argent = 0
    let total_or = 0
    data.map((row) => {
      total_argent += parseInt(row.solde)
      total_or += parseInt(row.or)
    })
    console.log(total_argent)
    console.log(total_or)

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
    ${logo}
    ${pageTitleHtml}
    <table style="${tableStyles}" border="1"><thead>${tableHeader}</thead><tbody>${tableBody}</tbody></table>
    <table style="${table_total_style}" border="1">
      <thead>
       <th style="${total_th_style}">total argent</th>
       <th style="${total_th_style}">total or</th>
      </thead>
      <tbody>
        <tr>
          <td style="${tdStyles}">${total_argent}</td>
          <td style="${tdStyles}">${total_or}</td>
        </tr>
      </tbody>
    </table>
    ${signature}
    </body>
    </html>
    `;
  };
  
  
  
  const exportDataToPdf = (data, gridApi, name) => {
    console.log(data)
    exportAllDataToPdf(data, gridApi, name);
  };
  
  
  
  const exportAllDataToPdf = (allData, gridApi, name) => {
    console.log(allData)
    const htmlContent = generateHtmlTable(allData, gridApi, name);
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
    exportDataToPdf
}