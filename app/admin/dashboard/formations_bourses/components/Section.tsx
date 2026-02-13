"use client"
import React, { useState, CSSProperties, useEffect, useCallback } from 'react';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { showToast } from "nextjs-toast-notify"
import { FetchTrainings, AddTraining, UpdateTraining, DeleteTraining } from '@/app/actions/Trainings';
import { FetchScholarships, AddScholarship, UpdateScholarship, DeleteScholarship, IScholarship } from '@/app/actions/Scholarships';
import { ITraining } from '@/app/interfaces';
import ConfirmModal from './ConfirmModal';
import dynamic from 'next/dynamic'


const EditorText = dynamic(
    () => import('@/app/components/titap'),
    { ssr: false }
)



export const toast = function (success: boolean, edit: boolean = false, message: string = "") {
  return success ? showToast.success(message ? message : edit ? "Mis à Jour !" : "Publié !", {
    duration: 4000,
    progress: true,
    position: "bottom-center",
    transition: "bounceIn",
    icon: '✅',
    sound: true,
  }) : showToast.error(message ? message : "Opération échouée", {
    duration: 4000,
    progress: true,
    position: "bottom-center",
    transition: "bounceIn",
    icon: '❌',
    sound: true,
  });
}

type TabType = 'Bourses' | 'Formations';
type DataItem = ITraining | IScholarship;

interface FormData {
  title: string;
  url?: string;
  description: string;
  date: string;
  reward: string;
  type: 'CLASSIC' | 'ACADEMY';
}

const tabContainer: CSSProperties = { display: 'flex', gap: '30px', marginBottom: '40px', borderBottom: '2px solid rgba(255, 255, 255, 0.3)' };
const tabStyle: CSSProperties = { color: 'white', fontSize: '16px', padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', borderBottom: '3px solid transparent' };
const activeTabStyle: CSSProperties = { borderBottom: '3px solid #E67E5F', fontWeight: 'bold', borderBottomColor: '#E67E5F' };
const baseInputStyle: CSSProperties = { padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '14px', outline: 'none' };
const buttonStyle: CSSProperties = { padding: '12px 40px', backgroundColor: '#E67E5F', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' };

const formatDateFR = (dateString: string | Date) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function SwitchSection() {
  const [activeTab, setActiveTab] = useState<TabType>('Bourses');
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  const [inputMode, setInputMode] = useState<'url' | 'reward'>('url');

  const [formData, setFormData] = useState<FormData>({
    title: '', url: '', description: '', date: '', reward: '', type: 'CLASSIC'
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'Bourses') {
        const data = await FetchScholarships();
        setItems(data || []);
      } else {
        const data = await FetchTrainings();
        setItems(data || []);
      }
    } catch (error) {
      console.error(error);
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

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsModalOpen(false);
    const success = activeTab === 'Bourses' ? await DeleteScholarship(itemToDelete) : await DeleteTraining(itemToDelete);
    if (success) {
      toast(true, false, "Élément supprimé !");
      loadData();
    } else {
      toast(false, false, "Erreur lors de la suppression");
    }
    setItemToDelete(null);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast(false, false, "Veuillez remplir le titre et la description");
      return;
    }
    setLoading(true);
    let res;
    const isEditing = !!editingId;

    if (activeTab === 'Bourses') {
      const payload: IScholarship = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        ...(inputMode === 'url' ? { lien: formData.url } : {}),
        ...(inputMode === 'reward' ? { reward: Number(formData.reward) } : {})
      };
      res = isEditing ? await UpdateScholarship(editingId as string, payload) : await AddScholarship(payload);
    } else {
      const payload: ITraining = {
        title: formData.title,
        lien: formData.url || "",
        description: formData.description,
        date: formData.date,
        type: formData.type
      };
      res = isEditing ? await UpdateTraining(editingId as string, payload) : await AddTraining(payload);
    }

    if (res?.success) {
      toast(true, isEditing);
      setEditingId(null);
      setFormData({ title: '', url: '', description: '', date: '', reward: '', type: 'CLASSIC' });
      await loadData();
    } else {
      // @ts-expect-error: res may not have an 'error' property depending on the API response shape
      toast(false, false, res?.error || "Opération échouée");
    }
    setLoading(false);
  };

  const handleEditClick = (item: DataItem) => {
    setEditingId(item.id || null);
    
    if ('reward' in item && item.reward) {
        setInputMode('reward');
    } else {
        setInputMode('url');
    }

    setFormData({
      title: item.title,
      url: item.lien || '',
      description: item.description,
      date: typeof item.date === 'string' ? item.date.split('T')[0] : new Date(item.date).toISOString().split('T')[0],
      reward: 'reward' in item && item.reward ? String(item.reward) : '',
      type: 'type' in item ? (item as ITraining).type : 'CLASSIC'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#5A8FAC', minHeight: '100vh', padding: isMobile ? '20px' : '40px',  }}>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmer la suppression ?"
      />

      <div style={tabContainer}>
        {(['Bourses', 'Formations'] as const).map((tab) => (
          <button
            key={tab}
            style={{ ...tabStyle, ...(activeTab === tab ? activeTabStyle : {}) }}
            onClick={() => {
              setActiveTab(tab);
              setEditingId(null);
              setFormData({ title: '', url: '', description: '', date: '', reward: '', type: 'CLASSIC' });
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '24px' , color: 'white', fontWeight: 'bold' }}>
          {editingId ? 'Modifier' : 'Ajouter'} {activeTab === 'Bourses' ? 'une bourse' : 'une formation'}
        </h2>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: 'white' }}>Titre</label>
            <input type="text" placeholder="Entrez le titre" style={baseInputStyle}
              value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          
          {activeTab === 'Formations' && (
            <div style={{ flex: 0.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: 'white' }}>Type de formation</label>
              <select
                style={{ ...baseInputStyle, color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', appearance: 'none', cursor: 'pointer' }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'CLASSIC' | 'ACADEMY' })}
              >
                <option value="CLASSIC" style={{ color: 'black', backgroundColor: 'white' }}>Classique</option>
                <option value="ACADEMY" style={{ color: 'black', backgroundColor: 'white' }}>Science Journalism Academy</option>
              </select>
            </div>
          )}

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '14px', color: 'white' }}>
                {activeTab === 'Bourses' ? 'Information à fournir' : 'Lien de la formation'}
              </label>
              
              {activeTab === 'Bourses' && (
                <div style={{ display: 'flex', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '12px', opacity: 0.9, color: 'white' }}>
                      <input type="radio" checked={inputMode === 'url'} onChange={() => setInputMode('url')} />
                      Lien
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '12px', opacity: 0.9, color: 'white' }}>
                      <input type="radio" checked={inputMode === 'reward'} onChange={() => setInputMode('reward')} />
                      Montant
                    </label>
                </div>
              )}
            </div>
            
            {activeTab === 'Bourses' ? (
                inputMode === 'url' ? (
                  <input type="text" placeholder="Entrez le lien vers la bourse et ses informations" style={baseInputStyle}
                    value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                ) : (
                  <input type="number" placeholder="Entrez le montant de la bourse (FCFA)" style={baseInputStyle}
                    value={formData.reward} onChange={(e) => setFormData({ ...formData, reward: e.target.value })} />
                )
            ) : (
              <input type="text" placeholder="Lien YouTube ou site web" style={baseInputStyle}
                value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', color: 'white' }}>Description</label>
          <EditorText
            content={formData.description}
            onChange={(html) => setFormData({ ...formData, description: html })}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: 'white' }}>Date</label>
            <input type="date" style={{ ...baseInputStyle, colorScheme: 'dark' }}
              value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>
          <button onClick={handleSave} disabled={loading} style={{ ...buttonStyle, display: 'flex', alignItems: 'center', gap: '10px' }}>
            {loading && <Loader2 className="animate-spin" size={18} />}
            {editingId ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: 'white' }}>Liste des {activeTab}</h3>
        {loading && items.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Loader2 className="animate-spin" size={32} /></div>
        ) : items.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.6, color: 'white' }}>Aucune donnée trouvée.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', padding: '10px 0', borderBottom: '2px solid rgba(255, 255, 255, 0.3)', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', opacity: 0.9 }}>
              <div style={{ flex: 2, color: 'white' }}>Titre</div>
              {activeTab === 'Formations' && <div style={{ flex: 1, color: 'white' }}>Type</div>}
              <div style={{ flex: 1, color: 'white' }}>Date</div>
              <div style={{ flex: 0.5, textAlign: 'right', color: 'white' }}>Actions</div>
            </div>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', padding: '15px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', alignItems: 'center' }}>
                <div style={{ flex: 2, fontWeight: '500', color: 'white' }}>{item.title}</div>
                {activeTab === 'Formations' && (
                  <div style={{ flex: 1, fontSize: '12px', color: 'white' }}>
                    <span style={{ backgroundColor: (item as ITraining).type === 'ACADEMY' ? '#E67E5F' : 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px' }}>
                      {(item as ITraining).type === 'ACADEMY' ? 'Academy' : 'Classique'}
                    </span>
                  </div>
                )}
                <div style={{ flex: 1, opacity: 0.8, color: 'white' }}>{formatDateFR(item.date)}</div>
                <div style={{ flex: 0.5, display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button onClick={() => handleEditClick(item)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Pencil size={18} /></button>
                  <button onClick={() => item.id && (setItemToDelete(item.id), setIsModalOpen(true))} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}