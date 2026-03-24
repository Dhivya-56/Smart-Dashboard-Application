import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import Dashboard from './pages/Dashboard'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </ProductProvider>
  )
}

export default App
