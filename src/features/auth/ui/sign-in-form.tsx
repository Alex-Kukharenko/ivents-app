import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema, type SignInValues } from '@/shared/schema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export const SignInForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = async (data: SignInValues) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError('password', { message: 'Неверный email или пароль' })
      return
    }

    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
        <input
          type="email"
          className={`w-full rounded-lg border px-4 text-gray-900 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition
            ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Пароль</label>
        <input
          type="password"
          className={`w-full rounded-lg border px-4 text-gray-900 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition
            ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          {...register('password')}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  )
}
