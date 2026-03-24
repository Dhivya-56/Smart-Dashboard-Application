import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getProducts, getCategories } from '../services/api'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([])
  const [localProducts, setLocalProducts] = useState([]) // added/edited locally
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([products, cats]) => {
        setAllProducts(products)
        setCategories(cats)
      })
      .catch(() => setError('Failed to load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  // Merge: local overrides take priority keyed by id
  const mergedProducts = [
    ...localProducts,
    ...allProducts.filter(p => !localProducts.find(lp => lp.id === p.id)),
  ]

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `local-${Date.now()}`,
      rating: { rate: 0, count: 0 },
    }
    setLocalProducts(prev => [newProduct, ...prev])
    showToast('Product added successfully!')
  }

  const editProduct = (id, updates) => {
    const inLocal = localProducts.find(p => p.id === id)
    if (inLocal) {
      setLocalProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    } else {
      const base = allProducts.find(p => p.id === id)
      if (base) setLocalProducts(prev => [{ ...base, ...updates }, ...prev])
    }
    showToast('Product updated successfully!')
  }

  const getProductById = (id) => {
    const parsed = isNaN(id) ? id : Number(id)
    return mergedProducts.find(p => p.id === parsed || p.id === id) || null
  }

  return (
    <ProductContext.Provider value={{
      products: mergedProducts,
      categories,
      loading,
      error,
      toast,
      addProduct,
      editProduct,
      getProductById,
      showToast,
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
