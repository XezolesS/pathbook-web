import { Outlet, redirect } from "react-router";
import textLogo from "../assets/textLogo.png";
import { parseCookies } from "../scripts/cookie";
import "./AuthLayout.css";
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
  return (
    <>
      <div className="logo">
        <a href="./#">
          <img src={textLogo}></img>
        </a>
      </div>
      <Outlet />
    </>
  );
}
