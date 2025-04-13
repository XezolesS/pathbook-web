import { AppConfig } from "./AppConfig";

export class RegisterRequest {
  public static async register(
    id: string,
    username: string,
    password: string,
    email: string
  ): Promise<any> {
    const response = await fetch(`${AppConfig.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  }
}
