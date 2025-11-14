import React from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react';

interface Newsletter {
  id: number;
  titre: string;
  categorie: string;
  publication: string;
}

export default function Affichage() {

  const newsletters: Newsletter[] = [
    { id: 1, titre: "Utilisation de l'IA dans le journalisme", categorie: 'Technologie', publication: '14/10/2025' },
    { id: 2, titre: "Utilisation de l'IA dans le journalisme", categorie: 'Une seule santé', publication: '14/10/2025' },
    { id: 3, titre: "Utilisation de l'IA dans le journalisme", categorie: 'Technologie', publication: '14/10/2025' }
  ];

  const container: React.CSSProperties = {
      backgroundColor: '#50789B',
      height:'468px',
      width:'809px',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      borderRadius:'20px',
    };

  const searchWrapper: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      alignItems:'center'
    };

    const searchIcon: React.CSSProperties = {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.9)'
    };
    const searchInput: React.CSSProperties = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        padding: '14px 15px',
        paddingLeft: '45px',
        color: 'white',
        fontSize: '14px',
        outline: 'none',
        width: '80%'
      };
      const tableSection: React.CSSProperties = {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '25px',
          flex: '1'
        };
      
        const table: React.CSSProperties = {
          width: '100%',
          borderCollapse: 'collapse'
        };

          const searchSection: React.CSSProperties = {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '25px',
            marginBottom : '25px'
          };
      
        const tableHeader: React.CSSProperties = {
          borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
        };
      
        const th: React.CSSProperties = {
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          textAlign: 'left',
          padding: '15px 10px'
        };
      
        const td: React.CSSProperties = {
          color: 'white',
          fontSize: '14px',
          padding: '20px 10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        };
      
        const actionButtons: React.CSSProperties = {
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end'
        };
      
        const iconButton: React.CSSProperties = {
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s'
        };

  return (
      <div style={container}>
        <div style={searchSection}>
          <div style={searchWrapper}>
          <Search size={20} style={searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par titre....."
             style={searchInput}/>
        </div>
        </div>
        <div style={tableSection}>
          <table style={table}>
            <thead style={tableHeader}>
              <tr>
                <th style={th}>Titres</th>
                <th style={th}>Categories</th>
                <th style={th}>Publications</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsletters.map((newsletter) => (
                <tr key={newsletter.id}>
                  <td style={td}>{newsletter.titre}</td>
                  <td style={td}>{newsletter.categorie}</td>
                  <td style={td}>{newsletter.publication}</td>
                  <td style={td}>
                    <div style={actionButtons}>
                      <button
                        style={iconButton}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        style={iconButton}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}
