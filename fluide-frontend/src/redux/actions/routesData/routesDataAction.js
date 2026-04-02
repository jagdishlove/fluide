import { CURRENT_ROUTE_PAGE } from "./routesDataActionTypes";



export const routeDataAction = (page) =>({
    type:CURRENT_ROUTE_PAGE,
    payload:page
})