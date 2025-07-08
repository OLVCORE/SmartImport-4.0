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
    <>
      <Helmet>
        <title>Simulador - SmartImport 4.0</title>
        <meta name="description" content="Simulador de operações de importação com IA e análise tributária" />
      </Helmet>

      <div className="p-6 space-y-6">
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Tab: Produto */}
                {activeTab === 'product' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Informações do Produto
                      </h3>
                      
                      {/* Upload de arquivo */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Upload de Documento (PDF)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Arraste um arquivo PDF ou clique para selecionar
                          </p>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="btn-outline cursor-pointer"
                          >
                            Selecionar Arquivo
                          </label>
                        </div>
                        {uploadedFile && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Arquivo: {uploadedFile.name}
                          </p>
                        )}
                      </div>

                      {/* Descrição do produto */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Descrição do Produto
                        </label>
                        <textarea
                          {...register('productDescription', { required: 'Descrição é obrigatória' })}
                          rows={4}
                          className="input-field"
                          placeholder="Descreva o produto ou cole o texto extraído do documento..."
                        />
                        {errors.productDescription && (
                          <p className="form-error">{errors.productDescription.message}</p>
                        )}
                      </div>

                      {/* Classificação NCM */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Código NCM
                          </label>
                          <input
                            {...register('ncmCode')}
                            type="text"
                            className="input-field"
                            placeholder="Ex: 8471.30.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Descrição NCM
                          </label>
                          <input
                            {...register('ncmDescription')}
                            type="text"
                            className="input-field"
                            placeholder="Descrição da classificação NCM"
                          />
                        </div>
                      </div>

                      {/* Botão de classificação IA */}
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => classifyNCM(watchedValues.productDescription)}
                          disabled={isProcessingOCR || !watchedValues.productDescription}
                          className="btn-secondary flex items-center space-x-2"
                        >
                          {isProcessingOCR ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <Brain className="w-4 h-4" />
                          )}
                          <span>
                            {isProcessingOCR ? 'Classificando...' : 'Classificar com IA'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Valores */}
                {activeTab === 'values' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Valores e Moedas
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Valor FOB
                        </label>
                        <input
                          {...register('fobValue', { 
                            required: 'Valor FOB é obrigatório',
                            min: { value: 0, message: 'Valor deve ser positivo' }
                          })}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="0.00"
                        />
                        {errors.fobValue && (
                          <p className="form-error">{errors.fobValue.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Moeda
                        </label>
                        <select
                          {...register('currency')}
                          className="input-field"
                        >
                          {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Taxa de Câmbio
                        </label>
                        <input
                          {...register('exchangeRate', { 
                            required: 'Taxa de câmbio é obrigatória',
                            min: { value: 0, message: 'Taxa deve ser positiva' }
                          })}
                          type="number"
                          step="0.0001"
                          className="input-field"
                          placeholder="5.5000"
                        />
                        {errors.exchangeRate && (
                          <p className="form-error">{errors.exchangeRate.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Frete
                        </label>
                        <input
                          {...register('freightValue')}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Seguro
                        </label>
                        <input
                          {...register('insuranceValue')}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Logística */}
                {activeTab === 'logistics' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Informações Logísticas
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Estado de Origem
                        </label>
                        <select
                          {...register('originState')}
                          className="input-field"
                        >
                          {brazilianStates.map(state => (
                            <option key={state.code} value={state.code}>
                              {state.code} - {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Estado de Destino
                        </label>
                        <select
                          {...register('destinationState')}
                          className="input-field"
                        >
                          {brazilianStates.map(state => (
                            <option key={state.code} value={state.code}>
                              {state.code} - {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Modal de Transporte
                        </label>
                        <select
                          {...register('transportMode')}
                          className="input-field"
                        >
                          {transportModes.map(mode => (
                            <option key={mode.code} value={mode.code}>
                              {mode.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Incoterm
                        </label>
                        <select
                          {...register('incoterm')}
                          className="input-field"
                        >
                          {incoterms.map(incoterm => (
                            <option key={incoterm.code} value={incoterm.code}>
                              {incoterm.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                        Custos Adicionais
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            AFRMM
                          </label>
                          <input
                            {...register('afrmmValue')}
                            type="number"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            THC
                          </label>
                          <input
                            {...register('thcValue')}
                            type="number"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Armazenagem
                          </label>
                          <input
                            {...register('storageValue')}
                            type="number"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Movimentação
                          </label>
                          <input
                            {...register('handlingValue')}
                            type="number"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Tributos */}
                {activeTab === 'taxes' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Alíquotas Tributárias
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          II (Imposto de Importação) %
                        </label>
                        <input
                          {...register('iiRate')}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          IPI (Imposto sobre Produtos Industrializados) %
                        </label>
                        <input
                          {...register('ipiRate')}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ICMS %
                        </label>
                        <input
                          {...register('icmsRate')}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="18.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          PIS %
                        </label>
                        <input
                          {...register('pisRate')}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="1.65"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          COFINS %
                        </label>
                        <input
                          {...register('cofinsRate')}
                          type="number"
                          step="0.01"
                          className="input-field"
                          placeholder="7.60"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            Informação sobre Tributos
                          </h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                            As alíquotas são calculadas automaticamente com base no código NCM. 
                            Você pode ajustar manualmente se necessário.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Resultados */}
                {activeTab === 'results' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Resultados da Simulação
                      </h3>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleExport('pdf')}
                          className="btn-outline flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>PDF</span>
                        </button>
                        <button
                          onClick={() => handleExport('excel')}
                          className="btn-outline flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Excel</span>
                        </button>
                      </div>
                    </div>

                    {currentSimulation?.status === 'calculated' ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Resumo Financeiro */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Resumo Financeiro
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400">Valor FOB:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                R$ {currentSimulation.fobValue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400">Total de Impostos:</span>
                              <span className="font-medium text-red-600 dark:text-red-400">
                                R$ {currentSimulation.totalTaxes?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400">Custos Logísticos:</span>
                              <span className="font-medium text-orange-600 dark:text-orange-400">
                                R$ {(currentSimulation.totalCosts - currentSimulation.totalTaxes)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Custo Total:
                                </span>
                                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                  R$ {currentSimulation.landedCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Análise de Viabilidade */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Análise de Viabilidade
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400">CMV:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                R$ {currentSimulation.cmv?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400">Markup Sugerido:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {currentSimulation.markup}%
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 dark:text-gray-400">Preço de Venda:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                R$ {(currentSimulation.cmv * (1 + currentSimulation.markup / 100))?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Rentabilidade:
                                </span>
                                <span className={`text-lg font-bold ${
                                  currentSimulation.profitability > 20 
                                    ? 'text-success-600 dark:text-success-400'
                                    : currentSimulation.profitability > 10
                                    ? 'text-warning-600 dark:text-warning-400'
                                    : 'text-danger-600 dark:text-danger-400'
                                }`}>
                                  {currentSimulation.profitability?.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Nenhum resultado disponível
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Execute o cálculo para ver os resultados da simulação
                        </p>
                        <button
                          onClick={handleCalculate}
                          className="btn-primary"
                        >
                          Calcular Simulação
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default Simulator 