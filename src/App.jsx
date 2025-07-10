import React from 'react'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'

console.log('[SmartImport] App.jsx montando (Header + Sidebar)')

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
      </div>
    </div>
  )
}

export default App 