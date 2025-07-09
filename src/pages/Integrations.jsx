import React from 'react'
import { Link } from 'react-router-dom'
import { PlugZap } from 'lucide-react'

const integrations = [
  {
    key: 'logistics-explorer',
    name: 'Logistics Explorer',
    description: 'Freight Calculator for all transportation modes. Find and compare market rates for all global destinations.',
    icon: 'https://www.searates.com/design/images/apps/tools/logistics-explorer.png',
    links: {
      web: 'https://www.searates.com/tools/logistics-explorer',
      docs: 'https://www.searates.com/developers/api/logistics-explorer',
      api: 'https://www.searates.com/developers/api/logistics-explorer',
    }
  },
  {
    key: 'tracking-system',
    name: 'Tracking System',
    description: 'Real-time tracking, logistics event updates, route details, and much more for complete supply chain transparency.',
    icon: 'https://www.searates.com/design/images/apps/tools/tracking-system.png',
    links: {
      web: 'https://www.searates.com/tools/tracking',
      docs: 'https://www.searates.com/developers/api/tracking',
      api: 'https://www.searates.com/developers/api/tracking',
    }
  },
  {
    key: 'air-tracking',
    name: 'Air Tracking',
    description: 'Track and trace your air cargo by Air Waybill number. Real-time 24/7 monitoring.',
    icon: 'https://www.searates.com/design/images/apps/tools/air-tracking.png',
    links: {
      web: 'https://www.searates.com/tools/air-tracking',
      docs: 'https://www.searates.com/developers/api/air-tracking',
      api: 'https://www.searates.com/developers/api/air-tracking',
    }
  },
  {
    key: 'rail-tracking',
    name: 'Rail Tracking',
    description: 'Monitor your rail shipments 24/7 and obtain detailed tracking updates.',
    icon: 'https://www.searates.com/design/images/apps/tools/rail-tracking.png',
    links: {
      web: 'https://www.searates.com/tools/rail-tracking',
      docs: 'https://www.searates.com/developers/api/rail-tracking',
      api: 'https://www.searates.com/developers/api/rail-tracking',
    }
  },
  {
    key: 'road-tracking',
    name: 'Road Tracking',
    description: 'Live updates and route monitoring for road shipments.',
    icon: 'https://www.searates.com/design/images/apps/tools/road-tracking.png',
    links: {
      web: 'https://www.searates.com/tools/road-tracking',
      docs: 'https://www.searates.com/developers/api/road-tracking',
      api: 'https://www.searates.com/developers/api/road-tracking',
    }
  },
  {
    key: 'parcel-tracking',
    name: 'Parcel Tracking',
    description: 'Get real-time tracking data for your worldwide parcels.',
    icon: 'https://www.searates.com/design/images/apps/tools/parcel-tracking.png',
    links: {
      web: 'https://www.searates.com/tools/parcel-tracking',
      docs: 'https://www.searates.com/developers/api/parcel-tracking',
      api: 'https://www.searates.com/developers/api/parcel-tracking',
    }
  },
  {
    key: 'distance-time',
    name: 'Distance & Time',
    description: 'Route optimization with instant distance & transit time estimations.',
    icon: 'https://www.searates.com/design/images/apps/tools/distance-time.png',
    links: {
      web: 'https://www.searates.com/tools/distance-time',
      docs: 'https://www.searates.com/developers/api/distance-time',
      api: 'https://www.searates.com/developers/api/distance-time',
    }
  },
  {
    key: 'shipping-schedules',
    name: 'Shipping Schedules',
    description: 'Access to sailing schedules for searches by Points, Vessel, or Ports.',
    icon: 'https://www.searates.com/design/images/apps/tools/shipping-schedules.png',
    links: {
      web: 'https://www.searates.com/tools/shipping-schedules',
      docs: 'https://www.searates.com/developers/api/shipping-schedules',
      api: 'https://www.searates.com/developers/api/shipping-schedules',
    }
  },
  {
    key: 'load-calculator',
    name: 'Load Calculator',
    description: '3D visualization for optimizing container and truck stuffing.',
    icon: 'https://www.searates.com/design/images/apps/tools/load-calculator.png',
    links: {
      web: 'https://www.searates.com/tools/load-calculator',
      docs: 'https://www.searates.com/developers/api/load-calculator',
      api: 'https://www.searates.com/developers/api/load-calculator',
    }
  },
  // ...adicione os demais conforme necessário...
]

// Integrações nacionais
const nationalIntegrations = [
  {
    key: 'qualp',
    name: 'QualP',
    description: 'Cotação e rastreamento de fretes rodoviários nacionais com múltiplas transportadoras.',
    icon: 'https://qualp.com.br/favicon.ico',
    links: {
      web: 'https://qualp.com.br/',
      docs: 'https://api.qualp.com.br/docs',
      api: 'https://api.qualp.com.br/',
    }
  },
  {
    key: 'intelipost',
    name: 'Intelipost',
    description: 'Cotação, rastreamento e gestão de fretes para e-commerce e marketplaces.',
    icon: 'https://www.intelipost.com.br/wp-content/uploads/2021/07/cropped-favicon-32x32.png',
    links: {
      web: 'https://www.intelipost.com.br/',
      docs: 'https://api.intelipost.com.br/docs',
      api: 'https://api.intelipost.com.br/',
    }
  },
  {
    key: 'frete-rapido',
    name: 'Frete Rápido',
    description: 'Cotação, contratação e rastreamento de fretes com integração a ERPs e marketplaces.',
    icon: 'https://freterapido.com/favicon.ico',
    links: {
      web: 'https://freterapido.com/',
      docs: 'https://api.freterapido.com/docs',
      api: 'https://api.freterapido.com/',
    }
  },
  {
    key: 'correios',
    name: 'Correios',
    description: 'Cotação, rastreamento e geração de etiquetas para encomendas nacionais.',
    icon: 'https://www.correios.com.br/favicon.ico',
    links: {
      web: 'https://www.correios.com.br/',
      docs: 'https://www.correios.com.br/para-voce/correios-de-a-a-z/integracao-de-sistemas',
      api: 'https://api.correios.com.br/',
    }
  },
  // ...adicione outras transportadoras e APIs nacionais...
]

export default function Integrations() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary-700 dark:text-primary-300">
        Integrações Oficiais SeaRates
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {integrations.map((item) => (
          <div
            key={item.key}
            className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-16 h-16 mb-4"
              loading="lazy"
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
              {item.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
              {item.description}
            </p>
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {item.links.web && (
                <a href={item.links.web} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  Web
                </a>
              )}
              {item.links.docs && (
                <a href={item.links.docs} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  Docs
                </a>
              )}
              {item.links.api && (
                <a href={item.links.api} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 font-medium hover:underline">
                  API
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-primary-300 text-center">
          Integrações Nacionais
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {nationalIntegrations.map((item) => (
            <div
              key={item.key}
              className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-16 h-16 mb-4"
                loading="lazy"
              />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
                {item.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                {item.description}
              </p>
              <div className="flex gap-2 mt-4 flex-wrap justify-center">
                {item.links.web && (
                  <a href={item.links.web} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                    Web
                  </a>
                )}
                {item.links.docs && (
                  <a href={item.links.docs} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    Docs
                  </a>
                )}
                {item.links.api && (
                  <a href={item.links.api} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 font-medium hover:underline">
                    API
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center text-xs text-gray-400">
        Parceria estratégica com <a href="https://www.searates.com/" className="underline text-primary-600" target="_blank" rel="noopener noreferrer">SeaRates</a> para soluções logísticas globais.
      </div>
    </div>
  )
} 