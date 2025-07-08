import React from 'react'
import { Home, FileText, History, BarChart2, Menu, X, Settings, User, Bell, Shield, Palette, Globe, DollarSign, Sun, Moon, Monitor } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  { label: 'Simulador', icon: BarChart2, href: '/simulator' },
  { label: 'Histórico', icon: History, href: '/history' },
  { label: 'Relatórios', icon: FileText, href: '/reports' },
]

const tools = [
  { label: 'Classificação NCM', icon: FileText, href: '/ncm' },
  { label: 'Cálculo Tributário', icon: DollarSign, href: '/tax' },
  { label: 'Análise Logística', icon: BarChart2, href: '/logistics' },
  { label: 'Câmbio e Moedas', icon: Globe, href: '/exchange' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  // Fecha o drawer ao clicar fora
  const handleOverlayClick = () => setOpen(false)

  return (
    <>
      {/* Botão hambúrguer - só aparece no mobile */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay escurecido */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar fixa no desktop, drawer no mobile */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          sm:translate-x-0 sm:static sm:block
        `}
        style={{ minHeight: '100vh' }}
      >
        {/* Botão fechar no mobile */}
        <div className="flex items-center justify-between sm:hidden p-4">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Fechar menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">NAVEGAÇÃO</div>
          {menuItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
              onClick={() => setOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <nav className="mt-8 space-y-2 px-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">FERRAMENTAS</div>
          {tools.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
              onClick={() => setOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
} 