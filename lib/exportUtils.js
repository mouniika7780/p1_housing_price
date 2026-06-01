import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToCSV(data, filename = 'properties') {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToPDF(data, filename = 'properties') {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Property Market Analysis Report', 14, 15);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 23);

  autoTable(doc, {
    startY: 30,
    head: [['ID', 'Sq Ft', 'Beds', 'Baths', 'Year', 'Price']],
    body: data.map((p) => [
      p.id,
      p.square_footage,
      p.bedrooms,
      p.bathrooms,
      p.year_built,
      `$${p.price.toLocaleString()}`,
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [99, 102, 241] },
  });

  doc.save(`${filename}.pdf`);
}