import React from 'react'
import ComponentFormProd from './components/FormProd';
import StatGlobal from './components/StatGlobal';
import ProduitsTable from './components/ProduitListing';
import TransactionsTable from './components/TransactionsListing';
import CommandesTable from './components/CommandesListing';

export default function page() {

  const container: React.CSSProperties = {
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
      gap: '30px'
    };
    
      const rightSection: React.CSSProperties = {
        width: '350px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '30px',
        height: 'fit-content'
      };
      
      const title: React.CSSProperties = {
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '1px'
        };
        
        const Soustitre: React.CSSProperties = {
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '30px'
        };

  return (
    <div style={container}>
      <div style={leftSection}>
        <h1 style={title}> Gestion des produits et commandes </h1>
        <h1 style={Soustitre}> Gérer les produits et suivez les commandes en temps réel </h1>
        <StatGlobal/>
        <h1 style={Soustitre}> Produits </h1>
        <ProduitsTable/>
        <h1 style={Soustitre}> Commandes </h1>
        <CommandesTable/>
        <h1 style={Soustitre}> Transactions </h1>
        <TransactionsTable/>
      </div>
      <div style={rightSection}>
        <ComponentFormProd/>
      </div>
    </div>
  )
}
