// src/pages/auth/index.tsx
import { useState } from 'react'
import { SignInForm, RegisterForm } from '@/features/auth'

export default function AuthPage() {
  const [tab, setTab] = useState<'signin' | 'register'>('signin')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Events</h1>

        <div className="flex rounded-lg border border-gray-200 p-1 mb-6">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 h-9 text-sm font-medium rounded-md transition-colors
              ${tab === 'signin' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Войти
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 h-9 text-sm font-medium rounded-md transition-colors
              ${
                tab === 'register' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
          >
            Регистрация
          </button>
        </div>

        {tab === 'signin' ? <SignInForm /> : <RegisterForm />}
      </div>
    </div>
  )
}
