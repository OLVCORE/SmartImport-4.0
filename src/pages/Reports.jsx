import React, { useState } from 'react'
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
  LineChart
} from 'lucide-react'

import { useSimulationStore } from '../store/simulationStore'

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const { getStatistics, simulations } = useSimulationStore()
  
  const stats = getStatistics()
  const calculatedSimulations = simulations.filter(sim => sim.status === 'calculated')

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

  const handleGenerateReport = (type) => {
    // Mock de geração de relatório
    console.log(`Gerando relatório: ${type}`)
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
          </div>
        </div>

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
                  className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200"
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
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Gerar PDF</span>
                        </button>
                        
                        <button
                          onClick={() => handleGenerateReport(`${report.id}-excel`)}
                          className="btn-outline flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Excel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Relatórios Recentes
            </h2>
          </div>
          
          <div className="p-6">
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum relatório gerado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gere seu primeiro relatório para começar a análise
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports 