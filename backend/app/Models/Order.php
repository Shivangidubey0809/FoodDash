<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['restaurant_id', 'order_amount', 'order_time'];
    protected $casts = [
        'order_time' => 'datetime',
        'order_amount' => 'decimal:2',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
