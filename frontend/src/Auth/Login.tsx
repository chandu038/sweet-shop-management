import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

interface Props {
  setUser: (user: { username: string; role: string }) => void
}

export default function Login({ setUser }: Props) {
  const [form, setForm] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', form)
      const token = res.data.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Decode JWT to get username
      const payload = JSON.parse(atob(token.split('.')[1]))
      const username = payload.sub
      const role = payload.role || 'USER'  // fallback

      const userData = { username, role }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      toast.success('Welcome back! 🍭')
      navigate('/')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid username or password. Please check your credentials (or) register by clicking on create account if you haven\'t already registered.')
    }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">

      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
          SweetShop🍭
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-3 sm:mt-4">
          Login to your candy world
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

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold py-3 sm:py-4 md:py-5 rounded-xl hover:scale-105 transition shadow-lg text-base sm:text-lg md:text-xl"
        >
          Login🍬
        </button>
      </form>

      {/* Footer */}
      <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base text-gray-600">
        New here?{' '}
        <Link
          to="/register"
          className="text-purple-600 font-bold hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  </div>
)
}