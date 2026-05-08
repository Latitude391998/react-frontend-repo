// pages/Register.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { RegisterFormData, registerSchema } from '../assets/schemas/authSchema';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slice/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerUser(data).unwrap();

      // store token
      localStorage.setItem('token', res.token);
      dispatch(setCredentials(res));
      // redirect
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      alert(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-6 rounded-2xl shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>

        {/* Email */}
        <div className='mb-4'>
          <label className='block mb-1'>Email</label>
          <input type='email' {...register('email')} className='w-full p-2 text-black border rounded-lg' />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>

        <div className='mb-4'>
          <label className='block mb-1'>Name</label>
          <input type='text' {...register('name')} className='w-full p-2 text-black border rounded-lg' />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label className='block mb-1'>Password</label>
          <input type='password' {...register('password')} className='w-full p-2 border rounded-lg text-black' />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button type='submit' disabled={isLoading} className='w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700'>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
