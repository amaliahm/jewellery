import html2pdf from 'html2pdf.js'


const generateHtmlTable = (filterData, gridApi, name) => {
    let data = []
  
    if (gridApi && gridApi.isAnyFilterPresent()) {
      gridApi.forEachNodeAfterFilter((node) => {
        data.push(node.data);
      });
    } else {
      data = filterData
    }
  
    const tableStyles = `
    border-collapse: collapse;
    height: 100%;
    font-family: Arial, sans-serif;
    color: #000;
  `;
  
  const thStyles = `
    border: 1px solid #ddd;
    color: white;
    padding: 10px;
    background-color: #292f36;
    text-align: left;
    min-width: 100px;
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
    text-align: center;
    text-transform: upperCase;
    color: #000;
  `;
  
  const logo_style = `
    text-align: center;
    text-transform: upperCase;
    font-family: 'Grape Nuts';
    font-size: 16px;
    color: #292f36;
  `;
  
  const body_style = `
    width: 100vw;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 200px;
    background: red;
  `;
    
    const logoTitle = `<h1 style="${logo_style}">eurl bhn zahav</h1>`;
    const pageTitleHtml = `<h1 style="${headerStyles}">${name}</h1>`;
    const tableHeader = Object.keys(data[0]).map((key) => `<th style="${thStyles}">${key}</th>`).join('');
    const tableBody = data.map((row) => {
      const rowCells = Object.values(row).map((value, index) => `<td style="${tdStyles}">${value}</td>`).join('');
      return `<tr>${rowCells}</tr>`;
    }).join('');
  
    return `
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Grape+Nuts&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,800&display=swap" rel="stylesheet">
      <title>bouzian jewellery</title>
    </head>
    <body style="${body_style}">
    ${logoTitle}
    ${pageTitleHtml}
    <table style="${tableStyles}" border="1"><thead>${tableHeader}</thead><tbody>${tableBody}</tbody></table>
    </body>
    </html>
    `;
  };
  
  
  
  const exportDataToPdf = (data, gridApi, name) => {
    exportAllDataToPdf(data, gridApi, name);
  };
  
  
  
  const exportAllDataToPdf = (allData, gridApi, name) => {
    const htmlContent = generateHtmlTable(allData, gridApi, name);
    exportHtmlToPdf(htmlContent);
  };
  
  const exportHtmlToPdf = (htmlContent) => {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
  
    html2pdf(element, {
      margin: 5,
      filename: "eurl bhn zahav.pdf",
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'mm', format: [500, 500], orientation: 'portrait' },
    });
  };
  
export {
    exportDataToPdf
}