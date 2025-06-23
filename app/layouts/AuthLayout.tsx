import { Outlet, redirect, useLocation } from "react-router";
import textLogo from "../assets/textLogo.png";
import { parseCookies } from "../scripts/cookie";
import type { Route } from "./pages/+types/AuthLayout";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const isLoggedIn = cookies.get("logged_in");

  if (isLoggedIn) {
    throw redirect("/main");
  }

  return { isLoggedIn: isLoggedIn };
}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const isSignupComplete = location.pathname.toLowerCase().includes("signupcomplete");

  return (
    <>
      {!isSignupComplete && (
        <div className="logo">
          <a href="./#">
            <img src={textLogo} alt="로고" />
          </a>
        </div>
      )}
      <Outlet />
    </>
  );
}
