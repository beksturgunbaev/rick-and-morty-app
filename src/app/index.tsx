import './index.css';
import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return <RouterProvider router={router} />
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Provider store={store}><App /></Provider>);