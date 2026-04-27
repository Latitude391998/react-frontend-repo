import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slice/themeSlice';
import '../../styles/themeToggle.css';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: any) => state.theme.mode);

  return (
    <button className='theme-toggle-btn' onClick={() => dispatch(toggleTheme())}>
      {mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;
