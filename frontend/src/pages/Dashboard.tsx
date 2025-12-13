import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Layout/Navbar'
import Sidebar from '../Layout/Sidebar'
import SweetGrid from '../sweets/SweetGrid'
import AddSweetForm from '../sweets/AddSweetForm'

interface Sweet {
  id: number
  name: string
  category: string
  price: number
  quantity: number
}

interface Props {
  user: { username: string; role: string }
  setUser: (user: null) => void
}

export default function Dashboard({ user, setUser }: Props) {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [search, setSearch] = useState('')
  const isAdmin = user.role === 'ADMIN'

  const fetchSweets = async () => {
    try {
      const res = await axios.get(search ? `/api/sweets/search?name=${search}` : '/api/sweets')
      setSweets(res.data)
    } catch {
      // error
    }
  }

  useEffect(() => { fetchSweets() }, [search])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex-1">
        <Navbar username={user.username} isAdmin={isAdmin} onLogout={logout} />
        <main className="p-10">
          <div className="max-w-3xl mx-auto mb-12">
            <input
              type="text"
              placeholder="🔍 Search sweets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-8 py-5 rounded-full text-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-400"
            />
          </div>

          {isAdmin && <AddSweetForm onSuccess={fetchSweets} />}

          <div className="mt-12">
            <SweetGrid sweets={sweets} isAdmin={isAdmin} onUpdate={fetchSweets} />
          </div>
        </main>
      </div>
    </div>
  )
}