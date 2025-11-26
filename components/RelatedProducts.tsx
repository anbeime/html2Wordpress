import React from 'react';
import { ProductData } from '../types';

interface RelatedProductsProps {
  products: ProductData[];
  onSelectProduct: (product: ProductData) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, onSelectProduct }) => {
  return (
    <section className="py-16 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl brand-font text-stone-900">You May Also Like</h2>
          <div className="w-16 h-1 bg-red-800 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white group cursor-pointer border border-stone-200 hover:border-red-800 transition-colors duration-300"
              onClick={() => onSelectProduct(product)}
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-stone-200 xl:aspect-w-7 xl:aspect-h-8 relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute top-0 right-0 bg-red-800 text-white text-xs font-bold px-2 py-1">
                  NEW
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg brand-font text-stone-900 mb-1 truncate">{product.title}</h3>
                <p className="text-sm text-stone-500 mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-stone-900">${product.price.toFixed(2)}</p>
                  <span className="text-xs text-red-800 uppercase tracking-wide font-bold hover:underline">View Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;