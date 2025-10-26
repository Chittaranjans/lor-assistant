'use client';

import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Copy, Download, FileText } from 'lucide-react';

interface LetterDisplayProps {
  letter: string;
}

export default function LetterDisplay({ letter }: LetterDisplayProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      // Could add a toast notification here
      alert('Copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = letter;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Copied to clipboard!');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Set up proper letter formatting
    doc.setFont('times-roman', 'normal');
    doc.setFontSize(10); // Slightly larger for readability
    
    // Page margins (in mm) - standard business letter margins
    const marginLeft = 20;
    const marginRight = 20;
    const marginTop = 25;
    const marginBottom = 25; // Increased for 5mm footer space
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxLineWidth = pageWidth - marginLeft - marginRight;
    
    // Split text into lines that fit the page width
    const lines = doc.splitTextToSize(letter, maxLineWidth);
    
    let yPosition = marginTop;
    const lineHeight = 5; // Adjusted for 10pt font
    
    lines.forEach((line: string) => {
      // Check if adding this line would exceed the page (leave bottom margin)
      if (yPosition + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        yPosition = marginTop;
      }
      
      // Handle paragraph breaks (double newlines)
      if (line.trim() === '') {
        yPosition += lineHeight * 0.5; // Small space for paragraph break
      } else {
        doc.setFontSize(10); // Ensure font size
        doc.text(line, marginLeft, yPosition);
        yPosition += lineHeight;
      }
    });
    
    doc.save('letter_of_recommendation.pdf');
  };

  const handleDownloadDOC = () => {
    // Split the letter into paragraphs
    const paragraphs = letter.split('\n\n').filter(p => p.trim());
    
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch in twips
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: paragraphs.map(para => 
            new Paragraph({
              children: [new TextRun({
                text: para,
                font: 'Times New Roman',
                size: 24, // 12pt
              })],
              spacing: {
                after: 200, // Space after paragraph
              },
            })
          ),
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'letter_of_recommendation.docx');
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FileText className="w-5 h-5 text-slate-600" />
        <h2 className="text-xl font-semibold text-slate-800">Generated Letter of Recommendation</h2>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
        <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{letter}</pre>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </button>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={handleDownloadDOC}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download DOC</span>
        </button>
      </div>
    </div>
  );
}