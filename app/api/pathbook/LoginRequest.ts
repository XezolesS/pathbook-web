import { AppConfig } from "./AppConfig";

export class LoginRequest {
  public static async login(email: string, password: string): Promise<any> {
    const response = await fetch(`${AppConfig.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
        "Credntial": "include",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  }
}
