import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import axios from 'axios'

// Tipos de dados para simulação
const initialSimulationData = {
  // Dados básicos do produto
  productDescription: '',
  ncmCode: '',
  ncmDescription: '',
  
  // Valores e moedas
  fobValue: 0,
  freightValue: 0,
  insuranceValue: 0,
  currency: 'USD',
  exchangeRate: 5.5,
  
  // Estados e modais
  originState: 'SP',
  destinationState: 'SP',
  transportMode: 'maritime',
  incoterm: 'CIF',
  
  // Custos logísticos
  afrmmValue: 0,
  thcValue: 0,
  storageValue: 0,
  handlingValue: 0,
  
  // Tributos
  iiRate: 0,
  ipiRate: 0,
  icmsRate: 0,
  pisRate: 0,
  cofinsRate: 0,
  
  // Resultados calculados
  totalTaxes: 0,
  totalCosts: 0,
  landedCost: 0,
  cmv: 0,
  markup: 0,
  profitability: 0,
  
  // Metadados
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  id: nanoid(),
  name: 'Nova Simulação',
  status: 'draft'
}

// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.smartimport.com.br/v1'
const API_TIMEOUT = 10000

// Cliente axios configurado
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para logs de auditoria
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data)
    return config
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`, response.data)
    return response
  },
  (error) => {
    console.error('[API Response Error]', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

export const useSimulationStore = create(
  persist(
    (set, get) => ({
      // Estado principal
      simulations: [],
      currentSimulation: null,
      isLoading: false,
      error: null,
      lastSync: null,
      
      // Inicializar store
      initializeStore: async () => {
        const { simulations } = get()
        if (simulations.length === 0) {
          set({
            simulations: [initialSimulationData],
            currentSimulation: initialSimulationData
          })
        }
        
        // Sincronizar com backend se disponível
        try {
          await get().syncWithBackend()
        } catch (error) {
          console.warn('Backend não disponível, usando dados locais:', error.message)
        }
      },
      
      // Sincronizar com backend
      syncWithBackend: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await apiClient.get('/simulations')
          const backendSimulations = response.data.simulations || []
          
          set(state => ({
            simulations: backendSimulations.length > 0 ? backendSimulations : state.simulations,
            lastSync: new Date().toISOString(),
            isLoading: false
          }))
          
          return backendSimulations
        } catch (error) {
          set({ 
            error: 'Erro ao sincronizar com backend', 
            isLoading: false 
          })
          throw error
        }
      },
      
      // Buscar simulações do backend
      fetchSimulations: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await apiClient.get('/simulations')
          const simulations = response.data.simulations || []
          
          set({ 
            simulations,
            isLoading: false,
            lastSync: new Date().toISOString()
          })
          
          return simulations
        } catch (error) {
          set({ 
            error: 'Erro ao buscar simulações', 
            isLoading: false 
          })
          throw error
        }
      },
      
      // Salvar simulação no backend
      saveSimulationToBackend: async (simulation) => {
        try {
          if (simulation.id && simulation.id !== initialSimulationData.id) {
            // Atualizar simulação existente
            const response = await apiClient.put(`/simulations/${simulation.id}`, simulation)
            return response.data
          } else {
            // Criar nova simulação
            const { id, ...simulationData } = simulation
            const response = await apiClient.post('/simulations', simulationData)
            return response.data
          }
        } catch (error) {
          console.error('Erro ao salvar simulação no backend:', error)
          throw error
        }
      },
      
      // Criar nova simulação
      createSimulation: async (data = {}) => {
        const newSimulation = {
          ...initialSimulationData,
          ...data,
          id: nanoid(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          name: data.name || `Simulação ${get().simulations.length + 1}`
        }
        
        set(state => ({
          simulations: [newSimulation, ...state.simulations],
          currentSimulation: newSimulation
        }))
        
        // Tentar salvar no backend
        try {
          const savedSimulation = await get().saveSimulationToBackend(newSimulation)
          set(state => ({
            simulations: state.simulations.map(sim => 
              sim.id === newSimulation.id ? savedSimulation : sim
            ),
            currentSimulation: savedSimulation
          }))
        } catch (error) {
          console.warn('Simulação salva apenas localmente:', error.message)
        }
        
        return newSimulation
      },
      
      // Atualizar simulação atual
      updateCurrentSimulation: async (updates) => {
        set(state => {
          const updatedSimulation = {
            ...state.currentSimulation,
            ...updates,
            updatedAt: new Date().toISOString()
          }
          
          const updatedSimulations = state.simulations.map(sim =>
            sim.id === updatedSimulation.id ? updatedSimulation : sim
          )
          
          return {
            currentSimulation: updatedSimulation,
            simulations: updatedSimulations
          }
        })
        
        // Tentar salvar no backend
        try {
          const savedSimulation = await get().saveSimulationToBackend(get().currentSimulation)
          set(state => ({
            currentSimulation: savedSimulation,
            simulations: state.simulations.map(sim =>
              sim.id === savedSimulation.id ? savedSimulation : sim
            )
          }))
        } catch (error) {
          console.warn('Atualização salva apenas localmente:', error.message)
        }
      },
      
      // Selecionar simulação
      selectSimulation: (id) => {
        const simulation = get().simulations.find(sim => sim.id === id)
        if (simulation) {
          set({ currentSimulation: simulation })
        }
      },
      
      // Deletar simulação
      deleteSimulation: async (id) => {
        set(state => {
          const filteredSimulations = state.simulations.filter(sim => sim.id !== id)
          const newCurrentSimulation = state.currentSimulation?.id === id 
            ? (filteredSimulations[0] || null)
            : state.currentSimulation
            
          return {
            simulations: filteredSimulations,
            currentSimulation: newCurrentSimulation
          }
        })
        
        // Tentar deletar no backend
        try {
          await apiClient.delete(`/simulations/${id}`)
        } catch (error) {
          console.warn('Simulação deletada apenas localmente:', error.message)
        }
      },
      
      // Duplicar simulação
      duplicateSimulation: (id) => {
        const simulation = get().simulations.find(sim => sim.id === id)
        if (simulation) {
          const duplicated = {
            ...simulation,
            id: nanoid(),
            name: `${simulation.name} (Cópia)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'draft'
          }
          
          set(state => ({
            simulations: [duplicated, ...state.simulations],
            currentSimulation: duplicated
          }))
          
          return duplicated
        }
      },
      
      // Calcular simulação
      calculateSimulation: async () => {
        const { currentSimulation } = get()
        if (!currentSimulation) return
        
        const {
          fobValue,
          freightValue,
          insuranceValue,
          exchangeRate,
          afrmmValue,
          thcValue,
          storageValue,
          handlingValue,
          iiRate,
          ipiRate,
          icmsRate,
          pisRate,
          cofinsRate
        } = currentSimulation
        
        // Cálculos em Reais
        const fobBRL = fobValue * exchangeRate
        const freightBRL = freightValue * exchangeRate
        const insuranceBRL = insuranceValue * exchangeRate
        
        // Cálculo de impostos
        const iiValue = fobBRL * (iiRate / 100)
        const ipiValue = (fobBRL + iiValue) * (ipiRate / 100)
        const pisValue = (fobBRL + iiValue + ipiValue) * (pisRate / 100)
        const cofinsValue = (fobBRL + iiValue + ipiValue) * (cofinsRate / 100)
        
        // ICMS (simplificado)
        const icmsValue = (fobBRL + iiValue + ipiValue + pisValue + cofinsValue) * (icmsRate / 100)
        
        // Totais
        const totalTaxes = iiValue + ipiValue + pisValue + cofinsValue + icmsValue
        const totalLogistics = freightBRL + insuranceBRL + afrmmValue + thcValue + storageValue + handlingValue
        const totalCosts = totalTaxes + totalLogistics
        const landedCost = fobBRL + totalCosts
        
        // Análise de viabilidade
        const cmv = landedCost
        const markup = 30 // 30% markup padrão
        const sellingPrice = cmv * (1 + markup / 100)
        const profitability = ((sellingPrice - cmv) / sellingPrice) * 100
        
        const updates = {
          totalTaxes,
          totalCosts,
          landedCost,
          cmv,
          markup,
          profitability,
          status: 'calculated'
        }
        
        await get().updateCurrentSimulation(updates)
      },
      
      // Exportar simulação
      exportSimulation: async (id, format = 'pdf') => {
        const simulation = get().simulations.find(sim => sim.id === id)
        if (!simulation) return null
        
        try {
          const response = await apiClient.post(`/simulations/${id}/export`, { format })
          return response.data
        } catch (error) {
          console.warn('Exportação local:', error.message)
          // Fallback local
          return {
            ...simulation,
            exportFormat: format,
            exportDate: new Date().toISOString()
          }
        }
      },
      
      // Limpar histórico
      clearHistory: () => {
        set({
          simulations: [initialSimulationData],
          currentSimulation: initialSimulationData
        })
      },
      
      // Buscar simulações
      searchSimulations: (query) => {
        const { simulations } = get()
        if (!query) return simulations
        
        return simulations.filter(sim =>
          sim.name.toLowerCase().includes(query.toLowerCase()) ||
          sim.productDescription.toLowerCase().includes(query.toLowerCase()) ||
          sim.ncmCode.includes(query)
        )
      },
      
      // Filtrar simulações por status
      filterSimulationsByStatus: (status) => {
        const { simulations } = get()
        return simulations.filter(sim => sim.status === status)
      },
      
      // Estatísticas com dados do backend
      getStatistics: async () => {
        const { simulations } = get()
        const calculatedSimulations = simulations.filter(sim => sim.status === 'calculated')
        
        // Tentar buscar estatísticas do backend
        try {
          const response = await apiClient.get('/statistics')
          return response.data
        } catch (error) {
          console.warn('Usando estatísticas locais:', error.message)
          // Fallback local
          return {
            total: simulations.length,
            calculated: calculatedSimulations.length,
            drafts: simulations.filter(sim => sim.status === 'draft').length,
            averageProfitability: calculatedSimulations.length > 0
              ? calculatedSimulations.reduce((acc, sim) => acc + sim.profitability, 0) / calculatedSimulations.length
              : 0,
            totalValue: calculatedSimulations.reduce((acc, sim) => acc + sim.landedCost, 0)
          }
        }
      },
      
      // Limpar erro
      clearError: () => set({ error: null }),
      
      // Verificar conectividade
      checkConnectivity: async () => {
        try {
          await apiClient.get('/health')
          return true
        } catch (error) {
          return false
        }
      }
    }),
    {
      name: 'smartimport-simulations',
      partialize: (state) => ({
        simulations: state.simulations,
        currentSimulation: state.currentSimulation,
        lastSync: state.lastSync
      })
    }
  )
) 