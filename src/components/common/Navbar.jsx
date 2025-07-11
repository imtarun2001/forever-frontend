import { useState } from 'react';
import {assets} from '../../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom';
import { useShopContext } from '../../contexts/ShopContext';

const Navbar = () => {

    const {setShowSearchbar} = useShopContext();

    const menus = [`HOME`,`COLLECTION`,`ABOUT`,`CONTACT`,`Admin Panel`];
    const [hrActive,setHrActive] = useState(menus[0]);
    const [menuActive,setMenuActive] = useState(false);

  return (
    <div className="w-full flex items-center justify-between py-5 font-medium">
      {/* logo */}
      <Link to='/'><img src={assets.logo} alt="" className="w-36" /></Link>

      {/* menus */}
      <div className="hidden sm:flex items-center gap-5 text-sm text-gray-700">
        {
            menus.map((menu, index) =>
            index < menus.length - 1 ?
                <NavLink key={index} to={`${menu === menus[0] ? '/' : menu.toLowerCase()}`} className='flex flex-col items-center gap-1'>
                <span onClick={() => setHrActive(menu)} className="cursor-pointer">
                    {menu}
                </span>
                <hr className={`${hrActive === menu ? `w-2/3` : `w-0`} h-[1.5px] border-none bg-gray-700`} />
                </NavLink>
            :
                <NavLink key={index} to="/adminpanel">
                <button className="py-[0.4rem] px-[0.6rem] cursor-pointer rounded-2xl outline outline-gray-300">
                    {menu}
                </button>
                </NavLink>
        )}
      </div>

      {/* search profile and cart icon */}
      <div className="flex items-center justify-center gap-5 sm:gap-10">
        <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' onClick={() => setShowSearchbar(prev => !prev)}/>
        <div className='group relative'>
            <img src={assets.profile_icon} alt="" className='w-5 min-w-5 cursor-pointer'/>
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    {
                        ['My Profile','Orders','Logout'].map((ele) => (
                            <p key={ele} className='cursor-pointer hover:text-black'>{ele}</p>
                        ))
                    }
                </div>
            </div>
        </div>
        <Link className='relative' to='/cart'>
            <img src={assets.cart_icon} alt="" className='w-5 min-w-5'/>
            <p className='bg-black rounded-full absolute left-2 top-2.5 text-white w-4 text-center leading-4 aspect-square text-[8px]'>10</p>
        </Link>
        <img src={assets.menu_icon} onClick={() => setMenuActive(true)} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* sidebar menu for small screen */}
        <div className={`sm:hidden z-1000 absolute top-0 bottom-0 left-0 overflow-hidden flex justify-start items-end flex-col font-semibold bg-black text-white opacity-90 transition-all duration-300 ${menuActive ? 'w-full' : 'w-0'}`}>
            <div className='w-full flex hover:bg-gray-600 items-center justify-end gap-4 pr-2 py-5 border-b border-white cursor-pointer' onClick={() => setMenuActive(false)}>
                <img src={assets.dropdown_icon} alt="" className='rotate-180 h-4'/>
                <span>Close</span>
            </div>
            <div className='flex flex-col w-full'>
                {
                    menus.map((menu,index) => (
                        index < menus.length - 1 ?
                        <NavLink key={index} to={`${menu === menus[0] ? '/' : menu.toLowerCase()}`}>
                            <div className='w-full border-b py-5 pl-2 border-gray-400' onClick={() => setMenuActive(false)}>
                                {menu}
                            </div>
                        </NavLink>
                        :
                        <NavLink key={index} to='/adminpanel'>
                            <div key={index} className='w-full border-b py-5 pl-2 border-gray-400' onClick={() => setMenuActive(false)}>
                                {menu.toUpperCase()}
                            </div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    </div>
  );
}

export default Navbar