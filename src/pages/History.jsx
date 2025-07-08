import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Copy, 
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useSimulationStore } from '../store/simulationStore'

const History = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedSimulations, setSelectedSimulations] = useState([])

  const { 
    simulations, 
    searchSimulations, 
    filterSimulationsByStatus,
    deleteSimulation,
    duplicateSimulation,
    selectSimulation
  } = useSimulationStore()

  const filteredSimulations = searchQuery 
    ? searchSimulations(searchQuery)
    : statusFilter !== 'all'
    ? filterSimulationsByStatus(statusFilter)
    : simulations

  const handleSelectAll = () => {
    if (selectedSimulations.length === filteredSimulations.length) {
      setSelectedSimulations([])
    } else {
      setSelectedSimulations(filteredSimulations.map(sim => sim.id))
    }
  }

  const handleSelectSimulation = (id) => {
    setSelectedSimulations(prev => 
      prev.includes(id) 
        ? prev.filter(simId => simId !== id)
        : [...prev, id]
    )
  }

  const handleDeleteSelected = () => {
    selectedSimulations.forEach(id => deleteSimulation(id))
    setSelectedSimulations([])
  }

  const handleDuplicate = (id) => {
    duplicateSimulation(id)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'calculated':
        return <CheckCircle className="w-4 h-4 text-success-500" />
      case 'draft':
        return <Clock className="w-4 h-4 text-warning-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'calculated':
        return 'badge-success'
      case 'draft':
        return 'badge-warning'
      default:
        return 'badge-info'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'calculated':
        return 'Calculada'
      case 'draft':
        return 'Rascunho'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <>
      <Helmet>
        <title>Histórico - SmartImport 4.0</title>
        <meta name="description" content="Histórico de simulações de importação" />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Histórico de Simulações
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gerencie e visualize todas as suas simulações de importação
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Link 
              to="/simulator"
              className="btn-primary flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Nova Simulação</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar simulações..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">Todos os Status</option>
                <option value="calculated">Calculadas</option>
                <option value="draft">Rascunhos</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {selectedSimulations.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="btn-outline flex items-center space-x-2 text-danger-600 hover:text-danger-700"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir ({selectedSimulations.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Simulações ({filteredSimulations.length})
              </h2>
              
              {filteredSimulations.length > 0 && (
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <input
                      type="checkbox"
                      checked={selectedSimulations.length === filteredSimulations.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Selecionar Todos</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {filteredSimulations.length > 0 ? (
              <div className="space-y-4">
                {filteredSimulations.map((simulation) => (
                  <motion.div
                    key={simulation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {/* Selection Checkbox */}
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedSimulations.includes(simulation.id)}
                        onChange={() => handleSelectSimulation(simulation.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      
                      {/* Status Icon */}
                      {getStatusIcon(simulation.status)}
                    </div>

                    {/* Simulation Info */}
                    <div className="flex-1 ml-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {simulation.name}
                        </h3>
                        <span className={`badge ${getStatusBadge(simulation.status)}`}>
                          {getStatusText(simulation.status)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {simulation.productDescription || 'Sem descrição'}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(simulation.updatedAt).toLocaleDateString('pt-BR')}</span>
                        </span>
                        
                        {simulation.ncmCode && (
                          <span>NCM: {simulation.ncmCode}</span>
                        )}
                        
                        {simulation.currency && (
                          <span className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{simulation.currency}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Financial Summary */}
                    {simulation.status === 'calculated' && (
                      <div className="text-right mr-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          R$ {simulation.landedCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                        </p>
                        <p className="text-xs text-success-600 dark:text-success-400">
                          {simulation.profitability?.toFixed(1) || '0'}% rentabilidade
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/simulator?id=${simulation.id}`}
                        className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDuplicate(simulation.id)}
                        className="p-2 text-gray-400 hover:text-warning-600 dark:hover:text-warning-400 transition-colors duration-200"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteSimulation(simulation.id)}
                        className="p-2 text-gray-400 hover:text-danger-600 dark:hover:text-danger-400 transition-colors duration-200"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Nenhuma simulação encontrada
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando sua primeira simulação'
                  }
                </p>
                <Link 
                  to="/simulator"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Criar Simulação</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default History 