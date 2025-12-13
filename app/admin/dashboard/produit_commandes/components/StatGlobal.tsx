"use client"

import React from 'react';


export default function StatGlobal() {

  const container : React.CSSProperties = {
    margin:0
  }
  
  const statsContainer: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCard: React.CSSProperties = {
    backgroundColor: '#50789B',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center',
    
  };

  const statLabel: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    marginBottom: '10px'
  };

  const statValue: React.CSSProperties = {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold'
  };


  return (
    <div style={container}>
        <div style={statsContainer}>
          <div style={statCard}>
            <div style={statLabel}>Commandes</div>
            <div style={statValue}>15</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}>Paiements validés</div>
            <div style={statValue}>15</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}>Revenu</div>
            <div style={statValue}>150,000 fcfa</div>
          </div>
        </div>

      </div>
  );
}