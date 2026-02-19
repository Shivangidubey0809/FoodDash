# FoodDash - Restaurant Analytics Dashboard

A full-stack restaurant analytics dashboard built with **Laravel (Backend)** and **Next.js (Frontend)**.

## 🏗️ Project Structure

```
FoodDash/
├── backend/              # Laravel API
├── frontend/             # Next.js Application
└── data/                 # JSON data files (restaurants.json, orders.json)
    ├── restaurants.json
    └── orders.json
```

## 🚀 Quick Setup

### Prerequisites
- **PHP 8.1+** with Composer
- **Node.js 16+** with npm
- **SQLite** (included with PHP)

### Backend Setup (Laravel)

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Generate application key:
   ```bash
   php artisan key:generate
   ```

4. Create SQLite database:
   ```bash
   touch database/database.sqlite
   ```

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. **Important:** Ensure you have `restaurants.json` and `orders.json` in the `/data` folder at the root of the project

7. Seed the database with JSON data:
   ```bash
   php artisan db:seed --class=ImportDataSeeder
   ```

8. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   Server runs on: `http://localhost:8000`

### Frontend Setup (Next.js)

1. In a **new terminal**, navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Application runs on: `http://localhost:3000`

## 📊 API Endpoints

### Restaurant Endpoints

#### Get Restaurant List (with filters & pagination)
```
GET /api/restaurants
?search=name
?cuisine=italian
?location=downtown
?sort_by=name|revenue|orders
?page=1
?per_page=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Pizza Paradise",
      "location": "Downtown",
      "cuisine": "Italian",
      "orders_sum_order_amount": 5000,
      "orders_count": 15
    }
  ],
  "pagination": {
    "total": 50,
    "per_page": 10,
    "current_page": 1,
    "last_page": 5
  }
}
```

#### Get Specific Restaurant
```
GET /api/restaurants/{id}
```

#### Get Top 3 Restaurants by Revenue
```
GET /api/top-restaurants
?start_date=2025-01-01
?end_date=2025-12-31
```

### Analytics Endpoints

#### Get Restaurant Analytics
```
GET /api/restaurants/{restaurantId}/analytics
?start_date=2025-01-01
?end_date=2025-12-31
?min_amount=100
?max_amount=5000
?start_hour=0
?end_hour=23
```

**Response:**
```json
{
  "restaurant_id": 1,
  "date_range": {
    "start": "2025-06-22",
    "end": "2025-06-24"
  },
  "analytics": [
    {
      "date": "2025-06-22",
      "orders": 35,
      "revenue": 23000.00,
      "avg_order_value": 657.14,
      "peak_hour": 19
    }
  ]
}
```

## 📝 Data Format

### restaurants.json
```json
[
  {
    "id": 1,
    "name": "Pizza Paradise",
    "location": "Downtown",
    "cuisine": "Italian"
  }
]
```

### orders.json
```json
[
  {
    "id": 1,
    "restaurant_id": 1,
    "order_amount": 450.50,
    "order_time": "2025-06-22T19:30:00"
  }
]
```

## 🎨 Frontend Features

### Restaurant List Page
- **Search** by restaurant name
- **Filter** by cuisine and location
- **Sort** by name, revenue, or orders count
- **Pagination** for easy navigation
- Click restaurant to view detailed analytics

### Analytics Dashboard
- **Summary Metrics**: Total orders, revenue, average order value
- **Line Charts**: Daily orders and revenue trends
- **Bar Charts**: Average order value and peak hours
- **Detailed Table**: Daily metrics with all data points
- **Advanced Filters**: Date range, amount range, hour range
- **Caching**: Results cached for 10 minutes for performance

## 🛠️ Key Technologies

**Backend:**
- Laravel 11
- PHP 8.1+
- SQLite Database
- Eloquent ORM
- Factory & Seeder for data import

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Lucide React for icons
- Axios for API calls

## ⚙️ Performance Optimizations

1. **Database Indexes**: Added on `restaurant_id`, `order_time`, and `order_amount`
2. **Query Optimization**: Uses Laravel aggregations (SUM, COUNT) at database level
3. **Caching**: Analytics results cached for 10 minutes
4. **Pagination**: Limits data fetched per request
5. **Client-side Filtering**: Reduces unnecessary API calls

## 🐛 Troubleshooting

### Database Connection Error
- Ensure `database/database.sqlite` file exists
- Run `php artisan migrate`

### API Not Found (404)
- Verify Laravel server is running: `php artisan serve`
- Check API endpoints are accessible: `http://localhost:8000/api/restaurants`

### CORS Issues
- API and frontend are on the same machine, should work fine
- If issues arise, add CORS middleware to Laravel

### No Data Showing
- Verify JSON files are in `/data` folder
- Run `php artisan db:seed --class=ImportDataSeeder`
- Check database has data: `php artisan tinker` → `App\Models\Restaurant::count()`

## 📦 Deployment

### Backend (Laravel)
1. Set up production database (MySQL/PostgreSQL)
2. Update `.env` with production database credentials
3. Run migrations
4. Deploy to server with HTTPS

### Frontend (Next.js)
1. Build: `npm run build`
2. Start: `npm run start`
3. Or deploy to Vercel with one click

## 📚 Documentation

- [Laravel Documentation](https://laravel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## 🎯 Future Enhancements

- [ ] User authentication & authorization
- [ ] Real-time data updates with WebSockets
- [ ] Export analytics to PDF/CSV
- [ ] Advanced filters with date picker
- [ ] Predictive analytics
- [ ] Multi-language support
- [ ] Dark mode theme

---

**Happy Analytics! 📊🍽️**
