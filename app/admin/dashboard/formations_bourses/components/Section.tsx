"use client"
import React, { useState, CSSProperties, useEffect, useCallback } from 'react';
import { Pencil, Trash2, Loader2 } from 'lucide-react';


import { FetchTrainings, AddTraining, UpdateTraining, DeleteTraining, ITraining } from '@/app/actions/Trainings';
import { FetchScholarships, AddScholarship, UpdateScholarship, DeleteScholarship, IScholarship } from '@/app/actions/Scholarships';

// Création d'un type Union pour éviter le "any"
type DataItem = ITraining | IScholarship;

interface FormData {
  title: string;
  url: string;
  description: string;
  date: string;
}

const tabContainer: CSSProperties = { display: 'flex', gap: '30px', marginBottom: '40px', borderBottom: '2px solid rgba(255, 255, 255, 0.3)' };
const tabStyle: CSSProperties = { color: 'white', fontSize: '16px', padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500',borderBottom: '3px solid transparent', };
const activeTabStyle: CSSProperties = { borderBottom: '3px solid #E67E5F', fontWeight: 'bold',borderBottomColor: '#E67E5F', };
const baseInputStyle: CSSProperties = { padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '14px', outline: 'none' };
const buttonStyle: CSSProperties = { padding: '12px 40px', backgroundColor: '#E67E5F', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' };

export default function SwitchSection() {
  const [activeTab, setActiveTab] = useState<'Bourses' | 'Formations'>('Bourses');
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    title: '', url: '', description: '', date: ''
  });

  // useCallback empêche la fonction de changer à chaque rendu
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = activeTab === 'Formations'
        ? await FetchTrainings()
        : await FetchScholarships();
        console.log("Données reçues pour", activeTab, ":", data);
      setItems(data || []);
    } catch (error) {
      console.error("Erreur de récupération:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async () => {
    setLoading(true);
    
    const payload = {
      titre: formData.title,
      lien: formData.url,
      description: formData.description,
      date: formData.date
    };

    let res;
    if (activeTab === 'Formations') {
      res = editingId
        ? await UpdateTraining(editingId, payload as ITraining)
        : await AddTraining(payload as ITraining);
    } else {
      res = editingId
        ? await UpdateScholarship(editingId, payload as IScholarship)
        : await AddScholarship(payload as IScholarship);
    }

    if (res?.success) {
      setEditingId(null);
      setFormData({ title: '', url: '', description: '', date: '' });
      await loadData(); // On attend le rechargement
    } else {
      alert("Une erreur est survenue lors de l'enregistrement.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Supprimer cet élément ?`)) {
      const success = activeTab === 'Formations' ? await DeleteTraining(id) : await DeleteScholarship(id);
      if (success) loadData();
    }
  };

  const handleEditClick = (item: DataItem) => {
    setEditingId(item.id || null);
    setFormData({
      title: item.titre,
      url: item.lien,
      description: item.description,
      date: item.date
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#5A8FAC', minHeight: '100vh', padding: isMobile ? '20px' : '40px', color: 'white' }}>
      {/* ONGLETS */}
      <div style={tabContainer}>
        {(['Bourses', 'Formations'] as const).map((tab) => (
          <button
            key={tab}
            style={{ ...tabStyle, ...(activeTab === tab ? activeTabStyle : {}) }}
            onClick={() => {
              setActiveTab(tab);
              setEditingId(null);
              setFormData({title:'', url:'', description:'', date:''});
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FORMULAIRE D'AJOUT / MODIF */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '24px' }}>
            {editingId ? 'Modifier' : 'Ajouter'} {activeTab === 'Bourses' ? 'une bourse' : 'une formation'}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px' }}>Titre</label>
            <input type="text" placeholder="Entrez le titre" style={baseInputStyle}
              value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px' }}>Lien (YouTube ou Web)</label>
            <input type="text" placeholder="https://..." style={baseInputStyle}
              value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <label style={{ fontSize: '14px' }}>Description</label>
          <textarea placeholder="Brève description..." style={{...baseInputStyle, minHeight: '100px', resize: 'vertical'}}
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px' }}>Date</label>
            <input type="date" style={{...baseInputStyle, colorScheme: 'dark'}}
              value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>
          <button onClick={handleSave} disabled={loading} style={{...buttonStyle, display: 'flex', alignItems: 'center', gap: '10px'}}>
            {loading && <Loader2 className="animate-spin" size={18} />}
            {editingId ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>
      </div>

      {/* LISTE DES DONNÉES */}
      <div>
        <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Liste des {activeTab}</h3>
        {loading && items.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Loader2 className="animate-spin" size={32} /></div>
        ) : items.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>Aucune donnée trouvée.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} style={{ display: 'flex', padding: '15px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', alignItems: 'center' }}>
              <div style={{ flex: 2, fontWeight: '500' }}>{item.titre}</div>
              <div style={{ flex: 1, opacity: 0.8 }}>{item.date}</div>
              <div style={{ flex: 0.5, display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button onClick={() => handleEditClick(item)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} title="Modifier">
                  <Pencil size={18} />
                </button>
                <button onClick={() => item.id && handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }} title="Supprimer">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}