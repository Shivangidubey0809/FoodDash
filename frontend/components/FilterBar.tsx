'use client';

import React, { useState, useCallback } from 'react';
import { useFilters } from '@/lib/filterContext';
import { Input, Select, Button } from './common';
import { Search } from 'lucide-react';

export const FilterBar = ({ onFiltersApply }: { onFiltersApply?: () => void }) => {
  const { filters, updateFilters } = useFilters();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = useCallback((field: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleApply = () => {
    updateFilters(localFilters);
    onFiltersApply?.();
  };

  const handleReset = () => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    
    const newFilters = {
      startDate: threeMonthsAgo.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0],
      minAmount: 0,
      maxAmount: 999999,
      startHour: 0,
      endHour: 23,
      search: '',
      cuisine: '',
      location: '',
      sortBy: 'name',
    };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Restaurant name..."
              value={localFilters.search || ''}
              onChange={(e) => handleChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Cuisine Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
          <Select
            value={localFilters.cuisine || ''}
            onChange={(e) => handleChange('cuisine', e.target.value)}
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="American">American</option>
            <option value="Japanese">Japanese</option>
            <option value="Mexican">Mexican</option>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <Select
            value={localFilters.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Downtown">Downtown</option>
            <option value="Midtown">Midtown</option>
            <option value="Uptown">Uptown</option>
            <option value="Suburbs">Suburbs</option>
          </Select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <Select
            value={localFilters.sortBy || 'name'}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            <option value="name">Name</option>
            <option value="revenue">Revenue</option>
            <option value="orders">Orders</option>
          </Select>
        </div>
      </div>

      {/* Date and Amount Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <Input
            type="date"
            value={localFilters.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <Input
            type="date"
            value={localFilters.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount ($)</label>
          <Input
            type="number"
            value={localFilters.minAmount}
            onChange={(e) => handleChange('minAmount', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Amount ($)</label>
          <Input
            type="number"
            value={localFilters.maxAmount}
            onChange={(e) => handleChange('maxAmount', parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Hour Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Hour</label>
          <Select
            value={localFilters.startHour}
            onChange={(e) => handleChange('startHour', parseInt(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, '0')}:00
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Hour</label>
          <Select
            value={localFilters.endHour}
            onChange={(e) => handleChange('endHour', parseInt(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, '0')}:00
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleApply}>Apply Filters</Button>
        <Button onClick={handleReset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
};
