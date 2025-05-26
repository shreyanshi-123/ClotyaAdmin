// import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'react-bootstrap/Accordion';
import CategoryMenu from './category'

import {
  // faHeart,
  // faShoppingCart,
  faAngleDown,
  faBars,
  faTimes,
  // faUser,
  faSearch,
  faChartBar,
  faBarChart,
  faShoppingBag

} from '@fortawesome/free-solid-svg-icons';
import { faBagShopping, faCheck } from '@fortawesome/free-solid-svg-icons';

import './Header.css'
import { faHeart, faUser, fas } from '@fortawesome/free-regular-svg-icons';

import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";


const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;
const Category1 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/accessories-women-cat.jpg`;
const Category2 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/accessories-men-cat.jpg`;
const Category3 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/shoes-cat.jpg`;
const Category4 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/bag-cat.jpg`;
const Category5 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/glasses-cat.jpg`;
const Category6 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/jewelry-cat.jpg`;
const MenMegaMenu = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/megamenu-1.jpg`;
const MenMegaMenu1 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/megamenu-3.jpg`;
const MenMegaMenu2 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/megamenu-4.jpg`;
const MenMegaMenu3 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/megamenu-44.jpg`;
const MenMegaMenu4 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/megamenu-45.jpg`;
const MenMegaMenu5 = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/megamenu-2.jpg`;
const arrow = `${process.env.REACT_APP_API_URL}/assets/images/dropdowns/arrow-right.png`;

const ShoppingBag = `${process.env.REACT_APP_API_URL}/assets/images/shopping-bag.png`;

// Menu Data

const row1 = [
  {
    id: 1,
    item: 'Jackets & Coats'

  },
  {
    id: 2,
    item: 'Jeans'

  },
  {
    id: 3,
    item: 'Loungewear'

  },
  {
    id: 4,
    item: 'Polo shirts'

  },
  {
    id: 5,
    item: 'shirts'

  },
  {
    id: 6,
    item: 'Shorts'

  }
]
const row2 = [
  {
    id: 1,
    item: 'Suits'

  },
  {
    id: 2,
    item: 'Swimwear'

  },
  {
    id: 3,
    item: 'T-shirts'

  },
  {
    id: 4,
    item: 'Tracksuits'

  },
  {
    id: 5,
    item: 'Trousers'

  },
  {
    id: 6,
    item: 'Underwear'

  }
]


const row11 = [
  {
    id: 1,
    item: 'Dresses'

  },
  {
    id: 2,
    item: 'Jackets & Coats'

  },
  {
    id: 3,
    item: 'Jeans'

  },
  {
    id: 4,
    item: 'Loungewear'

  }
]
const row22 = [
  {
    id: 1,
    item: 'Shorts'

  },
  {
    id: 2,
    item: 'Skirts'

  },
  {
    id: 3,
    item: 'Suits'

  },
  {
    id: 4,
    item: 'Swimwear'

  },
  {
    id: 5,
    item: 'Top'

  },
  {
    id: 6,
    item: 'Trousers'

  }
]


const row111 = [
  {
    id: 1,
    item: 'Accessories'

  },
  {
    id: 2,
    item: 'Bags'

  },
  {
    id: 3,
    item: 'Belts'

  },
  {
    id: 4,
    item: 'Hats'

  },
  {
    id: 5,
    item: 'Watches'

  }
]
const row222 = [
  {
    id: 1,
    item: 'Jewelry'

  },
  {
    id: 2,
    item: 'Sale'

  },
  {
    id: 3,
    item: 'Vintage'

  },
  {
    id: 4,
    item: 'Designers'

  },
  {
    id: 5,
    item: 'Lifestyle'

  }
]
const category = [
  {
    id: 1,
    item: 'Women',
    image: Category1

  },
  {
    id: 2,
    item: 'Men',
    image: Category2

  },
  {
    id: 3,
    item: 'Shoes',
    image: Category3

  },
  {
    id: 4,
    item: 'Bags',
    image: Category4

  },
  {
    id: 5,
    item: 'Glasses',
    image: Category5

  },
  {
    id: 6,
    item: 'Jwellry',
    image: Category6

  }
]

const men = [
  { id: 1, item: 'Jackets & Coats' },
  { id: 2, item: 'Jeans' },
  { id: 3, item: 'Loungewear' },
  { id: 4, item: 'Polo shirts' },
  { id: 5, item: 'Shirts' },
  { id: 6, item: 'Shorts' },
  { id: 7, item: 'Suits' },
  { id: 8, item: 'Swimwear' },
  { id: 9, item: 'T-shirts' },
  { id: 10, item: 'Tracksuits' },
  { id: 11, item: 'Trousers' },
  { id: 12, item: 'Underwear' }
]











const Women = [
  { id: 1, item: 'Dresses' },
  { id: 2, item: 'Jackets & Coats' },
  { id: 3, item: 'Jeans' },
  { id: 4, item: 'Lingerie' },
  { id: 5, item: 'Loungewear' },
  { id: 6, item: 'Skirts' },
  { id: 7, item: 'Suits' },
  { id: 8, item: 'Swimwear' },
  { id: 9, item: 'Top' },
  { id: 10, item: 'Trousers' },

]


const Header = () => {
  
  // const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);  // This controls the menu's visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // category fetch from database
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const pathname = location.pathname;
const locationValue = pathname.split("/");
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

  //    if (loading) return <div>Loading...</div>;
  //    if (error) return <div>Error: {error}</div>;


  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;





  return (
    <header className={`relative z-50 ${locationValue[1] === ""  ? 'sticky home-header' : 'sticky other-Page'}`}>
      {/* Promo Bar */}

      {/* Navigation Bar */}
      <div className="navigation text-white absolute w-full">
        <div className="bg-black text-white text-[12px] text-center relative py-2.5">
          <div class="container  m-auto">
            <p className='text-[12px] uppercase tracking-[0.25px]'>SUMMER SALE FOR ALL SWIM SUITS AND FREE EXPRESS INTERNATIONAL DELIVERY - OFF 50%! <a href="/shop" className='font-semibold hover:text-white text-white '>SHOP NOW</a></p>
          </div>
        </div >
        <div className="px-[0px] lg:px-[15px]">
          <div className="max-w-7xxl mx-auto  px-[15px] lg:px-[0px]  flex items-center header-wrapper ">
            <div className="border-b-[1px] border-primary-gray border-solid flex w-full justify-between  items-center main-header ">
              {/* Left: Hamburger (Mobile) & Menu */}
              <div className="flex items-center ">
                {/* Mobile Menu Button */}
                <button
                  className="text-white text-xl lg:hidden mr-4 relative"
                  onClick={() => setMenuOpen(!menuOpen)}  // Toggle menu visibility
                >
                  {/* Font Awesome icon changes based on menuOpen state */}
                  <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-black" />
                </button>
                <div className={`dropdown-menu   left-0 ${menuOpen ? 'open' : ''}`}>
                  <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <div className="flex px-[24px] pt-[20px] justify-between pb-[12px]">
                      <NavLink to="/" className="block w-auto  slider-logo flex items-center">
                        <LazyLoadImage
                          src={Logo}
                          alt="Clotya"

                          className="invert w-[112px]  "
                        />
                      </NavLink>
                      <button
                        className="text-black flex justify-center items-center  text-xl bg-[#e8e9ef] w-[30px] h-[30px] relative text-end "
                        onClick={() => setMenuOpen(false)}  // Toggle menu visibility
                      >
                        {/* Font Awesome icon changes based on menuOpen state */}
                        <FontAwesomeIcon icon={faTimes} className="text-black font-[14px] font-semibold" />
                      </button></div>
                    <div className="px-[24px] py-[12px]">
                      {/* <Accordion defaultActiveKey="0"> */}
                      {/* <ul> */}
                      <Accordion defaultActiveKey="0">
                        {/* Shop Section */}
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>

                            <a href="#" className='text-black hover:text-primary-red'><h3 className=" text-black text-[16px] py-[8px] leading-[1.5]">
                              Shop
                            </h3></a>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Accordion >
                              {/* Men Section */}
                              <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                  <a href="#" className='text-black hover:text-primary-red'><h3 className=" text-black text-[15px] py-[4px] leading-[1.5]">
                                    Men
                                  </h3></a>
                                </Accordion.Header>
                                <Accordion.Body>

                                  {row1.concat(row2).map(({ id, item }) => (
                                    <a href="#" className='text-black hover:text-primary-red'>   <li key={id} className='text-black text-[15px] py-[4px] leading-[1.5]'>{item}</li></a>
                                  ))}

                                </Accordion.Body>
                              </Accordion.Item>

                              {/* Women Section */}
                              <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                  <a href="#" className='text-black hover:text-primary-red'><h3 className=" text-black text-[15px] py-[4px] leading-[1.5]">
                                    Women
                                  </h3></a>
                                </Accordion.Header>
                                <Accordion.Body>

                                  {row11.concat(row22).map(({ id, item }) => (
                                    <a href="#" className='text-black hover:text-primary-red'>   <li key={id} className='text-black text-[15px] py-[4px] leading-[1.5]'>{item}</li></a>
                                  ))}

                                </Accordion.Body>
                              </Accordion.Item>

                              {/* Others Section */}
                              <Accordion.Item eventKey="3">
                                <Accordion.Header>
                                  <a href="#" className='text-black hover:text-primary-red'><h3 className=" text-black text-[15px] py-[4px] leading-[1.5]">
                                    Others
                                  </h3></a>
                                </Accordion.Header>
                                <Accordion.Body>

                                  {row111.concat(row222).map(({ id, item }) => (
                                    <a href="#" className='text-black hover:text-primary-red'> <li key={id} className='text-black text-[15px] py-[4px] leading-[1.5]'>{item}</li></a>
                                  ))}

                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </Accordion.Body>
                        </Accordion.Item>

                        {/* Category Section */}
                        <Accordion.Item eventKey="4">
                          <Accordion.Header>
                            <a href="#" className='text-black hover:text-primary-red'><h3 className=" text-black text-[16px] py-[8px] leading-[1.5]">
                              Category
                            </h3></a>
                          </Accordion.Header>
                          <Accordion.Body>

                            {categories.map((category, index) => {
                              const fileName = imageFileNames[category.category];
                              const imageUrl = `${baseUrl}/assets/images/dropdowns/${fileName}`;

                              return (

                                <li key={index}>
                                  <a href="#" className='text-black hover:text-primary-red'>    <li className='text-black text-[15px] py-[4px] leading-[1.5]'>{category.category}</li></a>



                                </li>
                              );
                            })}


                          </Accordion.Body>
                        </Accordion.Item>

                        {/* Repeating Men, Women Sections */}
                        <Accordion.Item eventKey="5">
                          <Accordion.Header>
                            <a href="#" className='text-black hover:text-primary-red'><h3 className=" text-black text-[16px] py-[8px] leading-[1.5]">
                              Men
                            </h3></a>
                          </Accordion.Header>
                          <Accordion.Body>

                            {men.map(({ id, item }) => (
                              <a href="#" className='text-black hover:text-primary-red'>   <li key={id} className='text-black text-[15px] py-[4px] leading-[1.5]'>{item}</li></a>
                            ))}

                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="6">
                          <Accordion.Header>
                            <a href="#" className='text-black hover:text-primary-red'><h3 className=" text-black text-[16px] py-[8px] leading-[1.5]">
                              Women
                            </h3></a>
                          </Accordion.Header>
                          <Accordion.Body>

                            {Women.map(({ id, item }) => (
                              <li key={id} className='text-black text-[15px] py-[4px] leading-[1.5]'>{item}</li>
                            ))}

                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>

                      {/* </ul> */}

                    </div>
                  </div>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-6 items-center">

                  <div className=" group  h-[84px] flex items-center">

                    <a href='/' className="uppercase flex items-center gap-1 text-white hover:no-underline no-underline">
                      SHOP
                      <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
                    </a>

                    <div className="absolute justify-center top-[94px] w-full left-0 right-0 h-[auto] hidden group-hover:flex  bg-white text-black mt-4 py-[50px] shadow-lg z-50">
                      <div className="max-w-7xxl w-full mx-auto px-[15px] flex">
                        {/* ================================================================== */}
                        <div className='w-1/3' >

                          <h4 className=" pr-[30px] text-[14px] text-primary-btnHover capitalize mb-[25px] leading-[1.4]">Men</h4>
                          <div className="grid grid-cols-2 gap-4 ">
                            <ul className="space-y-1 text-sm pt-[5px] ">
                              {row1.map(({ id, item }) => (
                                <li key={id}>
                                  <a href="#" className=" py-[4px] font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">{item}</a>
                                </li>
                              ))}

                            </ul>
                            <ul className="space-y-1 text-sm">
                              {row2.map(({ id, item }) => (
                                <li key={id}>
                                  <a href="#" className=" py-[4px] font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">{item}</a>
                                </li>
                              ))}

                            </ul>
                          </div>


                        </div>
                        {/* ==================================================================== */}
                        <div className='w-1/3' >

                          <h4 className="pr-[30px] text-[14px] text-primary-btnHover capitalize mb-[25px] leading-[1.4] ">Women</h4>
                          <div className="grid grid-cols-2 gap-4 ">
                            <ul className="space-y-1 text-sm pt-[5px] ">
                              {row11.map(({ id, item }) => (
                                <li key={id}>
                                  <a href="#" className=" py-[4px] font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">{item}</a>
                                </li>
                              ))}

                            </ul>
                            <ul className="space-y-1 text-sm">
                              {row22.map(({ id, item }) => (
                                <li key={id}>
                                  <a href="#" className=" py-[4px] font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">{item}</a>
                                </li>
                              ))}

                            </ul>
                          </div>


                        </div>

                        {/* ============================================================================= */}
                        <div className='w-1/3'>

                          <h4 className=" pr-[30px] text-[14px] text-primary-btnHover capitalize mb-[25px] leading-[1.4]">Others</h4>
                          <div className="grid grid-cols-2 gap-4 ">
                            <ul className="space-y-1 text-sm pt-[5px] ">
                              {row111.map(({ id, item }) => (
                                <li key={id}>
                                  <a href="#" className=" py-[4px] font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">{item}</a>
                                </li>
                              ))}

                            </ul>
                            <ul className="space-y-1 text-sm">
                              {row222.map(({ id, item }) => (
                                <li key={id}>
                                  <a href="#" className=" py-[4px] font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">{item}</a>
                                </li>
                              ))}

                            </ul>
                          </div>

                        </div>
                      </div >
                    </div>
                  </div>

                  <div className=" group h-[84px] flex items-center">
                    <a href='/' className="uppercase flex items-center gap-1 text-white hover:no-underline no-underline">
                      CATEGORY
                      <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
                    </a>
                    <div className="absolute w-full left-0 top-[94px] right-0 h-[auto] hidden group-hover:flex gap-10 bg-white text-black mt-4   shadow-lg z-50">
                      <div className="max-w-7xxl w-full mx-auto px-[15px] justify-center flex" >

                        {/* ============================================================= */}

                        <ul className="py-[50px] text-sm font-medium flex  gap-[20px] xl:gap-[30px] justify-center items-center text-center">
                          <CategoryMenu />

                        </ul>
                      </div>
                    </div >
                  </div>
                  <div className=" group h-[84px] flex items-center">
                    <a href='/' className="uppercase flex items-center gap-1 text-white hover:no-underline no-underline">
                      MEN
                      <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
                    </a>
                    <div className="absolute flex-col w-full top-[94px] left-0 right-0 h-[auto] hidden group-hover:flex  bg-white text-black mt-4   shadow-lg z-50">
                      <div className="max-w-7xxl w-full mx-auto px-[15px] justify-center flex" >
                        <div className='flex gap-[30px] w-full' >
                          <div className="w-[60%] pr-[50px] py-[50px]">
                            <h4 className="font-semibold text-[14px] text-[#808080] mb-[25px]">Men</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <ul className=" text-[17px] leading-[22px]">
                                <li className="py-[5px] font-medium" >
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline' >Jackets & Coats</a>
                                </li>
                                <li className="py-[5px] font-medium" >
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline'>Jeans</a>
                                </li>
                                <li className="py-[5px] font-medium">
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline' >Loungewear</a>
                                </li>
                                <li className="py-[5px] font-medium">
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline'>Polo shirts</a>
                                </li>
                              </ul>

                              <ul className="text-[17px] leading-[22px]">
                                <li className="py-[5px] font-medium" >
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline'>Shirts</a>
                                </li>
                                <li className="py-[5px] font-medium" >
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline'>Shorts</a>
                                </li>
                                <li className="py-[5px] font-medium" >
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline'>Suits</a>
                                </li>
                                <li className="py-[5px] font-medium" >
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline' >Swimwear</a>
                                </li>
                              </ul>
                              <ul className=" text-[17px] leading-[22px]">
                                <li className="py-[5px] font-medium">
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline'>T-shirts</a>
                                </li>
                                <li className="py-[5px] font-medium" >
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline' >Tracksuits</a>
                                </li >
                                <li className="py-[5px] font-medium">
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline'>Trousers</a>
                                </li>
                                <li className="py-[5px] font-medium">
                                  <a href="#" className='hover:text-primary-red hover:no-underline no-underline' > Underwear</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="w-[40%] h-[273px] dropdown-mega3" style={{ backgroundImage: `url(${MenMegaMenu})` }}></div>
                        </div>

                      </div >
                      <div className="second-part w-full flex gap-[30px] h-[340px]" style={{ backgroundImage: `url(${MenMegaMenu5})` }}>
                        <div className="columns w-1/2"></div>
                        <div className="columns w-1/2 flex items-center">
                          <div className='flex flex-col'>
                            <div className="part-two mb-[20px]"><h2 class="text-white font-medium text-[40px] leading-[1] mb-[30px]">The latest men's trends <br />
                              this season</h2>
                              <p className='text-[22px] mb-[20px] text-white leading-[1]'>New collections!</p></div>
                            <div>  <button className='py-2 px-10 rounded-[40px] border-1 border-primary-red hover:bg-white hover:text-primary-red font-medium text-[20px] hover:border-primary-red bg-primary-red shop-now text-white leading-[1.4]'>Shop now</button></div>
                          </div>
                        </div>
                      </div>
                    </div >
                  </div>
                  <div className=" group h-[84px] flex items-center">
                    <a href='/' className="uppercase flex items-center gap-1 text-white hover:no-underline no-underline">
                      WOMEN
                      <FontAwesomeIcon icon={faAngleDown} className="text-xs ml-1" />
                    </a>
                    <div className="absolute w-full top-[94px] left-0 right-0  hidden group-hover:flex gap-10 bg-white text-black mt-4  shadow-lg z-50 ">


                      <div className="max-w-7xxl w-full mx-auto gap-[30px] px-[15px] justify-center flex" >
                        <div className="w-[42%] py-[50px] dropdown-mega4" style={{ backgroundImage: `url(${MenMegaMenu1})` }}>
                          <h4 className="font-semibold text-[#808080] text-[14px] mb-[25px] leading-[1.4]">Women</h4>
                          <div className="grid">
                            <ul className="space-y-1 text-[17px] flex flex-col">
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Dresses</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className="  py-[5px]  font-medium pr-[30px] hover:no-underline no-underline">Jackets & Coats</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className="  py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Jeans</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Lingerie</a>
                              </li>

                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Loungewear</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Shorts</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Skirts</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Suits</a>
                              </li>

                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Swimwear</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Top</a>
                              </li>
                              <li className='m-0 leading-[1.6] py-[2.5px]'>
                                <a href="#" className=" py-[5px]  font-medium pr-[30px] hover:text-primary-red hover:no-underline no-underline">Trousers</a>
                              </li>

                            </ul>
                          </div>

                        </div>
                        <div className="w-[34%]">
                          <div className="box w-full relative mt-[70px] z-[20] overflow-hidden">
                            <div className="w-full relative w-fit z-[9999] overlay--box">
                              <img src={MenMegaMenu2} alt="" className='bg-img z-0 w-full' />
                              <div className="box-content overflow-hidden absolute top-[30px] left-[30px] xl:top-[50px] xl:left-[50px] right-[auto] bottom-[auto] z-[10]">
                                <h2 className='text-[30px] text-white font-medium leading-[1.2] mb-5'>Street style <br />
                                  has its own <br />
                                  rules</h2>
                                <a href="">  <div className=""><div className="flex gap-2 text-[18.7px] font-medium text-white wrapper-btn"><div className="btn-content">Shop Now</div> <img src={arrow} alt="" className='invert' /></div></div></a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-[23%]">
                          <div className="mb-[50px] mt-[70px] shop-box">
                            <div className="image-content-wrapper relative">
                              <div className="image-wrapper">  <img src={MenMegaMenu3} alt="" className='img1' />
                                <img src={MenMegaMenu4} alt="" className='img2' />
                              </div>
                              <div class="product-label absolute">
                                <span class="onsale percent">
                                  <span>-70%</span>
                                </span>
                                <span class="featured">
                                  <span>Hot</span>
                                </span>
                              </div>
                              <div className="product-group-button">


                                <div class="button-in quickshop hover:text-white">
                                  <a class="quickshop hover:text-white" href="#"><FontAwesomeIcon icon={faSearch} /></a>
                                  <span class="ts-tooltip button-tooltip">Compare</span>
                                </div>

                                <div class="button-in compare hover:text-white">
                                  <a class="compare hover:text-white" href="/" ><FontAwesomeIcon icon={faBarChart} /></a>
                                  <span class="ts-tooltip button-tooltip">Quick view</span>
                                </div>

                                <div class="button-in wishlist hover:text-white">

                                  <a href="/" class="hover:text-white"><FontAwesomeIcon icon={faHeart} />
                                  </a>
                                  <span class="ts-tooltip button-tooltip">Wishlist</span>
                                </div>
                                <a href="/"> <div class="loop-add-to-cart py-[7.5px] px-[10px] bg-black text-white text-center font-medium hover:bg-primary-red"><span class="ts-tooltip  text-[18px] leading-[1.4] font-medium">Select options</span></div></a>
                              </div>
                            </div>
                            <div className="wrapper-shop-header pt-[20px]">
                              <h3 className='text-[15px] mb-2'><a href="" className='hover:text-primary-red'>Textured vegan leather moto Jacket</a></h3>
                              <div className="mb-2 text-[15px] ">$693.00–$699.00</div></div>
                            <div className="available-color items-center p-1 flex gap-3">
                              <div className="firstcolor bg-[#000] h-[23px] w-[23px] rounded-[50%] relative flex items-center justify-center"><FontAwesomeIcon icon={faCheck} className='text-white text-[8px] font-medium ' /></div>
                              <div className="firstcolor bg-[#D9121F] h-[23px] w-[23px] rounded-[50%] relative flex items-center justify-center"><FontAwesomeIcon icon={faCheck} className='text-white text-[8px] font-medium ' /></div>
                            </div>
                          </div>
                        </div>
                      </div >
                    </div>
                  </div>
                </nav>


              </div>


              {/* Center: Logo */}
              <div className="absolute left-[47%] sm:left-[50.5%]  lg:left-[54%] transform -translate-x-1/2 z-10">
                <NavLink to="/" className="block w-auto">
                  <LazyLoadImage
                    src={Logo}
                    alt="Clotya"
                    width="121"
                    className="header-logo"
                  />
                </NavLink>
              </div>

              {/* Right: Icons */}
              <div className="flex items-center  right-icons relative ">
                <div className="h-[36px] w-[32px] flex justify-center items-center user-btn">
                  <a href="/admin/login"> <FontAwesomeIcon

                    icon={faUser}
                    className={`text-white  cursor-pointer`}
                    size="lg"
                  /></a></div>
                <div className="h-[36px] w-[32px]  flex justify-center items-center ml-2.5 search-btn">
                  <FontAwesomeIcon

                    icon={faSearch}
                    className={`text-white  cursor-pointer`}
                    size="lg"
                  /></div>
                <div className="h-[36px] w-[32px]  flex justify-center items-center ml-2.5 heart-btn relative" >
                  <FontAwesomeIcon

                    icon={faHeart}
                    className={`text-white  cursor-pointer`}
                    size="lg"
                  />
                  <span class="count klbwl-wishlist-count absolute bg-primary-red text-white font-semibold text-[10px] rounded-[50%] top-0 right-[-2px] min-h-[15px] min-w-[17px] py-[2px] flex items-center justify-center">0</span>

                </div>
                <div className='header-button'>
                  <a href="#" className=''>
                    <div className='flex  ml-2.5 cart-btn ' >
                      <span className='text-black lg:text-white text-[13px] CartAmount'>$0.00</span>
                      <div className="relative h-[36px] w-[32px] justify-center flex items-center">
                        <FontAwesomeIcon

                          icon={faShoppingBag}
                          className={`text-white  cursor-pointer`}
                          size="lg"
                        />
                        <span class="count klbwl-wishlist-count absolute bg-primary-red text-white font-semibold text-[10px] rounded-[50%] top-0 right-[0px] min-h-[15px] min-w-[17px] py-[2px] flex items-center justify-center">0</span>
                      </div>
                    </div>
                  </a>
                  <div class="cart-dropdown ">
                    <div class="cart-dropdown-wrapper">
                      <div class="fl-mini-cart-content">


                        <div class="cart-empty">
                          <div class="empty-icon">
                            <img src={ShoppingBag} alt="" />
                          </div>
                          <div class="empty-text">No products in the cart.</div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div> </div>
          </div></div>
      </div>
      {/* </div> */}

    </header >
  );
};

export default Header;
