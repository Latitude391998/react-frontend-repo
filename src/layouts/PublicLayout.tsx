// src/layouts/PublicLayout.tsx

import { Outlet, NavLink } from 'react-router-dom';

const tabs = [
  { name: 'Trending', path: '/' },
  { name: 'About Me', path: '/about-me' },
  { name: 'Contact Me', path: '/contact-me' },
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' },
];

const PublicLayout = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white'>
      {/* Header */}
      <header className='p-4 flex justify-center gap-4 bg-white/10 backdrop-blur-md sticky top-0 z-10'>
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
      </header>

      {/* Page Content */}
      <main className='p-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
