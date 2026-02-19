<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class RestaurantController extends Controller
{
    /**
     * Get list of restaurants with search, filter, and sort
     * 
     * Query Parameters:
     * ?search=name
     * ?cuisine=italian
     * ?location=downtown
     * ?sort_by=name|revenue|orders
     * ?page=1
     */
    public function index(Request $request)
    {
        $query = Restaurant::query();

        // Search by name
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'LIKE', '%' . $search . '%');
        }

        // Filter by cuisine
        if ($request->has('cuisine')) {
            $query->where('cuisine', $request->input('cuisine'));
        }

        // Filter by location
        if ($request->has('location')) {
            $query->where('location', $request->input('location'));
        }

        // Sort logic
        $sortBy = $request->input('sort_by', 'name');
        
        if ($sortBy === 'revenue') {
            $query->withSum('orders', 'order_amount')
                  ->orderBy('orders_sum_order_amount', 'DESC');
        } elseif ($sortBy === 'orders') {
            $query->withCount('orders')
                  ->orderBy('orders_count', 'DESC');
        } else {
            $query->orderBy('name', 'ASC');
        }

        // Paginate
        $restaurants = $query->paginate($request->input('per_page', 10));

        return response()->json([
            'data' => $restaurants->items(),
            'pagination' => [
                'total' => $restaurants->total(),
                'per_page' => $restaurants->perPage(),
                'current_page' => $restaurants->currentPage(),
                'last_page' => $restaurants->lastPage(),
            ]
        ]);
    }

    /**
     * Get specific restaurant with analytics
     */
    public function show($id)
    {
        $restaurant = Restaurant::with('orders')->findOrFail($id);
        
        return response()->json($restaurant);
    }

    /**
     * Get top 3 restaurants by revenue
     * 
     * Query Parameters:
     * ?start_date=2025-01-01
     * ?end_date=2025-12-31
     */
    public function topRestaurants(Request $request)
    {
        $startDate = $request->input('start_date', now()->subMonths(1));
        $endDate = $request->input('end_date', now());

        $restaurants = Restaurant::query()
            ->withSum(['orders' => function (Builder $q) use ($startDate, $endDate) {
                $q->whereBetween('order_time', [$startDate, $endDate]);
            }], 'order_amount')
            ->withCount(['orders' => function (Builder $q) use ($startDate, $endDate) {
                $q->whereBetween('order_time', [$startDate, $endDate]);
            }])
            ->orderBy('orders_sum_order_amount', 'DESC')
            ->limit(3)
            ->get()
            ->map(function ($restaurant) {
                return [
                    'id' => $restaurant->id,
                    'name' => $restaurant->name,
                    'location' => $restaurant->location,
                    'cuisine' => $restaurant->cuisine,
                    'total_revenue' => round($restaurant->orders_sum_order_amount ?? 0, 2),
                    'total_orders' => $restaurant->orders_count ?? 0,
                ];
            });

        return response()->json(['data' => $restaurants]);
    }
}
