import { useRoutes, RouteObject } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import OwnerRoutes from "./OwerRoutes";


function ConfigRoutes() {

    const isLoggedIn = localStorage.getItem("isLogin") === "true";

    let routes: RouteObject[] = [];

    if (isLoggedIn) {
        routes = [OwnerRoutes()];
    } 
    else {
        routes = [MainRoutes()];
    }

    return useRoutes(routes);
}

export default ConfigRoutes;