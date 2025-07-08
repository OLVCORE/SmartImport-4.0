import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home,
  Calculator,
  History,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  FileText,
  Globe,
  Truck,
  DollarSign,
  Shield,
  TrendingUp
} from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      description: 'Visão geral do sistema'
    },
    {
      name: 'Simulador',
      href: '/simulator',
      icon: Calculator,
      description: 'Simular operações de importação'
    },
    {
      name: 'Histórico',
      href: '/history',
      icon: History,
      description: 'Histórico de simulações'
    },
    {
      name: 'Relatórios',
      href: '/reports',
      icon: BarChart3,
      description: 'Relatórios e análises'
    }
  ]

  const tools = [
    {
      name: 'Classificação NCM',
      href: '/ncm-classifier',
      icon: FileText,
      description: 'Classificar produtos por NCM'
    },
    {
      name: 'Cálculo Tributário',
      href: '/tax-calculator',
      icon: DollarSign,
      description: 'Calcular impostos de importação'
    },
    {
      name: 'Análise Logística',
      href: '/logistics',
      icon: Truck,
      description: 'Análise de custos logísticos'
    },
    {
      name: 'Câmbio e Moedas',
      href: '/exchange',
      icon: Globe,
      description: 'Cotações e conversões'
    }
  ]

  const quickActions = [
    {
      name: 'Nova Simulação',
      href: '/simulator',
      icon: TrendingUp,
      color: 'bg-success-500'
    },
    {
      name: 'Upload PDF',
      href: '/upload',
      icon: FileText,
      color: 'bg-primary-500'
    },
    {
      name: 'Análise Rápida',
      href: '/quick-analysis',
      icon: Shield,
      color: 'bg-warning-500'
    }
  ]

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4">
          {/* Main Navigation */}
          <div className="mb-8">
            <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 ${isCollapsed ? 'sr-only' : ''}`}>
              Navegação
            </h3>
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group ${
                      location.pathname === item.href
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    title={isCollapsed ? item.description : ''}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <span>{item.name}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Section */}
          {!isCollapsed && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Ferramentas
              </h3>
              <ul className="space-y-1">
                {tools.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span>{item.name}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 ${isCollapsed ? 'sr-only' : ''}`}>
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:scale-105 ${action.color}`}
                  title={isCollapsed ? action.name : ''}
                >
                  <action.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{action.name}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">SI</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                SmartImport 4.0
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                EXCELTTA
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar 