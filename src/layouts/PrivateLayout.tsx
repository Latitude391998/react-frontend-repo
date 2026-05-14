// src/layouts/PublicLayout.tsx

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../store/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../services/authApi';
import { toast } from 'react-toastify';

const tabs = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Tab2', path: '/dashboard' },
  { name: 'tab3', path: '/dashboard' },
  { name: 'tab3', path: '/dashboard' },
  { name: 'tab3', path: '/dashboard' },
];

const PrivateLayout = () => {
  const userId = useSelector((state: any) => state.auth?.user?._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  return (
    <div className='min-h-screen bg-gradient-to-r relative from-purple-900 via-black to-blue-900 text-white'>
      {/* Header */}
      <header className='p-4 flex bg-white/10 backdrop-blur-md sticky top-0 z-10'>
        <section className='flex justify-center gap-4'>
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition ${
                  isActive ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/10 hover:bg-white/20'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </section>
        <button
          className='fixed top-[50%] end-0 cursor-pointer'
          style={{ transform: 'translateY(-50%)' }}
          onClick={async () => {
            dispatch(logout());
            const { message } = await logoutApi({ userId }).unwrap();
            toast.info(message);
            navigate('/');
          }}
        >
          Logout
        </button>
      </header>

      {/* Page Content */}
      <main className='p-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
