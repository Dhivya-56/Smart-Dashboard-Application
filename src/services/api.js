import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

export const getProducts = () => api.get('/products').then(r => r.data)
export const getProduct = (id) => api.get(`/products/${id}`).then(r => r.data)
export const getCategories = () => api.get('/products/categories').then(r => r.data)
export const getProductsByCategory = (category) =>
  api.get(`/products/category/${encodeURIComponent(category)}`).then(r => r.data)

export default api
