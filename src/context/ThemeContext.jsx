/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const themeStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#000',
    color: theme === 'light' ? '#000' : '#fff',
  };

  const values = { toggleTheme, themeStyle };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeProvider;
