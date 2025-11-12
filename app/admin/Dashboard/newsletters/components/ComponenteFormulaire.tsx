import Form from "next/form"
import React from 'react';
// import { ChevronUp } from 'lucide-react';

export default function ComponenteFormulaire() {

  const container: React.CSSProperties = {
    backgroundColor: '#50789B',
    height: 'auto',
    width: '362px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '25px',
    margin: '20px auto',
  };

  const labelStyle: React.CSSProperties = {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
    fontSize: '16px',
    marginTop: '20px',
  };

  const inputBaseStyle: React.CSSProperties = {
    backgroundColor: '#2D4459',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px',
    outline: 'none',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputBaseStyle,
    minHeight: '150px',
    resize: 'vertical',
    whiteSpace: 'pre-wrap',
  };

  
  const selectStyle: React.CSSProperties = {
    ...inputBaseStyle,
    appearance: 'none',
    paddingRight: '30px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#E76C5B',
    color: 'white',
    padding: '15px 0',
    borderRadius: '8px',
    border: 'none',
    width: '100%',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '40px',
    marginBottom: '10px',
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
  };

  return (
    <div style={container}>
      <h2 style={titleStyle}>Ajouter une newsletter </h2>
      <Form action="/admin/dashboard/newsletters">
        <div>
          <label htmlFor="titre" style={labelStyle}>Titre de l&apos;article</label>
          <input
            type="text"
            id="titre"
            name="titre"
            style={inputBaseStyle}
            defaultValue="futur du journalisme"
          />
        </div>
        <div>
          <label htmlFor="contenu" style={labelStyle}>Contenu</label>
          <textarea
            id="contenu"
            name="contenu"
            style={textareaStyle}
            placeholder="le contenu................"
            rows={8}
          />
        </div>
        <div>
          <label htmlFor="categorie" style={labelStyle}>Catégorie</label>
          <div style={{ position: 'relative' }}>
            <select
              id="categorie"
              name="categorie"
              style={selectStyle}
              defaultValue="Technologie"
            >
              <option value="Technologie"> Technologie </option>
              <option value="Technologie"> Politique </option>
              <option value="Technologie"> Économie </option>
            </select>
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          Publier
        </button>
        
      </Form>
    </div>
  )
}