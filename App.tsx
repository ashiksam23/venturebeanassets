import React, { useState, useEffect, useRef } from 'react';
import { assetsData } from './constants';
import { AssetItem } from './types';
import AssetCard from './components/AssetCard';
import AssetModal from './components/AssetModal';

const App: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssets, setFilteredAssets] = useState<AssetItem[]>(assetsData);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredAssets = assetsData.filter(asset =>
      asset.title.toLowerCase().includes(lowercasedQuery) ||
      asset.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredAssets(newFilteredAssets);
  }, [searchQuery]);

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
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
    lastFocusedElement.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
        <img src="https://storage.googleapis.com/aai-web-samples/venturebean-logo.png" alt="VentureBean Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-vb-blue">
            Asset Hub
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            An interactive showcase of Venturebean's key frameworks, media presence, and intellectual property. Click a card to explore.
          </p>
        </header>
        
        <div className="mb-12 max-w-2xl mx-auto">
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
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-700">No Assets Found</h3>
              <p className="mt-2 text-gray-500">Your search for "{searchQuery}" did not match any assets.</p>
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
      />
    </div>
  );
};

export default App;