/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { AddProduct } from '@/app/actions/ProductsManager';
import { Product } from '@/app/interfaces';
import { toast } from '@/app/components/FormComponent';

interface ComponentFormProdProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export interface Categories {
  id: string;
  label: string;
}

export default function ComponentFormProd({ setProducts }: ComponentFormProdProps) {
  const categories: Categories[] = [
    { id: "books", label: "Livres" },
    { id: "clothes", label: "Vêtements" },
    { id: "technology_objects", label: "Objets Tech" }
  ];

  const [nomProduit, setNomProduit] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState(categories[0].id);
  const [prix, setPrix] = useState(0);
  const [stock, setStock] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    try {
      console.log("Catégorie avant envoi:", categorie);
      const product = new FormData()
      product.append('name', nomProduit)
      product.append('description', description)
      product.append('categories', categorie)
      product.append('price', prix.toString())
      product.append('stock', stock.toString())
      if (imageFile) {
        product.append('file', imageFile)
      }
      const response = await fetch('/api/upload-product', {
        method: 'POST',
        body: product
      })
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'upload');
      }
      const result = await response.json();
      if (response) {
        const newProduct = result.product as Product;
        setProducts((prevProducts) => [...prevProducts, newProduct])
        setNomProduit('')
        setDescription('')
        setCategorie('')
        setPrix(0)
        setStock(0)
        //setImageFile(null)
        setImagePreview(null)
        toast(true, false, "Produit ajouté avec succès")
      }
    } catch (error) {
      console.log("erreur lors de l'ajout du produit : ", error)
      toast(true, false, "Erreur lors de l'ajout du produit")
    }
  };



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
    zIndex: 1,
    height: "45px"
    //appearance: 'none'
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
    //textAlign: 'center',
    //alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  };

  const uploadIcon: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '10px',
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
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <Upload size={40} style={uploadIcon} />
              <div style={uploadText}>cliquez pour uploader une image</div>
            </div>
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              console.log("Nouvelle catégorie sélectionnée :", e.target.value);
              setCategorie(e.target.value)
            }}
            style={select}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} style={{ backgroundColor: '#2c4f63' }}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={formRow}>
        <div style={formGroup}>
          <label style={label}>Prix</label>
          <input
            type="text"
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value))}
            style={input}
          />
        </div>
        <div style={formGroup}>
          <label style={label}>Stock</label>
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
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
