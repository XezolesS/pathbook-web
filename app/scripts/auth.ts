import UserRequest from "../api/pathbook/requests/auth/UserRequest";
import Cookies from "js-cookie";

export async function loadUser() {
  try {
    const request = new UserRequest();
    const user = await request.send();

    return { user };
  } catch (error) {
    return { user: null };
  }
}

export function checkAuthToken(): boolean {
  console.debug(Cookies.get("JSESSIONID"));

  return !Cookies.get("JSESSIONID");
}
