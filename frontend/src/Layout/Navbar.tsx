import { Link } from 'react-router-dom'

interface Props {
  username: string
  isAdmin: boolean
  onLogout: () => void
}

export default function Navbar({ username, isAdmin, onLogout }: Props) {
  return (
    <header className="bg-gradient-to-r from-pink-600 to-purple-700 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-3xl">🍭</span>
          <h1 className="text-2xl sm:text-3xl font-bold">SweetShop</h1>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <span className="text-sm sm:text-lg font-medium">
            Hi, {username} {isAdmin ? '👑' : '😋'}
          </span>

          <button
            onClick={onLogout}
            className="bg-white text-purple-700 px-5 py-2 sm:px-8 sm:py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
