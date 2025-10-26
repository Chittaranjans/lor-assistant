"use client";
import Link from 'next/link';
import { Github, Linkedin, FileText, Users, Zap, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [buttonGlow, setButtonGlow] = useState(false);

  useEffect(() => {
    // Show tooltip and button glow after 2-3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setButtonGlow(true);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">LOR Assistant</h1>
          <div className="flex space-x-6">
            <a href="#features" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">Features</a>
            <a href="#about" className="text-slate-600 hover:text-slate-800 transition-colors font-medium">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Viewport Height */}
      <section className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-200 rounded-full blur-xl"></div>
        </div>

        <div className="text-center space-y-12 max-w-6xl mx-auto px-4 relative z-10">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              LOR Writing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Assistant
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Create professional letters of recommendation with AI assistance. Fill out a form or provide a prompt to generate personalized LORs in PDF or DOC format.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto py-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">AI-Powered</h3>
              <p className="text-slate-600 text-sm">Advanced AI generates professional, personalized letters</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Instant Results</h3>
              <p className="text-slate-600 text-sm">Get your LOR in seconds, not hours</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Multiple Formats</h3>
              <p className="text-slate-600 text-sm">Download in PDF or DOC format</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center relative">
            <Link href="/lor">
              <button
                className={`bg-slate-800 hover:bg-slate-900 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden ${
                  buttonGlow ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
                }`}
                onClick={() => {
                  setShowTooltip(false);
                  setButtonGlow(false);
                }}
              >
                {buttonGlow && (
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-60"></div>
                )}
                <span className="relative z-10">Get Started Free</span>
              </button>
            </Link>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-xs relative">
                  {/* Close button */}
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Tooltip content */}
                  <div className="flex items-start space-x-3 pr-6">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-800 mb-1">Welcome!</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Click "Get Started" to create professional LORs with AI.
                      </p>
                    </div>
                  </div>

                  {/* Arrow pointing down */}
                  <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-3 border-r-3 border-t-6 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          
        </div>

        {/* Hero Image/Illustration */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Professional writing"
            className="w-full h-full object-cover rounded-tl-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="bg-blue-50 rounded-xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <FileText className="w-10 h-10 text-blue-600 mr-4" />
                <h3 className="text-2xl font-semibold text-slate-800">Fill the Form</h3>
              </div>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">Provide details about the candidate, relationship, and achievements.</p>
              <div className="bg-blue-25 p-6 rounded-lg">
                <p className="text-slate-700 italic leading-relaxed">
                  "John has been an outstanding student in my Computer Science class, consistently achieving top grades..."
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Zap className="w-10 h-10 text-green-600 mr-4" />
                <h3 className="text-2xl font-semibold text-slate-800">AI Generation</h3>
              </div>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">Our AI crafts a professional, personalized letter based on your input.</p>
              <div className="bg-blue-25 p-6 rounded-lg">
                <p className="text-slate-700 italic leading-relaxed">
                  "...demonstrating exceptional problem-solving skills and leadership potential..."
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Users className="w-10 h-10 text-purple-600 mr-4" />
                <h3 className="text-2xl font-semibold text-slate-800">Download & Share</h3>
              </div>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">Download in PDF or DOC format, ready to submit.</p>
              <div className="bg-blue-25 p-6 rounded-lg">
                <p className="text-slate-700 italic leading-relaxed">
                  "I wholeheartedly recommend John for any advanced studies or professional opportunities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 min-h-[25vh]">
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <div>
            <p className="text-lg font-semibold">Chittaranjan</p>
            <p className="text-slate-400 mt-2">LOR Writing Assistant Creator</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes borderGlow {
          0%, 100% {
            border-color: rgba(59, 130, 246, 0.5);
            transform: scale(1);
          }
          50% {
            border-color: rgba(59, 130, 246, 1);
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
