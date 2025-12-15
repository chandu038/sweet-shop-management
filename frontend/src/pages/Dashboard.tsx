import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Dashboard({ user, setUser }: any) {
  const navigate = useNavigate()
  const [sweets, setSweets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSweets()
  }, [])

  const fetchSweets = async () => {
    try {
      const response = await axios.get('/api/sweets')
      setSweets(response.data)
    } catch (error: any) {
      console.error('Error fetching sweets:', error)
      toast.error('Failed to load sweets')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const handlePurchase = async (id: number) => {
    try {
      await axios.post(`/api/sweets/${id}/purchase`, { quantity: 1 })
      toast.success('🎉 Purchase successful!')
      fetchSweets() // Refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Purchase failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            🍭 Sweet Shop
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, <strong>{user.username}</strong>!</span>
            {user.role === 'ADMIN' && (
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
              >
                👑 Admin Panel
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Available Sweets</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl">Loading sweets... 🍬</div>
          </div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🍭</div>
            <div className="text-xl text-gray-600">No sweets available yet!</div>
            {user.role === 'ADMIN' && (
              <button
                onClick={() => navigate('/admin')}
                className="mt-4 px-6 py-3 bg-purple-700 text-white rounded-lg"
              >
                Add Some Sweets
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <div key={sweet.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-4xl mb-3 text-center">🍬</div>
                <h3 className="text-xl font-bold mb-2">{sweet.name}</h3>
                <p className="text-gray-600 mb-2">{sweet.description}</p>
                <p className="text-sm text-purple-600 mb-2">Category: {sweet.category}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-pink-600">₹{sweet.price}</span>
                  <span className={`text-sm ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Stock: {sweet.quantity}
                  </span>
                </div>
                <button
                  onClick={() => handlePurchase(sweet.id)}
                  disabled={sweet.quantity === 0}
                  className={`w-full py-3 rounded-lg font-bold ${
                    sweet.quantity > 0
                      ? 'bg-gradient-to-r from-pink-600 to-purple-700 text-white hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition`}
                >
                  {sweet.quantity > 0 ? '🛒 Purchase' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}