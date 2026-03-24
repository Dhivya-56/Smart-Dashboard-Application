import React from 'react'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const icons = {
  success: <CheckCircle size={18} className="text-green-400" />,
  error: <AlertCircle size={18} className="text-red-400" />,
  info: <Info size={18} className="text-brand-400" />,
}
const barColor = {
  success: 'bg-green-400',
  error: 'bg-red-400',
  info: 'bg-brand-400',
}

export default function Toast({ message, type = 'success' }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 glass-card px-5 py-3.5 shadow-2xl animate-slide-up min-w-64 max-w-sm overflow-hidden">
      {icons[type]}
      <p className="text-sm font-medium text-gray-100">{message}</p>
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${barColor[type]} animate-shrink`}
        style={{ animation: 'shrink 3.5s linear forwards' }}
      />
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease; }
      `}</style>
    </div>
  )
}
