import React from 'react'
import ComponenteFormulaire from './components/ComponenteFormulaire';
import Affichage from './components/Affichage';

export default function page() {
  const container: React.CSSProperties = {
      backgroundColor: '#6B94AD',
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
        <Affichage/>
      </div>
      <div style={rightSection}>
        <ComponenteFormulaire/>
      </div>
    </div>
  )
}
