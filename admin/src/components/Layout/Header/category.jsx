import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

const Categoryy = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = process.env.REACT_APP_API_URL;

  // Optional: Map display names to image file names
  const imageFileNames = {
    Women: 'accessories-women-cat.jpg',
    Men: 'accessories-men-cat.jpg',
    Shoes: 'shoes-cat.jpg',
    Bags: 'bag-cat.jpg',
    Glasses: 'glasses-cat.jpg',
     jewellery: 'jewelry-cat.jpg',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-category`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
   
    
      <>
      
       
          {categories.map((category, index) => {
            const fileName = imageFileNames[category.category] ;
            const imageUrl = `${baseUrl}/assets/images/dropdowns/${fileName}`;

            return (

              <li key={index}>
                   <li key={index} className='flex flex-col'>
                                          <div className="rounded-[50%] h-[150px] 5xl:h-[166px] xl:h-[179.156px] w-[150px] 5xl:w-[166px] xl:w-[179.156px] bg-[#f3f3f3] overflow-hidden rounded-dropdown">
                                            <a href="" >  <LazyLoadImage
                                             src={imageUrl} 
                                             alt={category.category}
                                              className="category w-full h-full object-contain"
                                            />
                                              {/* <FontAwesomeIcon icon="fa-solid fa-plus" /> */}
          
                                            </a>
                                          </div>
                                          <a href="#" className="pt-[20px] text-[17px] leading-[1.4] hover:text-primary-red hover:no-underline no-underline">{category.category}</a>
          
                                        </li>
               
               
              </li>
            );
          })}
      </>
   
   
  );
};

export default Categoryy;
