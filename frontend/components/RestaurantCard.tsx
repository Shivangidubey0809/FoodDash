import React from 'react';
import Link from 'next/link';
import { Card } from './common';
import { TrendingUp } from 'lucide-react';

interface RestaurantCardProps {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  totalRevenue?: number;
  totalOrders?: number;
}

export const RestaurantCard = ({
  id,
  name,
  location,
  cuisine,
  totalRevenue = 0,
  totalOrders = 0,
}: RestaurantCardProps) => {
  return (
    <Link href={`/analytics/${id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{cuisine}</p>
          </div>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-sm text-gray-600 mb-4">📍 {location}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded">
            <p className="text-gray-600">Revenue</p>
            <p className="font-semibold text-blue-600">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <p className="text-gray-600">Orders</p>
            <p className="font-semibold text-green-600">{totalOrders}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
