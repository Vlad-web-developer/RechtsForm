import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import '../css/ThemeToggle.css';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  return (
    <div className="theme-switch-container">
      <label className="switch-label">
        <input 
          type="checkbox" 
          checked={isDarkMode} 
          onChange={() => setIsDarkMode(!isDarkMode)} 
        />
        <span className="slider-dynamic">
          <div className="icon-layer">
            <Sun size={18} className="sun-svg" />
            <Moon size={18} className="moon-svg" />
          </div>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;