import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return <RouterProvider router={router} />
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);