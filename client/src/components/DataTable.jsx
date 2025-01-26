import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.setItem("isAuthenticated", "false");
    
    setTimeout(() => {
      toast.success("Logged Out !!");
    }, 1000);

    navigate('/');
  }
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', dob: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://daynt-lovkash-garg-e6oh.vercel.app/items');
      setItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!newItem.name || !newItem.dob) {
      toast.error('Name and Date of Birth are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://daynt-lovkash-garg-e6oh.vercel.app/items', newItem);
      setItems([...items, response.data]);
      toast.success('Item added successfully.');
      setNewItem({ name: '', dob: '' });
    } catch (error) {
      toast.error('Failed to add item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (id, updatedItem) => {
    setIsSubmitting(true);
    try {
      const response = await axios.put(`https://daynt-lovkash-garg-e6oh.vercel.app/items/${id}`, updatedItem);
      setItems(items.map((item) => (item.id === id ? response.data : item)));
      toast.success('Item updated successfully.');
      setEditId(null);
    } catch (error) {
      toast.error('Failed to update item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Example: January 26, 2025
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };
  

  const handleDelete = async (id) => {
    setIsSubmitting(true);
    try {
      await axios.delete(`https://daynt-lovkash-garg-e6oh.vercel.app/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
      toast.success('Item deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = new Date() - birthDate;
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  };

  if (loading) {
    return <div className="flex justify-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className='flex items-center justify-between'>
      <h1 className="text-2xl mb-4 ">Dashboard</h1>
      <div className='flex gap-3'>
      <h3 className="text-2xl border-[2px] border-black mb-4 text-center w-[200px] rounded-[20px] text-black">User</h3>
      <button onClick={handlelogout} className="text-2xl border-[2px] border-black mb-4 text-center w-[200px] rounded-[20px] text-black">Logout</button>
      </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mr-2"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 mr-2"
          value={newItem.dob}
          onChange={(e) => setNewItem({ ...newItem, dob: e.target.value })}
        />
        <button
          onClick={handleAdd}
          disabled={isSubmitting}
          className={`p-2 bg-blue-500 p-4 w-[150px] rounded-[20px] text-white ${isSubmitting ? 'opacity-50' : ''}`}
        >
          Add Person
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Date of Birth</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">
                {editId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      setItems(
                        items.map((i) =>
                          i.id === item.id ? { ...i, name: e.target.value } : i
                        )
                      )
                    }
                    className="border p-1"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border p-2">{calculateAge(item.dob)}</td>
              <td className="border p-2">
                {editId === item.id ? (
                  <input
                    type="date"
                    value={item.dob}
                    onChange={(e) =>
                      setItems(
                        items.map((i) =>
                          i.id === item.id ? { ...i, dob: e.target.value } : i
                        )
                      )
                    }
                    className="border p-1"
                  />
                ) :  formatDate(item.dob)}
              </td>
              <td className="border p-2 ">
                {editId === item.id ? (
                  <button
                    onClick={() => handleEdit(item.id, item)}
                    disabled={isSubmitting}
                    className={`p-1 bg-green-500 my-[4px] text-white mr-2 ${
                      isSubmitting ? 'opacity-50' : ''
                    }`}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditId(item.id)}
                    className="p-1 bg-yellow-500 my-[4px] text-white mr-2 p-4 w-[100px] rounded-[20px] "
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isSubmitting}
                  className={`p-1 bg-red-500 my-[4px] text-white p-4 w-[100px] rounded-[20px] ${
                    isSubmitting ? 'opacity-50' : ''
                  }`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default App;
