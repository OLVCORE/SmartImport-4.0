import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  FileText, 
  Upload, 
  Brain, 
  DollarSign,
  Truck,
  MapPin,
  Globe,
  Save,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useSimulationStore } from '../store/simulationStore'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Simulator = () => {
  const [activeTab, setActiveTab] = useState('product')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [isProcessingOCR, setIsProcessingOCR] = useState(false)

  const { 
    currentSimulation, 
    updateCurrentSimulation, 
    calculateSimulation,
    createSimulation
  } = useSimulationStore()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: currentSimulation || {}
  })

  const watchedValues = watch()

  const tabs = [
    { id: 'product', name: 'Produto', icon: FileText },
    { id: 'values', name: 'Valores', icon: DollarSign },
    { id: 'logistics', name: 'Logística', icon: Truck },
    { id: 'taxes', name: 'Tributos', icon: Calculator },
    { id: 'results', name: 'Resultados', icon: CheckCircle }
  ]

  // Estados brasileiros
  const brazilianStates = [
    { code: 'AC', name: 'Acre' },
    { code: 'AL', name: 'Alagoas' },
    { code: 'AP', name: 'Amapá' },
    { code: 'AM', name: 'Amazonas' },
    { code: 'BA', name: 'Bahia' },
    { code: 'CE', name: 'Ceará' },
    { code: 'DF', name: 'Distrito Federal' },
    { code: 'ES', name: 'Espírito Santo' },
    { code: 'GO', name: 'Goiás' },
    { code: 'MA', name: 'Maranhão' },
    { code: 'MT', name: 'Mato Grosso' },
    { code: 'MS', name: 'Mato Grosso do Sul' },
    { code: 'MG', name: 'Minas Gerais' },
    { code: 'PA', name: 'Pará' },
    { code: 'PB', name: 'Paraíba' },
    { code: 'PR', name: 'Paraná' },
    { code: 'PE', name: 'Pernambuco' },
    { code: 'PI', name: 'Piauí' },
    { code: 'RJ', name: 'Rio de Janeiro' },
    { code: 'RN', name: 'Rio Grande do Norte' },
    { code: 'RS', name: 'Rio Grande do Sul' },
    { code: 'RO', name: 'Rondônia' },
    { code: 'RR', name: 'Roraima' },
    { code: 'SC', name: 'Santa Catarina' },
    { code: 'SP', name: 'São Paulo' },
    { code: 'SE', name: 'Sergipe' },
    { code: 'TO', name: 'Tocantins' }
  ]

  const currencies = [
    { code: 'USD', name: 'Dólar Americano', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'CNY', name: 'Yuan Chinês', symbol: '¥' }
  ]

  const transportModes = [
    { code: 'maritime', name: 'Marítimo' },
    { code: 'air', name: 'Aéreo' },
    { code: 'land', name: 'Terrestre' }
  ]

  const incoterms = [
    { code: 'EXW', name: 'EXW - Ex Works' },
    { code: 'FCA', name: 'FCA - Free Carrier' },
    { code: 'CPT', name: 'CPT - Carriage Paid To' },
    { code: 'CIP', name: 'CIP - Carriage and Insurance Paid To' },
    { code: 'DAP', name: 'DAP - Delivered at Place' },
    { code: 'DPU', name: 'DPU - Delivered at Place Unloaded' },
    { code: 'DDP', name: 'DDP - Delivered Duty Paid' },
    { code: 'FAS', name: 'FAS - Free Alongside Ship' },
    { code: 'FOB', name: 'FOB - Free On Board' },
    { code: 'CFR', name: 'CFR - Cost and Freight' },
    { code: 'CIF', name: 'CIF - Cost, Insurance and Freight' }
  ]

  // Mock de alíquotas por NCM (em produção viria de API)
  const mockTaxRates = {
    '8471.30.00': { ii: 0, ipi: 0, icms: 18, pis: 1.65, cofins: 7.6 },
    '8517.13.00': { ii: 0, ipi: 0, icms: 18, pis: 1.65, cofins: 7.6 },
    '8528.72.00': { ii: 0, ipi: 0, icms: 18, pis: 1.65, cofins: 7.6 }
  }

  // Simular classificação NCM com IA
  const classifyNCM = async (description) => {
    setIsProcessingOCR(true)
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock da resposta da IA
    const mockNCM = {
      code: '8471.30.00',
      description: 'Máquinas de processamento automático de dados, portáteis, de peso não superior a 10 kg, constituídas por pelo menos uma unidade central de processamento, um teclado e uma tela',
      confidence: 0.95
    }
    
    setValue('ncmCode', mockNCM.code)
    setValue('ncmDescription', mockNCM.description)
    
    // Aplicar alíquotas
    const rates = mockTaxRates[mockNCM.code]
    if (rates) {
      setValue('iiRate', rates.ii)
      setValue('ipiRate', rates.ipi)
      setValue('icmsRate', rates.icms)
      setValue('pisRate', rates.pis)
      setValue('cofinsRate', rates.cofins)
    }
    
    setIsProcessingOCR(false)
    toast.success('Classificação NCM realizada com sucesso!')
  }

  // Processar upload de arquivo
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Apenas arquivos PDF são aceitos')
      return
    }

    setUploadedFile(file)
    setIsProcessingOCR(true)

    try {
      // Simular processamento OCR
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockExtractedText = `
        PRODUTO: Smartphone Samsung Galaxy S23
        ESPECIFICAÇÕES:
        - Tela: 6.1" Dynamic AMOLED 2X
        - Processador: Snapdragon 8 Gen 2
        - RAM: 8GB
        - Armazenamento: 128GB
        - Câmera: 50MP + 12MP + 10MP
        - Bateria: 3900mAh
        - Sistema: Android 13
      `
      
      setExtractedText(mockExtractedText)
      setValue('productDescription', mockExtractedText)
      
      // Classificar automaticamente
      await classifyNCM(mockExtractedText)
      
      toast.success('Arquivo processado com sucesso!')
    } catch (error) {
      toast.error('Erro ao processar arquivo')
    } finally {
      setIsProcessingOCR(false)
    }
  }

  // Calcular simulação
  const handleCalculate = async () => {
    setIsCalculating(true)
    
    try {
      // Atualizar dados no store
      updateCurrentSimulation(watchedValues)
      
      // Calcular
      calculateSimulation()
      
      setShowResults(true)
      setActiveTab('results')
      
      toast.success('Simulação calculada com sucesso!')
    } catch (error) {
      toast.error('Erro ao calcular simulação')
    } finally {
      setIsCalculating(false)
    }
  }

  // Salvar simulação
  const handleSave = () => {
    updateCurrentSimulation({
      ...watchedValues,
      name: watchedValues.name || 'Nova Simulação'
    })
    toast.success('Simulação salva com sucesso!')
  }

  // Exportar resultados
  const handleExport = (format) => {
    toast.success(`Relatório exportado em ${format.toUpperCase()}`)
  }

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl min-h-[80vh] flex flex-col justify-center">
      <Helmet>
        <title>Simulador - SmartImport 4.0</title>
        <meta name="description" content="Simulador de operações de importação com IA e análise tributária" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Simulador de Importação
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Simule operações de importação com IA, OCR e análise tributária completa
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleSave}
            className="btn-outline flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar</span>
          </button>
          <button 
            onClick={handleCalculate}
            disabled={isCalculating}
            className="btn-primary flex items-center space-x-2"
          >
            {isCalculating ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Calculator className="w-4 h-4" />
            )}
            <span>{isCalculating ? 'Calculando...' : 'Calcular'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'product' && (
            <div className="space-y-6">
              {/* Conteúdo real da tab Produto */}
            </div>
          )}
          {activeTab === 'values' && (
            <div className="space-y-6">
              {/* Conteúdo real da tab Valores */}
            </div>
          )}
          {activeTab === 'logistics' && (
            <div className="space-y-6">
              {/* Conteúdo real da tab Logística */}
            </div>
          )}
          {activeTab === 'taxes' && (
            <div className="space-y-6">
              {/* Conteúdo real da tab Tributos */}
            </div>
          )}
          {activeTab === 'results' && (
            <div className="space-y-6">
              {/* Conteúdo real da tab Resultados */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Simulator 