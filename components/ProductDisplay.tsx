import React from 'react';
import { ProductData } from '../types';

interface ProductDisplayProps {
  product: ProductData;
  onBack: () => void;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product, onBack }) => {
  const handleAmazonBuy = () => {
    // Construct a search URL for Amazon since we don't have real ASINs for generated products
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.amazonSearchTerm)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Navigation / Header */}
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button 
              onClick={onBack}
              className="text-stone-500 hover:text-red-800 flex items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Create New
            </button>
            <div className="brand-font text-xl font-bold tracking-tight">NEO-FUSION</div>
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
          
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-stone-100 rounded-sm overflow-hidden shadow-lg border border-stone-200">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="hidden md:flex space-x-4 mt-4">
               {/* Placeholder thumbnails purely for aesthetic layout */}
               <div className="h-20 w-20 bg-stone-200 border border-red-800 opacity-100 cursor-pointer overflow-hidden">
                 <img src={product.imageUrl} className="h-full w-full object-cover" alt="thumb" />
               </div>
               <div className="h-20 w-20 bg-stone-200 border border-transparent hover:border-stone-400 cursor-pointer opacity-60"></div>
               <div className="h-20 w-20 bg-stone-200 border border-transparent hover:border-stone-400 cursor-pointer opacity-60"></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-2 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="mb-6">
              <span className="text-red-800 font-bold tracking-widest text-xs uppercase bg-red-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-4xl brand-font font-bold text-stone-900 tracking-tight mb-2">{product.title}</h1>
            <p className="text-xl text-stone-500 italic font-serif mb-6">{product.tagline}</p>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-stone-900 font-light font-sans inline-block border-b-2 border-red-800 pb-1">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-stone-700 space-y-6 leading-relaxed chinese-font">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">Artifact Specifications</h3>
              <ul role="list" className="mt-4 pl-4 list-disc space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-stone-600 text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sticky Buy Button Mobile friendly */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sticky bottom-4 z-10 sm:static">
              <button
                type="button"
                onClick={handleAmazonBuy}
                className="flex-1 bg-stone-900 border border-transparent py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-xl transition-all duration-300 transform active:scale-95"
              >
                <span className="mr-2">Buy on Amazon</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                  <path d="M15.54 11.237c.78-.936 1.306-2.114 1.306-3.328 0-3.39-3.216-5.46-6.426-5.46-3.52 0-6.196 2.14-6.196 5.46 0 1.25.548 2.454 1.455 3.39l-1.926 2.067c-.23.25-.137.66.208.79 3.016 1.14 5.28 1.134 6.46.99.213-.026.388.192.274.375-.545.875-1.95 1.543-4.214 1.196-.28-.043-.52.223-.396.47 1.096 2.195 4.39 2.515 7.07 1.32.26-.116.32-.464.12-.662l-3.273-3.513c-.22-.236-.086-.632.23-.74 1.353-.46 3.86-1.576 5.31-2.298.125-.062.18-.21.14-.343l-.134-.517zM10.42 10.3c-1.89 0-3.42-1.58-3.42-3.53 0-1.95 1.53-3.53 3.42-3.53 1.89 0 3.42 1.58 3.42 3.53 0 1.95-1.53 3.53-3.42 3.53z"/>
                </svg>
              </button>
            </div>

            <p className="mt-4 text-xs text-stone-400 text-center sm:text-left">
              *Fulfilled securely via Amazon. External link opens in new tab.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDisplay;