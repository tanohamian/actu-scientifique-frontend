"use client"
import React, { useState } from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react';
import Filter, { IFilter } from '@/app/components/filter';

export interface Newsletter {
  id: number;
  titre: string;
  categorie: string;
  publication: string;
}

export interface Article{
  id: number;
  title: string;
  content: string;
  rubrique: string;
}
interface AffichageProps{
  hasFilter? : boolean
  filters ?: IFilter[]
  isArticle ?: boolean
  items : Newsletter[] | Article[]
}
export default function Affichage({items, isArticle = false, hasFilter=false, filters=[]}: AffichageProps) {

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const handleNewFilter = (filterValue: string) => {
    setActiveFilter(filterValue);
    console.log("Nouveau filtre sélectionné:", filterValue);
  };

  const container: React.CSSProperties = {
      backgroundColor: '#50789B',
      height:'50%',
      width:'809px',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      borderRadius:'20px',
      // Pour debug, assurez-vous que la hauteur s'adapte au contenu si besoin:
      //height: 'auto', 
      minHeight: '468px',
    };

  const searchWrapper: React.CSSProperties = {
      position: 'relative',
      alignItems:'center',
      display: 'flex', 
      gap: '20px', 
    };

    const searchInputContainer: React.CSSProperties = {
        position: 'relative',
        flexGrow: 1, 
    }

    const searchIcon: React.CSSProperties = {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.9)'
    };
    const searchInput: React.CSSProperties = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid #ffffff4d',
        borderRadius: '8px',
        padding: '14px 15px',
        paddingLeft: '45px',
        color: 'white',
        fontSize: '14px',
        outline: 'none',
        width: '80%'
      };
      const tableSection: React.CSSProperties = {
          //backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '25px',
          flex: '1'
        };
      
        const table: React.CSSProperties = {
          width: '100%',
          borderCollapse: 'collapse'
        };

          const searchSection: React.CSSProperties = {
            //backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            //padding: '25px',
            marginBottom : '25px'
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

  const filteredItems = items.filter(item => {
    if (activeFilter === 'all') {
      return true;
    }
    
    if (isArticle) {
        return (item as Article).rubrique === activeFilter;
    } 
    return (item as Newsletter).categorie === activeFilter;
  });


  return (
      <div style={container}>
        <div style={searchSection}>
          
          <div style={searchWrapper}> 
            
            <div style={searchInputContainer}>
              <Search size={20} style={searchIcon} />
              <input
                type="text"
                placeholder="Rechercher par titre....."
                style={searchInput}
              />
            </div>

            {
                hasFilter ? <Filter 
                              filters={filters}
                              onFilterChange={handleNewFilter}
                            /> : null 
            }
          </div>
        </div>
            
        <div style={tableSection}>
          <table style={table}>
            <thead style={tableHeader}>
              <tr>
                <th style={th}>{isArticle ? 'Titre de l\'Article' : 'Titre de la Newsletter'}</th>
                <th style={th}>{isArticle ? 'Rubrique' : 'Catégorie'}</th>
                <th style={th}>{isArticle ? 'Contenu (Début)' : 'Publication'}</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  {isArticle ? (
                    <>
                      <td style={td}>{(item as Article).title.substring(0, 35)}...</td>
                      <td style={td}>{(item as Article).rubrique}</td>
                      <td style={td}>{(item as Article).content.substring(0, 35)}...</td>
                    </>
                  ) : (
                    <>
                      <td style={td}>{(item as Newsletter).titre}</td>
                      <td style={td}>{(item as Newsletter).categorie}</td>
                      <td style={td}>{(item as Newsletter).publication}</td>
                    </>
                  )}
                  <td style={td}>
                    <div style={actionButtons}>
                      <button
                        style={iconButton}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        style={iconButton}
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
  )
}