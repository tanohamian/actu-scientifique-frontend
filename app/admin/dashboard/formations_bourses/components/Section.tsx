"use client"
import React, { useState, CSSProperties, useEffect, useCallback } from 'react';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
// Importation de tes actions
import { FetchTrainings, AddTraining, UpdateTraining, DeleteTraining, ITraining } from '@/app/actions/Trainings';

interface FormData {
  title: string;
  url: string;
  description: string;
  date: string;
  reward?: string;
}

// --- TES STYLES PERSONNALISÉS ---
const tabContainer: CSSProperties = { display: 'flex', gap: '30px', marginBottom: '40px', borderBottom: '2px solid rgba(255, 255, 255, 0.3)' }
const tabStyle: CSSProperties = { color: 'white', fontSize: '16px', padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer', position: 'relative', fontWeight: '500' }
const activeTabStyle: CSSProperties = { borderBottom: '3px solid #E67E5F', fontWeight: 'bold' }
const labelStyle: CSSProperties = { fontSize: '14px', fontWeight: '500' };
const iconButtonStyle: CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'white', opacity: 0.8 };
const baseInputStyle: CSSProperties = { padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '14px', outline: 'none' };
const buttonStyle: CSSProperties = { padding: '12px 40px', backgroundColor: '#E67E5F', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' };

export default function SwitchSection() {
  const [activeTab, setActiveTab] = useState('Formations');
  const [searchValue, setSearchValue] = useState('');
  const [trainings, setTrainings] = useState<ITraining[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    title: '', url: '', description: '', date: '', reward: ''
  });


  const loadData = useCallback(async () => {
    if (activeTab === 'Formations') {
      setLoading(true);
      try {
        const data = await FetchTrainings();
        setTrainings(data || []);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
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
    if (activeTab !== 'Formations') return;
    
  
    const payload: ITraining = {
      titre: formData.title,
      lien: formData.url,
      description: formData.description,
      date: formData.date
    };

    setLoading(true);
    const res = editingId
      ? await UpdateTraining(editingId, payload)
      : await AddTraining(payload);

    if (res.success) {
      setEditingId(null);
      setFormData({ title: '', url: '', description: '', date: '', reward: '' });
      loadData(); // Recharger la liste après succès
    }
    setLoading(false);
  };

  const handleEditClick = (item: ITraining) => {
    setEditingId(item.id || null);
    setFormData({
      title: item.titre,
      url: item.lien,
      description: item.description,
      date: item.date
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cette formation ?")) {
      const success = await DeleteTraining(id);
      if (success) loadData();
    }
  };

  return (
    <div style={{ backgroundColor: '#5A8FAC', minHeight: '100vh', padding: isMobile ? '20px' : '40px', color: 'white' }}>
      {/* TABS */}
      <div style={tabContainer}>
        {['Bourses', 'Formations', 'Reportages'].map((tabName) => (
          <button
            key={tabName}
            style={{ ...tabStyle, ...(activeTab === tabName ? activeTabStyle : {}) }}
            onClick={() => { setActiveTab(tabName); setEditingId(null); }}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* FORMULAIRE */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '24px' }}>
            {editingId ? 'Modifier la formation' : `Ajouter une nouvelle ${activeTab.slice(0, -1)}`}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Titre</label>
            <input type="text" placeholder="Ecrivez le titre" style={baseInputStyle}
              value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Lien / URL</label>
            <input type="text" placeholder="http://..." style={baseInputStyle}
              value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}>Description</label>
          <textarea placeholder="Description" style={{...baseInputStyle, minHeight: '100px'}}
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: 'flex-end', marginTop: '20px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Date</label>
            <input type="date" style={{...baseInputStyle, colorScheme: 'dark'}}
              value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>
          <button onClick={handleSave} disabled={loading} style={buttonStyle}>
            {loading ? <Loader2 className="animate-spin" /> : (editingId ? "Modifier" : "Ajouter")}
          </button>
        </div>
      </div>

      {/* LISTE */}
      <div>
        <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>Liste des {activeTab}</h3>
        {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}><Loader2 className="animate-spin" size={40} /></div>
        ) : (
            <>
                <div style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.4)', fontWeight: 'bold' }}>
                    <div style={{ flex: 2 }}>Titre</div>
                    <div style={{ flex: 1 }}>Date</div>
                    <div style={{ flex: 0.5, textAlign: 'right' }}>Actions</div>
                </div>
                {trainings.map((item) => (
                    <div key={item.id} style={{ display: 'flex', padding: '15px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', alignItems: 'center' }}>
                        <div style={{ flex: 2 }}>{item.titre}</div>
                        <div style={{ flex: 1 }}>{item.date}</div>
                        <div style={{ flex: 0.5, display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => handleEditClick(item)} style={iconButtonStyle}><Pencil size={18} /></button>
                            <button onClick={() => item.id && handleDelete(item.id)} style={iconButtonStyle}><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </>
        )}
      </div>
    </div>
  );
}