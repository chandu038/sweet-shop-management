import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Props {
  onSuccess: () => void
}

export default function AddSweetForm({ onSuccess }: Props) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post('/api/sweets/add', form)
    toast.success('Sweet added 🍬')
    onSuccess()
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      <div>
        <label className="label">Sweet Name</label>
        <input className="input" required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Category</label>
        <input className="input" required
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Price</label>
        <input type="number" className="input" required
          value={form.price}
          onChange={e => setForm({ ...form, price: +e.target.value })}
        />
      </div>

      <div>
        <label className="label">Quantity</label>
        <input type="number" className="input" required
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: +e.target.value })}
        />
      </div>

      <button className="btn-primary mt-6 sm:mt-0">
        Add Sweet
      </button>
    </form>
  )
}
