"use client"
import React, { useState } from 'react'
import styles from "@styles/Article.module.scss"
export interface IFilter{
  value: string,
  label : string
} 
interface FilterProps{
  filters : IFilter[]
  onFilterChange ?: (newFilter: string) => void
}
export default function Filter({filters, onFilterChange}: FilterProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedFilter(newValue);
    
    if (onFilterChange) {
      onFilterChange(newValue);
    }
  };
  return (
    <div className={styles.filter}>
      <label htmlFor="select-filter" style={{ marginRight: '10px' }}>
        Filtrer par :
      </label>
      <select
        id="select-filter"
        value={selectedFilter} 
        onChange={handleChange}
        style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ccc' }}
      >
        {filters.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
