<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Restaurant;
use App\Models\Order;
use Illuminate\Support\Facades\File;

class ImportDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Import restaurants
        $restaurantsPath = base_path('../data/restaurants.json');
        if (File::exists($restaurantsPath)) {
            $restaurants = json_decode(File::get($restaurantsPath), true);
            foreach ($restaurants as $restaurant) {
                Restaurant::updateOrCreate(
                    ['id' => $restaurant['id']],
                    [
                        'name' => $restaurant['name'],
                        'location' => $restaurant['location'],
                        'cuisine' => $restaurant['cuisine'],
                    ]
                );
            }
            $this->command->info('Restaurants imported successfully!');
        } else {
            $this->command->warn('restaurants.json not found');
        }

        // Import orders
        $ordersPath = base_path('../data/orders.json');
        if (File::exists($ordersPath)) {
            $orders = json_decode(File::get($ordersPath), true);
            foreach ($orders as $order) {
                Order::updateOrCreate(
                    ['id' => $order['id']],
                    [
                        'restaurant_id' => $order['restaurant_id'],
                        'order_amount' => $order['order_amount'],
                        'order_time' => $order['order_time'],
                    ]
                );
            }
            $this->command->info('Orders imported successfully!');
        } else {
            $this->command->warn('orders.json not found');
        }
    }
}

