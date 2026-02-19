<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\AnalyticsController;

Route::get('/', function () {
    return view('welcome');
});

// Expose API routes via web routes (fallback for environments where api routes aren't loaded)
Route::get('/api/restaurants', [RestaurantController::class, 'index']);
Route::get('/api/restaurants/{id}', [RestaurantController::class, 'show']);
Route::get('/api/top-restaurants', [RestaurantController::class, 'topRestaurants']);
Route::get('/api/restaurants/{restaurantId}/analytics', [AnalyticsController::class, 'getRestaurantAnalytics']);
