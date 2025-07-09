import React from 'react'
import { Link } from 'react-router-dom'

// Categorias e integrações nacionais
const nationalCategories = [
  {
    name: 'Compliance e Documentação',
    items: [
      {
        key: 'netrin',
        name: 'Netrin API',
        description: 'Validação RNTRC, veículos, OCR CNH/CRLV, compliance de frota.',
        icon: 'https://netrin.com.br/favicon.ico',
        links: { web: 'https://netrin.com.br/', docs: '', api: '' }
      },
      {
        key: 'brasilid',
        name: 'Brasil-ID',
        description: 'Rastreamento nacional por RFID, autenticação e compliance fiscal.',
        icon: 'https://brasilid.com.br/favicon.ico',
        links: { web: 'https://brasilid.com.br/', docs: '', api: '' }
      },
    ]
  },
  {
    name: 'Despacho Aduaneiro',
    items: [
      {
        key: 'pucomex',
        name: 'PUCOMEX',
        description: 'DU-E, Recintos, Intervenientes, integração com Portal Único.',
        icon: 'https://portalunico.siscomex.gov.br/favicon.ico',
        links: { web: 'https://portalunico.siscomex.gov.br/', docs: '', api: '' }
      },
      {
        key: 'siscomexdi',
        name: 'Siscomex DI',
        description: 'Consulta de declarações de importação e status de despacho.',
        icon: 'https://www.gov.br/receitafederal/favicon.ico',
        links: { web: 'https://www.gov.br/receitafederal/', docs: '', api: '' }
      },
    ]
  },
  {
    name: 'Logística Nacional',
    items: [
      {
        key: 'qualp',
        name: 'QualP',
        description: 'Cotação e rastreamento de fretes rodoviários nacionais.',
        icon: 'https://qualp.com.br/favicon.ico',
        links: { web: 'https://qualp.com.br/', docs: 'https://api.qualp.com.br/docs', api: 'https://api.qualp.com.br/' }
      },
      {
        key: 'intelipost',
        name: 'Intelipost',
        description: 'Cotação, rastreamento e gestão de fretes para e-commerce.',
        icon: 'https://www.intelipost.com.br/wp-content/uploads/2021/07/cropped-favicon-32x32.png',
        links: { web: 'https://www.intelipost.com.br/', docs: 'https://api.intelipost.com.br/docs', api: 'https://api.intelipost.com.br/' }
      },
      {
        key: 'frete-rapido',
        name: 'Frete Rápido',
        description: 'Cotação, contratação e rastreamento de fretes.',
        icon: 'https://freterapido.com/favicon.ico',
        links: { web: 'https://freterapido.com/', docs: 'https://api.freterapido.com/docs', api: 'https://api.freterapido.com/' }
      },
      {
        key: 'correios',
        name: 'Correios',
        description: 'Cotação, rastreamento e etiquetas para encomendas nacionais.',
        icon: 'https://www.correios.com.br/favicon.ico',
        links: { web: 'https://www.correios.com.br/', docs: 'https://www.correios.com.br/para-voce/correios-de-a-a-z/integracao-de-sistemas', api: 'https://api.correios.com.br/' }
      },
    ]
  },
  {
    name: 'Dados Estatísticos',
    items: [
      {
        key: 'comexstat',
        name: 'ComexStat',
        description: 'Estatísticas de importação/exportação do Brasil.',
        icon: 'https://comexstat.mdic.gov.br/favicon.ico',
        links: { web: 'https://comexstat.mdic.gov.br/', docs: '', api: '' }
      },
    ]
  },
  {
    name: 'Câmbio',
    items: [
      {
        key: 'bcb',
        name: 'Banco Central',
        description: 'Cotação oficial de moedas (API BC).',
        icon: 'https://www.bcb.gov.br/favicon.ico',
        links: { web: 'https://www.bcb.gov.br/', docs: '', api: '' }
      },
    ]
  },
]

// Categorias e integrações internacionais (SeaRates + globais)
const internationalCategories = [
  {
    name: 'SeaRates (Ecossistema Completo)',
    items: [
      // Adicione 100% das ferramentas da SeaRates, traduzidas
      {
        key: 'logistics-explorer',
        name: 'Calculadora Logística',
        description: 'Calculadora de frete para todos os modais. Compare tarifas globais.',
        icon: 'https://www.searates.com/design/images/apps/tools/logistics-explorer.png',
        links: { web: 'https://www.searates.com/tools/logistics-explorer', docs: 'https://www.searates.com/developers/api/logistics-explorer', api: 'https://www.searates.com/developers/api/logistics-explorer' }
      },
      {
        key: 'tracking-system',
        name: 'Sistema de Rastreamento',
        description: 'Rastreamento em tempo real, eventos logísticos e detalhes de rota.',
        icon: 'https://www.searates.com/design/images/apps/tools/tracking-system.png',
        links: { web: 'https://www.searates.com/tools/tracking', docs: 'https://www.searates.com/developers/api/tracking', api: 'https://www.searates.com/developers/api/tracking' }
      },
      {
        key: 'air-tracking',
        name: 'Rastreamento Aéreo',
        description: 'Rastreamento de cargas aéreas por Air Waybill, 24/7.',
        icon: 'https://www.searates.com/design/images/apps/tools/air-tracking.png',
        links: { web: 'https://www.searates.com/tools/air-tracking', docs: 'https://www.searates.com/developers/api/air-tracking', api: 'https://www.searates.com/developers/api/air-tracking' }
      },
      {
        key: 'rail-tracking',
        name: 'Rastreamento Ferroviário',
        description: 'Monitoramento 24/7 de embarques ferroviários.',
        icon: 'https://www.searates.com/design/images/apps/tools/rail-tracking.png',
        links: { web: 'https://www.searates.com/tools/rail-tracking', docs: 'https://www.searates.com/developers/api/rail-tracking', api: 'https://www.searates.com/developers/api/rail-tracking' }
      },
      {
        key: 'road-tracking',
        name: 'Rastreamento Rodoviário',
        description: 'Atualizações ao vivo e monitoramento de rotas rodoviárias.',
        icon: 'https://www.searates.com/design/images/apps/tools/road-tracking.png',
        links: { web: 'https://www.searates.com/tools/road-tracking', docs: 'https://www.searates.com/developers/api/road-tracking', api: 'https://www.searates.com/developers/api/road-tracking' }
      },
      {
        key: 'parcel-tracking',
        name: 'Rastreamento de Encomendas',
        description: 'Rastreamento global de encomendas em tempo real.',
        icon: 'https://www.searates.com/design/images/apps/tools/parcel-tracking.png',
        links: { web: 'https://www.searates.com/tools/parcel-tracking', docs: 'https://www.searates.com/developers/api/parcel-tracking', api: 'https://www.searates.com/developers/api/parcel-tracking' }
      },
      {
        key: 'distance-time',
        name: 'Distância & Tempo',
        description: 'Otimização de rotas com estimativas instantâneas.',
        icon: 'https://www.searates.com/design/images/apps/tools/distance-time.png',
        links: { web: 'https://www.searates.com/tools/distance-time', docs: 'https://www.searates.com/developers/api/distance-time', api: 'https://www.searates.com/developers/api/distance-time' }
      },
      {
        key: 'shipping-schedules',
        name: 'Agendamento de Embarques',
        description: 'Acesso a horários de navegação por pontos, navios ou portos.',
        icon: 'https://www.searates.com/design/images/apps/tools/shipping-schedules.png',
        links: { web: 'https://www.searates.com/tools/shipping-schedules', docs: 'https://www.searates.com/developers/api/shipping-schedules', api: 'https://www.searates.com/developers/api/shipping-schedules' }
      },
      {
        key: 'load-calculator',
        name: 'Calculadora de Carga',
        description: 'Visualização 3D para otimização de containers e caminhões.',
        icon: 'https://www.searates.com/design/images/apps/tools/load-calculator.png',
        links: { web: 'https://www.searates.com/tools/load-calculator', docs: 'https://www.searates.com/developers/api/load-calculator', api: 'https://www.searates.com/developers/api/load-calculator' }
      },
      // ...adicione todas as demais ferramentas da SeaRates aqui...
    ]
  },
  {
    name: 'Carrier & Parcel APIs',
    items: [
      {
        key: 'easypost',
        name: 'EasyPost',
        description: 'API para 100+ transportadoras, rastreamento, etiquetas e verificação de endereços.',
        icon: 'https://www.easypost.com/favicon.ico',
        links: { web: 'https://www.easypost.com/', docs: '', api: '' }
      },
      {
        key: 'shippo',
        name: 'Shippo',
        description: 'Multi-carrier, geração de etiquetas, taxas preferenciais e tracking.',
        icon: 'https://goshippo.com/favicon.ico',
        links: { web: 'https://goshippo.com/', docs: '', api: '' }
      },
    ]
  },
  {
    name: 'Cotação Multimodal',
    items: [
      {
        key: 'freightify',
        name: 'Freightify',
        description: 'Cotações em tempo real para ocean freight, bookings e schedules.',
        icon: 'https://www.freightify.com/favicon.ico',
        links: { web: 'https://www.freightify.com/', docs: '', api: '' }
      },
      {
        key: 'freightcenter',
        name: 'FreightCenter',
        description: 'Cotação de cargas fracionadas (LTL/FTL), EDI/API e bookings.',
        icon: 'https://www.freightcenter.com/favicon.ico',
        links: { web: 'https://www.freightcenter.com/', docs: '', api: '' }
      },
    ]
  },
  {
    name: 'Rastreamento Global',
    items: [
      {
        key: 'vizion',
        name: 'VIZION API',
        description: 'Tracking marítimo global, contêineres e terminais.',
        icon: 'https://vizionapi.com/favicon.ico',
        links: { web: 'https://vizionapi.com/', docs: '', api: '' }
      },
      {
        key: 'keeptruckin',
        name: 'KeepTruckin',
        description: 'Monitoramento de frota e telemetria.',
        icon: '',
        links: { web: 'https://keeptruckin.com/', docs: '', api: '' }
      },
    ]
  },
  {
    name: 'Geolocalização & Rotas',
    items: [
      {
        key: 'googlemaps',
        name: 'Google Maps API',
        description: 'Geocoding, roteirização, matriz de distância.',
        icon: 'https://maps.google.com/favicon.ico',
        links: { web: 'https://maps.google.com/', docs: '', api: '' }
      },
      {
        key: 'targomo',
        name: 'Targomo',
        description: 'Otimização de rotas e previsão de entregas.',
        icon: '',
        links: { web: 'https://www.targomo.com/', docs: '', api: '' }
      },
    ]
  },
  {
    name: 'Compliance Internacional',
    items: [
      {
        key: 'descartes',
        name: 'Descartes',
        description: 'Compliance, EDI, manifestos e automação de impostos.',
        icon: 'https://www.cleo.com/favicon.ico',
        links: { web: 'https://www.cleo.com/', docs: '', api: '' }
      },
      {
        key: 'cleo',
        name: 'Cleo',
        description: 'Compliance, integração e automação internacional.',
        icon: 'https://www.cleo.com/favicon.ico',
        links: { web: 'https://www.cleo.com/', docs: '', api: '' }
      },
    ]
  },
]

function IntegrationCard({ item }) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-lg shadow p-3 flex flex-col items-center hover:scale-105 transition w-full max-w-xs mx-auto">
      <img
        src={item.icon}
        alt={item.name}
        className="w-10 h-10 mb-2 object-contain"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
      />
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 text-center">
        {item.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center text-xs mb-2">
        {item.description}
      </p>
      <div className="flex gap-2 mt-auto flex-wrap justify-center">
        {item.links.web && (
          <a href={item.links.web} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 font-medium hover:underline text-xs">
            Web
          </a>
        )}
        {item.links.docs && (
          <a href={item.links.docs} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-xs">
            Docs
          </a>
        )}
        {item.links.api && (
          <a href={item.links.api} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 font-medium hover:underline text-xs">
            API
          </a>
        )}
      </div>
    </div>
  )
}

export default function Integrations() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-2 md:px-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary-700 dark:text-primary-300">
        Cockpit de Integrações
      </h1>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Coluna Nacional */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 text-primary-700 dark:text-primary-300 text-center md:text-left">
            Integrações Nacionais
          </h2>
          {nationalCategories.map(cat => (
            <div key={cat.name} className="mb-6">
              <h3 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {cat.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cat.items.map(item => (
                  <IntegrationCard key={item.key} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Coluna Internacional */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 text-primary-700 dark:text-primary-300 text-center md:text-left">
            Integrações Internacionais
          </h2>
          {internationalCategories.map(cat => (
            <div key={cat.name} className="mb-6">
              <h3 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {cat.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cat.items.map(item => (
                  <IntegrationCard key={item.key} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-400">
        Parceria estratégica com <a href="https://www.searates.com/" className="underline text-primary-600" target="_blank" rel="noopener noreferrer">SeaRates</a> e integrações nacionais para soluções logísticas completas.
      </div>
    </div>
  )
} 