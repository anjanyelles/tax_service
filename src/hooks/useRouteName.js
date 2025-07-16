import { getRoutesByRole } from "routes";

export const useRouteName = () => {
  const role = sessionStorage.getItem("userRole") || "employee"; 
  const routes = getRoutesByRole(role);
  const currentPath = window.location.pathname;
  let name = "";

  routes.forEach((route) => {
    if (currentPath.indexOf(route.layout + route.path) !== -1) {
      name = route.name;
    }
  });

  return name;
};
