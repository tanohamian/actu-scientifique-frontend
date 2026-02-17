"use client"
import styles from "@styles/Filter.module.scss"

export interface IFilter {
  value: string,
  label: string
}

interface FilterProps {
  filters?: IFilter[] 
  onFilterChange?: (newFilter: string) => void
}

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Filter({
  filters = [],
  onFilterChange
}: FilterProps)  {
  const [value, setValue] = React.useState('');
  if (filters.length== 0) {
    filters = [{ value: "name", label: "Nom" }, { value: "price", label: "Prix" }]
  }  const handleChange = (event: SelectChangeEvent) => {
    const newValue =event.target.value as string
    setValue(newValue);
    if (onFilterChange) {
      onFilterChange(newValue);
    }
  };

  return (
    <Box 
      sx={{ 
        minWidth: 120, color: 'white',
      }}
    >
      <FormControl fullWidth sx={{
        maxHeight: '10%',
        
      }}>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'rgba(255, 255, 255, 0.3)'}}>Trier</InputLabel>
        <Select

          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.67)',
            '&:hover': { 
              borderColor: 'white', 
            },
            
          }}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                '&:hover': { 
                  borderColor: 'white', 
                },
                backgroundColor: '#2a5174', 
                borderRadius: '4px', 
              },
            },
          }}
        >
          <MenuItem 
              value=''
              sx={{ 
                backgroundColor: '#2a5174',
                color: '#fff', 
                
                '&:hover': { 
                  backgroundColor: '#3b6a90', 
                },

                '&.Mui-selected': { 
                  backgroundColor: '#1f416067', 
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#1f4160',
                  }
                }
              }}
            >
              Tout
            </MenuItem>
          {filters.map((filter) => (
            <MenuItem 
              key={filter.value} 
              value={filter.value}
              sx={{ 
                backgroundColor: '#2a5174',
                color: '#fff', 
                
                '&:hover': { 
                  backgroundColor: '#3b6a90', 
                },

                '&.Mui-selected': { 
                  backgroundColor: '#1f416067', 
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#1f4160',
                  }
                }
              }}
            >
              {filter.label}
            </MenuItem>
          ))}
        </Select>
          
      </FormControl>
    </Box>
  );
}
