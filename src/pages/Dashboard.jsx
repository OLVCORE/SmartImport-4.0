import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calculator, 
  FileText, 
  DollarSign,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useSimulationStore } from '../store/simulationStore'

const Dashboard = () => {
  const { 
    simulations, 
    currentSimulation, 
    getStatistics,
    searchSimulations,
    filterSimulationsByStatus,
    createSimulation
  } = useSimulationStore()

  const stats = getStatistics()
  const recentSimulations = simulations.slice(0, 5)

  const quickStats = [
    {
      title: 'Total de Simulações',
      value: stats.total,
      change: '+12%',
      changeType: 'positive',
      icon: Calculator,
      color: 'bg-primary-500'
    },
    {
      title: 'Simulações Calculadas',
      value: stats.calculated,
      change: '+8%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-success-500'
    },
    {
      title: 'Rentabilidade Média',
      value: `${stats.averageProfitability.toFixed(1)}%`,
      change: '+2.5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-warning-500'
    },
    {
      title: 'Valor Total',
      value: `R$ ${stats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ]

  const recentActivities = [
    {
      type: 'simulation',
      title: 'Nova simulação criada',
      description: 'Produto: Componentes eletrônicos',
      time: '2 minutos atrás',
      icon: Calculator,
      color: 'text-primary-500'
    },
    {
      type: 'calculation',
      title: 'Simulação calculada',
      description: 'Rentabilidade: 28.5%',
      time: '15 minutos atrás',
      icon: CheckCircle,
      color: 'text-success-500'
    },
    {
      type: 'export',
      title: 'Relatório exportado',
      description: 'Formato: PDF',
      time: '1 hora atrás',
      icon: FileText,
      color: 'text-warning-500'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Dashboard - SmartImport 4.0</title>
        <meta name="description" content="Dashboard do SmartImport - Visão geral das simulações e análises" />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Bem-vindo ao SmartImport 4.0 - Simulador Estratégico de Importação
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="btn-outline flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Buscar</span>
            </button>
            <button className="btn-outline flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </button>
            <Link 
              to="/simulator"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Simulação</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      vs mês anterior
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Simulations */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Simulações Recentes
                  </h2>
                  <Link 
                    to="/history"
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Ver todas
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                {recentSimulations.length > 0 ? (
                  <div className="space-y-4">
                    {recentSimulations.map((simulation) => (
                      <div
                        key={simulation.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {simulation.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {simulation.productDescription || 'Sem descrição'}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(simulation.updatedAt).toLocaleDateString('pt-BR')}
                            </span>
                            <span className={`badge ${
                              simulation.status === 'calculated' ? 'badge-success' : 'badge-warning'
                            }`}>
                              {simulation.status === 'calculated' ? 'Calculada' : 'Rascunho'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {simulation.status === 'calculated' && (
                            <div className="text-sm">
                              <p className="text-gray-900 dark:text-white font-medium">
                                R$ {simulation.landedCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                              </p>
                              <p className="text-success-600 dark:text-success-400">
                                {simulation.profitability?.toFixed(1) || '0'}% rentabilidade
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Nenhuma simulação encontrada
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Comece criando sua primeira simulação de importação
                    </p>
                    <Link 
                      to="/simulator"
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Criar Simulação</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Atividades Recentes
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ações Rápidas
                </h2>
              </div>
              
              <div className="p-6 space-y-3">
                <Link 
                  to="/simulator"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors duration-200"
                >
                  <Calculator className="w-5 h-5" />
                  <span className="font-medium">Nova Simulação</span>
                </Link>
                
                <Link 
                  to="/reports"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Gerar Relatório</span>
                </Link>
                
                <Link 
                  to="/help"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Documentação</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard 