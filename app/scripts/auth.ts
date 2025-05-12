import Cookies from "js-cookie";

export function checkLoggedIn(): boolean {
  const loggedIn = Cookies.get("logged_in");
  console.debug(loggedIn);

  return loggedIn === "1";
}
