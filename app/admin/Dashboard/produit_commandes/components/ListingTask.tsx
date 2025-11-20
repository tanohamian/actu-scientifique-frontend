import React from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';

interface ColonneDefinition {
  key: string;
  header: string;
}

interface AffichageProps<T extends { id: number | string }> {
  titre: string;
  columns: ColonneDefinition[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

const styles = {
    container: {
        backgroundColor: '#50789B',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '20px',
        marginBottom: '40px'
    } as React.CSSProperties,
    title: {
        color: 'white',
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '20px',
    } as React.CSSProperties,
    searchSection: {
        //backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '10px 25px',
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    } as React.CSSProperties,
    searchWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1
    } as React.CSSProperties,
    searchIcon: {
        position: 'absolute',
        left: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
    } as React.CSSProperties,
    searchInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        padding: '10px 15px',
        paddingLeft: '45px',
        color: 'white',
        fontSize: '14px',
        outline: 'none',
        width: '100%'
    } as React.CSSProperties,
    sortButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        padding: '10px 20px',
        marginLeft: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        appearance: 'none'
    } as React.CSSProperties,
    tableSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '0 25px 25px 25px',
        overflowX: 'auto',
    } as React.CSSProperties,
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    } as React.CSSProperties,
    tableHeader: {
        borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
    } as React.CSSProperties,
    th: {
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'left',
        padding: '15px 10px'
    } as React.CSSProperties,
    td: {
        color: 'white',
        fontSize: '14px',
        padding: '15px 10px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    } as React.CSSProperties,
    actionButtons: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'flex-end'
    } as React.CSSProperties,
    iconButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    } as React.CSSProperties,
    lastTd: {
        borderBottom: 'none'
    } as React.CSSProperties,
};

export default function AffichageTableau<T extends { id: number | string }>({
  titre,
  columns,
  data,
  onEdit,
  onDelete,
}: React.PropsWithChildren<AffichageProps<T>>) {

  const hasActions = onEdit || onDelete;
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{titre}</h2>
      
      <div style={styles.searchSection}>
        <div style={styles.searchWrapper}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder={`Rechercher par nom produit.....`}
            style={styles.searchInput}
          />
        </div>
        <select style={styles.sortButton}>
            <option>Trier par</option>
            <option>Nom</option>
            <option>Prix</option>
        </select>
      </div>

      <div style={styles.tableSection}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={styles.th}>
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th key="actions" style={{...styles.th, textAlign: 'right'}}>
                    Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
                const isLastRow = index === data.length - 1;
                return (
                    <tr key={item.id}>
                        {columns.map((col) => (
                            <td 
                                key={`${item.id}-${col.key}`} 
                                style={{...styles.td, ...(isLastRow ? styles.lastTd : {})}}>
                                {(item as Record<string, React.ReactNode>)[col.key]}
                            </td>
                        ))}
                        {hasActions && (
                            <td style={{...styles.td, ...(isLastRow ? styles.lastTd : {})}}>
                                <div style={styles.actionButtons}>
                                    {onEdit && (
                                        <button style={styles.iconButton} onClick={() => onEdit(item)}>
                                            <Pencil size={18} />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button style={styles.iconButton} onClick={() => onDelete(item)}>
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        )}
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}