'use client';

import React, { useState, useEffect } from 'react';
import { RestaurantAPI } from '@/lib/api';
import { useFilters } from '@/lib/filterContext';
import { FilterBar } from '@/components/FilterBar';
import { RestaurantCard } from '@/components/RestaurantCard';
import { LoadingSpinner, Card, Button } from '@/components/common';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  orders_sum_order_amount?: number;
  orders_count?: number;
}

interface PaginationInfo {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export default function Home() {
  const { filters } = useFilters();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRestaurants = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await RestaurantAPI.getRestaurants({
        search: filters.search,
        cuisine: filters.cuisine,
        location: filters.location,
        sort_by: filters.sortBy,
        page,
        per_page: 10,
      });

      setRestaurants(response.data || []);
      setPagination(response.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants(1);
  }, [filters]);

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.last_page) {
      fetchRestaurants(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchRestaurants(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">🍽️ FoodDash</h1>
          <p className="text-blue-100 mt-2">Real-time Restaurant Analytics Dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FilterBar onFiltersApply={() => setCurrentPage(1)} />

        {loading ? (
          <LoadingSpinner />
        ) : restaurants.length > 0 ? (
          <>
            {/* Grid of Restaurant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  location={restaurant.location}
                  cuisine={restaurant.cuisine}
                  totalRevenue={restaurant.orders_sum_order_amount || 0}
                  totalOrders={restaurant.orders_count || 0}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <Card className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {pagination.last_page} • Total: {pagination.total} restaurants
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === pagination.last_page}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}
          </>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">No restaurants found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}
