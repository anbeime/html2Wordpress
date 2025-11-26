import React, { useState } from 'react';
import { AppState, ProductData } from './types';
import { generateProductText, generateProductImage } from './services/geminiService';
import { MOCK_RELATED_PRODUCTS } from './constants';
import CreatorForm from './components/CreatorForm';
import ProductDisplay from './components/ProductDisplay';
import RelatedProducts from './components/RelatedProducts';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(null);

  const handleGenerate = async (prompt: string) => {
    setAppState(AppState.GENERATING);
    try {
      // 1. Generate text data
      const textData = await generateProductText(prompt);
      
      // 2. Generate Image based on the specific image prompt returned by text model
      const imageUrl = await generateProductImage(textData.imagePrompt);

      const newProduct: ProductData = {
        id: Date.now().toString(),
        ...textData,
        imageUrl: imageUrl,
      };

      setCurrentProduct(newProduct);
      setAppState(AppState.DISPLAY_PRODUCT);
    } catch (error) {
      console.error("Generation failed", error);
      alert("The spirits of the machine are restless (API Error). Please try again.");
      setAppState(AppState.IDLE);
    }
  };

  const handleSelectProduct = (product: ProductData) => {
    setCurrentProduct(product);
    setAppState(AppState.DISPLAY_PRODUCT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setAppState(AppState.IDLE);
    setCurrentProduct(null);
  };

  // Rendering Logic
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-red-200">
      
      {appState === AppState.IDLE || appState === AppState.GENERATING ? (
        <>
          <CreatorForm onGenerate={handleGenerate} isGenerating={appState === AppState.GENERATING} />
          {/* Show Related Products even on Home Screen to inspire */}
          {!appState.includes('GENERATING') && (
            <RelatedProducts 
              products={MOCK_RELATED_PRODUCTS} 
              onSelectProduct={handleSelectProduct} 
            />
          )}
        </>
      ) : (
        <>
          {currentProduct && (
            <ProductDisplay 
              product={currentProduct} 
              onBack={handleBack} 
            />
          )}
          
          <RelatedProducts 
            products={MOCK_RELATED_PRODUCTS} 
            onSelectProduct={handleSelectProduct} 
          />
        </>
      )}

      <footer className="bg-stone-900 text-stone-400 py-8 mt-auto border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Neo-Fusion Concepts.</p>
          <p className="mt-2 text-xs opacity-60">
            This site uses AI (Gemini) to generate product concepts. 
            Items shown may not physically exist until ordered via custom commission or linked partner stores.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;