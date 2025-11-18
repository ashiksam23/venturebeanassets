import React from 'react';
import { AssetItem } from '../types';

const Icons = {
  frameworks: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
  ),
  media: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V7.125c0-.621.504-1.125 1.125-1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V7.5Z" />
    </svg>
  ),
  collaborations: (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962A3.375 3.375 0 0 1 10.5 9h3a3.375 3.375 0 0 1 3.375 3.375v1.5a3.375 3.375 0 0 1-3.375 3.375h-3a3.375 3.375 0 0 1-3.375-3.375v-1.5Zm-6.375-3.375a3.375 3.375 0 0 1 3.375-3.375h3a3.375 3.375 0 0 1 3.375 3.375v1.5a3.375 3.375 0 0 1-3.375 3.375h-3a3.375 3.375 0 0 1-3.375-3.375v-1.5Z" />
    </svg>
  ),
  assessments: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  ),
  reports: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
}

interface AssetCardProps {
  asset: AssetItem;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left w-full h-full flex flex-col"
      aria-label={`View details for ${asset.title}`}
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-vb-blue/10 text-vb-maroon flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-vb-maroon group-hover:text-white">
        {Icons[asset.icon]}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-vb-blue mb-2">{asset.title}</h3>
        <p className="text-gray-600 leading-relaxed">
          {asset.description}
        </p>
      </div>
      <div className="mt-6">
        <span className="font-semibold text-vb-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details &rarr;
        </span>
      </div>
    </button>
  );
};

export default AssetCard;