import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./features/LandingPage.tsx"),

  route("home", "./features/Home.tsx"),
  route("login", "./features/Login.tsx"),
  route("register", "./features/Register.tsx"),
  route("reset-password-request","./features/ResetPasswordRequest.tsx"),
  route("reset-password","./features/ResetPassword.tsx"),
  route("main","./features/MainPage.tsx"),
] satisfies RouteConfig;
