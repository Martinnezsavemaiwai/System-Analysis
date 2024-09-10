import { RouteObject } from "react-router-dom";
import Home from "../pages/Home/Home";
import Product from "../pages/Product";
import Selected from "../pages/Selected";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import MinimalLayout from "../layout/MinimalLayOut/MinimalLayOut";


import Login from "../pages/Authentication/Login/Login";
import Cart from "../pages/Cart";
import ProductList from "../pages/Management/ProductList";
import ProductCreate from "../pages/Management/create/ProductCreate";
import ProductEdit from "../pages/Management/edit/ProductEdit";

// import Login from "../pages/Authentication/Login/Login";

const OwnerRoutes = (): RouteObject => {
 
    return {

        path: "/",

        element: <MinimalLayout/>,

        children: [
            {
                path: "/",
                element: <ProductList />
            },
            {
                path: "/Login",

                element: <Login />,
            },
            {
                path: "/product",
                element: <Product />
            },
            {
                path: "/Selected",
                element: <Selected />
            },
            {
                path: "/Profile",
                element: <Profile />
            },
            {
                path: "/Cart",
                element: <Cart />
            },
            {
                path: "/Profile",
                element: <Profile />
            },
            {
                path: "/ProductManagement",
                element: <ProductList />
            },
            {
                path: '/Product/Create',
                element: <ProductCreate/>

            },
            {
                path: "/Product/Edit/:id",
                element: <ProductEdit/>
            }

        ],

    };

};


export default OwnerRoutes;