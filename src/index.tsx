// css stylesheets
import './assets/css/utils.css';  
import './assets/css/vars/_fonts.css';  
import './assets/css/vars/_theme.css';

// pages
import Landing from './landing';

// custom imports
import './icons';
import { getTheme } from './utils';
import { themeContextType, themeType } from './types';

// third party
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
export const ThemeContext = React.createContext<themeContextType | null>(null);

function AKatary() {
    const [theme, setTheme] = useState<themeType>(getTheme())

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setTheme(getTheme())
    });
    
    return (
      <ThemeContext.Provider value={{theme, setTheme}}>
        <BrowserRouter>
          <Routes >
            <Route path={"/"} element={<Landing />}/>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    )
}
root.render(
  // <React.StrictMode>
    <AKatary />
  // </React.StrictMode>
);

