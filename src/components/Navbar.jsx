import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Search, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/?search=${encodeURIComponent(search.trim())}`)
    else navigate('/')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-900/50">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              Smart<span className="text-brand-400">Dashboard</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="input-field pl-9 h-10 text-sm"
              />
            </div>
          </form>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Search */}
        {menuOpen && (
          <div className="sm:hidden pb-4 pt-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="input-field pl-9 h-10 text-sm"
                />
              </div>
              <button type="submit" className="btn-primary text-sm">Search</button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
