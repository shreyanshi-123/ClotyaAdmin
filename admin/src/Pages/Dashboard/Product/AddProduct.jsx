import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getProductById, updatproduct } from '../../../Actions/productActions';
import { getcategory } from "../../../Actions/categoryAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faImage } from '@fortawesome/free-solid-svg-icons';


function AddProduct() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState([]);
  const [title, setTitle] = useState('');
  const [shortDescription, setshortDescription] = useState('');
  const [LongDescription, setLongDescription] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stockManaged, setStockManaged] = useState(false);
  const [stockQuantity, setStockQuantity] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState([{ key: '', value: '' }]);
  const [images, setImages] = useState([]);
  const [featuredProduct, setfeaturedProduct] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.newProduct);
  const { data } = useSelector((state) => state.productdetail);


  const { categories = [] } = useSelector(state => state.categoryList);
 const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;
  useEffect(() => {
    dispatch(getcategory());

  }, [dispatch]);

  const handleAddInfo = () => {
    setAdditionalInfo([...additionalInfo, { key: '', value: '' }]);
  };
  const goBack = () => {
    navigate(-1);
  };
  const handleRemoveInfo = (index) => {
    const updated = [...additionalInfo];
    updated.splice(index, 1);
    setAdditionalInfo(updated);
  };

  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      setTitle('');
      setshortDescription('');
      setLongDescription('');
      setSellPrice('');
      setDiscountPrice('');
      setCategory('');
      setStockManaged(false);
      setStockQuantity('');
      setAdditionalInfo([{ key: '', value: '' }]);
      setSelectedImage(null);
      setPreview([]);
      setImages([]);
      setfeaturedProduct(false);
    }
  }, [id]);

  useEffect(() => {

    if (id) {

      dispatch(getProductById(id));

    }
  }, [dispatch, id]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImage(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreview(previews);
  };



  useEffect(() => {
    if (id && data?.product) {
      setTitle(data.product.title || '');
      setshortDescription(data.product.shortDescription || '');
      setLongDescription(data.product.LongDescription || '');
      setSellPrice(data.product.sellingPrice || '');
      setDiscountPrice(data.product.discountPrice || '');
      setCategory(data.product.category || '');
      setStockManaged(data.product.stock > 0);
      setStockQuantity(data.product.stock || '');
      setAdditionalInfo(JSON.parse(data.product.additionalInfo) || [{ key: '', value: '' }]);


      if (Array.isArray(data.product.images)) {
        setPreview(data.product.images);
        setImages(data.product.images);
      } else if (typeof data.product.images === 'string') {
        setPreview(data.product.images.split(','));
        setImages(data.product.images.split(','));
      } else {
        setPreview([]);
        setImages([]);
      }

    }
  }, [data]);



  useEffect(() => {
    return () => {
      preview.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [preview]);

  const editProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('LongDescription', LongDescription);
    formData.append('sellingPrice', sellPrice);
    formData.append('discountPrice', discountPrice);
    formData.append('category', category);
    formData.append('stock', stockManaged ? Number(stockQuantity) : 'in stock');
    formData.append('featuredProduct', featuredProduct);

    formData.append('additionalInfo', JSON.stringify(additionalInfo));

    if (selectedImage && selectedImage.length > 0) {
      selectedImage.forEach(file => formData.append('images', file));
    } else {
      // if you want to keep old images and not update images:
      images.forEach(imgUrl => formData.append('images', imgUrl));
    }
    alert(JSON.stringify(formData))

    dispatch(updatproduct(id, formData));

    // Optionally navigate away after update
    // navigate('/products');
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('LongDescription', LongDescription);
    formData.append('sellingPrice', sellPrice);
    formData.append('discountPrice', discountPrice);
    formData.append('category', category);
    formData.append('stock', stockManaged ? Number(stockQuantity) : 'in stock');
formData.append('featuredProduct', featuredProduct);
    if (selectedImage && selectedImage.length > 0) {
      selectedImage.forEach((file) => {
        formData.append('images', file);
      });
    } else {
      images.forEach((img) => {
        formData.append('images', img);
      });
    }


    formData.append('additionalInfo', JSON.stringify(additionalInfo));
    console.log(JSON.stringify(additionalInfo))
    try {
      dispatch(createProduct(formData));
      if (error) {
        // toast.error(error)
      }
      // navigate('/products')
    } catch (error) {

      // toast.error(error)
      // navigate('/products')
    }
  };

  return (
    <div className="w-full lg:w-3/4 xl:w-4/5 lg:ml-auto gap-6 flex flex-col min-h-screen p-10">
      <div className='border-b pb-[12px] border-gray-300 flex justify-between items-center'>
        <h2 className='text-xl font-semibold capitalize flex items-center'>
          {id ? ("Edit Product") : ("Add Products ")}
        </h2>

        <button onClick={goBack} className='w-fit hover:opacity-[0.8] border border-[#ee403d]  text-white bg-[#ee403d] py-[8px] px-[15px]  rounded-[2px]'>
          <FontAwesomeIcon icon={faAnglesLeft} />  Go Back
        </button>


      </div>


      <form className="space-y-6" onSubmit={id ? editProduct : handleSubmit} >
        {loading && <p>Adding product...</p>}
        {/* {error && <p className="text-red-500">{error}</p>}
        {products && <p className="text-green-500">Product added successfully!</p>} */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Short Description</label>
          <input
            type="text"
            required
            value={shortDescription}
            onChange={(e) => setshortDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={LongDescription}
            required
            onChange={(e) => setLongDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Sell Price</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Discount Price</label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => {
              return (<option value={category.category} className='capitalize'>{category.category}</option>)
            })}
            {/* <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Bags">Bags</option>
            <option value="Shoes">Shoes</option>
            <option value="Jwellery">Jwellery</option>
            <option value="Glasses">Glasses</option> */}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={stockManaged}
            onChange={() => setStockManaged(!stockManaged)}
          />
          <span className="font-medium">Manage Stock</span>
          {stockManaged && (
            <input
              type="number"
              placeholder="Quantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="ml-4 border border-gray-300 p-2 rounded w-1/4"
            />
          )}
        </div>

        <div>
          <label className="block font-medium mb-2">Additional Information</label>
          {additionalInfo.map((info, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Key"
                value={info.key}
                onChange={(e) => {
                  const updated = [...additionalInfo];
                  updated[index].key = e.target.value;
                  setAdditionalInfo(updated);
                }}
                className="w-1/3 border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Value"
                value={info.value}
                onChange={(e) => {
                  const updated = [...additionalInfo];
                  updated[index].value = e.target.value;
                  setAdditionalInfo(updated);
                }}
                className="w-1/3 border p-2 rounded"
              />
              {info.value && <button
                type="button"
                onClick={() => handleRemoveInfo(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddInfo}
            className="mt-2 text-blue-600 hover:underline"
          >
            + Add More
          </button>
        </div>

        <div>


          <div className="w-full border rounded border-gray-300 border-b-0  px-3 py-2 flex items-center justify-center h-[140px] p-4 gap-2.5">
            {preview.length > 0 && preview.map((src, index) => (
              <img
                key={index}
                src={ src}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                className="my-[16px] rounded h-full"
              />
            ))}

          </div>
          <label className=" font-medium border border-[#ddd] rounded rounded-t-0 text-center cursor-pointer text-black  py-2 px-5 bg-gray-50 hover: false mb-[5px] img-box w-full bg-gray-200 hover:bg-gray-600 hover:text-white block">Product Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded hidden"
            />
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={featuredProduct}
            onChange={() => setfeaturedProduct(!featuredProduct)}
          />
          <span className="font-medium">Featured Product</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-fit border py-[8px] px-[15px] rounded-[2px] ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ee403d] text-white hover:opacity-[0.8]'
            }`}
        >
          {id ? 'Update Product' : 'Add Product'}
        </button>
        <ToastContainer position="top-center" theme="colored" autoClose={3000} />
      </form>
    </div>
  );
}

export default AddProduct;
