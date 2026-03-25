import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import Layout from '../components/Layout'
import { SlidersHorizontal, Plus, Package, AlertTriangle, Loader2, LayoutGrid, List } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function Dashboard() {
  const { products, categories, loading, error } = useProducts()
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [viewMode, setViewMode] = useState('grid')
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const searchQuery = searchParams.get('search') || ''

  const filtered = useMemo(() => {
    let list = [...products]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    }
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    return list
  }, [products, searchQuery, category, sort])

  const handleEdit = (product) => {
    setEditProduct(product)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditProduct(null)
  }

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="text-brand-400 animate-spin" />
        <p className="text-gray-400 font-medium">Loading products…</p>
      </div>
    </Layout>
  )

  if (error) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle size={48} className="text-red-400" />
        <p className="text-red-300 font-medium">{error}</p>
      </div>
    </Layout>
  )

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {searchQuery ? `Results for "${searchQuery}"` : 'Product Catalog'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setFormOpen(true) }}
          className="btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6 flex flex-wrap items-center gap-3">
        <SlidersHorizontal size={16} className="text-gray-400 shrink-0" />

        {/* Category Filter */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="input-field text-sm h-9 w-auto flex-1 min-w-40"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="input-field text-sm h-9 w-auto flex-1 min-w-40"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* View mode */}
        <div className="flex gap-1 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-brand-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-brand-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-white/5">
            <Package size={40} className="text-gray-600" />
          </div>
          <p className="text-gray-400 font-medium">No products found</p>
          <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Grid / List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(p => (
            <ListItem key={p.id} product={p} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* Form Modal */}
      {formOpen && (
        <ProductForm product={editProduct} onClose={handleCloseForm} />
      )}
    </Layout>
  )
}

function ListItem({ product, onEdit }) {
  return (
    <div className="glass-card flex items-center gap-5 p-4 hover:border-white/20 transition-all hover:shadow-xl hover:shadow-brand-900/10">
      <Link to={`/product/${product.id}`} className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-xl shrink-0 p-2">
        <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-lighten" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.id}`} className="text-sm font-semibold text-gray-100 hover:text-brand-300 line-clamp-1 transition-colors">
          {product.title}
        </Link>
        <p className="text-xs text-gray-500 capitalize mt-0.5">{product.category}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
        <span className="text-yellow-400">★</span>
        <span>{product.rating?.rate ?? '—'}</span>
      </div>
      <span className="text-brand-400 font-bold shrink-0">${product.price?.toFixed(2)}</span>
      <button
        onClick={() => onEdit(product)}
        className="btn-secondary text-xs py-1.5 px-3 shrink-0"
      >
        Edit
      </button>
    </div>
  )
}
