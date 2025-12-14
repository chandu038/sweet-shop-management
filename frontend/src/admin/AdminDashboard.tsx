import { useState, useEffect } from 'react';
import axios from 'axios';

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
}

const AdminDashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch sweets from backend
  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/sweets');
      setSweets(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error fetching sweets:', err);
      setError(err.response?.data?.message || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSweet = async () => {
    if (!formData.name || !formData.category || !formData.price || !formData.quantity) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const sweetData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };

      await axios.post('/api/sweets', sweetData);
      
      // Clear form and refresh list
      setFormData({ name: '', category: '', price: '', quantity: '' });
      fetchSweets();
      alert('Sweet added successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add sweet');
    }
  };

  const handleUpdateSweet = async () => {
    if (!editingId || !formData.name || !formData.category || !formData.price || !formData.quantity) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const sweetData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };

      await axios.put(`/api/sweets/${editingId}`, sweetData);
      
      // Clear form and refresh list
      setFormData({ name: '', category: '', price: '', quantity: '' });
      setEditingId(null);
      fetchSweets();
      alert('Sweet updated successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update sweet');
    }
  };

  const handleEdit = (sweet: Sweet) => {
    setEditingId(sweet.id);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString()
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', price: '', quantity: '' });
  };

  const handlePurchase = async (id: number) => {
    try {
      await axios.post(`/api/sweets/${id}/purchase`, { quantity: 1 });
      // Refresh the list
      fetchSweets();
      alert('Purchase successful!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  const handleRestock = async (id: number) => {
    try {
      await axios.post(`/api/sweets/${id}/restock`, { quantity: 20 });
      // Refresh the list
      fetchSweets();
      alert('Restocked successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Restock failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await axios.delete(`/api/sweets/${id}`);
      // Refresh the list
      fetchSweets();
      alert('Sweet deleted successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const getImageUrl = (sweet: Sweet) => {
    if (sweet.image) return sweet.image;
    
    // Default images based on category
    const defaultImages: { [key: string]: string } = {
      'snack': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop',
      'sweet': 'https://images.unsplash.com/photo-1626776876729-bab4115a9b8a?w=400&h=300&fit=crop',
      'chocolate': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      'default': 'https://images.unsplash.com/photo-1556910591-d8c22dce4eed?w=400&h=300&fit=crop'
    };

    return defaultImages[sweet.category.toLowerCase()] || defaultImages['default'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sweets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchSweets}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">👑</div>
            <h1 className="text-3xl font-bold text-purple-600">Admin Panel</h1>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Add/Edit Sweet Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {editingId && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
              <span className="text-blue-700 font-semibold">✏️ Editing Sweet</span>
              <button
                onClick={cancelEdit}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sweet Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter category"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={editingId ? handleUpdateSweet : handleAddSweet}
                className="w-full px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                {editingId ? 'Update Sweet' : 'Add Sweet'}
              </button>
            </div>
          </div>
        </div>

        {/* Manage Sweets Section */}
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Manage Sweets</h2>

        {sweets.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-md">
            <p className="text-xl">No sweets available.</p>
            <p className="mt-2">Add some sweets to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <div 
                key={sweet.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={getImageUrl(sweet)}
                    alt={sweet.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556910591-d8c22dce4eed?w=400&h=300&fit=crop';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{sweet.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{sweet.category}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-pink-600">
                      ₹{sweet.price.toFixed(2)}
                    </span>
                    <span 
                      className={`text-sm font-semibold ${
                        sweet.quantity === 0 ? 'text-red-500' : 'text-green-600'
                      }`}
                    >
                      Stock: {sweet.quantity}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Purchase Button */}
                    {sweet.quantity > 0 ? (
                      <button
                        onClick={() => handlePurchase(sweet.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
                      >
                        <span className="text-lg">🛒</span>
                        Purchase 🛒
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}

                    {/* Restock Button */}
                    <button
                      onClick={() => handleRestock(sweet.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                    >
                      <span className="text-lg">📦</span>
                      Restock +20 📦
                    </button>

                    {/* Edit and Delete Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEdit(sweet)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                      >
                        <span className="text-lg">✏️</span>
                        Edit 🖊️
                      </button>
                      <button
                        onClick={() => handleDelete(sweet.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                      >
                        <span className="text-lg">🗑️</span>
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;