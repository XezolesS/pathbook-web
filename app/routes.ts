import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./features/LandingPage.tsx"),

  route("home", "./features/Home.tsx"),
  route("login", "./features/Login.tsx"),
  route("register", "./features/Register.tsx"),
] satisfies RouteConfig;
