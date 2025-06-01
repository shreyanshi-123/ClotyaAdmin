import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

 const baseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;

const AddOrEditCategory = () => {
  const { id } = useParams(); // ID from URL (if editing)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categories: '',
    image: null,
    preview: '',
  });
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch existing category if editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetch(`${baseUrl}/api/get-category/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            categories: data.categories,
            image: null,
            preview: data.image,
          });
        })
        .catch(err => {
          console.error(err);
          setError('Failed to load category');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({
        ...prev,
        image: files[0],
        preview: URL.createObjectURL(files[0])
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = new FormData();
    payload.append('categories', formData.categories);
    if (formData.image) {
      payload.append('image', formData.image);
    }

    const endpoint = isEditMode
      ? `${baseUrl}/api/update-category/${id}`
      : `${baseUrl}/api/add-category`;

    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        body: payload,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to submit form');

      navigate('/categories');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Category' : 'Add Category'}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {formData.preview && (
           <img
  src={formData.preview.startsWith('blob') ? formData.preview : `${baseUrl}${formData.preview}`}
  alt="Preview"
  className="mt-2 h-24 object-cover "
/>

          )}
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">
          {isEditMode ? 'Update Category' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddOrEditCategory;
