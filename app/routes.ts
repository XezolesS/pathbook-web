import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./pages/Landing.tsx"),
  
  route("login", "./pages/Login.tsx"),
  route("register", "./pages/Register.tsx"),
  route("forgot-password", "./pages/ForgotPassword.tsx"),
  route("reset-password", "./pages/ResetPassword.tsx"),

  route("main", "./pages/Main.tsx"),
  route("home", "./features/Home.tsx"),
] satisfies RouteConfig;
