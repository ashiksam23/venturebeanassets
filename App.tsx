import React, { useState, useEffect, useRef } from 'react';
import { assetsData } from './constants';
import { AssetItem } from './types';
import AssetCard from './components/AssetCard';
import AssetModal from './components/AssetModal';

const categories = ['All', ...Array.from(new Set(assetsData.map(asset => asset.icon)))];

const App: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredAssets, setFilteredAssets] = useState<AssetItem[]>(assetsData);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredAssets = assetsData.filter(asset => {
      const categoryMatch = activeCategory === 'All' || asset.icon === activeCategory;
      const searchMatch = asset.title.toLowerCase().includes(lowercasedQuery) ||
                          asset.description.toLowerCase().includes(lowercasedQuery);
      return categoryMatch && searchMatch;
    });
    setFilteredAssets(newFilteredAssets);
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        handleCloseModal();
       }
    };
    window.addEventListener('keydown', handleEsc);

    if (selectedAsset) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [selectedAsset]);

  const handleCardClick = (asset: AssetItem, event: React.MouseEvent<HTMLButtonElement>) => {
    lastFocusedElement.current = event.currentTarget;
    setSelectedAsset(asset);
    setIsModalClosing(false);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setSelectedAsset(null);
      lastFocusedElement.current?.focus();
    }, 300); // Match animation duration
  };

  const NoResultsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.94 21.06c-4.237-1.4-7.153-5.23-7.153-9.81a8.25 8.25 0 0 1 15.132-4.526" />
    </svg>
  );

  return (
    <div className="min-h-screen text-gray-800 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center animate-fadeInDown">
        <img src="https://storage.googleapis.com/aai-web-samples/venturebean-logo.png" alt="VentureBean Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-vb-blue">
            Asset Hub
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            An interactive showcase of Venturebean's key frameworks, media presence, and intellectual property. Click a card to explore.
          </p>
        </header>
        
        <div className="mb-8 max-w-2xl mx-auto animate-fadeInDown" style={{ animationDelay: '100ms' }}>
          <div className="relative">
            <input
              type="search"
              placeholder="Search assets by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-vb-maroon focus:border-transparent transition"
              aria-label="Search assets"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-12 flex justify-center flex-wrap gap-2 animate-fadeInDown" style={{ animationDelay: '200ms' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border-2 ${activeCategory === category ? 'bg-vb-maroon border-vb-maroon text-white shadow' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <main>
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAssets.map((asset) => (
                <AssetCard 
                  key={asset.id} 
                  asset={asset} 
                  onClick={(event) => handleCardClick(asset, event)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/60 rounded-xl">
              <NoResultsIcon />
              <h3 className="text-2xl font-semibold text-gray-700">No Assets Found</h3>
              <p className="mt-2 text-gray-500">Your search for "{searchQuery}" in "{activeCategory}" did not match any assets.</p>
            </div>
          )}
        </main>

        <footer className="text-center mt-20 text-gray-500">
            <p>&copy; {new Date().getFullYear()} Venturebean. All Rights Reserved.</p>
        </footer>
      </div>

      <AssetModal 
        asset={selectedAsset}
        onClose={handleCloseModal}
        isClosing={isModalClosing}
      />
    </div>
  );
};

export default App;