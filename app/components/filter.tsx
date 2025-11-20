"use client"
import React, { useState } from 'react'
import styles from "@styles/Filter.module.scss"

export interface IFilter {
  value: string,
  label: string
}

interface FilterProps {
  filters?: IFilter[] 
  onFilterChange?: (newFilter: string) => void
}

export default function Filter({
  filters = [{ value: "name", label: "Nom" }, { value: "price", label: "Prix" }],
  onFilterChange
}: FilterProps) {
  
  const [selectedFilter, setSelectedFilter] = useState(''); 

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedFilter(newValue);

    if (onFilterChange) {
      onFilterChange(newValue);
    }
  };

  return (
    <div className={styles.filterContainer}> 
      <select  
        className={styles.sortButton} 
        value={selectedFilter} 
        onChange={handleChange} 
      >
        <option value="">Trier par</option> 
            <option>Noms</option>
            <option>Prixxx</option>
        
        {filters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}