'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from './common';

interface DailyMetric {
  date: string;
  orders: number;
  revenue: number;
  avg_order_value: number;
  peak_hour: number;
}

interface ChartsProps {
  data: DailyMetric[];
}

export const OrdersChart = ({ data }: ChartsProps) => {
  return (
    <Card className="mb-6">
      <h3 className="font-bold text-lg mb-4">Daily Orders</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export const RevenueChart = ({ data }: ChartsProps) => {
  return (
    <Card className="mb-6">
      <h3 className="font-bold text-lg mb-4">Daily Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value: any) => `$${Number(value ?? 0).toFixed(2)}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export const AOVChart = ({ data }: ChartsProps) => {
  return (
    <Card className="mb-6">
      <h3 className="font-bold text-lg mb-4">Average Order Value (AOV)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value: any) => `$${Number(value ?? 0).toFixed(2)}`} />
          <Legend />
          <Bar dataKey="avg_order_value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export const PeakHourChart = ({ data }: ChartsProps) => {
  return (
    <Card className="mb-6">
      <h3 className="font-bold text-lg mb-4">Peak Order Hour</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value: any) => `${Number(value ?? 0)}:00`} />
          <Legend />
          <Bar dataKey="peak_hour" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export const SummaryMetrics = ({ data }: ChartsProps) => {
  if (data.length === 0) return null;

  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const avgAOV = data.reduce((sum, d) => sum + d.avg_order_value, 0) / data.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-gray-600 text-sm">Total Orders</p>
        <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
      </Card>
      <Card className="bg-gradient-to-br from-green-50 to-green-100">
        <p className="text-gray-600 text-sm">Total Revenue</p>
        <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
      </Card>
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
        <p className="text-gray-600 text-sm">Avg Order Value</p>
        <p className="text-3xl font-bold text-purple-600">${avgAOV.toFixed(2)}</p>
      </Card>
    </div>
  );
};
