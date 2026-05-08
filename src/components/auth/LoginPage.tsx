import React from 'react';
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slice/authSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

// VALIDATION
const schema = z.object({
  email: z.string().min(3, 'Email required'),
  password: z.string().min(6, 'Password must be 6+ chars'),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-80 p-6 bg-gray-100 dark:bg-gray-800 rounded shadow'>
        <h2 className='text-xl mb-4 text-center'>Login</h2>

        <input {...register('email')} placeholder='Email' className='w-full p-2 mb-2 border rounded text-black' />
        <p className='text-red-500 text-sm'>{errors.email?.message}</p>

        <input
          type='password'
          {...register('password')}
          placeholder='Password'
          className='w-full p-2 mb-2 border rounded text-black'
        />
        <p className='text-red-500 text-sm'>{errors.password?.message}</p>

        <button type='submit' disabled={isLoading} className='w-full p-2 bg-blue-600 rounded mt-2'>
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <div className='text-center my-2'>OR</div>

        <button type='button' className='w-full p-2 bg-red-500 text-white rounded mb-2'>
          Google
        </button>

        <button type='button' className='w-full p-2 bg-blue-700 text-white rounded'>
          Facebook
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
