import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

interface data {
  product?: {
    cover: string;
    id: number;
    name: string;
    author: string;
    price: number;
  }[];
}
interface eachcategoryinterface {
  id?: number;
  product?: {
    cover?: string;
  }[];
}

interface inproductinterface {
  cover: string;
  id: number;
  name: string;
  author: string;
  price: number;
}

function categories({ categoryId }) {
  const [ProductsById, setProductsById] = useState<eachcategoryinterface>({});

  const [CoverImages, setCoverImages] = useState<
    {
      action_product_image: { url: string };
    }[]
  >([]);

  const categoriesanddatas: data[] = useSelector(
    (state: {
      HomepageReducer: {
        categoriesanddatas: data[];
      };
    }) => state.HomepageReducer.categoriesanddatas
  );

  useEffect(() => {
    fetchCoverImage();
  }, []);

  // const FetchCoverImage = async () => {
  //   let initialdata = [];
  //   categoriesanddatas.map(
  //     async (eachcategory: eachcategoryinterface, index) => {
  //       if (eachcategory.id == categoryId) {
  //         setProductsById(eachcategory);
  //         eachcategory.product.map(async (eachproduct) => {
  //           const requestData = {
  //             fileName: eachproduct.cover,
  //           };
  //           try {
  //             const response = await axios.post(
  //               'https://assign-api.piton.com.tr/api/rest/cover_image',
  //               requestData
  //             );
  //             initialdata.push(response.data);
  //           } catch (error) {
  //             console.error('Hata:', error.message);
  //           }
  //         });
  //       }
  //     }
  //   );
  //   setCoverImages(initialdata);
  // };

  const fetchCoverImage = async () => {
    const selectedCategory = categoriesanddatas.find(
      (category: eachcategoryinterface) => category.id === categoryId
    );

    if (selectedCategory) {
      setProductsById(selectedCategory);

      const deneme = await Promise.all(
        selectedCategory.product.map(async (eachProduct) => {
          const requestData = {
            fileName: eachProduct.cover,
          };

          try {
            const response = await axios.post(
              'https://assign-api.piton.com.tr/api/rest/cover_image',
              requestData
            );
            return response.data;
          } catch (error) {
            console.error('Hata:', error.message);
            return null;
          }
        })
      );
      setCoverImages(deneme.filter((item) => item !== null));
    }
  };
  return ProductsById.product ? (
    <div className="w-full justify-center items-center p-3 flex flex-row  flex-wrap   ">
      {ProductsById?.product
        .slice(0, 4)
        .map((item: inproductinterface, index) => (
          <Link
            href={`/pages/Details/${item.id}`}
            key={index}
            className=" w-[250px] h-auto mx-5 my-1 p-[10px] bg-[#F4F4FF] border border-solid flex  "
          >
            <img
              src={CoverImages[index]?.action_product_image?.url}
              className="w-1/2 h-[180px]   "
              alt="coverImage"
            />
            <div className="w-1/2 flex flex-col justify-between p-2 ">
              <div>
                <h1 className="uppercase text-base  max-sm:text-sm ">
                  {item.name}
                </h1>
                <h2 className="text-sm text-[#090937] opacity-60 max-sm:text-xs ">
                  {item.author}
                </h2>
              </div>
              <h1 className="text-[#6251DD] text-2xl max-sm:text-xs ">
                {item.price} $
              </h1>
            </div>
          </Link>
        ))}
    </div>
  ) : (
    <p>Yükleniyor...</p>
  );
}

export default categories;
