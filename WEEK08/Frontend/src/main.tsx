import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage.tsx'
import ProductCreate from './pages/create/index.tsx'
import ProductEdit from './pages/edit/index.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListPage/>
  },

  {
    path: "/ProductFormPage",
    element: <ProductCreate/>
  },

  {
    path: "/Product/Edit/:id",
    element: <ProductEdit/>
  }
 

])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
