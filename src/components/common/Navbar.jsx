import { useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets'
import { Link, matchPath, NavLink } from 'react-router-dom';
import { useShopContext } from '../../contexts/ShopContext';
import { useUserContext } from '../../contexts/UserContext';

const Navbar = () => {

    const { setShowSearchbar, getCartDataOfAnUser, screenWidth, location, cartTotal } = useShopContext();
    const { logoutUser, logoutModalOpen, setLogoutModalOpen, navigate } = useUserContext();

    const { totalItems } = cartTotal();

    const logoutModalOpenRef = useRef(null);

    const [menuActive, setMenuActive] = useState(false);
    const menus = [`HOME`, `COLLECTION`, `ABOUT`, `CONTACT`];

    const dropDownHandler = (ele) => {
        if (ele === 'Logout') setLogoutModalOpen(true);
        if (ele === 'Orders') navigate('/orders');
    }

    useEffect(() => {
        const clickAnyWhereToCloseLogoutModalHandler = (event) => {
            logoutModalOpen && logoutModalOpenRef.current && !logoutModalOpenRef.current.contains(event.target) && setLogoutModalOpen(false);
        }
        window.addEventListener("mousedown", clickAnyWhereToCloseLogoutModalHandler);
        return () => window.removeEventListener("mousedown", clickAnyWhereToCloseLogoutModalHandler);
    }, [logoutModalOpen]);

    return (
        <div className={`w-full flex items-center py-5 font-medium ${screenWidth < 350 ? `flex-col justify-center gap-5` : `flex-row justify-between`} ${matchPath(`/verify-email/:forgotPasswordTokenFromFrontend`, location.pathname) || location.pathname === `/forgot-password` ? `hidden` : ``}`}>

            <div className={`fixed left-0 top-0 w-full h-screen z-200 bg-black opacity-80 ${logoutModalOpen ? `flex justify-center items-center` : `hidden`}`}>
                <div className='w-1/3 flex flex-col justify-center items-center gap-5 px-5 md:px-10 py-5 md:py-10 rounded-md bg-sky-50' ref={logoutModalOpenRef}>
                    <p className='w-full text-start text-wrap'>Do you really want to Logout ?</p>
                    <div className='w-full flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-5 sm:gap-10'>
                        <button className='px-5 py-2 sm:py-3 text-sm sm:text-base border rounded bg-pink-300 hover:bg-pink-500 cursor-pointer' onClick={logoutUser}>Yes</button>
                        <button className='px-5 py-2 sm:py-3 text-sm sm:text-base border rounded bg-pink-300 hover:bg-pink-500 cursor-pointer' onClick={() => setLogoutModalOpen(false)}>No</button>
                    </div>
                </div>
            </div>

            {/* ----------------------------------logo--------------------------------- */}
            <div className={`${screenWidth < 350 && `w-full flex justify-center items-center`}`}>
                <Link to='/'><img src={assets.logo} alt="" className="w-36" /></Link>
            </div>

            {/* ----------------------------------menus-------------------------------- */}
            <div className="hidden sm:flex items-center gap-5 text-sm text-gray-700">
                {
                    menus.map((menu, index) =>
                        <NavLink key={index} to={menu === menus[0] ? `/` : `/${menu.toLowerCase()}`} className='flex flex-col items-center gap-1'>
                            <span className="cursor-pointer">{menu}</span>
                            <hr className={`w-2/3 h-[1.5px] border-none bg-gray-700 hidden`} />
                        </NavLink>
                    )}
            </div>

            {/* ------------------------------search, profile and cart icon------------------------------------ */}
            <div className={`flex justify-between items-center gap-5 sm:gap-10 ${screenWidth < 350 ? `w-full bg-pink-300 rounded py-2 px-4` : `w-auto`}`}>
                <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' onClick={() => setShowSearchbar(prev => !prev)} />
                <div className='group relative'>
                    <Link to={`/login`}><img src={assets.profile_icon} alt="" className='w-5 min-w-5 cursor-pointer' /></Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                        {
                            <div className='hidden sm:flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                {
                                    ['My Profile', 'Orders', 'Logout'].map((ele) => (
                                        <p key={ele} className='cursor-pointer hover:text-black' onClick={() => dropDownHandler(ele)}>{ele}</p>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
                <Link className='relative' to={'/cart'} onClick={getCartDataOfAnUser}>
                    <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                    <p className='bg-black rounded-full absolute left-2 top-2.5 text-white w-4 text-center leading-4 aspect-square text-[8px]'>{totalItems}</p>
                </Link>
                <img src={assets.menu_icon} onClick={() => setMenuActive(true)} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* ------------------------------sidebar menu for small screen----------------------------------- */}
            <div className={`sm:hidden z-100 absolute top-0 bottom-0 left-0 overflow-hidden flex justify-start items-end flex-col font-semibold bg-black text-white opacity-90 transition-all duration-300 ${menuActive ? 'w-full' : 'w-0'}`}>
                <div className='w-full flex hover:bg-gray-600 items-center justify-end gap-4 pr-2 py-5 border-b border-white cursor-pointer' onClick={() => setMenuActive(false)}>
                    <img src={assets.dropdown_icon} alt="" className='rotate-180 h-4' />
                    <span>Close</span>
                </div>
                <div className='flex flex-col w-full'>
                    {
                        menus.map((menu, index) => (
                            <NavLink key={index} to={`${menu === menus[0] ? `/` : `/${menu.toLowerCase()}`}`}>
                                <div className='w-full border-b py-5 pl-2 border-gray-400' onClick={() => setMenuActive(false)}>
                                    {menu}
                                </div>
                            </NavLink>
                        ))
                    }
                    {
                        [
                            {
                                title: 'My Profile',
                                path: '/my-profile'
                            },
                            {
                                title: 'Orders',
                                path: '/orders'
                            },
                            {
                                title: 'Logout',
                                path: null
                            }
                        ].map((obj) => (
                            <div key={obj.title} className='w-full border-b py-5 pl-2 uppercase border-gray-400' onClick={() => obj.path === null ? setLogoutModalOpen(true) : navigate(obj.path)}>
                                {obj.title}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar