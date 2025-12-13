import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddSweetForm from "../sweets/AddSweetForm";
import SweetGrid, { type Sweet } from "../sweets/SweetGrid";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const navigate = useNavigate();

  const fetchSweets = async () => {
    const res = await axios.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700">
          👑 Admin Panel
        </h1>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <AddSweetForm onSuccess={fetchSweets} />

      <div className="mt-14">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Manage Sweets</h2>

        <SweetGrid sweets={sweets} isAdmin={true} onUpdate={fetchSweets} />
      </div>
    </div>
  );
}
