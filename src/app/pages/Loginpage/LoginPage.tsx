'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Banner from '../../Images/LoginImages/loginbanner.jpeg';
import Logo from '../../Images/LoginImages/Logo.png';

interface FormData {
  ischecked: boolean;
  email: string;
  password: string;
  name?: string;
}

function Login() {
  const [formsubmitted, setformsubmitted] = useState<Boolean>(true);
  const [islogging, setislogging] = useState<Boolean>(true);
  const router = useRouter();

  const schema1 = yup.object().shape({
    ischecked: yup.bool(),
    email: yup.string().email().required('Email Required'),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters').")
      .max(20, "Password must be maximum 20 characters').")
      .required('Password Required'),

    name: yup.string().when(islogging.toString(), ([], schema) => {
      return islogging.toString() === 'false'
        ? schema.required('Name Required')
        : schema.notRequired();
    }),
  });
  useEffect(() => {
    const token = localStorage.getItem('Tokens');

    if (token) {
      alert('Anasayfaya yönlendiriliyorsunuz...');
      router.push('/pages/Homepage');
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema1),
  });

  const Loginhandle = async (data: FormData) => {
    setformsubmitted(true);

    if (islogging) {
      alert('Successfull Login');
      try {
        const response = await axios<{
          action_login: {
            token: string;
          };
        }>({
          method: 'POST',
          url: 'https://assign-api.piton.com.tr/api/rest/login',
          data: {
            email: data.email,
            password: data.password,
          },
        });
        if (data.ischecked) {
          localStorage.setItem('Tokens', response.data.action_login.token);
        }

        router.push(`/pages/Homepage`);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Successfull Register');
      try {
        const response = await axios({
          method: 'POST',
          url: 'https://assign-api.piton.com.tr/api/rest/register',
          data: {
            email: data.email,
            name: data.name,
            password: data.password,
          },
        });

        console.log('REGISTER TOKEN', response.data);
        router.push(`/pages/Homepage`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <main className="w-screen h-screen flex flex-row relative">
      <div className="w-1/2 h-full  max-md:hidden">
        <Image src={Banner} alt="banner" className="w-full h-full" />
      </div>
      <form
        className="w-1/2 h-full flex flex-col items-center justify-between py-9 max-md:w-full "
        onSubmit={handleSubmit(Loginhandle)}
      >
        <div className="w-32 h-20">
          <Image src={Logo} alt="logo" />
        </div>
        <div className="w-3/5">
          <h2 className="text-2xl text-[#090937] opacity-60 max-sm:text-md ">
            Welcome back!
          </h2>
          <h1 className="text-[32px] text-[#09093] font-bold max-sm:text-sm ">
            Login to your account
          </h1>
        </div>
        {islogging ? null : (
          <div className="w-3/5">
            <h2>Name</h2>
            <input
              className="h-[60px] p-4 w-full bg-[#F4F4FF] animate "
              type="text"
              placeholder="john"
              {...register('name', {
                required: 'Please enter your first name.',
              })} // custom message
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
        )}

        <div className="w-3/5">
          <h2>E-mail</h2>
          <input
            className="h-[60px] p-4 w-full bg-[#F4F4FF] "
            type="email"
            placeholder="john@mail.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="w-3/5">
          <h2>Password</h2>
          <input
            className="h-[60px] p-4 w-full bg-[#F4F4FF] anima "
            type="password"
            placeholder="********"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="w-3/5 flex flex-row text-[#6251DD] text-base font-bold  ">
            <input
              type="checkbox"
              className="mr-1 cursor-pointer"
              {...register('ischecked')}
            />
            <h2>Remember Me</h2>
          </div>
        </div>
        <div className="w-3/5 flex flex-col items-start ">
          <button
            className="bg-[#EF6B4A] w-full text-white text-2xl font-semibold px-5 py-[10px] rounded m-2 max-sm:text-sm "
            id="loginid"
            type="submit"
          >
            {islogging ? 'Login' : 'Register'}
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setislogging(!islogging);
            }}
            className=" w-full text-[#6251DD] text-2xl font-semibold px-5 py-[10px] rounded border-[#6251DD] border m-2 max-sm:text-sm "
          >
            {islogging ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
    </main>
  );
}
export default Login;
