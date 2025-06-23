import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./pages/LandingPage.tsx"),

  // Auth pages
  layout("./layouts/AuthLayout.tsx", [
    route("login", "./pages/LoginPage.tsx"),
    route("registered", "./pages/RegisteredPage.tsx"),
    route("register", "./pages/RegisterPage.tsx"),
    route("forgot-password", "./pages/ForgotPasswordPage.tsx"),
    route("reset-password", "./pages/ResetPasswordPage.tsx"),
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
