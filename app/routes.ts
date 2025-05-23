import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("./pages/Landing.tsx"),
  route("mypage", "./pages/MyPage.tsx"),
  route("setting", "./pages/Setting.tsx"),

  route("login", "./pages/Login.tsx"),
  route("register", "./pages/Register.tsx"),
  route("forgot-password", "./pages/ForgotPassword.tsx"),
  route("reset-password", "./pages/ResetPassword.tsx"),

  route("main", "./pages/Main.tsx"),

  ...prefix("user", [route(":uid", "./pages/User.tsx")]),
] satisfies RouteConfig;
