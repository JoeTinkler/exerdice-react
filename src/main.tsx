import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from '@providers/providers';
import { ThemeProvider } from '@providers/theme';
import { ProfileProvider } from '@providers/profile';
import { Routes } from './routes';
import './normalize.css'
import { SQLocalProvider } from '@providers/sqLocal';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Providers providers={[ProfileProvider, ThemeProvider, SQLocalProvider]}>
      <Routes />
    </Providers>
    {/* <App /> Uncomment this line to render the App component */}
  </React.StrictMode>
)
