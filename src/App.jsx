import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

// Layout Components
import Layout from './components/Layout/Layout'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Footer from './components/Layout/Footer'

// Page Components
import Dashboard from './pages/Dashboard'
import Simulator from './pages/Simulator'
import History from './pages/History'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Help from './pages/Help'
import Integrations from './pages/Integrations'

// UI Components
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorFallback from './components/ErrorFallback'

// Hooks
import { useTheme } from './hooks/useTheme'
import { useSimulationStore } from './store/simulationStore'

// Lazy loaded components
const LazySimulator = React.lazy(() => import('./pages/Simulator'))
const LazyHistory = React.lazy(() => import('./pages/History'))
const LazyReports = React.lazy(() => import('./pages/Reports'))

function App() {
  const { theme, toggleTheme } = useTheme()
  const { initializeStore } = useSimulationStore()

  useEffect(() => {
    // Initialize store with default data
    initializeStore()
    // Set theme on mount
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme, initializeStore])

  return (
    <>
      <Helmet>
        <title>SmartImport 4.0 - Simulador Estratégico de Importação | EXCELTTA</title>
        <meta name="description" content="Simulador inteligente de operações de importação com IA, OCR e análise tributária. Automatize decisões logísticas e fiscais para PMEs brasileiras." />
        <meta name="keywords" content="import, simulador, tributário, logística, IA, OCR, COMEX, NCM, II, IPI, ICMS, PIS, COFINS, AFRMM, drawback, RECOF, ZFM" />
        <meta name="author" content="OLV Internacional - EXCELTTA" />
        {/* Open Graph */}
        <meta property="og:title" content="SmartImport 4.0 - Simulador Estratégico de Importação" />
        <meta property="og:description" content="Simulador inteligente de operações de importação com IA, OCR e análise tributária." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartimport.exceltta.com" />
        <meta property="og:image" content="https://smartimport.exceltta.com/og-image.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SmartImport 4.0 - Simulador Estratégico de Importação" />
        <meta name="twitter:description" content="Simulador inteligente de operações de importação com IA, OCR e análise tributária." />
        <meta name="twitter:image" content="https://smartimport.exceltta.com/twitter-image.png" />
        {/* PWA */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SmartImport" />
        {/* Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Helmet>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${theme}`}>
        <Layout>
          <Header onThemeToggle={toggleTheme} theme={theme} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Dashboard />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/simulator" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <LazySimulator />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/history" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <LazyHistory />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/reports" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <LazyReports />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/settings" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Settings />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/help" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Help />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/integrations" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Integrations />
                        </motion.div>
                      }
                    />
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </main>
          </div>
          <Footer />
        </Layout>
      </div>
    </>
  )
}

export default App 