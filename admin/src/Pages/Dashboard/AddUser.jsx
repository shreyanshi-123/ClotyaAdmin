import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ category: '', image: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;

  const isEditMode = Boolean(id);

  // Fetch existing category for edit
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/get-category/${id}`);
        if (!res.ok) throw new Error('Failed to fetch category');
        const data = await res.json();
        setFormData({ category: data.categories, image: data.image });
        setPreview(`${baseUrl}${data.image}`);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, baseUrl]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const uploadImage = async () => {
    if (!selectedImage) return formData.image;
    const data = new FormData();
    data.append('image', selectedImage);

    const res = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.msg || 'Image upload failed');
    return result.filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      setError('Category name is required');
      return;
    }

    try {
      setLoading(true);
      let imagePath = formData.image;

      if (selectedImage) {
        imagePath = await uploadImage();
      }

      const payload = {
        categories: formData.category,
        image: imagePath,
      };

      const endpoint = isEditMode
        ? `${baseUrl}/api/update-category/${id}`
        : `${baseUrl}/api/add-category`;

      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to submit category');

      setFormSuccess(isEditMode ? 'Category updated successfully' : 'Category added successfully');
      setTimeout(() => navigate('/categories'), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen sm:min-w-full'>
      <div className='w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen'>
        <div className='flex flex-col gap-6 sm:p-10 pb-6 overflow-hidden'>
          <h2 className='border-b pb-3 border-gray-300 text-xl font-semibold capitalize flex items-center'>
            {isEditMode ? 'Edit Category' : 'Add Category'}
          </h2>

          <div className='px-[1px] w-3/5'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label className='mb-[16px]'>
                <span className='text-[14px] mb-[5px]'>Category Name *</span>
                <input
                  type='text'
                  name='category'
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className='border rounded-[3px] border-[#ddd] py-[8px] px-[15px] w-full'
                />
              </label>

              <label className='mb-[16px] flex flex-col gap-[8px]'>
                <span className='font-medium'>Category Image</span>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='hidden'
                  id='categoryImage'
                />
                <label htmlFor='categoryImage' className='cursor-pointer w-max py-2 px-4 bg-gray-200 rounded shadow'>
                  Choose Image
                </label>
                {preview && (
                  <img
                    src={preview}
                    alt='Category Preview'
                    width={100}
                    className='mt-2 rounded object-cover'
                  />
                )}
              </label>

              <button
                type='submit'
                className='w-fit bg-[#209569] text-white py-[8px] px-[15px] rounded mt-[16px]'
              >
                {isEditMode ? 'Update Category' : 'Add Category'}
              </button>
            </form>

            {error && <div className='text-red-500 mt-4'>{error}</div>}
            {formSuccess && <div className='text-green-600 mt-4'>{formSuccess}</div>}

            {loading && (
              <div className='flex gap-2 mt-4 items-center'>
                <CircularProgress size={20} />
                <span>Processing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryForm;
