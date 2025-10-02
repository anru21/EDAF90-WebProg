import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider } from 'react-router'


const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path:'', 
        element:<p>Hello</p>
      },
      {
        path:'/compose-salad',
        element:<h1>Tjena</h1>
      },
      {
        path:'/view-cart',
        element:<h1>Kolla din varukorg</h1>
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
