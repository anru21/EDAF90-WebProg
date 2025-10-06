import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WelcomePage from './welcome-page.tsx'
import ComposeSalad from './compose-salad.tsx'
import PageNotFound from './page-not-found.tsx'

import {createBrowserRouter, RouterProvider } from 'react-router'
import ViewCart from './view-cart.tsx'


const router = createBrowserRouter([
  {
    Component: App,
    
    children: [
      {
        index: true, 
        Component: WelcomePage
      },
      {
        path:'/compose-salad',
        Component: ComposeSalad
      },
      {
        path: '/view-cart/salad?/:saladId?',
        Component: ViewCart
      },
      {
        path:'/*',
        Component: PageNotFound
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
