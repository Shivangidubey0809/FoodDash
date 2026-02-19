'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterState {
  restaurantId?: number;
  startDate: string;
  endDate: string;
  minAmount: number;
  maxAmount: number;
  startHour: number;
  endHour: number;
  search?: string;
  cuisine?: string;
  location?: string;
  sortBy?: string;
}

interface FilterContextType {
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  minAmount: 0,
  maxAmount: 999999,
  startHour: 0,
  endHour: 23,
  search: '',
  cuisine: '',
  location: '',
  sortBy: 'name',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
};
