'use client'
import React, { useMemo, useState } from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import SearchBarComponent from '@/app/components/searchBar';

interface ColonneDefinition {
  key: string;
  header: string;
  render?: (value: any) => string | React.ReactNode;
}

interface AffichageProps<T extends { id: number | string }> {
  titre: string;
  columns: ColonneDefinition[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  editFields?: FormFieldConfig[];
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
    backgroundColor: 'black',
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
  editFields
}: React.PropsWithChildren<AffichageProps<T>>) {

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const hasActions = onEdit || onDelete;

  const handleSelectElement = (item: T) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  let initialData = {};
  if (selectedItem) {
    initialData = selectedItem;
  }

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (inputValue) {
      const query = inputValue.toLowerCase();
      result = result.filter((item) => {
        return Object.values(item).some((val) =>
          String(val).toLowerCase().includes(query)
        );
      });
    }

    if (sortBy) {
      result.sort((a, b) => {
        const valA = (a as any)[sortBy];
        const valB = (b as any)[sortBy];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return valA - valB;
        }
        return String(valA).localeCompare(String(valB));
      });
    }

    return result;
  }, [data, inputValue, sortBy]);


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{titre}</h2>

      <div style={styles.searchSection}>
        <div style={styles.searchWrapper}>
          <SearchBarComponent
            placeholder="Rechercher..........."
            inputValue={inputValue}
            setInputValue={setInputValue}

          />

        </div>
        <select
          style={styles.sortButton}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Trier par</option>
          {columns.map(col => (
            <option key={col.key} value={col.key}>
              {col.header}
            </option>
          ))}
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
                <th key="actions" style={{ ...styles.th, textAlign: 'right' }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const isLastRow = index === data.length - 1;
              return (
                <tr key={`${item.id}-${index}`}>
                  {columns.map((col) => {
                    const value = (item as Record<string, any>)[col.key];
                    const displayValue = col.render ? col.render(value) : value;

                    return (
                      <td
                        key={`${item.id}-${col.key}`}
                        style={{ ...styles.td, ...(isLastRow ? styles.lastTd : {}) }}>
                        {displayValue}
                      </td>
                    );
                  })}
                  {hasActions && (
                    <td style={{ ...styles.td, ...(isLastRow ? styles.lastTd : {}) }}>
                      <div style={styles.actionButtons}>
                        {onEdit && (
                          <button style={styles.iconButton} onClick={() => handleSelectElement(item)}>
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
        {
          editFields && onEdit && selectedItem &&
          <AddElementModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            titleComponent="Modifier Informations"
            onSubmit={(updatedData) => {
              if (selectedItem && onEdit) {
                onEdit({ ...selectedItem, ...updatedData });
              }
              setShowModal(false);
            }}
            buttonTitle="Modifier"
            fields={editFields}
            initialData={initialData}
          />}
      </div>
    </div>
  );
}