import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./pages/Landing.tsx"),
  
  route("login", "./pages/Login.tsx"),
  route("register", "./features/Register.tsx"),
  route("reset-password-request", "./features/ResetPasswordRequest.tsx"),
  route("reset-password", "./features/ResetPassword.tsx"),

  route("main", "./pages/Main.tsx"),
  route("home", "./features/Home.tsx"),
] satisfies RouteConfig;
