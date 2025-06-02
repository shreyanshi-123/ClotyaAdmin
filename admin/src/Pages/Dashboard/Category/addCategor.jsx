import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;

const AddOrEditCategory = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    image: null,

  });
  const [error, setError] = useState('');


  // // Fetch existing category if editing
  // useEffect(() => {
  //    if (!id) return;
  //   if (id) {

  //     setIsEditMode(true);
  //     fetch(`${baseUrl}/api/get-category/${id}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         setFormData({
  //           categories: data.categories,
  //           image: null,
  //           preview: data.image,
  //         });
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         setError('Failed to load category');
  //       });
  //   }
  // }, [id]);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === 'image') {
  //     setFormData(prev => ({
  //       ...prev,
  //       image: files[0],
  //       preview: URL.createObjectURL(files[0])
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   const payload = new FormData();
  //   payload.append('categories', formData.categories);
  //   if (formData.image) {
  //     payload.append('image', formData.image);
  //   }

  //   const endpoint = isEditMode
  //     ? `${baseUrl}/api/update-category/${id}`
  //     : `${baseUrl}/api/add-category`;

  //   const method = isEditMode ? 'PUT' : 'POST';

  //   try {
  //     const response = await fetch(endpoint, {
  //       method,
  //       body: payload,
  //     });

  //     const result = await response.json();
  //     if (!response.ok) throw new Error(result.message || 'Failed to submit form');

  //     navigate('/categories');
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };


  const [editingUser, setEditingUser] = useState(null);  // State to track the user being edited
  const [category, setcategory] = useState('');
  const [image, setImage] = useState('');
  const [users, setUsers] = useState([]);



  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");


  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();


  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'  // or whatever your local API URL is
    : process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

    } else {
      setPreview(null);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

  };

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
  

    const fetchCategory = async () => {
      // e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/get-category/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();

        setFormData({
          category: data.category || '',
          image: data.image || '',
        });

        setEditingUser(data);

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
  }, []);



  const uploadImage = async () => {
    if (!selectedImage) return '';
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


  // uodateUser
  const updateCategory = async (event) => {
    event.preventDefault();
    if (!id) {
      alert("No user is being edited.");
      return;
    }

    try {
      let imagePath = formData.image;

      if (selectedImage) {
        imagePath = await uploadImage();
      }

      // Prepare payload: send password only if not empty
      const userData = {
        _id: id,
        category: formData.category,

        image: imagePath,
      };



      const response = await fetch(`${baseUrl}/api/update-category/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const updatedCategory = responseBody;

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedCategory._id ? updatedCategory : user))
      );

      setFormData({ category: '', image: '' });
      setEditingUser(null);
      setSelectedImage(null);
      setPreview(null);
      setFormSuccess('User updated successfully');
      navigate('/categories')
    } catch (err) {
      setError(err.message);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (!formData.category ) {
       
   
      alert('Please fill out all required fields');
      return;
    }


    setLoading(true);
    setError('');
    setFormSuccess('');

    try {
      // 1. Upload image first (if any)
      let imagePath = '';
      if (selectedImage) {
        imagePath = await uploadImage();

      }

      // 2. Register user with image path
      const response = await fetch(`${baseUrl}/api/addCategory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imagePath }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Failed to register category');
      } else {
        setFormSuccess('Category added successfully');
        navigate('/categories')
        
        setSelectedImage(null);
        setPreview(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  //  



  const [preview, setPreview] = useState(null);







  const resetForm = () => {
    setFormData({ category: '', image: '' });
    setFile(null);
    setPreview(null);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Category' : 'Add Category'}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={id ? (updateCategory) : (handleSubmit)}  encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
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
            onChange={handleFileChange}
            className="w-full"
          />

          <img src={preview} width={100} />

        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">
          {id ? 'Update Category' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddOrEditCategory;
