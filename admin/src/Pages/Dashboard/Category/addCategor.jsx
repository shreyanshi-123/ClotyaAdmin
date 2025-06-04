import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;

const AddOrEditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // formData holds category name and image path (string or file)
  const [formData, setFormData] = useState({
    category: '',
    image: '', // For existing image path or new file
  });

  const [selectedImage, setSelectedImage] = useState(null); // for new uploaded image (File object)
  const [preview, setPreview] = useState(null); // preview URL for image preview

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Fetch category if editing (id present)
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/get-category/${id}`);
        if (!res.ok) throw new Error('Failed to fetch category');
        const data = await res.json();

        setFormData({
          category: data.category || '',
          image: data.image || '',
        });

        if (data.image) {
          setPreview(`${baseUrl}${data.image}`);
        }
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // When user selects a new file, update selectedImage and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Handle category name input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Upload image helper function, returns uploaded image path string
  const uploadImage = async () => {
    if (!selectedImage) return formData.image || ''; // return existing if no new file

    const data = new FormData();
    data.append('image', selectedImage);

    const res = await fetch(`${baseUrl}/api/CategoryImage`, {
      method: 'POST',
      body: data,
    });

    const json = await res.json();
    if (res.ok) return json.filePath;
    else throw new Error(json.msg || 'Image upload failed');
  };

  // Submit handler for Add
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      alert('Please enter category name');
      return;
    }

    setLoading(true);
    setError('');
    setFormSuccess('');

    try {
      const imagePath = await uploadImage();

      const response = await fetch(`${baseUrl}/api/addCategory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: formData.category, image: imagePath }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add category');
      }

      setFormSuccess('Category added successfully');
      navigate('/categories');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit handler for Update
  const updateCategory = async (e) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      alert('Please enter category name');
      return;
    }

    if (!id) {
      alert('No category ID specified for update');
      return;
    }

    setLoading(true);
    setError('');
    setFormSuccess('');

    try {
      const imagePath = await uploadImage();

      const response = await fetch(`${baseUrl}/api/update-category/${id}`, {
        method: 'POST', // or PUT if your backend expects that
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: formData.category, image: imagePath }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update category');
      }

      setFormSuccess('Category updated successfully');
      navigate('/categories');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Category' : 'Add Category'}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {formSuccess && <p className="text-green-500 mb-2">{formSuccess}</p>}

      <form
        onSubmit={id ? updateCategory : handleSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            disabled={loading}
          />
          {preview && (
            <img
              src={preview}
              alt="Category Preview"
              width={100}
              className="mt-2 rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? (id ? 'Updating...' : 'Adding...') : id ? 'Update Category' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddOrEditCategory;
