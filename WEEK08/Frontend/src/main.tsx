import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage.tsx'
import ProductFormPage from './pages/ProductFormPage.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListPage/>
  },

  {
    path: "/ProductFormPage",
    element: <ProductFormPage/>
  },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
