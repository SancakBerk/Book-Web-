'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { BiChevronLeft } from 'react-icons/bi';
import { useSearchParams } from 'next/navigation';

function page({ params }) {
  const searchParams = useSearchParams();

  const Categoryname = searchParams.get('categoryname');

  const [ProductsById, setProductsById] = useState<{ product?: object[] }>({});
  const [CoverImages, setCoverImages] = useState<
    {
      action_product_image: {
        url: string;
      };
    }[]
  >([]);
  const [categoriname, setcategoriname] = useState<string>('');

  useEffect(() => {
    ProductsbyCategorieIdFetch();
  }, []);
  useEffect(() => {
    if (Object.keys(ProductsById).length > 0) {
      FetchCoverImages();
    }
  }, [ProductsById]);

  const ProductsbyCategorieIdFetch = async () => {
    const apiUrl = `https://assign-api.piton.com.tr/api/rest/products/${params.id}`;

    await axios
      .get(apiUrl)
      .then((response) => {
        setProductsById(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const FetchCoverImages = async () => {
    try {
      const newCoverImages = await Promise.all(
        ProductsById.product.map(async (item: { cover: string }) => {
          const response = await axios.post(
            'https://assign-api.piton.com.tr/api/rest/cover_image',
            {
              fileName: item.cover,
            }
          );
          return response.data;
        })
      );

      setCoverImages((prevCoverImages) => [
        ...prevCoverImages,
        ...newCoverImages,
      ]);
    } catch (error) {
      console.error('Error fetching cover images:', error);
    }
  };
  return (
    <div className="flex flex-col items-center flex-wrap ">
      <Navbar />
      <div className="flex w-4/5 ">
        <Link
          href={'/pages/Homepage'}
          className="font-bold text-2xl flex flex-row  items-center"
        >
          <div>
            <BiChevronLeft />
          </div>
          <h1> {Categoryname} </h1>
        </Link>
      </div>
      <div className="flex items-center w-screen justify-center ">
        <div className="w-4/5 ">
          <div className="flex flex-wrap w-full justify-center m-auto ">
            {ProductsById?.product?.map(
              (
                item: {
                  id: number;
                  name: string;
                  author: string;
                  price: number;
                },
                index
              ) => (
                <div
                  key={index}
                  className="w-[250px] m-2 p-[10px] bg-[#F4F4FF] border border-solid flex flex-col rounded   "
                >
                  <Link href={`/pages/Details/${item.id}`}>
                    <img
                      src={CoverImages[index]?.action_product_image?.url}
                      alt="coverImage"
                      className="w-full h-auto"
                    />
                  </Link>

                  <div className="flex flex-row justify-between p-2  ">
                    <div>
                      <h1 className="uppercase">{item.name}</h1>
                      <h2 className="text-base text-[#090937] opacity-60 ">
                        {item.author}
                      </h2>
                    </div>
                    <h1 className="text-[#6251DD] text-xl ">{item.price} $</h1>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
