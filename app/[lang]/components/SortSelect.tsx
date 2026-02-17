import React, { useState } from 'react';

// Définir le type pour les options (si vous en avez besoin plus tard)
interface SortOption {
  label: string;
  value: string;
}

const SortSelect: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  

  const baseClasses = 'relative inline-flex items-center justify-between p-4 rounded-xl cursor-pointer transition duration-150 ease-in-out';
  const colorClasses = 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg';
  const textClasses = 'text-3xl font-bold tracking-tight'; 

  const iconClasses = `ml-4 w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`;

  return (
    <div className={`${baseClasses} ${colorClasses}`} onClick={() => setIsOpen(!isOpen)}>
      {/* Texte "Trier par" */}
      <span className={textClasses}>
        Trier par
      </span>

      {/* Icône de flèche vers le bas */}
      <svg
        className={iconClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3} // L'épaisseur du trait semble plus élevée sur l'image
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      
      {/* // Optionnel: Ajoutez ici le menu déroulant qui apparaîtrait lors du clic
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl z-10 text-black text-base">
          // ... Liste des options de tri
        </div>
      )} 
      */}
    </div>
  );
};

export default SortSelect;