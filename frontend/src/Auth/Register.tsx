import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'USER' })
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register', form)
      toast.success('🎉 Account created! Please login')
      navigate('/login')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">

      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
          SweetShop 🍭
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-3 sm:mt-4">
          Create your sweet account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <input
          type="text"
          placeholder="Username"
          required
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-pink-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 text-base sm:text-lg"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-pink-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 text-base sm:text-lg"
        />

        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 text-base sm:text-lg bg-white"
        >
          <option value="USER">Customer 😋</option>
          <option value="ADMIN">Admin 👑 (Demo)</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold py-3 sm:py-4 md:py-5 rounded-xl hover:scale-105 transition shadow-lg text-base sm:text-lg md:text-xl"
        >
          Create Account ✨
        </button>
      </form>

      {/* Footer */}
      <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base text-gray-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-purple-600 font-bold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
)

}