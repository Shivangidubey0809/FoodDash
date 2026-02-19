import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const RestaurantAPI = {
  // Get restaurant list with filters
  async getRestaurants(params?: {
    search?: string;
    cuisine?: string;
    location?: string;
    sort_by?: string;
    page?: number;
    per_page?: number;
  }) {
    try {
      const response = await apiClient.get('/restaurants', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single restaurant
  async getRestaurant(id: number) {
    try {
      const response = await apiClient.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get top 3 restaurants by revenue
  async getTopRestaurants(params?: {
    start_date?: string;
    end_date?: string;
  }) {
    try {
      const response = await apiClient.get('/top-restaurants', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get restaurant analytics
  async getAnalytics(restaurantId: number, params?: {
    start_date?: string;
    end_date?: string;
    min_amount?: number;
    max_amount?: number;
    start_hour?: number;
    end_hour?: number;
  }) {
    try {
      const response = await apiClient.get(`/restaurants/${restaurantId}/analytics`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient;
