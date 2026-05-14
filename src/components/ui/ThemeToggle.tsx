import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slice/themeSlice';
import './../../styles/themeToggle.css';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: any) => state.theme.mode);

  return (
    <button className='theme-toggle-btn z-20 shadow-lg rounded-full shadow-white/70' onClick={() => dispatch(toggleTheme())}>
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
