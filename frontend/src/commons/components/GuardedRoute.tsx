import {Navigate, Route, RouteObject, RouteProps} from "react-router-dom";

export default function (route: RouteObject, hasAccess: boolean) {
  return { ...route, element: hasAccess ? route.element : <Navigate to='/sign-up' /> }
}
