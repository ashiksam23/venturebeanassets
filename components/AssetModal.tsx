import React, { useEffect, useRef } from 'react';
import { AssetItem } from '../types';

interface AssetModalProps {
  asset: AssetItem | null;
  onClose: () => void;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-vb-maroon">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-vb-maroon transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
);


const renderDetailsList = (items: (string | { text: string; link: string })[]) => (
  <ul className="space-y-3 text-gray-700">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        {typeof item === 'string' ? (
          <>
            <CheckIcon />
            <span className="flex-1">{item}</span>
          </>
        ) : (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-vb-blue hover:text-vb-maroon group font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-vb-maroon rounded-sm flex items-start"
          >
            <LinkIcon />
            <span className="flex-1 underline decoration-dotted underline-offset-4 group-hover:decoration-solid group-focus:decoration-solid transition-all">{item.text}</span>
          </a>
        )}
      </li>
    ))}
  </ul>
);

const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (asset) {
      closeButtonRef.current?.focus();

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKeyPress);
      return () => {
        document.removeEventListener('keydown', handleTabKeyPress);
      };
    }
  }, [asset]);

  if (!asset) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="asset-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-transform duration-300 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <header className="p-6 flex justify-between items-center border-b border-gray-200 bg-white">
          <h2 id="asset-modal-title" className="text-3xl font-bold text-vb-blue">{asset.title}</h2>
          <button 
            ref={closeButtonRef}
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-800 transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-vb-maroon"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-6 sm:p-8 overflow-y-auto">
          <p className="mb-8 text-lg text-gray-600 border-l-4 border-vb-maroon pl-4 italic">{asset.description}</p>
          
          {asset.children ? (
            <div className="space-y-6">
              {asset.children.map((child) => (
                <section key={child.title} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-vb-blue mb-4">{child.title}</h3>
                  <ul className="space-y-3 text-gray-700">
                    {child.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                            <CheckIcon />
                            <span className="flex-1">{detail}</span>
                        </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
             asset.details && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    {renderDetailsList(asset.details)}
                </div>
            )
          )}
        </main>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AssetModal;