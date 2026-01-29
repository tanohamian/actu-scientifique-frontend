"use client"
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react';
import Filter, { IFilter } from '@/app/components/filter';
import { FetchNewsletters, DeleteNewsletter } from '@/app/actions/Newsletters';
import { AffichageType, Rubriques } from '@/app/enum/enums';


const RubriqueLabels: Record<string, string> = {
    [Rubriques.ONE_HEALTH]: "Une seule santé",
    [Rubriques.TECHNOLOGY]: "Technologie",
    [Rubriques.ECO_HUMANITY]: "Éco-humanité",
    [Rubriques.PORT_DISCOVERY]: "Portrait et découvertes",
};

export interface Newsletter {
    id?: string;
    title: string;
    categorie: string;
    content?: string;
    createdAt: string | Date;
}

export interface Article {
    id?: string;
    title: string;
    illustrationUrl?: string;
    content: string;
    rubrique?: Rubriques;
    createdAt?: Date | string
    une?: boolean
}

export interface DbMedia {
    id: number | string;
    title: string;
    name: string;
    rubrique: Rubriques;
    mimeType: string;
    url: string;
    createdAt: Date | string;
    type: string;
    une?: boolean
}

export interface DbArticle {
    id: string
    title: string
    content: string
    rubrique: Rubriques
    illustrationUrl?: string;
    une: boolean
    createdAt: Date | string
}


export type ItemType = Newsletter | Article;

interface AffichageProps {
    hasFilter?: boolean;
    filters?: IFilter[];
    type?: AffichageType;
    items?: ItemType[];
    onEdit?: (item: ItemType) => void;
}

const styles = {
    container: { backgroundColor: '#50789B', width: '100%', maxWidth: '809px', padding: '40px', fontFamily: 'Arial, sans-serif', borderRadius: '20px', minHeight: '468px', display: 'flex', flexDirection: 'column' as const, boxSizing: 'border-box' as const },
    searchSection: { borderRadius: '12px', marginBottom: '25px' },
    searchWrapper: { position: 'relative' as const, alignItems: 'center', display: 'flex', gap: '20px' },
    searchInputContainer: { position: 'relative' as const, flexGrow: 1 },
    searchIcon: { position: 'absolute' as const, left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.9)' },
    searchInput: { backgroundColor: 'rgba(255, 255, 255, 0.2)', border: '1px solid #ffffff4d', borderRadius: '8px', padding: '14px 15px', paddingLeft: '45px', color: 'white', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' as const },
    tableSection: { flex: '1', overflowY: 'auto' as const },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    tableHeader: { borderBottom: '2px solid rgba(255, 255, 255, 0.3)' },
    th: { color: 'white', fontSize: '14px', fontWeight: '600', textAlign: 'left' as const, padding: '15px 10px' },
    td: { color: 'white', fontSize: '14px', padding: '20px 10px', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' },
    actionButtons: { display: 'flex', gap: '15px', justifyContent: 'flex-end' as const },
    iconButton: { background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }
}

export default function Affichage({
    items: initialItems = [],
    type = AffichageType.NEWSLETTER,
    hasFilter = false,
    filters = [],
    onEdit
}: AffichageProps) {
    const [itemList, setItemList] = useState<ItemType[]>(initialItems);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");


    const loadData = useCallback(async () => {
        try {
            if (type === AffichageType.NEWSLETTER) {
                const data = await FetchNewsletters();
                if (data) setItemList(data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    }, [type]);

    useEffect(() => {

        const effect = () => {
            loadData();
        }
        effect()
    }, [loadData]);
    const handleDelete = async (id: string) => {

        try {
            let success = false;
            if (type === AffichageType.NEWSLETTER) {
                success = await DeleteNewsletter(id);
            }

            if (success) {
                setItemList(prev => prev.filter(item => item.id !== id));
            } else {
                alert("Erreur lors de la suppression");
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
            const currentTitle = item.title || '';
            return currentTitle.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [itemList, activeFilter, searchTerm, type]);

    const renderItemContent = (item: ItemType) => {
        if (type === AffichageType.ARTICLE) {
            const article = item as Article;
            return (
                <>
                    <td style={styles.td}>{article.title?.substring(0, 35)}...</td>
                    <td style={styles.td}>{article.rubrique ? (RubriqueLabels[article.rubrique] || article.rubrique) : '-'}</td>
                    <td style={styles.td}>{article.content?.substring(0, 35)}...</td>
                </>
            );
        } else {
            const newsletter = item as Newsletter;
            return (
                <>
                    <td style={styles.td}>{newsletter.title}</td>
                    <td style={styles.td}>{RubriqueLabels[newsletter.categorie] || newsletter.categorie}</td>
                    <td style={styles.td}>{newsletter.createdAt ? new Date(newsletter.createdAt).toLocaleDateString('fr-FR') : '-'}</td>
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
                            <th style={styles.th}>{type === AffichageType.ARTICLE ? "Titre de l'Article" : 'Titre'}</th>
                            <th style={styles.th}>Rubrique</th>
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
                                        <button
                                            style={styles.iconButton}
                                            onClick={() => onEdit?.(item)}
                                        >
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}