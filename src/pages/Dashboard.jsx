import React, { useState, useEffect } from 'react'
import { useSimulationStore } from '../store/simulationStore'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Ship, 
  Plane, 
  Truck,
  MapPin,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Users,
  Target,
  Award
} from 'lucide-react'

const Dashboard = () => {
  const { fetchSimulations, getCustomsRegimes, getCustomsLocations, getFiscalIncentives, getRequiredLicenses } = useSimulationStore()
  
  const [simulations, setSimulations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    calculated: 0,
    averageCost: 0,
    totalValue: 0,
    topRegimes: [],
    topLocations: [],
    topIncentives: [],
    requiredLicenses: [],
    transportModes: {},
    monthlyTrend: []
  })

  const customsRegimes = getCustomsRegimes()
  const customsLocations = getCustomsLocations()
  const fiscalIncentives = getFiscalIncentives()
  const requiredLicenses = getRequiredLicenses()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      const data = await fetchSimulations()
      setSimulations(data)
      calculateStats(data)
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      // Usar dados mock para demonstração
      const mockData = generateMockSimulations()
      setSimulations(mockData)
      calculateStats(mockData)
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockSimulations = () => {
    const mockSimulations = []
    const products = [
      'Smartphone iPhone 15', 'Notebook Dell XPS', 'Tablet Samsung Galaxy',
      'Smart TV LG OLED', 'Fone de Ouvido Sony', 'Câmera Canon EOS',
      'Drone DJI Mavic', 'Console PlayStation 5', 'Smartwatch Apple Watch',
      'Monitor Dell UltraSharp'
    ]
    const countries = ['China', 'Estados Unidos', 'Alemanha', 'Japão', 'Coreia do Sul']
    const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'CE', 'GO', 'MT']
    const regimes = ['01', '02', '03', '04', '05', '06']
    const modes = ['maritime', 'air', 'land']

    for (let i = 0; i < 25; i++) {
      const productValue = Math.random() * 5000 + 500
      const freightValue = Math.random() * 800 + 200
      const insuranceValue = productValue * 0.02
      const baseCalculo = productValue + freightValue + insuranceValue
      
      // Calcular impostos baseados no regime
      const regime = regimes[Math.floor(Math.random() * regimes.length)]
      const taxes = calculateTaxesByRegime(regime, baseCalculo)
      
      // Calcular despesas
      const expenses = Math.random() * 300 + 100
      
      // Calcular incentivos (30% chance)
      const hasIncentives = Math.random() > 0.7
      const incentives = hasIncentives ? baseCalculo * 0.05 : 0
      
      const totalCost = baseCalculo + taxes.total + expenses - incentives

      mockSimulations.push({
        id: `sim_${i + 1}`,
        productName: products[Math.floor(Math.random() * products.length)],
        ncmCode: `${Math.floor(Math.random() * 99) + 1}.${Math.floor(Math.random() * 99) + 1}.${Math.floor(Math.random() * 99) + 1}`,
        originCountry: countries[Math.floor(Math.random() * countries.length)],
        originState: states[Math.floor(Math.random() * states.length)],
        destinationState: states[Math.floor(Math.random() * states.length)],
        transportMode: modes[Math.floor(Math.random() * modes.length)],
        customsRegime: regime,
        customsLocation: `BR${states[Math.floor(Math.random() * states.length)]}`,
        productValue,
        freightValue,
        insuranceValue,
        weight: Math.random() * 10 + 1,
        containers: Math.floor(Math.random() * 3) + 1,
        storageDays: Math.floor(Math.random() * 10) + 3,
        calculatedTaxes: taxes,
        calculatedExpenses: { customs: { total: expenses }, extra: { total: 0 } },
        calculatedIncentives: { totalSavings: incentives },
        requiredLicenses: Math.random() > 0.8 ? [requiredLicenses[Math.floor(Math.random() * requiredLicenses.length)]] : [],
        totalCost,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: Math.random() > 0.3 ? 'calculated' : 'draft'
      })
    }

    return mockSimulations
  }

  const calculateTaxesByRegime = (regime, baseCalculo) => {
    const regimeData = customsRegimes.find(r => r.code === regime)
    if (!regimeData) return { total: 0, ii: 0, ipi: 0, pis: 0, cofins: 0, icms: 0, fcp: 0 }

    switch (regimeData.calculationMethod) {
      case 'standard':
        return {
          ii: baseCalculo * 0.16,
          ipi: baseCalculo * 0.08,
          pis: baseCalculo * 0.021,
          cofins: baseCalculo * 0.0965,
          icms: baseCalculo * 0.18,
          fcp: baseCalculo * 0.02,
          total: baseCalculo * 0.4775
        }
      case 'temporary':
      case 'drawback':
        return { total: 0, ii: 0, ipi: 0, pis: 0, cofins: 0, icms: 0, fcp: 0 }
      case 'reimport':
        return {
          ii: baseCalculo * 0.08,
          ipi: baseCalculo * 0.04,
          pis: baseCalculo * 0.021,
          cofins: baseCalculo * 0.0965,
          icms: baseCalculo * 0.18,
          fcp: baseCalculo * 0.02,
          total: baseCalculo * 0.3975
        }
      default:
        return { total: 0, ii: 0, ipi: 0, pis: 0, cofins: 0, icms: 0, fcp: 0 }
    }
  }

  const calculateStats = (data) => {
    const calculatedSimulations = data.filter(sim => sim.status === 'calculated')
    
    // Estatísticas básicas
    const total = data.length
    const calculated = calculatedSimulations.length
    const averageCost = calculated > 0 ? calculatedSimulations.reduce((acc, sim) => acc + sim.totalCost, 0) / calculated : 0
    const totalValue = calculatedSimulations.reduce((acc, sim) => acc + sim.totalCost, 0)

    // Top regimes aduaneiros
    const regimeCounts = {}
    calculatedSimulations.forEach(sim => {
      const regimeName = customsRegimes.find(r => r.code === sim.customsRegime)?.name || 'Desconhecido'
      regimeCounts[regimeName] = (regimeCounts[regimeName] || 0) + 1
    })
    const topRegimes = Object.entries(regimeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Top localizações
    const locationCounts = {}
    calculatedSimulations.forEach(sim => {
      const location = getCustomsLocation(sim.customsLocation)
      const locationName = location ? `${location.name} - ${location.city}/${location.state}` : 'Desconhecido'
      locationCounts[locationName] = (locationCounts[locationName] || 0) + 1
    })
    const topLocations = Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Top incentivos fiscais
    const incentiveCounts = {}
    calculatedSimulations.forEach(sim => {
      if (sim.calculatedIncentives?.totalSavings > 0) {
        sim.calculatedIncentives.details?.forEach(incentive => {
          incentiveCounts[incentive.name] = (incentiveCounts[incentive.name] || 0) + 1
        })
      }
    })
    const topIncentives = Object.entries(incentiveCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }))

    // Licenças obrigatórias
    const licenseCounts = {}
    calculatedSimulations.forEach(sim => {
      sim.requiredLicenses?.forEach(license => {
        licenseCounts[license.name] = (licenseCounts[license.name] || 0) + 1
      })
    })
    const requiredLicensesStats = Object.entries(licenseCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([name, count]) => ({ name, count }))

    // Modos de transporte
    const transportModes = {}
    calculatedSimulations.forEach(sim => {
      transportModes[sim.transportMode] = (transportModes[sim.transportMode] || 0) + 1
    })

    // Tendência mensal (últimos 6 meses)
    const monthlyTrend = []
    for (let i = 5; i >= 0; i--) {
      const month = new Date()
      month.setMonth(month.getMonth() - i)
      const monthKey = month.toISOString().slice(0, 7)
      
      const monthSimulations = calculatedSimulations.filter(sim => 
        sim.createdAt.startsWith(monthKey)
      )
      
      monthlyTrend.push({
        month: month.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
        count: monthSimulations.length,
        value: monthSimulations.reduce((acc, sim) => acc + sim.totalCost, 0)
      })
    }

    setStats({
      total,
      calculated,
      averageCost,
      totalValue,
      topRegimes,
      topLocations,
      topIncentives,
      requiredLicenses: requiredLicensesStats,
      transportModes,
      monthlyTrend
    })
  }

  const getCustomsLocation = (code) => {
    const allLocations = [
      ...customsLocations.maritime,
      ...customsLocations.air,
      ...customsLocations.land
    ]
    return allLocations.find(location => location.code === code)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getTransportModeIcon = (mode) => {
    switch (mode) {
      case 'maritime': return <Ship className="w-4 h-4" />
      case 'air': return <Plane className="w-4 h-4" />
      case 'land': return <Truck className="w-4 h-4" />
      default: return <Ship className="w-4 h-4" />
    }
  }

  const getTransportModeName = (mode) => {
    switch (mode) {
      case 'maritime': return 'Marítimo'
      case 'air': return 'Aéreo'
      case 'land': return 'Terrestre'
      default: return 'Marítimo'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard de Importação
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Visão geral das simulações e estatísticas de importação
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total de Simulações</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 dark:text-green-400">{stats.calculated} calculadas</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalValue)}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 dark:text-green-400">+12.5% este mês</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Custo Médio</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.averageCost)}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Package className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Activity className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-orange-600 dark:text-orange-400">Por simulação</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Licenças Pendentes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.requiredLicenses.reduce((acc, license) => acc + license.count, 0)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-yellow-600 dark:text-yellow-400">Aguardando aprovação</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Tendência Mensal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tendência Mensal
            </h3>
            <div className="space-y-4">
              {stats.monthlyTrend.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.month}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.count} simulações
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modos de Transporte */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Modos de Transporte
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.transportModes).map(([mode, count]) => (
                <div key={mode} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getTransportModeIcon(mode)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {getTransportModeName(mode)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {count} ({((count / stats.calculated) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Regimes Aduaneiros */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Regimes Aduaneiros
            </h3>
            <div className="space-y-3">
              {stats.topRegimes.map((regime, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {regime.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {regime.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Localizações */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Localizações
            </h3>
            <div className="space-y-3">
              {stats.topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {location.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {location.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Incentivos Fiscais */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Incentivos Fiscais
            </h3>
            <div className="space-y-3">
              {stats.topIncentives.length > 0 ? (
                stats.topIncentives.map((incentive, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {incentive.name}
                    </span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {incentive.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nenhum incentivo aplicado
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Licenças Obrigatórias */}
        {stats.requiredLicenses.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Licenças Obrigatórias
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.requiredLicenses.map((license, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                    {license.name}
                  </span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">
                    {license.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard 