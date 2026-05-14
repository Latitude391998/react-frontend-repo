import React, { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import ThemeToggle from './components/ui/ThemeToggle';

function App() {
  const mode = useSelector((state: any) => state?.theme?.mode);

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <div className='App'>
      <div className='fixed bottom-3 right-3 z-50'>
        <ThemeToggle />
      </div>

      <AppRoutes />
      {/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
