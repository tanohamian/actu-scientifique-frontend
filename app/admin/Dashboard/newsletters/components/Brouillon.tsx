"use client"

import { useState } from 'react';
import { Search, Pencil, Trash2, ChevronDown } from 'lucide-react';
import React from 'react';

interface Newsletter {
  id: number;
  titre: string;
  categorie: string;
  publication: string;
}

export default function GestionNewsletters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [titreArticle, setTitreArticle] = useState('');
  const [contenu, setContenu] = useState('');
  const [categorie, setCategorie] = useState('Technologie');
  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const newsletters: Newsletter[] = [
    { id: 1, titre: "Utilisation de l'IA dans le journalisme", categorie: 'Technologie', publication: '14/10/2025' },
    { id: 2, titre: "Utilisation de l'IA dans le journalisme", categorie: 'Une seule santé', publication: '14/10/2025' },
    { id: 3, titre: "Utilisation de l'IA dans le journalisme", categorie: 'Technologie', publication: '14/10/2025' }
  ];

  const categories = ['Technologie', 'Une seule santé', 'Politique', 'Économie', 'Culture'];

  const handlePublish = () => {
    console.log({ titreArticle, contenu, categorie });
  };

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
    marginBottom: '30px'
  };

  const searchSection: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '25px'
  };

  const searchWrapper: React.CSSProperties = {
    position: 'relative',
    width: '100%'
  };

  const searchInput: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '12px 15px',
    paddingLeft: '45px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    width: '100%'
  };

  const searchIcon: React.CSSProperties = {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.9)'
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

  const formTitle: React.CSSProperties = {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '25px'
  };

  const formGroup: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
  };

  const label: React.CSSProperties = {
    color: 'white',
    fontSize: '14px',
    fontWeight: '500'
  };

  const input: React.CSSProperties = {
    backgroundColor: 'rgba(0, 40, 60, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px 15px',
    color: 'white',
    fontSize: '14px',
    outline: 'none'
  };

  const textarea: React.CSSProperties = {
    backgroundColor: 'rgba(0, 40, 60, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px 15px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'Arial, sans-serif'
  };

  const selectWrapper: React.CSSProperties = {
    position: 'relative'
  };

  const select: React.CSSProperties = {
    backgroundColor: 'rgba(0, 40, 60, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px 15px',
    paddingRight: '40px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    cursor: 'pointer',
    appearance: 'none'
  };

  const selectIcon: React.CSSProperties = {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
    pointerEvents: 'none'
  };

  const publishButton: React.CSSProperties = {
    backgroundColor: '#E65A46',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    transition: 'background-color 0.3s'
  };

  return (
    <div style={container}>
      <div style={leftSection}>
        <h1 style={title}>Gestion des Newsletters</h1>
        
        <div style={searchSection}>
          <div style={searchWrapper}>
            <Search size={20} style={searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par titre....."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInput}
            />
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
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        style={iconButton}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
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

      <div style={rightSection}>
        <h2 style={formTitle}>Ajouter une newsletter</h2>
        
        <div style={formGroup}>
          <label style={label}>Titre de L&apos;article</label>
          <input
            type="text"
            placeholder="futur du journalisme"
            value={titreArticle}
            onChange={(e) => setTitreArticle(e.target.value)}
            style={input}
          />
        </div>

        <div style={formGroup}>
          <label style={label}>Contenu</label>
          <textarea
            placeholder="le contenu........."
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            style={textarea}
          />
        </div>

        <div style={formGroup}>
          <label style={label}>Catégorie</label>
          <div style={selectWrapper}>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              style={select}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ backgroundColor: '#2c4f63' }}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown size={20} style={selectIcon} />
          </div>
        </div>

        <button 
          style={publishButton}
          onClick={handlePublish}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d54a36'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E65A46'}
        >
          Publier
        </button>
      </div>
    </div>
  );
}