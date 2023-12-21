'use client';
import React, { useEffect, useState } from 'react';
import Eachcard from './components/Eachcard';
import Link from 'next/link';
import Nav from '../../components/Navbar';

import { useDispatch, useSelector } from 'react-redux';
import { Fetchalldata } from '../../Redux/Slices/HomepageSlice';

import { AppDispatch } from '../../Redux/Store';

function page() {
  const dispatch: AppDispatch = useDispatch();

  const categoriesanddatas: Array<object> = useSelector(
    (state: { HomepageReducer: { categoriesanddatas: Array<object> } }) =>
      state.HomepageReducer.categoriesanddatas
  );
  useEffect(() => {
    dispatch(Fetchalldata());
  }, []);
  return (
    <main className="w-screen h-auto flex flex-col items-center ">
      <Nav />

      <div className="w-4/5 h-[480px] overflow-hidden ">
        <img src="/banner.jpeg" alt="banner" className="w-full h-full   " />
      </div>
      {categoriesanddatas?.map(
        (
          item: {
            name: string;
            id: number;
          },
          index
        ) => {
          return (
            <div key={index} className="w-4/5 my-10 flex flex-col  ">
              <div className="flex flex-row justify-between px-6">
                <h1 className="text-3xl"> {item.name} </h1>
                <Link
                  href={`/pages/Categories/${item.id}?categoryname=${item.name}`}
                  className="text-[#EF6B4A] text-xl font-bold "
                >
                  View ALL
                </Link>
              </div>
              <Eachcard categoryId={item.id} key={index} />
            </div>
          );
        }
      )}
    </main>
  );
}

export default page;
