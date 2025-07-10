import React from 'react'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Dashboard from './pages/Dashboard'

console.log('[SmartImport] App.jsx montando')

function App() {
  // Etapa 1: Renderizar só Header
  // return <Header />

  // Etapa 2: Renderizar Header + Sidebar
  // return <div className="flex"><Sidebar /><div className="flex-1"><Header /></div></div>

  // Etapa 3: Renderizar Header + Sidebar + Dashboard
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App 