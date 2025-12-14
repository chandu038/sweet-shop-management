import { useNavigate } from "react-router-dom";

export default function Dashboard({ user, setUser }: any) {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🍭 Sweet Shop</h1>

      {user.role === "ADMIN" && (
        <button
          onClick={() => navigate("/admin")}
          className="mb-6 px-6 py-3 bg-purple-700 text-white rounded-xl"
        >
          👑 Admin Panel
        </button>
      )}

      {/* rest of dashboard */}
    </div>
  );
}
