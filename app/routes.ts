import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./pages/Landing.tsx"),

  // Auth pages
  layout("./layouts/AuthLayout.tsx", [
    route("login", "./pages/Login.tsx"),
    route("register", "./pages/Register.tsx"),
    route("forgot-password", "./pages/ForgotPassword.tsx"),
    route("reset-password", "./pages/ResetPassword.tsx"),
  ]),

  // Main layout driven pages
  layout("./layouts/MainLayout.tsx", [
    route("main", "./pages/PostMainViewPage.tsx"),
    ...prefix("post", [
      route(":postid", "./pages/PostDetailPage.tsx"),
      route("write", "./pages/PostWritePage.tsx"),
    ]),

    ...prefix("user", [route(":userid", "./pages/User.tsx")]),
    route("setting", "./pages/Setting.tsx"),
    route("report", "./pages/ReportPage.tsx"),
  ]),
] satisfies RouteConfig;
