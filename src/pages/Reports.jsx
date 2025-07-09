import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  FileText,
  PieChart,
  LineChart,
  AlertTriangle
} from 'lucide-react'

import { useSimulationStore } from '../store/simulationStore'

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [isLoading, setIsLoading] = useState(true)
  const [lastSync, setLastSync] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    calculated: 0,
    averageProfitability: 0,
    totalValue: 0
  })
  
  const { getStatistics, simulations, fetchSimulations, checkConnectivity, error, clearError } = useSimulationStore()
  
  const calculatedSimulations = simulations.filter(sim => sim.status === 'calculated')

  // Buscar dados do backend na inicialização
  useEffect(() => {
    const initializeReports = async () => {
      setIsLoading(true)
      
      try {
        // Verificar conectividade
        const isConnected = await checkConnectivity()
        
        if (isConnected) {
          // Buscar dados do backend
          await fetchSimulations()
          setLastSync(new Date().toISOString())
        }
      } catch (error) {
        console.warn('Reports usando dados locais:', error.message)
      } finally {
        setIsLoading(false)
      }
    }

    initializeReports()
  }, [fetchSimulations, checkConnectivity])

  // Buscar estatísticas
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const statistics = await getStatistics()
        setStats(statistics)
      } catch (error) {
        console.warn('Usando estatísticas locais:', error.message)
        // Fallback para estatísticas locais
        const localStats = getStatistics()
        setStats(localStats)
      }
    }

    if (!isLoading) {
      loadStatistics()
    }
  }, [isLoading, getStatistics])

  const reportTypes = [
    {
      id: 'financial',
      name: 'Relatório Financeiro',
      description: 'Análise detalhada de custos e rentabilidade',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: 'taxes',
      name: 'Análise Tributária',
      description: 'Breakdown de impostos e alíquotas',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      id: 'logistics',
      name: 'Custos Logísticos',
      description: 'Análise de frete, seguro e custos portuários',
      icon: TrendingUp,
      color: 'bg-orange-500'
    },
    {
      id: 'comparative',
      name: 'Análise Comparativa',
      description: 'Comparação entre diferentes simulações',
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ]

  const periods = [
    { value: '7', label: 'Últimos 7 dias' },
    { value: '30', label: 'Últimos 30 dias' },
    { value: '90', label: 'Últimos 90 dias' },
    { value: '365', label: 'Último ano' }
  ]

  const handleGenerateReport = async (type) => {
    try {
      // Implementar geração real de relatório via API
      console.log(`Gerando relatório: ${type}`)
      // const response = await apiClient.post('/reports', { type, period: selectedPeriod })
      // return response.data
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Relatórios - SmartImport 4.0</title>
        <meta name="description" content="Relatórios e análises de simulações de importação" />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Relatórios e Análises
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gere relatórios detalhados e análises das suas simulações
            </p>
            
            {/* Status de sincronização */}
            {lastSync && (
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-success-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Última sincronização: {new Date(lastSync).toLocaleTimeString('pt-BR')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-danger-500" />
                <span className="text-danger-700 dark:text-danger-300">{error}</span>
              </div>
              <button 
                onClick={clearError}
                className="text-danger-500 hover:text-danger-700 dark:text-danger-400 dark:hover:text-danger-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total de Simulações
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats.total}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Calculadas
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats.calculated}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-success-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Rentabilidade Média
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stats.averageProfitability.toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-warning-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Valor Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      R$ {stats.totalValue.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Report Types */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tipos de Relatório
                  </h2>
                  
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {periods.map(period => (
                        <option key={period.value} value={period.value}>
                          {period.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reportTypes.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <report.icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {report.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {report.description}
                          </p>
                          
                          <button
                            onClick={() => handleGenerateReport(report.id)}
                            className="btn-primary flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Gerar Relatório</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Analytics */}
            {calculatedSimulations.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profitability Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Distribuição de Rentabilidade
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Alta (>30%)', count: calculatedSimulations.filter(s => s.profitability > 30).length, color: 'bg-success-500' },
                      { label: 'Média (15-30%)', count: calculatedSimulations.filter(s => s.profitability >= 15 && s.profitability <= 30).length, color: 'bg-warning-500' },
                      { label: 'Baixa (<15%)', count: calculatedSimulations.filter(s => s.profitability < 15).length, color: 'bg-danger-500' }
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{category.label}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${category.color} rounded-full`}
                              style={{ width: `${(category.count / calculatedSimulations.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                            {category.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Atividade Recente
                  </h3>
                  <div className="space-y-3">
                    {calculatedSimulations.slice(0, 5).map((simulation, index) => (
                      <div key={simulation.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {simulation.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(simulation.updatedAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            R$ {simulation.landedCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                          </p>
                          <p className="text-xs text-success-600 dark:text-success-400">
                            {simulation.profitability?.toFixed(1) || '0'}% rentabilidade
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Reports 