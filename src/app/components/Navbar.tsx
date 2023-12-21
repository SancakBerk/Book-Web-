import React from 'react';
import Image from 'next/image';
import { IoPersonOutline } from 'react-icons/io5';
import { BiHeart } from 'react-icons/bi';
import { CiShoppingCart, CiSearch } from 'react-icons/ci';
import Logo from '../Images/LoginImages/Logo.png';
import Link from 'next/link';
function Navbar() {
  return (
    <div className=" w-full h-[120px] flex items-center justify-between px-10  flex-row  shadow-md mb-5 ">
      <Link href="/pages/Homepage">
        <Image src={Logo} alt="logo" className="w-14 " />
      </Link>
      <div className="flex flex-row h-[50px] bg-[#F4F4FF] px-[20px] py-[10px] w-1/2 ">
        <CiSearch className="h-full" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#F4F4FF] "
        />
      </div>
      <div className="flex flex-row">
        <Link
          href={'/'}
          className="w-[50px] h-[50px] bg-[#F4F4FF] mx-2 rounded p-3"
          onClick={() => {
            localStorage.removeItem('Tokens');
          }}
        >
          <IoPersonOutline className="text-[#090937] w-full h-full" />
        </Link>
        <Link
          href={'/'}
          className="w-[50px] h-[50px] bg-[#F4F4FF]  mx-2 rounded p-3"
        >
          <BiHeart className="text-[#090937] w-full h-full" />
        </Link>
        <Link
          href={'/'}
          className="w-[50px] h-[50px] bg-[#F4F4FF] mx-2 rounded p-3"
        >
          <CiShoppingCart className="text-[#090937] w-full h-full" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
