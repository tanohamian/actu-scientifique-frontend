'use client'
import Logo from '@public/images/logo.svg'
import React, { useState } from 'react';
import SearchBarComponent from '@components/searchBar';
import IconComponent from '@components/Icons';
import ButtonComponent from '@components/button';

const iconSize = 'w-8 h-8'; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [inputValue, setInputValue] = useState('')
  const [activeTab, setActiveTab] = useState('Accueil')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const iconBaseProps = { className: `text-white ${iconSize}` };
  const footerElement = "flex flex-row items-center"

  const navItems = [
    'Accueil',
    'Une seule santé',
    'Tech',
    'Agenda',
    'Eco-humanité',
    'Portraits & découvertes',
    'Opportunités',
    'À propos'
  ];

  return (
    <div className="m-0 p-0 bg-[#50789B] w-full min-h-screen flex flex-col">
      <header className="w-full">
        <div className='flex flex-col lg:flex-row items-center justify-between lg:justify-around px-4 py-4 gap-4'>
          <div className='flex flex-row items-center gap-3'>
            <Logo className="w-30 h-30 flex-shrink-0" />
            <h3 className='text-white text-sm lg:text-base w-30'>
              Parce que la science est proche de tous
            </h3>
          </div>

          <div className='w-full lg:flex-1 lg:max-w-md mx-0 lg:mx-4'>
            <SearchBarComponent 
              placeholder='Rechercher un sujet' 
              inputValue={inputValue} 
              setInputValue={setInputValue} 
            />
          </div>

          <div className='flex flex-row items-center gap-4 w-full lg:w-auto justify-between lg:justify-end'>
            <div className='flex flex-row gap-2'> 
              <IconComponent name='InstagramIcon' {...iconBaseProps} />
              <IconComponent name='FacebookIcon' {...iconBaseProps} />
              <IconComponent name='WhatsAppIcon' {...iconBaseProps} />
              <IconComponent name='YouTubeIcon' {...iconBaseProps} />
              <IconComponent name='LinkedIn' {...iconBaseProps} />
            </div>

            <ButtonComponent textButton='Connexion' onclick={() => {}} /> 
          </div>
        </div>

        <nav className='w-full  border-white/20'>
          <div className='lg:hidden flex justify-between items-center px-4 py-3'>
            <span className='text-white font-base'>{activeTab}</span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-white p-2'
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <div className={`${
            isMobileMenuOpen ? 'flex' : 'hidden'
          } lg:flex flex-col lg:flex-row lg:flex-wrap justify-center lg:justify-around px-4 lg:px-4`}>
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item)
                  setIsMobileMenuOpen(false)
                }}
                className={`text-2xl w-full lg:w-auto rounded-lg   px-3 py-2 font-medium text-white text-left lg:text-center transition-all duration-200 ${
                  activeTab === item
                    ? 'bg-[#E65A46]'
                    : 'hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className='flex-grow px-4 py-6'>
        {children}
      </main>

      <footer className='w-full mt-auto border-white/20'>
        <div className='flex flex-col lg:flex-row justify-around py-8 px-4 gap-8 lg:gap-12'>
          <div className='flex flex-col'>
            <h2 className='text-white text-2xl font-bold mb-4'>Contacts & Localisations</h2>
            <div className={footerElement + ' mb-3'}>
              <IconComponent name='Localisation' className={`text-white w-6 h-6 flex-shrink-0`}/>
              <span className='text-white ml-3 text-sm lg:text-base'>Adresse de {"l'entreprise"}</span> 
            </div>
            <div className={footerElement}>
              <IconComponent name='Phone' className={`text-white w-6 h-6 flex-shrink-0`}/>
              <span className='text-white ml-3 text-sm lg:text-base'>+33 1 23 45 67 89</span> 
            </div>
          </div>

          <div className='flex flex-col'>
            <h2 className='text-white text-2xl font-bold mb-4'>À propos</h2>
            <a href="#about" className='text-white hover:underline mb-2 text-sm lg:text-base'>Notre mission</a>
            <a href="#team" className='text-white hover:underline text-sm lg:text-base'>{"L'équpe"}</a>
          </div>

          <div className='flex flex-col'>
            <h2 className='text-white text-2xl font-bold mb-4'>Partenaires</h2>
            <a href="#partner1" className='text-white hover:underline mb-2 text-sm lg:text-base'>Partenaire 1</a>
            <a href="#partner2" className='text-white hover:underline text-sm lg:text-base'>Partenaire 2</a>
          </div>
        </div>

        
        <div className=' border-white/20 py-4 px-4 text-center'>
          <p className='text-white/70 text-sm'>© 2026 - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}