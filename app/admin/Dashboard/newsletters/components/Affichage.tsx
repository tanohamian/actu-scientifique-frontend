"use client"
import React, { useState, useMemo } from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react';
import Filter, { IFilter } from '@/app/components/filter'; 
const formatDate = (timestamp: string): string => {
    try {
        const date = new Date(Number(timestamp));
        // Option 1: Format simple
        // return date.toLocaleDateString(); 

        // Option 2: Format plus détaillé (meilleure lisibilité)
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return "Date invalide"; // Gérer le cas où la conversion échoue
    }
};
// --- Interfaces et Enums (laissé intact) ---
export enum AffichageType{
  ARTICLE   = "article",
  NEWSLETTER= "newsletters",
  MEDIAS    = "medias"
}

export interface Newsletter {
  id: number;
  title: string;
  category: string;
  publication: string;
}
export interface Media {
  id: number;
  title: string;
  category: string;
  type: string
  publicationDate: string;
}

export interface Article{
  id: number;
  title: string;
  content: string;
  rubrique: string;
}
// Utilisation d'un type union générique pour simplifier les types d'éléments
type ItemType = Newsletter | Article | Media;

interface AffichageProps{
  hasFilter? : boolean
  filters ?: IFilter[]
  type ?: AffichageType
  // Le type `items` est maintenant basé sur ItemType
  items : ItemType[]
}
// --- Fin Interfaces et Enums ---

// --- Styles (laissé intact pour la compatibilité avec votre code) ---
const styles = {
    container: {
        backgroundColor: '#50789B',
        // Vous pouvez laisser 'height: auto' pour que le contenu détermine la hauteur
        //height:'50%', 
        width:'809px',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        borderRadius:'20px',
        minHeight: '468px',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    searchSection: {
        borderRadius: '12px',
        marginBottom : '25px'
    },
    searchWrapper: {
        position: 'relative' as const,
        alignItems:'center',
        display: 'flex', 
        gap: '20px', 
    },
    searchInputContainer: {
        position: 'relative' as const,
        flexGrow: 1, 
    },
    searchIcon: {
        position: 'absolute' as const,
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(255, 255, 255, 0.9)'
    },
    searchInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid #ffffff4d',
        borderRadius: '8px',
        padding: '14px 15px',
        paddingLeft: '45px',
        color: 'white',
        fontSize: '14px',
        outline: 'none',
        width: '80%', // Utiliser 100% pour remplir le conteneur flex
    },
    tableSection: {
        // Enlève le padding du tableSection pour ne laisser que le padding du conteneur parent
        flex: '1', 
        overflowY: 'auto' as const, // Ajouté pour gérer les débordements si la liste est longue
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const
    },
    tableHeader: {
        borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
    },
    th: {
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'left' as const,
        padding: '15px 10px',
    },
    td: {
        color: 'white',
        fontSize: '14px',
        padding: '20px 10px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    },
    actionButtons: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'flex-end' as const
    },
    iconButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s'
    }
}
// --- Fin Styles ---


export default function Affichage({items, type = AffichageType.NEWSLETTER, hasFilter=false, filters=[]}: AffichageProps) {

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Ajout de l'état pour la recherche

  const handleNewFilter = (filterValue: string) => {
    setActiveFilter(filterValue);
    console.log("Nouveau filtre sélectionné:", filterValue);
  };

  // 1. Filtrage et Recherche Combinés (Optimisé avec useMemo)
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Filtrage par catégorie/rubrique
      let filterMatch = true;
      if (activeFilter !== 'all') {
        if (type === AffichageType.ARTICLE) {
          filterMatch = (item as Article).rubrique === activeFilter;
        } else if (type === AffichageType.NEWSLETTER) {
          filterMatch = (item as Newsletter).category === activeFilter;
        } else if (type === AffichageType.MEDIAS) {
          filterMatch = (item as Media).category === activeFilter;
        }
      }
      if (!filterMatch) return false;

      // Recherche par titre
      const currentTitle = (item as any).title || (item as any).titre || '';
      return currentTitle.toLowerCase().includes(searchTerm.toLowerCase());

    });
  }, [items, activeFilter, searchTerm, type]);


  // 2. Fonctions d'aide pour le rendu
  const renderItemContent = (item: ItemType) => {
    switch (type) {
      case AffichageType.ARTICLE:
        const article = item as Article;
        return (
          <>
            <td style={styles.td}>{article.title.substring(0, 35)}...</td>
            <td style={styles.td}>{article.rubrique}</td>
            <td style={styles.td}>{article.content.substring(0, 35)}...</td>
          </>
        );
      case AffichageType.MEDIAS:
        const media = item as Media;
        return (
          <>
            <td style={styles.td}>{media.title}</td>
            <td style={styles.td}>{media.type}</td>
            <td style={styles.td}>{formatDate(media.publicationDate)}</td>
            <td style={styles.td}>{media.category}</td>
          </>
        );
      case AffichageType.NEWSLETTER:
      default:
        const newsletter = item as Newsletter;
        return (
          <>
            <td style={styles.td}>{newsletter.title}</td>
            <td style={styles.td}>{newsletter.category}</td>
            <td style={styles.td}>{newsletter.publication}</td>
          </>
        );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchSection}>
        
        <div style={styles.searchWrapper}> 
          
          <div style={styles.searchInputContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par titre....."
              style={styles.searchInput}
              value={searchTerm} // Lier à l'état
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {
            hasFilter ? <Filter 
                            filters={filters}
                            onFilterChange={handleNewFilter}
                          /> : null 
          }
          {
            type===AffichageType.MEDIAS? <Filter 
                            filters={filters}
                            onFilterChange={handleNewFilter}
                          /> : null 
          }
        </div>
      </div>
          
      <div style={styles.tableSection}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.th}>{type === AffichageType.ARTICLE ? 'Titre de l\'Article' : type === AffichageType.MEDIAS ? 'Titre' : "Titre de la Newsletter"}</th>
              <th style={styles.th}>{type === AffichageType.ARTICLE ? 'Rubrique' : type === AffichageType.MEDIAS ? 'Type' : 'Catégorie'}</th>
              <th style={styles.th}>{type === AffichageType.ARTICLE ? 'Contenu (Début)' : type === AffichageType.MEDIAS ? "Date d'ajout" : 'Publication'}</th>
              {/* Le header 'Catégorie' pour MEDIAS doit être inclus ici */}
              {type === AffichageType.MEDIAS ? (<th style={styles.th}>Catégorie</th>) : null} 

              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                {/* Utilisation de la fonction d'aide pour un rendu propre */}
                {renderItemContent(item)}
                
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.iconButton}
                      // AJOUTER DES HANDLERS DE CLIC ICI (ex: onClick={() => handleEdit(item.id)})
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      style={styles.iconButton}
                      // AJOUTER DES HANDLERS DE CLIC ICI (ex: onClick={() => handleDelete(item.id)})
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
                <tr>
                    <td colSpan={type === AffichageType.MEDIAS ? 5 : 4} style={{...styles.td, textAlign: 'center'}}>
                        Aucun élément trouvé pour ces critères.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}