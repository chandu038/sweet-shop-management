import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddSweetForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/sweets/add", form);
    toast.success("Sweet added 🍬");
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-5 gap-4 bg-white p-6 rounded-xl">
      <input required placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input required placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input type="number" required placeholder="Price" onChange={e => setForm({ ...form, price: +e.target.value })} />
      <input type="number" required placeholder="Qty" onChange={e => setForm({ ...form, quantity: +e.target.value })} />
      <button className="bg-purple-700 text-white rounded-xl">Add Sweet</button>
    </form>
  );
}
