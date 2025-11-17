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
  const [isOpen, setIsOpen] = useState(false);
  

  const baseClasses = 'relative inline-flex items-center justify-between p-4 rounded-xl cursor-pointer transition duration-150 ease-in-out';
  const colorClasses = 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg';
  const textClasses = 'text-3xl font-bold tracking-tight'; 

  const iconClasses = `ml-4 w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`;
  const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedFilter(newValue);
    
    if (onFilterChange) {
      onFilterChange(newValue);
    }
  };
  return (
    <>
  
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
    </>

  );
}
