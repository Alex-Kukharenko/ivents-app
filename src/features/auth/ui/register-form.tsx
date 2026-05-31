// src/features/auth/ui/register-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, type RegisterValues } from '@/shared/schema'
import { trpc } from '@/shared/api'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export const RegisterForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
  })

  const { mutate, isPending } = trpc.user.register.useMutation({
    onSuccess: async (_, variables) => {
      await signIn('credentials', {
        email: variables.email,
        password: variables.password,
        redirect: false,
      })
      router.push('/')
    },
    onError: (error) => {
      setError('email', { message: error.message })
    },
  })

  const onSubmit = (data: RegisterValues) => mutate(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Имя</label>
        <input
          type="text"
          className={`w-full rounded-lg border text-gray-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition
            ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          {...register('name')}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
        <input
          type="email"
          className={`w-full rounded-lg border text-gray-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition
            ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Пароль</label>
        <input
          type="password"
          className={`w-full rounded-lg border text-gray-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition
            ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          {...register('password')}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full h-10 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}
