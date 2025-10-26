'use client';

import { useState } from 'react';
import FormLOR from '../components/FormLOR';
import PromptLOR from '../components/PromptLOR';
import { FileText, MessageSquare, Loader2, Copy, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default function Home() {
  const [mode, setMode] = useState<'form' | 'prompt'>('form');
  const [letter, setLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'doc'>('doc');
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showDownloadedMessage, setShowDownloadedMessage] = useState(false);

  const handleGenerate = (generatedLetter: string) => {
    setLetter(generatedLetter);
    setIsGenerating(false);
  };

  const handleStartGenerating = () => {
    setIsGenerating(true);
    setLetter(''); // Clear previous letter
  };

  const handleDownload = () => {
    if (selectedFormat === 'pdf') {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(letter, 180);
      doc.text(lines, 15, 20);
      doc.save('letter_of_recommendation.pdf');
    } else {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun(letter)],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'letter_of_recommendation.docx');
      });
    }
    setShowDownloadedMessage(true);
    setTimeout(() => setShowDownloadedMessage(false), 3000); // Hide after 3 seconds
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 3000); // Hide after 3 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Floating Success Message */}
      {(showCopiedMessage || showDownloadedMessage) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-400 text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              {showCopiedMessage ? 'Copied to clipboard!' : 'Downloaded successfully!'}
            </span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">LOR Writing Assistant</h1>
          <p className="text-slate-600 text-sm">Create professional letters of recommendation with AI assistance</p>
        </div>

        <div className="max-w-7xl mx-auto">
          

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Input Form */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  {mode === 'form' ? 'Letter Details' : 'Prompt Input'}
                </h2>
                <div className="flex bg-slate-100 rounded-md p-1">
                  <button
                    onClick={() => setMode('form')}
                    className={`px-3 py-1 text-sm rounded-md transition-all ${
                      mode === 'form'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Form
                  </button>
                  <button
                    onClick={() => setMode('prompt')}
                    className={`px-3 py-1 text-sm rounded-md transition-all ${
                      mode === 'prompt'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Prompt
                  </button>
                </div>
              </div>

              {mode === 'form' ? (
                <FormLOR onGenerate={handleGenerate} onStartGenerating={handleStartGenerating} />
              ) : (
                <PromptLOR onGenerate={handleGenerate} onStartGenerating={handleStartGenerating} />
              )}
            </div>

            {/* Right Column - Result Display */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Generated Letter</h2>
                {letter && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md transition-colors text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>

                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'doc')}
                      className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pdf">PDF</option>
                      <option value="doc">DOC (Recommended)</option>
                    </select>

                    <button
                      onClick={handleDownload}
                      className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-md transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="relative">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                    <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-base font-medium text-slate-700">Generating your letter...</p>
                    <p className="text-sm text-slate-500">This may take a few seconds</p>
                  </div>
                  <div className="w-full max-w-md">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{
                        animation: 'flow 2s ease-in-out infinite'
                      }}></div>
                    </div>
                  </div>
                </div>
              ) : letter ? (
                <div className="bg-slate-50 border border-slate-200 rounded-md p-4 max-h-full overflow-y-auto">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{letter}</pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <FileText className="w-12 h-12 text-slate-300" />
                  <div>
                    <p className="text-base font-medium text-slate-600">No letter generated yet</p>
                    <p className="text-sm text-slate-500">Fill out the form or enter a prompt to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flow {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}