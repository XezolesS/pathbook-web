import { HTTPMethod } from "../enums/HTTPMethod";
import type LoginResponse from "../responses/LoginResponse";
import HTTPRequest from "./HTTPRequest";

export default class LoginRequest extends HTTPRequest<LoginResponse> {
  constructor(email: string, password: string) {
    super("/auth/login", HTTPMethod.POST);

    this.setHeader("Content-Type", "application/json");
    this.setBody("email", email);
    this.setBody("password", password);
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<LoginResponse> {
    const data = await response.json();
    return data as LoginResponse;
  }
}
