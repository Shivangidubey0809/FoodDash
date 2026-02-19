# 🚀 FoodDash - Quick Start Guide

## Step 1: Prepare Your Data
Place your JSON files in the `/data` folder:
- `restaurants.json` - List of restaurants
- `orders.json` - Order records with timestamps

Example formats are provided in the `/data` folder.

---

## Step 2: Start Laravel Backend

**Terminal 1:**
```bash
cd backend

# Install dependencies (first time only)
composer install

# Generate key (first time only)
php artisan key:generate

# Create database (first time only)
touch database/database.sqlite

# Run migrations (first time only)
php artisan migrate

# Import JSON data (first time only)
php artisan db:seed --class=ImportDataSeeder

# Start server
php artisan serve
```

✅ Backend ready at: **http://localhost:8000**

---

## Step 3: Start Next.js Frontend

**Terminal 2:**
```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

✅ Frontend ready at: **http://localhost:3000**

---

## 📊 Features Available

### Restaurant List Page (http://localhost:3000)
- 🔍 Search by name
- 🏷️ Filter by cuisine & location
- 📊 Sort by name, revenue, or orders
- 📄 Pagination support
- Click any restaurant to view analytics

### Analytics Dashboard (http://localhost:3000/analytics/[id])
- 📈 Daily orders chart
- 💰 Revenue trend chart
- 💵 Average order value chart
- ⏰ Peak hours analysis
- 📋 Detailed daily metrics table
- 🔧 Advanced filters

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api/`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/restaurants` | GET | Get all restaurants (with filters) |
| `/restaurants/{id}` | GET | Get specific restaurant |
| `/top-restaurants` | GET | Get top 3 by revenue |
| `/restaurants/{id}/analytics` | GET | Get analytics for restaurant |

---

## 🛠️ Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)
Already configured with SQLite database. No changes needed for local development.

---

## 🎯 Next Steps

1. **Add Your Data**: Upload restaurants.json and orders.json to `/data` folder
2. **Import Data**: Run `php artisan db:seed --class=ImportDataSeeder`
3. **Refresh Frontend**: The app will automatically load your data
4. **Explore**: Browse restaurants and analytics!

---

## ❓ Need Help?

See **README.md** for:
- Detailed setup instructions
- API documentation
- Troubleshooting guide
- Technology stack details

---

**Happy Analytics! 🍽️📊**
