import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

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

export const useSimulationStore = create(
  persist(
    (set, get) => ({
      // Estado principal
      simulations: [],
      currentSimulation: null,
      isLoading: false,
      error: null,
      
      // Inicializar store
      initializeStore: () => {
        const { simulations } = get()
        if (simulations.length === 0) {
          set({
            simulations: [initialSimulationData],
            currentSimulation: initialSimulationData
          })
        }
      },
      
      // Criar nova simulação
      createSimulation: (data = {}) => {
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
        
        return newSimulation
      },
      
      // Atualizar simulação atual
      updateCurrentSimulation: (updates) => {
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
      },
      
      // Selecionar simulação
      selectSimulation: (id) => {
        const simulation = get().simulations.find(sim => sim.id === id)
        if (simulation) {
          set({ currentSimulation: simulation })
        }
      },
      
      // Deletar simulação
      deleteSimulation: (id) => {
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
      calculateSimulation: () => {
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
        
        get().updateCurrentSimulation(updates)
      },
      
      // Exportar simulação
      exportSimulation: (id, format = 'pdf') => {
        const simulation = get().simulations.find(sim => sim.id === id)
        if (!simulation) return null
        
        // Mock de exportação - implementar com jsPDF
        const exportData = {
          ...simulation,
          exportFormat: format,
          exportDate: new Date().toISOString()
        }
        
        return exportData
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
      
      // Estatísticas
      getStatistics: () => {
        const { simulations } = get()
        const calculatedSimulations = simulations.filter(sim => sim.status === 'calculated')
        
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
    }),
    {
      name: 'smartimport-simulations',
      partialize: (state) => ({
        simulations: state.simulations,
        currentSimulation: state.currentSimulation
      })
    }
  )
) 