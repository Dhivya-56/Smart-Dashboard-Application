import React from 'react'
import Navbar from './Navbar'
import Toast from './Toast'
import { useProducts } from '../context/ProductContext'

export default function Layout({ children }) {
  const { toast } = useProducts()
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
