'use client';

import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface PromptLORProps {
  onGenerate: (letter: string) => void;
  onStartGenerating: () => void;
}

export default function PromptLOR({ onGenerate, onStartGenerating }: PromptLORProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    onStartGenerating();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'prompt', data: { prompt } }),
      });
      const result = await response.json();
      if (result.letter) {
        onGenerate(result.letter);
      } else {
        setError(result.error || 'Failed to generate letter');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Enter your prompt for the letter of recommendation
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the applicant, your relationship, achievements, and what you want to recommend them for..."
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none text-black text-sm"
        />
        <p className="text-xs text-slate-500 mt-1">
          Be specific about the applicant's qualities, your relationship, and the purpose of the recommendation.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-6 rounded-md transition-colors flex items-center text-sm"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {loading ? 'Generating...' : 'Generate Letter'}
        </button>
      </div>
    </div>
  );
}