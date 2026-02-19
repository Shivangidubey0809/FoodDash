<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\AnalyticsController;

// API Routes (routes/api.php is already loaded with the `/api` prefix)

// Restaurant endpoints
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
Route::get('/top-restaurants', [RestaurantController::class, 'topRestaurants']);

// Analytics endpoints
Route::get('/restaurants/{restaurantId}/analytics', [AnalyticsController::class, 'getRestaurantAnalytics']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
