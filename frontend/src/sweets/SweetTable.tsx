import {  type Sweet } from "./SweetGrid"

interface Props {
  sweets: Sweet[]
  onUpdate: () => void
}

export default function SweetTable({ sweets }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
      <table className="min-w-full text-left">
        <thead className="bg-purple-700 text-white">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map(s => (
            <tr key={s.id} className="border-b hover:bg-purple-50">
              <td className="p-4 font-semibold">{s.name}</td>
              <td className="p-4">{s.category}</td>
              <td className="p-4">₹{s.price}</td>
              <td
                className={`p-4 font-bold ${
                  s.quantity > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {s.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
