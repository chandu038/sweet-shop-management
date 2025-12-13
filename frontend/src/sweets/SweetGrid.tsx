import axios from 'axios'
import toast from 'react-hot-toast'

export interface Sweet {
  id: number
  name: string
  category: string
  price: number
  quantity: number
}

interface Props {
  sweets: Sweet[]
  isAdmin: boolean
  onUpdate: () => void
}

const candyImages = [
  'https://images.unsplash.com/photo-1582058091980-2d2b4c9b2d5f?w=400',
  'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=400',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
  'https://images.unsplash.com/photo-1607864572224-9e59f1e04c2a?w=400',
  'https://images.unsplash.com/photo-1626803775159-4c3b34dedc8a?w=400',
]

export default function SweetGrid({ sweets, isAdmin, onUpdate }: Props) {
  const purchase = async (id: number) => {
    try {
      await axios.post(`/api/sweets/${id}/purchase?quantity=1`)
      toast.success('🍬 Purchased!')
      onUpdate()
    } catch {
      toast.error('Out of stock!')
    }
  }

const restock = async (id: number) => {
  const qty = Number(prompt('Enter restock quantity'))

  if (!qty || qty <= 0) {
    toast.error('Invalid quantity')
    return
  }

  try {
    await axios.post(`/api/sweets/${id}/restock?quantity=${qty}`)
    toast.success(`📦 Restocked +${qty}`)
    onUpdate()
  } catch {
    toast.error('Restock failed')
  }
}

  const deleteSweet = async (id: number) => {
    if (!confirm('Delete this sweet?')) return
    try {
      await axios.delete(`/api/sweets/${id}`)
      toast.success('🗑️ Deleted!')
      onUpdate()
    } catch {
      toast.error('Failed')
    }
  }

  const editSweet = async (sweet: Sweet) => {
    const name = prompt('New name?', sweet.name) || sweet.name
    const price = Number(prompt('New price?', sweet.price.toString())) || sweet.price
    const quantity =
      Number(prompt('New quantity?', sweet.quantity.toString())) || sweet.quantity

    try {
      await axios.put(`/api/sweets/${sweet.id}`, {
        ...sweet,
        name,
        price,
        quantity,
      })
      toast.success('✏️ Updated!')
      onUpdate()
    } catch {
      toast.error('Update failed')
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10">
      {sweets.map((sweet, i) => (
        <div
          key={sweet.id}
          className="bg-white rounded-3xl shadow-xl hover:scale-105 transition overflow-hidden"
        >
          <img
            src={candyImages[i % candyImages.length]}
            alt={sweet.name}
            className="w-full h-48 sm:h-56 object-cover"
          />

          <div className="p-5 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold">{sweet.name}</h3>
            <p className="text-purple-600">{sweet.category}</p>

            <p className="text-2xl sm:text-3xl font-bold text-pink-600 my-3">
              ₹{sweet.price.toFixed(2)}
            </p>

            <p
              className={`font-semibold ${
                sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              Stock: {sweet.quantity}
            </p>

            <div className="mt-5 space-y-3">
              {/* Purchase */}
              <button
                onClick={() => purchase(sweet.id)}
                disabled={sweet.quantity === 0}
                className={`w-full py-3 rounded-xl font-bold text-white ${
                  sweet.quantity === 0
                    ? 'bg-gray-400'
                    : 'bg-gradient-to-r from-pink-600 to-purple-700 hover:scale-105'
                }`}
              >
                {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase 🛒'}
              </button>

              {/* Admin Controls */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => restock(sweet.id)}
                    className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
                  >
                    Restock +20 📦
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => editSweet(sweet)}
                      className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                    >
                      Edit ✏️
                    </button>
                    <button
                      onClick={() => deleteSweet(sweet.id)}
                      className="bg-red-600 text-white py-2 rounded-xl hover:bg-red-700"
                    >
                      Delete 🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
