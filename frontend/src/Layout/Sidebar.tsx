import { NavLink } from 'react-router-dom'

interface Props {
  isAdmin: boolean
}

export default function Sidebar({ isAdmin }: Props) {
  return (
    <aside className="hidden md:block w-64 bg-gradient-to-b from-purple-800 to-pink-800 text-white min-h-screen p-6">
      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-3 px-6 rounded-xl text-lg font-medium transition ${
              isActive ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`
          }
        >
          🏠 Dashboard
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `block py-3 px-6 rounded-xl text-lg font-medium transition ${
                isActive ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
              }`
            }
          >
            👑 Admin Panel
          </NavLink>
        )}
      </nav>
    </aside>
  )
}
