"use client"

import Image from 'next/image';
import { useState } from 'react';
import { Search, Pencil, Trash2, ChevronDown, Upload } from 'lucide-react';
import React from 'react';

interface Produit {
  id: number;
  nom: string;
  categorie: string;
  prix: string;
  stock: number;
  image: string;
}

interface Commande {
  id: number;
  produit: string;
  categorie: string;
  prix: string;
  quantite: number;
  acheteur: string;
}

interface Transaction {
  id: string;
  produit: string;
  modePaiement: string;
  prix: string;
  acheteur: string;
}

export default function GestionProduitsCommandes() {
  const [searchQueryProduits, setSearchQueryProduits] = useState('');
  const [searchQueryCommandes, setSearchQueryCommandes] = useState('');
  const [searchQueryTransactions, setSearchQueryTransactions] = useState('');
  
  const [nomProduit, setNomProduit] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('livre');
  const [prix, setPrix] = useState('');
  const [stock, setStock] = useState('');

  const produits: Produit[] = [
    { id: 1, nom: 'Science & vie', categorie: 'Livre', prix: '15,000 fcfa', stock: 15, image: '🇨🇮' },
    { id: 2, nom: 'Science & vie', categorie: 'Livre', prix: '15,000 fcfa', stock: 15, image: '🇨🇮' },
    { id: 3, nom: 'Science & vie', categorie: 'Livre', prix: '15,000 fcfa', stock: 15, image: '🇨🇮' }
  ];

  const commandes: Commande[] = [
    { id: 1, produit: 'Science & vie', categorie: 'Livre', prix: '15,000 fcfa', quantite: 2, acheteur: 'elle Bamba' }
  ];

  const transactions: Transaction[] = [
    { id: 'N 145226', produit: 'Science & vie', modePaiement: 'orange money', prix: '15,000 fcfa', acheteur: 'elle Bamba' }
  ];

  const categories = ['livre', 'Magazine', 'Journal', 'Autre'];

  const handlePublish = () => {
    console.log({ nomProduit, image, description, categorie, prix, stock });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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

  const header: React.CSSProperties = {
    marginBottom: '20px'
  };

  const title: React.CSSProperties = {
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const subtitle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px'
  };

  const statsContainer: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCard: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center'
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

  const sectionTitle: React.CSSProperties = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  };

  const tableSection: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '30px'
  };

  const searchRow: React.CSSProperties = {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    alignItems: 'center'
  };

  const searchWrapper: React.CSSProperties = {
    position: 'relative',
    flex: '1'
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

  const trierButton: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '12px 20px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
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

  const productCell: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const productIcon: React.CSSProperties = {
    fontSize: '24px'
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
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'Arial, sans-serif'
  };

  const imageUploadArea: React.CSSProperties = {
    backgroundColor: 'rgba(0, 40, 60, 0.6)',
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  };

  const uploadIcon: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '10px'
  };

  const uploadText: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px'
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

  const formRow: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
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
        <div style={header}>
          <h1 style={title}>Gestion des produits et commandes</h1>
          <p style={subtitle}>Gérer les produits et suivez les commandes en temps réel</p>
        </div>

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

        <h2 style={sectionTitle}>Produits</h2>
        <div style={tableSection}>
          <div style={searchRow}>
            <div style={searchWrapper}>
              <Search size={20} style={searchIcon} />
              <input
                type="text"
                placeholder="Rechercher par nom produit...."
                value={searchQueryProduits}
                onChange={(e) => setSearchQueryProduits(e.target.value)}
                style={searchInput}
              />
            </div>
            <button style={trierButton}>
              Trier par <ChevronDown size={18} />
            </button>
          </div>

          <table style={table}>
            <thead style={tableHeader}>
              <tr>
                <th style={th}>Produits</th>
                <th style={th}>Catégories</th>
                <th style={th}>Prix</th>
                <th style={th}>Stock</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={produit.id}>
                  <td style={td}>
                    <div style={productCell}>
                      <span style={productIcon}>{produit.image}</span>
                      <span>{produit.nom}</span>
                    </div>
                  </td>
                  <td style={td}>{produit.categorie}</td>
                  <td style={td}>{produit.prix}</td>
                  <td style={td}>{produit.stock}</td>
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

        <h2 style={sectionTitle}>Commandes</h2>
        <div style={tableSection}>
          <div style={searchRow}>
            <div style={searchWrapper}>
              <Search size={20} style={searchIcon} />
              <input
                type="text"
                placeholder="Rechercher par nom produit...."
                value={searchQueryCommandes}
                onChange={(e) => setSearchQueryCommandes(e.target.value)}
                style={searchInput}
              />
            </div>
            <button style={trierButton}>
              Trier par <ChevronDown size={18} />
            </button>
          </div>

          <table style={table}>
            <thead style={tableHeader}>
              <tr>
                <th style={th}>Produits</th>
                <th style={th}>Categorie</th>
                <th style={th}>Prix</th>
                <th style={th}>Quantité</th>
                <th style={th}>Acheter par</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande) => (
                <tr key={commande.id}>
                  <td style={td}>
                    <div style={productCell}>
                      <span style={productIcon}>🇨🇮</span>
                      <span>{commande.produit}</span>
                    </div>
                  </td>
                  <td style={td}>{commande.categorie}</td>
                  <td style={td}>{commande.prix}</td>
                  <td style={td}>{commande.quantite}</td>
                  <td style={td}>{commande.acheteur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={sectionTitle}>Transactions</h2>
        <div style={tableSection}>
          <div style={searchRow}>
            <div style={searchWrapper}>
              <Search size={20} style={searchIcon} />
              <input
                type="text"
                placeholder="Rechercher par nom produit...."
                value={searchQueryTransactions}
                onChange={(e) => setSearchQueryTransactions(e.target.value)}
                style={searchInput}
              />
            </div>
            <button style={trierButton}>
              Trier par <ChevronDown size={18} />
            </button>
          </div>

          <table style={table}>
            <thead style={tableHeader}>
              <tr>
                <th style={th}>Transactions</th>
                <th style={th}>Produit</th>
                <th style={th}>Mode de paiement</th>
                <th style={th}>Prix</th>
                <th style={th}>Acheter par</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td style={td}>{transaction.id}</td>
                  <td style={td}>{transaction.produit}</td>
                  <td style={td}>{transaction.modePaiement}</td>
                  <td style={td}>{transaction.prix}</td>
                  <td style={td}>{transaction.acheteur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={rightSection}>
        <h2 style={formTitle}>Ajouter un produit</h2>
        
        <div style={formGroup}>
          <label style={label}>Nom du produit</label>
          <input
            type="text"
            placeholder="t-shirt"
            value={nomProduit}
            onChange={(e) => setNomProduit(e.target.value)}
            style={input}
          />
        </div>

        <div style={formGroup}>
          <label style={label}>Image</label>
          <label style={imageUploadArea}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            {image ? (
              <Image src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
            ) : (
              <>
                <Upload size={40} style={uploadIcon} />
                <div style={uploadText}>cliquez pour uploader une image</div>
              </>
            )}
          </label>
        </div>

        <div style={formGroup}>
          <label style={label}>Description</label>
          <textarea
            placeholder="Ecrivez votre article ici....."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

        <div style={formRow}>
          <div style={formGroup}>
            <label style={label}>Prix</label>
            <input
              type="text"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              style={input}
            />
          </div>
          <div style={formGroup}>
            <label style={label}>Stock</label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              style={input}
            />
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