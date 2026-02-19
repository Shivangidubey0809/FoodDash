'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { RestaurantAPI } from '@/lib/api';
import { useFilters } from '@/lib/filterContext';
import { FilterBar } from '@/components/FilterBar';
import {
  OrdersChart,
  RevenueChart,
  AOVChart,
  PeakHourChart,
  SummaryMetrics,
} from '@/components/Charts';
import { LoadingSpinner, Card } from '@/components/common';
import { ArrowLeft } from 'lucide-react';

interface DailyMetric {
  date: string;
  orders: number;
  revenue: number;
  avg_order_value: number;
  peak_hour: number;
}

interface AnalyticsData {
  restaurant_id: number;
  date_range: {
    start: string;
    end: string;
  };
  analytics: DailyMetric[];
}

export default function AnalyticsDashboard() {
  const params = useParams();
  const restaurantId = parseInt(params.id as string);
  const { filters } = useFilters();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch restaurant details
      const restaurantData = await RestaurantAPI.getRestaurant(restaurantId);
      setRestaurant(restaurantData);

      // Fetch analytics
      const analyticsData = await RestaurantAPI.getAnalytics(restaurantId, {
        start_date: filters.startDate,
        end_date: filters.endDate,
        min_amount: filters.minAmount,
        max_amount: filters.maxAmount,
        start_hour: filters.startHour,
        end_hour: filters.endHour,
      });

      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [restaurantId, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurants
          </Link>
          <h1 className="text-4xl font-bold">
            {restaurant ? restaurant.name : 'Restaurant Analytics'}
          </h1>
          {restaurant && (
            <p className="text-blue-100 mt-2">
              {restaurant.cuisine} • {restaurant.location}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : analytics && analytics.analytics.length > 0 ? (
          <>
            <FilterBar />

            {/* Summary Metrics */}
            <SummaryMetrics data={analytics.analytics} />

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrdersChart data={analytics.analytics} />
              <RevenueChart data={analytics.analytics} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AOVChart data={analytics.analytics} />
              <PeakHourChart data={analytics.analytics} />
            </div>

            {/* Detailed Table */}
            <Card className="mt-8">
              <h3 className="font-bold text-lg mb-4">Daily Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-semibold">Date</th>
                      <th className="text-right py-2 px-4 font-semibold">Orders</th>
                      <th className="text-right py-2 px-4 font-semibold">Revenue</th>
                      <th className="text-right py-2 px-4 font-semibold">Avg Order Value</th>
                      <th className="text-right py-2 px-4 font-semibold">Peak Hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.analytics.map((metric) => (
                      <tr key={metric.date} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{metric.date}</td>
                        <td className="text-right py-3 px-4">{metric.orders}</td>
                        <td className="text-right py-3 px-4">${metric.revenue.toFixed(2)}</td>
                        <td className="text-right py-3 px-4">${metric.avg_order_value.toFixed(2)}</td>
                        <td className="text-right py-3 px-4">{String(metric.peak_hour).padStart(2, '0')}:00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        ) : (
          <Card className="text-center py-12">
            <p className="text-gray-600 text-lg">No analytics data available</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or check back later</p>
          </Card>
        )}
      </div>
    </div>
  );
}
