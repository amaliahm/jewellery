// PDFGenerator.js
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { download_logo } from '../../assets/images';

const handleDownload = async () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Add content to the PDF
  const content = document.getElementById('pdf-content');
  
  // Use html2canvas to capture the content as an image
  const canvas = await html2canvas(content);

  // Add text and image to the PDF
  pdf.text('Generated PDF', 10, 10);
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);
  pdf.text(`Time: ${new Date().toLocaleTimeString()}`, 10, 30);
  pdf.text('Name: John Doe', 10, 40);

  // Save the PDF as a file
  pdf.save('eurl bn zahav.pdf');
};


export { handleDownload };
