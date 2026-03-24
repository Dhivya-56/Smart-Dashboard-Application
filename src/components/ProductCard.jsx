import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingBag, Edit } from 'lucide-react'

const categoryColors = {
  "electronics": "bg-blue-500/20 text-blue-300",
  "jewelery": "bg-yellow-500/20 text-yellow-300",
  "men's clothing": "bg-green-500/20 text-green-300",
  "women's clothing": "bg-pink-500/20 text-pink-300",
}

export default function ProductCard({ product, onEdit }) {
  const colorClass = categoryColors[product.category] || 'bg-brand-500/20 text-brand-300'

  return (
    <div className="glass-card group flex flex-col overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-900/20 hover:-translate-y-1">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative h-52 flex items-center justify-center p-6 bg-white/5">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain mix-blend-lighten group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <span className={`badge self-start ${colorClass}`}>{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-100 leading-snug line-clamp-2 hover:text-brand-300 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="font-medium text-gray-200">{product.rating?.rate ?? '—'}</span>
          <span>({product.rating?.count ?? 0} reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <span className="text-xl font-bold text-brand-400">${product.price?.toFixed(2)}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all"
              title="Edit product"
            >
              <Edit size={15} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="p-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-all"
              title="View details"
            >
              <ShoppingBag size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
