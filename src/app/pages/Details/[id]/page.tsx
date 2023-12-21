// Detay sayfası
'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { CiHeart } from 'react-icons/ci';
import { BiChevronLeft } from 'react-icons/bi';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function DetailsPage({ params }) {
  const router = useRouter();

  const [coverimage, setcoverimage] = useState<string>('');
  const [Product, setProduct] = useState<{
    author?: string;
    name?: string;
    cover?: string;
    description?: string;
    price?: number;
  }>({});

  const FetchProductById = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://assign-api.piton.com.tr/api/rest/product/${params.id}`,
      });
      if (response.data.product_by_pk == null) {
        alert('Product not found');
        router.push('/pages/Homepage');
      }
      setProduct(response.data.product_by_pk);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  useEffect(() => {
    FetchProductById();
  }, []);

  const FetchProductCoverImage = async () => {
    const requestData = {
      fileName: Product.cover,
    };
    try {
      const response = await axios.post(
        'https://assign-api.piton.com.tr/api/rest/cover_image',
        requestData
      );

      setcoverimage(response.data.action_product_image.url);
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };
  useEffect(() => {
    if (Product?.cover) {
      FetchProductCoverImage();
    }
  }, [Product]);
  return (
    <div>
      <div className="flex flex-col items-center ">
        <Navbar />
        <div className="flex w-[1320px] ">
          <Link
            href={'/pages/Homepage'}
            className="font-bold text-2xl flex flex-row  items-center mb-5 "
          >
            <div>
              <BiChevronLeft />
            </div>
            <h1>Book Details</h1>
          </Link>
        </div>
        <div className="flex items-center w-screen justify-center ">
          <div className="w-[1320px] flex ">
            <div className="p-16 bg-[#F4F4FF] border rounded w-2/5 ">
              {coverimage && (
                <img src={coverimage} alt="coverimage" className=" " />
              )}
            </div>
            <div className="ml-10 w-full flex flex-col relative ">
              <div>
                <div className="flex flex-row justify-between ">
                  <h1 className="text-[40px] font-bold uppercase ">
                    {Product && Product?.name}
                  </h1>
                  <div className="w-[44px] h-[44px] rounded-full bg-[#F4F4FF] flex items-center justify-center cursor-pointer  ">
                    <CiHeart className="text-[#6251DD] text-2xl" />
                  </div>
                </div>
                <h1 className="text-[32px] font-semibold opacity-60 ">
                  {Product && Product?.author}
                </h1>
              </div>
              <div className="mt-14">
                <div className=" text-[#090937]   text-2xl ">Summary</div>
                <p className="opacity-60">{Product?.description}</p>
              </div>

              <div className="absolute bottom-0 right-0">
                <button className="flex flex-row justify-between bg-[#EF6B4A] w-[400px] items-center p-3 ">
                  <h1 className="text-white font-semibold text-xl  ">
                    {Product && Product?.price}$
                  </h1>
                  <h1 className="text-white font-semibold text-xl  ">
                    Buy Now
                  </h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
