import React from 'react'
import { Search} from 'lucide-react';

export default function Affichage() {

  const container: React.CSSProperties = {
      backgroundColor: '#50789B',
      height:'468px',
      width:'809px',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      borderRadius:'20px'
    };

  const searchWrapper: React.CSSProperties = {
      position: 'relative',
      width: '100%'
    };

    const searchIcon: React.CSSProperties = {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.9)'
    };

  return (
      <div style={container}>
        <div style={searchWrapper}>
          <Search size={20} style={searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par titre....."
            />
        </div>
      </div>
  )
}
