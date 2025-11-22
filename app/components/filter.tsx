"use client"

export interface IFilter {
  value: string,
  label: string
}

interface FilterProps {
  filters?: IFilter[] 
  onFilterChange?: (newFilter: string) => void
}
/*
import React, { useState } from 'react'
import styles from "@styles/Filter.module.scss"





export default function Filter({
  filters = [],
  onFilterChange
}: FilterProps) {
  if (filters.length== 0) {
    filters = [{ value: "name", label: "Nom" }, { value: "price", label: "Prix" }]
  }
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
        
        {filters.map((filter, index) => (
          <option key={filter.value} value={index}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}
*/

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Filter({
  filters = [{ value: "name", label: "Nom" }, { value: "price", label: "Prix" }],
  onFilterChange
}: FilterProps)  {
  const [age, setAge] = React.useState('');
  filters = [{ value: "name", label: "Nom" }, { value: "price", label: "Prix" }]
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {/* <MenuItem value={10}>Ten</MenuItem> */}
          {/* <MenuItem value={20}>Twenty</MenuItem> */}
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
          {filters.map((filter) =>(
            <MenuItem key={filter.value} value={filter.value}>{filter.label}</MenuItem>
          ))}
        </Select>
          
      </FormControl>
    </Box>
  );
}
