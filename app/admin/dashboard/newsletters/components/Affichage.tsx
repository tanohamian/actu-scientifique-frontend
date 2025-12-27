"use client"
import React, { useState, useMemo, useEffect } from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react';
import Filter, { IFilter } from '@/app/components/filter';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export enum AffichageType {
    ARTICLE = "article",
    NEWSLETTER = "newsletters",
    MEDIAS = "medias"
}


export interface Newsletter {
    id: string;
    titre: string;
    categorie: string;
    contenu: string;
    createdAt: string;
}

export interface DbMedia{
  id: number;
  title: string,
  name: string
  rubrique : string
  mimeType: MimeTypes
  url: string
  createdAt: Date|string,
  type: string
}

export interface Article {
    id?: string;
    titre: string;
    contenu: string;
    rubrique: string;
}

type ItemType = Newsletter | Article;

interface AffichageProps {
    hasFilter?: boolean
    filters?: IFilter[]
    type?: AffichageType
    items?: ItemType[] 
}

const styles = {
    container: { backgroundColor: '#50789B', width: '809px', padding: '40px', fontFamily: 'Arial, sans-serif', borderRadius: '20px', minHeight: '468px', display: 'flex', flexDirection: 'column' as const },
    searchSection: { borderRadius: '12px', marginBottom: '25px' },
    searchWrapper: { position: 'relative' as const, alignItems: 'center', display: 'flex', gap: '20px' },
    searchInputContainer: { position: 'relative' as const, flexGrow: 1 },
    searchIcon: { position: 'absolute' as const, left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.9)' },
    searchInput: { backgroundColor: 'rgba(255, 255, 255, 0.2)', border: '1px solid #ffffff4d', borderRadius: '8px', padding: '14px 15px', paddingLeft: '45px', color: 'white', fontSize: '14px', outline: 'none', width: '80%' },
    tableSection: { flex: '1', overflowY: 'auto' as const },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    tableHeader: { borderBottom: '2px solid rgba(255, 255, 255, 0.3)' },
    th: { color: 'white', fontSize: '14px', fontWeight: '600', textAlign: 'left' as const, padding: '15px 10px' },
    td: { color: 'white', fontSize: '14px', padding: '20px 10px', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' },
    actionButtons: { display: 'flex', gap: '15px', justifyContent: 'flex-end' as const },
    iconButton: { background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }
}

export default function Affichage({ items: initialItems = [], type = AffichageType.NEWSLETTER, hasFilter = false, filters = [] }: AffichageProps) {
    const [itemList, setItemList] = useState<ItemType[]>(initialItems);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const fetchItems = async () => {
        try {
            const response = await fetch(`${BASE_URL}/newsletters`);
            const result = await response.json();
            if (result.success) {
                setItemList(result.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    useEffect(() => {
      const loadData = async () => {
          await fetchItems();
      };
      loadData()
    }, []);


    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
        
        try {
            const response = await fetch(`${BASE_URL}/newsletters/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setItemList(itemList.filter(item => (item.id as unknown as string) !== id));
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    const handleNewFilter = (filterValue: string) => {
        setActiveFilter(filterValue === '' ? "all" : filterValue);
    };

    const filteredItems = useMemo(() => {
        return itemList.filter(item => {
            let filterMatch = true;
            if (activeFilter !== 'all' && activeFilter !== '') {
                if (type === AffichageType.ARTICLE) {
                    filterMatch = (item as Article).rubrique === activeFilter;
                } else if (type === AffichageType.NEWSLETTER) {
                    filterMatch = (item as Newsletter).categorie === activeFilter;
                }
            }
            if (!filterMatch) return false;
            const currentTitle = (item as Newsletter | Article).titre || '';
            return currentTitle.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [itemList, activeFilter, searchTerm, type]);

    const renderItemContent = (item: ItemType) => {
        if (type === AffichageType.ARTICLE) {
            const article = item as Article;
            return (
                <>
                    <td style={styles.td}>{article.titre?.substring(0, 35)}...</td>
                    <td style={styles.td}>{article.rubrique}</td>
                    <td style={styles.td}>{article.contenu?.substring(0, 35)}...</td>
                </>
            );
        } else {
            const newsletter = item as Newsletter;
            return (
                <>
                    <td style={styles.td}>{newsletter.titre}</td>
                    <td style={styles.td}>{newsletter.categorie}</td>
                    <td style={styles.td}>{new Date(newsletter.createdAt).toLocaleDateString('fr-FR')}</td>
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {(hasFilter || type === AffichageType.MEDIAS) && (
                        <Filter filters={filters} onFilterChange={handleNewFilter} />
                    )}
                </div>
            </div>

            <div style={styles.tableSection}>
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.th}>{type === AffichageType.ARTICLE ? 'Titre de l\'Article' : 'Titre'}</th>
                            <th style={styles.th}>{type === AffichageType.ARTICLE ? 'Rubrique' : 'Catégorie'}</th>
                            <th style={styles.th}>{type === AffichageType.ARTICLE ? 'Contenu (Début)' : 'Date de Publication'}</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                {renderItemContent(item)}
                                <td style={styles.td}>
                                    <div style={styles.actionButtons}>
                                        <button style={styles.iconButton} onClick={() => console.log("Edit", item.id)}>
                                            <Pencil size={18} />
                                        </button>
                                        <button 
                                            style={styles.iconButton} 
                                            onClick={() => handleDelete(item.id as string)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ ...styles.td, textAlign: 'center' }}>
                                    Aucun élément trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}