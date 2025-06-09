import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../Actions/productActions';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stockManaged, setStockManaged] = useState(false);
  const [stockQuantity, setStockQuantity] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState([{ key: '', value: '' }]);
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.newProduct);

  const handleAddInfo = () => {
    setAdditionalInfo([...additionalInfo, { key: '', value: '' }]);
  };

  const handleRemoveInfo = (index) => {
    const updated = [...additionalInfo];
    updated.splice(index, 1);
    setAdditionalInfo(updated);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDesc', shortDesc);
    formData.append('description', description);
    formData.append('sellingPrice', sellPrice);
    formData.append('discountPrice', discountPrice);
    formData.append('category', category);
    formData.append('stock', stockManaged ? stockQuantity : 0);
    formData.append('featured', featured);

    images.forEach((img) => {
      formData.append('images', img);
    });

    formData.append('additionalInfo', JSON.stringify(additionalInfo));

    dispatch(createProduct(formData));
  };

  return (
    <div className="w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      {loading && <p>Adding product...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {product && <p className="text-green-500">Product added successfully!</p>}

      <form className="space-y-6" onSubmit={handleSubmit}>
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
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
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
              <button
                type="button"
                onClick={() => handleRemoveInfo(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
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
          <label className="block font-medium">Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <div className="flex gap-2 mt-2">
            {images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-20 w-20 object-cover border"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={() => setFeatured(!featured)}
          />
          <span className="font-medium">Featured Product</span>
        </div>

        <button
          type="submit"
          className="w-fit hover:opacity-[0.8] border border-[#ee403d] mt-[16px] text-white bg-[#ee403d] py-[8px] px-[15px] rounded-[2px] register-btn"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
