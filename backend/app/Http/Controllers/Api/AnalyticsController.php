<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    /**
     * Get analytics for a specific restaurant
     * 
     * Query Parameters:
     * ?start_date=2025-01-01
     * ?end_date=2025-12-31
     * ?min_amount=100
     * ?max_amount=5000
     * ?start_hour=0
     * ?end_hour=23
     */
    public function getRestaurantAnalytics(Request $request, $restaurantId)
    {
        // Build cache key based on filters
        $cacheKey = $this->buildCacheKey($restaurantId, $request);
        
        // Check cache first
        if (Cache::has($cacheKey)) {
            return response()->json(Cache::get($cacheKey));
        }

        // Get filter parameters
        $startDate = $request->input('start_date', now()->subMonths(3)->startOfDay());
        $endDate = $request->input('end_date', now()->endOfDay());
        $minAmount = $request->input('min_amount', 0);
        $maxAmount = $request->input('max_amount', 999999);
        $startHour = $request->input('start_hour', 0);
        $endHour = $request->input('end_hour', 23);

        // Step 1: Fetch filtered orders from database
        $orders = Order::query()
            ->where('restaurant_id', $restaurantId)
            ->whereBetween('order_time', [$startDate, $endDate])
            ->whereBetween('order_amount', [$minAmount, $maxAmount])
            ->get();

        // Step 2: Group orders by day and compute metrics
        $dailyAnalytics = $this->computeDailyAnalytics($orders, $startHour, $endHour);

        // Sort by date
        $result = [
            'restaurant_id' => $restaurantId,
            'date_range' => [
                'start' => $startDate->toDateString(),
                'end' => $endDate->toDateString(),
            ],
            'analytics' => $dailyAnalytics,
        ];

        // Cache for 10 minutes
        Cache::put($cacheKey, $result, now()->addMinutes(10));

        return response()->json($result);
    }

    /**
     * Compute daily analytics metrics
     * 
     * For each day:
     * - orders_count: Number of orders
     * - revenue: SUM(order_amount)
     * - avg_order_value: revenue / orders_count
     * - peak_hour: Hour with most orders
     */
    private function computeDailyAnalytics($orders, $startHour, $endHour)
    {
        $dailyData = [];

        // Step 2: Group by date
        foreach ($orders as $order) {
            $date = $order->order_time->toDateString();
            $hour = $order->order_time->hour;

            // Skip if hour is outside range
            if ($hour < $startHour || $hour > $endHour) {
                continue;
            }

            if (!isset($dailyData[$date])) {
                $dailyData[$date] = [
                    'orders' => [],
                    'hourCounts' => [],
                ];
            }

            $dailyData[$date]['orders'][] = $order->order_amount;

            // Track hour count for peak hour calculation
            if (!isset($dailyData[$date]['hourCounts'][$hour])) {
                $dailyData[$date]['hourCounts'][$hour] = 0;
            }
            $dailyData[$date]['hourCounts'][$hour]++;
        }

        // Step 3: Compute metrics per day
        $analytics = [];
        foreach ($dailyData as $date => $data) {
            $orderAmounts = $data['orders'];
            $orderCount = count($orderAmounts);
            $revenue = array_sum($orderAmounts);
            $aov = $orderCount > 0 ? $revenue / $orderCount : 0;
            $peakHour = array_key_exists($data['hourCounts'], $data['hourCounts']) 
                ? array_search(max($data['hourCounts']), $data['hourCounts']) 
                : 0;

            $analytics[] = [
                'date' => $date,
                'orders' => $orderCount,
                'revenue' => round($revenue, 2),
                'avg_order_value' => round($aov, 2),
                'peak_hour' => intval($peakHour),
            ];
        }

        // Sort by date
        usort($analytics, function ($a, $b) {
            return strcmp($a['date'], $b['date']);
        });

        return $analytics;
    }

    /**
     * Build cache key based on request filters
     */
    private function buildCacheKey($restaurantId, Request $request)
    {
        $filterArray = [
            'restaurant_id' => $restaurantId,
            'start_date' => $request->input('start_date', ''),
            'end_date' => $request->input('end_date', ''),
            'min_amount' => $request->input('min_amount', ''),
            'max_amount' => $request->input('max_amount', ''),
            'start_hour' => $request->input('start_hour', ''),
            'end_hour' => $request->input('end_hour', ''),
        ];

        return 'analytics:' . md5(json_encode($filterArray));
    }
}
