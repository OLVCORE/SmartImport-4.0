import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto w-16 h-16 bg-danger-100 dark:bg-danger-900/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-danger-600 dark:text-danger-400" />
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ops! Algo deu errado
          </h1>

          {/* Error Message */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detalhes do erro (Desenvolvimento)
              </summary>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-32">
                <pre>{error.message}</pre>
                {error.stack && (
                  <pre className="mt-2 text-gray-600 dark:text-gray-400">
                    {error.stack}
                  </pre>
                )}
              </div>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={resetErrorBoundary}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tentar Novamente</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Ir para o Início</span>
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Se o problema persistir, entre em contato conosco:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                📧 suporte@exceltta.com
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📞 (11) 99999-9999
              </p>
            </div>
          </div>

          {/* Error ID */}
          <div className="mt-4 text-xs text-gray-400">
            ID do Erro: {error?.name || 'UNKNOWN'}-{Date.now()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback 