"use client"
import React, { useState, CSSProperties, useEffect } from 'react';
import { Pencil, Trash2, Calendar } from 'lucide-react';

interface FormData {
  title: string;
  url: string;
  description: string;
  date: string;
  reward?: string;
}

const tabContainer: CSSProperties = {
  display: 'flex',
  gap: '30px',
  marginBottom: '40px',
  borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
}

const tabStyle: CSSProperties = {
  color: 'white',
  fontSize: '16px',
  padding: '12px 0',
  background: 'none',
  border: 'none',
  borderBottom: 'none',
  cursor: 'pointer',
  position: 'relative',
  fontWeight: '500'
}

const activeTabStyle: CSSProperties = {
  borderBottom: '3px solid white',
  fontWeight: 'bold'
}

export default function SwitchSection() {
  const [activeTab, setActiveTab] = useState('Bourses');
  const [windowWidth, setWindowWidth] = useState(1200);
  const [searchValue, setSearchValue] = useState('');
  const [widthWidth, setWidthWidth] = useState(() => window.innerWidth);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    url: '',
    description: '',
    date: '',
    reward: ''
  });

  const MOBILE_BREAKPOINT = 768;

  useEffect(() => {
    const handleResize = () => setWidthWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < MOBILE_BREAKPOINT;

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Configuration selon l'onglet actif
  const getTabConfig = () => {
    switch(activeTab) {
      case 'Bourses':
        return {
          title: 'Ajouter une nouvelle bourse',
          secondFieldLabel: 'Lien',
          secondFieldPlaceholder: 'http://example.com',
          listTitle: 'Bourses',
          sampleData: { title: 'Bourse du meilleur journaliste', date: '14/01/2027' },
          showReward: false
        };
      case 'Formations':
        return {
          title: 'Ajouter une nouvelle formation',
          secondFieldLabel: 'Lien ou vidéo',
          secondFieldPlaceholder: 'http://example.com',
          listTitle: 'Formations',
          sampleData: { title: 'Importance du journaliste dans la société', date: '14/01/2027' },
          showReward: false
        };
      case 'jeux du meilleur journaliste':
        return {
          title: 'Ajouter un jeu',
          secondFieldLabel: 'Récompense',
          secondFieldPlaceholder: '200.000 ou un ticket pour la conférence des journalistes',
          listTitle: 'Jeux',
          sampleData: { title: 'Importance du journaliste dans la société', date: '14/01/2027' },
          showReward: true
        };
      default:
        return {
          title: '',
          secondFieldLabel: '',
          secondFieldPlaceholder: '',
          listTitle: '',
          sampleData: { title: '', date: '' },
          showReward: false
        };
    }
  };

  const config = getTabConfig();

  const containerStyle: CSSProperties = {
    backgroundColor: '#5A8FAC',
    minHeight: '100vh',
    padding: isMobile ? '20px' : '40px',
    color: 'white'
  };

  const formContainerStyle: CSSProperties = {
    marginBottom: '60px'
  };

  const inputGroupStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '20px',
    marginBottom: '20px'
  };

  const inputWrapperStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const labelStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: '500'
  };

  const inputStyle: CSSProperties = {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '14px',
    outline: 'none'
  };

  const textareaStyle: CSSProperties = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const dateInputWrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '20px',
    alignItems: isMobile ? 'stretch' : 'flex-end',
    marginTop: '20px'
  };

  const dateFieldStyle: CSSProperties = {
    width: isMobile ? '100%' : '50%'
  };

  const buttonStyle: CSSProperties = {
    padding: '12px 40px',
    backgroundColor: '#E67E5F',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: isMobile ? '100%' : 'auto'
  };

  const listHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    gap: '20px',
    flexWrap: isMobile ? 'wrap' : 'nowrap'
  };

  const searchStyle: CSSProperties = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    width: isMobile ? '100%' : '400px'
  };

  const tableHeaderStyle: CSSProperties = {
    display: 'flex',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  const tableRowStyle: CSSProperties = {
    display: 'flex',
    padding: '15px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    alignItems: 'center'
  };

  const iconButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: 'white',
    opacity: 0.8
  };

  return (
    <div style={containerStyle}>
      <div style={tabContainer}>
        {['Bourses', 'Formations', 'jeux du meilleur journaliste'].map((tabName) => (
          <button
            key={tabName}
            style={{
              ...tabStyle,
              ...(activeTab === tabName ? activeTabStyle : {})
            }}
            onClick={() => setActiveTab(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Formulaire */}
      <div style={formContainerStyle}>
        <h2 style={{ marginBottom: '30px', fontSize: '24px' }}>{config.title}</h2>
        
        <div style={inputGroupStyle}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Titre</label>
            <input
              type="text"
              placeholder="Ecrivez le titre"
              style={inputStyle}
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>{config.secondFieldLabel}</label>
            <input
              type="text"
              placeholder={config.secondFieldPlaceholder}
              style={inputStyle}
              value={config.showReward ? formData.reward : formData.url}
              onChange={(e) => handleChange(config.showReward ? 'reward' : 'url', e.target.value)}
            />
          </div>
        </div>

        <div style={inputWrapperStyle}>
          <label style={labelStyle}>Description</label>
          <textarea
            placeholder="Entrez une brève description"
            style={textareaStyle}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div style={dateInputWrapperStyle}>
          <div style={{ ...inputWrapperStyle, ...dateFieldStyle }}>
            <label style={labelStyle}>Date</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="dd/mm/yy"
                style={inputStyle}
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
              <Calendar 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} 
              />
            </div>
          </div>
          <button style={buttonStyle}>Ajouter</button>
        </div>
      </div>

      {/* Liste */}
      <div>
        <div style={listHeaderStyle}>
          <h3 style={{ fontSize: '28px', margin: 0 }}>{config.listTitle}</h3>
          <input
            type="text"
            placeholder="Rechercher par titre....."
            style={searchStyle}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div style={tableHeaderStyle}>
          <div style={{ flex: 2 }}>Titres</div>
          <div style={{ flex: 1 }}>Dates</div>
          <div style={{ flex: 0.5 }}>Actions</div>
        </div>

        <div style={tableRowStyle}>
          <div style={{ flex: 2 }}>{config.sampleData.title}</div>
          <div style={{ flex: 1 }}>{config.sampleData.date}</div>
          <div style={{ flex: 0.5, display: 'flex', gap: '10px' }}>
            <button style={iconButtonStyle}>
              <Pencil size={18} />
            </button>
            <button style={iconButtonStyle}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}