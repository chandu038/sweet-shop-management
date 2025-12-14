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
    <div className="p-8">
      <div className="flex justify-between mb-10">
        <h1 className="text-4xl font-bold text-purple-700">👑 Admin Panel</h1>
        <button onClick={() => navigate("/")} className="btn-secondary">
          ← Back
        </button>
      </div>

      {/* ✅ ADD SWEET FORM */}
      <AddSweetForm onSuccess={fetchSweets} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Manage Sweets</h2>
        <SweetGrid sweets={sweets} isAdmin={true} onUpdate={fetchSweets} />
      </div>
    </div>
  );
}
