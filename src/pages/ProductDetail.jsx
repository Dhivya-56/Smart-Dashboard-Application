import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import Layout from '../components/Layout'
import ProductForm from '../components/ProductForm'
import {
  ArrowLeft, Star, ShoppingCart, Edit, Package,
  Shield, Truck, RotateCcw, Loader2, AlertTriangle
} from 'lucide-react'

const categoryColors = {
  "electronics":     "bg-blue-500/20 text-blue-300",
  "jewelery":        "bg-yellow-500/20 text-yellow-300",
  "men's clothing":  "bg-green-500/20 text-green-300",
  "women's clothing":"bg-pink-500/20 text-pink-300",
}

const badges = [
  { icon: Shield,   label: 'Secure Payment' },
  { icon: Truck,    label: 'Fast Delivery' },
  { icon: RotateCcw,label: '30-Day Returns' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, loading } = useProducts()
  const [editOpen, setEditOpen] = useState(false)

  const product = getProductById(id)

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="text-brand-400 animate-spin" />
        <p className="text-gray-400">Loading product…</p>
      </div>
    </Layout>
  )

  if (!product) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="p-5 rounded-2xl bg-white/5">
          <AlertTriangle size={40} className="text-red-400" />
        </div>
        <p className="text-red-300 font-semibold text-lg">Product not found</p>
        <p className="text-gray-500 text-sm">It may have been deleted or the ID is invalid.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-2 flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Catalog
        </button>
      </div>
    </Layout>
  )

  const color = categoryColors[product.category] || 'bg-brand-500/20 text-brand-300'
  const ratingPercent = ((product.rating?.rate ?? 0) / 5) * 100

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand-400 transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Catalog
        </Link>
        <span>/</span>
        <span className={`badge ${color}`}>{product.category}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Panel */}
        <div className="glass-card flex items-center justify-center p-12 min-h-80">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-6">
          <div>
            <span className={`badge ${color} mb-3`}>{product.category}</span>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-50">
              {product.title}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  size={18}
                  className={`${i <= Math.round(product.rating?.rate ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
            <span className="text-gray-200 font-semibold">{product.rating?.rate ?? '—'}</span>
            <span className="text-gray-500 text-sm">({product.rating?.count ?? 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Price</p>
              <p className="text-4xl font-extrabold text-brand-400">${product.price?.toFixed(2)}</p>
            </div>
            <Package size={40} className="text-gray-700" />
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Description</p>
              <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="glass-card flex flex-col items-center gap-2 p-3 text-center">
                <Icon size={20} className="text-brand-400" />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="btn-primary flex-1 flex items-center justify-center gap-2">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={() => setEditOpen(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <Edit size={16} /> Edit
            </button>
          </div>
        </div>
      </div>

      {editOpen && (
        <ProductForm product={product} onClose={() => setEditOpen(false)} />
      )}
    </Layout>
  )
}
