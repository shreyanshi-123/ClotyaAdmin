import React from 'react';
import Newsletter from './newsletter'
import './Footer.css'
const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;
const Payments = `${process.env.REACT_APP_API_URL}/assets/images/cards.webp`;

const footerMenus = [
    {
        title: 'Information',
        links: ['About Us', 'Privacy Policy', 'Returns Policy', 'Shipping Policy', 'Dropshipping'],
    },
    {
        title: 'Account',
        links: ['Dashboard', 'My Orders', 'My Wishlist', 'Account details', 'Track My Orders'],
    },
    {
        title: 'Shop',
        links: ['Affiliate', 'Bestsellers', 'Discount', 'Latest Products', 'Sale Products'],
    },
    {
        title: 'Categories',
        links: ['Women', 'Men', 'Bags', 'Outerwear', 'Shoes'],
    },
];




const bottomLinks = ['Privacy Policy', 'Terms and Conditions', 'Returns Policy'];


const Footer = () => {
    return (
        <footer className="bg-white text-black text-sm">
            <Newsletter />
            <div className="max-w-7xxl mx-auto px-[15px]">
                <div className=" px-0 py-[40px] sm:py-[60px] mx-auto  flex flex-col md:flex-row flex-wrap gap-y-10 md:gap-y-0">

                    {/* First Column (approx. 30%) */}
                    <div className="md:w-[33%] w-full ">
                        <div className="max-w-[310px]">
                            <img className="invert w-[148px] mb-[16px]" src={Logo} alt="Clotya Logo" />
                            <p className="text-black text-[14px] leading-[1.5] mb-[16px]">
                                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis in termapol.
                            </p>
                            <p className="text-black text-[14px] leading-[1.5] mb-[16px]">(+800) 1234 5678 90 - info@example.com</p></div>
                    </div>

                    {/* Other Columns (4 x ~17.5%) */}
                    {footerMenus.map((menu, idx) => (
                        <div key={idx} className="md:w-[16.5%] w-full px-[0px] lg:px-[12px]">
                            <h4 className="text-[16px] font-semibold mb-[15px]">{menu.title}</h4>
                            <ul className=" text-black">
                                {menu.links.map((link, i) => (
                                    <li key={i} className='mt-[3px] leading-[1.6]' >
                                        <a href="#" className="hover:text-black transition-colors text-[15px] hover:text-primary-red">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {/* Copyright */}
            <div className="max-w-7xxl mx-auto px-[15px] ">
                <div className="pt-[30px] sm:pt-[40px] pb-[30px] sm:pb-[50px] flex flex-col md:flex-row justify-between items-center text-[13px] text-black gap-2.5 sm:gap-4 border-t border-gray-200">
                    <div className='flex gap-[10px]  lg:gap-5 flex-col lg:flex-row wrap-pay'>
                        <p className='leading-[1.5]'>Copyright {new Date().getFullYear()} &copy; Clotya. All rights reserved.</p>
                        <a href="#">
                            <img src={Payments} alt="payment" />
                        </a>
                        </div>
                    <ul className="flex flex-wrap text-[13px] text-black divide-x divide-gray-300 copyrite">
                        {bottomLinks.map((link, i) => (
                            <li key={i} className=" first:pl-0 last:pr-0 px-3 lnks-footer">
                                <a href="#" className="leading-[1.5] hover:text-primary-red">{link}</a>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

        </footer>
    );
};

export default Footer;
