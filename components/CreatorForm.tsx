import React, { useState } from 'react';

interface CreatorFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const CreatorForm: React.FC<CreatorFormProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
      <div className="max-w-2xl w-full bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-red-800">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold tracking-widest text-red-800 uppercase mb-2">Creative Studio</h2>
          <h1 className="text-4xl md:text-5xl brand-font text-stone-900 mb-4">The Fusion Forge</h1>
          <p className="text-stone-600 font-light italic">
            "Where the East meets the Grotesque West."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-stone-700 mb-2">
              Describe your fusion concept
            </label>
            <textarea
              id="idea"
              rows={4}
              className="w-full p-4 border border-stone-300 rounded-sm focus:ring-2 focus:ring-red-800 focus:border-red-800 bg-stone-50 outline-none transition-all resize-none"
              placeholder="e.g., A Victorian tea set made of circuit boards and dragon scales..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className={`w-full py-4 px-6 flex justify-center items-center text-white text-lg font-serif tracking-wide transition-all ${
              isGenerating || !prompt.trim()
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-red-900 shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Forging Artifact...
              </span>
            ) : (
              'Generate Product Page'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-stone-400 uppercase tracking-wider">Powered by Gemini AI</p>
        </div>
      </div>
    </div>
  );
};

export default CreatorForm;