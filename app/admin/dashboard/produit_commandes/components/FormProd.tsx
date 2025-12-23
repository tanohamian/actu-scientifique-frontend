"use client"
import React from 'react'

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';

export default function ComponentFormProd() {

  const [nomProduit, setNomProduit] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('livre');
  const [prix, setPrix] = useState('');
  const [stock, setStock] = useState('');

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

  const handlePublish = () => {
    console.log({ nomProduit, image, description, categorie, prix, stock });
  };

  const categories = ['livre', 'Magazine', 'Journal', 'Autre'];

  const formTitle: React.CSSProperties = {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '25px'
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

  const selectWrapper: React.CSSProperties = {
    position: 'relative'
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
    outline: 'none',
    width: '80%'
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

  const formRow: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  };

  return (
    <div>
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
            <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
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
  )
}
