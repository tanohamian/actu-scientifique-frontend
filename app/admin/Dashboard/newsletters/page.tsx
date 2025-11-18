import React from 'react'
import ComponenteFormulaire from './components/ComponenteFormulaire';
import Affichage, { Newsletter } from './components/Affichage';

export default function page() {
  const newsletters: Newsletter[] = [
      { id: 1, title: "Utilisation de l'IA dans le journalisme", category: 'Technologie', publication: '14/10/2025' },
      { id: 2, title: "Utilisation de l'IA dans le journalisme", category: 'Une seule santé', publication: '14/10/2025' },
      { id: 3, title: "Utilisation de l'IA dans le journalisme", category: 'Technologie', publication: '14/10/2025' }
    ];
  const container: React.CSSProperties = {
      //backgroundColor: '#6B94AD',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      gap: '30px'
      
    };
    const leftSection: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    
      };
    
      const rightSection: React.CSSProperties = {
        width: '350px',
        height: 'fit-content',
        alignItems:'flex-start',
        padding:"27px"
      };
      const title: React.CSSProperties = {
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '30px'
        };
  return (
    <div style={container}>
      <div style={leftSection}>
        <h1 style={title}>Gestion des Newsletters</h1>
        <Affichage
         items={newsletters}
        />
      </div>
      <div style={rightSection}>
        <ComponenteFormulaire isArticle={false}/>
      </div>
    </div>
  )
}
