import { HTTPMethod } from "../../enums/HTTPMethod";
import type UserResponse from "../../responses/auth/UserResponse";
import type { User } from "../../types/User";
import HTTPRequest from "../HTTPRequest";

export default class UserRequest extends HTTPRequest<UserResponse> {
  constructor() {
    super("/auth/user", HTTPMethod.GET);

    this.setCredentials("include");
    
    this.setHeader("Accept", "application/json");
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<UserResponse> {
    const data = await response.json();
    return {
      user: data as User,
    };
  }
}
