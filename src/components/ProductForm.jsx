import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X, Package } from 'lucide-react'
import { useProducts } from '../context/ProductContext'

const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"]

export default function ProductForm({ product, onClose }) {
  const { addProduct, editProduct } = useProducts()
  const isEdit = Boolean(product)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEdit
      ? { title: product.title, price: product.price, category: product.category, description: product.description, image: product.image }
      : {},
  })

  useEffect(() => {
    // prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const onSubmit = (data) => {
    const payload = { ...data, price: parseFloat(data.price) }
    if (isEdit) editProduct(product.id, payload)
    else addProduct(payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-500/20">
              <Package size={18} className="text-brand-400" />
            </div>
            <h2 className="text-lg font-bold">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Product Title *</label>
            <input
              {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Min 3 characters' } })}
              className="input-field"
              placeholder="Enter product title"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Must be positive' },
                  max: { value: 99999, message: 'Too high' },
                })}
                className="input-field"
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Category *</label>
              <select
                {...register('category', { required: 'Category required' })}
                className="input-field"
              >
                <option value="">Select…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Image URL</label>
            <input
              {...register('image', {
                pattern: { value: /^https?:\/\/.+/, message: 'Must be a valid URL' },
              })}
              className="input-field"
              placeholder="https://..."
            />
            {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              {...register('description')}
              className="input-field resize-none"
              placeholder="Optional product description…"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
