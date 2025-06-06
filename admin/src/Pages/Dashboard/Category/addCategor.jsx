import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createcategory, imageUpload, getCategoryById, updatecategory } from '../../../Actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faImage } from '@fortawesome/free-solid-svg-icons';

const baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;
// const imageUrl = categories.image ? `${baseUrl}${categories.image}` : null;

const AddOrEditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // formData holds category name and image path (string or file)
  const [formData, setFormData] = useState({
    category: '',
    image: '', // For existing image path or new file
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // for new uploaded image (File object)
  const [preview, setPreview] = useState(null); // preview URL for image preview

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const { category } = useSelector(state => state.categoryDetail);
  const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);
  const { categories = [], loading } = useSelector(state => state.categoryList);
  const { image } = useSelector(state => state.imageCategory);
  console.log(category)

  useEffect(() => {
    if (id) {
      dispatch(getCategoryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) return;


    setFormData({
      category: category && category.category || '',
      image: category && category.image || '',
    });

    if (category && category.image) {
      setPreview(`${baseUrl}${category.image}`);
    } else {
      setPreview(null);
    }

  }, [category]);
  useEffect(() => {
    return () => {
      if (!id) return;
      if (preview) URL.revokeObjectURL(preview);
    }
  }, [preview]);


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

  const uploadImage = async () => {
    if (!selectedImage) return formData.image || '';

    const data = new FormData();
    data.append('image', selectedImage);

    try {
      const response = await dispatch(imageUpload(data));
      // Assuming your backend returns { filePath: '...' }
      return response.filePath || response.imagePath || formData.image || '';
    } catch (error) {
      alert('Image upload failed: ' + error.message);
      return '';
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
setError('')


    if (!formData.category.trim()) {
      alert('Please fill all missing details');
      setIsSubmitting(false)
      return;
    }

    let imagePath = formData.image;

    if (selectedImage) {
      imagePath = await uploadImage();

    }
    if (!imagePath) {
      alert('Please fill all missing details');
      setIsSubmitting(false)
      return;
    }

    const newcategoryData = { ...formData, image: imagePath };
    try {

      setIsSubmitting(true);


      await dispatch(createcategory(newcategoryData));
     navigate('/categories')
    } catch (error) {
      
      setIsSubmitting(false);
      setError(error.response?.data?.message || error.message || 'Failed to add category');
      alert(error)
      // setError(error.message)
    }
  };
  const styles = {
    disabledButton: {
      backgroundColor: 'gray',
      color: 'white',
      cursor: 'not-allowed',
      border: '0px'
    },
    enabled: {
      cursor: 'pointer'
    }
  }

  // Submit handler for Update
  const updateCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.category.trim()) {
      alert('Please enter category name');
      return;
    }

    if (!id) {
      alert('No category ID specified for update');
      return;
    }


    try {
      let imagePath = formData.image;
      if (selectedImage) {
        imagePath = await uploadImage();
        // alert(imagePath);
        setFormData(prev => ({ ...prev, image: imagePath }));
      }


      const categoryData = {
        _id: id,
        category: formData.category,
        image: imagePath,
      };

      const updatedUser = await dispatch(updatecategory(id, categoryData));
      setFormSuccess('Category updated successfully');
      setTimeout(() => {
        setIsSubmitting(true);
        navigate('/categories')
      }, 1000);


      // navigate('/categories');
    } catch (err) {
      setIsSubmitting(false);
      // setError(err.message);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen sm:min-w-full">
      <div className="w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen ">
        <div className="flex flex-col gap-6  sm:p-10 pb-6 overflow-hidden ">
          <div className='border-b pb-[12px] border-gray-300 flex justify-between items-center'>
            <h2 className='text-xl font-semibold capitalize flex items-center'>
              {id ? ("Edit Category") : ("Add Category")}
            </h2>

            <button onClick={goBack} className='w-fit hover:opacity-[0.8] border border-[#ee403d]  text-white bg-[#ee403d] py-[8px] px-[15px]  rounded-[2px]'>
              <FontAwesomeIcon icon={faAnglesLeft} />  Go Back
            </button>


          </div>
          {/* {error && <p className="text-red-500 mb-2">{error}</p>}
          {formSuccess && <p className="text-green-500 mb-2">{formSuccess}</p>} */}

          <form
            onSubmit={id ? updateCategory : handleSubmit}
            encType="multipart/form-data"
            className='  px-[1px] w-3/5  '
          >
            <div className="mb-[16px]">
              <label className="block mb-1 font-medium">Category Name</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full  border border-gray-300 rounded px-3 py-2"
                disabled={loading}
              />
            </div>

            <div className="my-[16px] flex flex-col ">
              <div className="w-full border rounded border-gray-300 border-b-0  px-3 py-2 flex items-center justify-center h-[140px] p-4">
                {preview ? (

                  <img
                    src={preview}
                    alt="Category Preview"
                    width={100}
                    className="mt-[16px] rounded"
                  />

                ) : (<FontAwesomeIcon icon={faImage} />)}
              </div>
              <label className=" font-medium border border-[#ddd] rounded rounded-t-0 text-center cursor-pointer text-black  py-2 px-5 bg-gray-50 hover: false mb-[5px] img-box w-full bg-gray-200 hover:bg-gray-600 hover:text-white">Category Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                /></label>

            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className='w-fit hover:opacity-[0.8] border border-[#ee403d] mt-[16px] text-white bg-[#ee403d] py-[8px] px-[15px] rounded-[2px] register-btn'
              style={isSubmitting ? styles.disabledButton : styles.enabled}
            >
              {isSubmitting ? (
                <>
                  {/* <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> */}
                  Processing....
                </>
              ) : (
                id ? 'Update' : 'Add Category'
              )}
            </button>

             {error && <div className="text-primary-red my-[16px] p-[16px] border border-[#ddd] text-[14px] ">{error}</div>}
            {formSuccess && (


              <span className='my-[16px] p-[16px] border border-[#ddd] text-[14px] flex text-success'>{formSuccess}</span>

            )}

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddOrEditCategory;
