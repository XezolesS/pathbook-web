import { HTTPMethod } from "../../enums/HTTPMethod";
import type UserResponse from "../../responses/auth/UserProfileResponse";
import type { User } from "../../types/User";
import HTTPRequest from "../HTTPRequest";

export default class MeRequest extends HTTPRequest<UserResponse> {
  constructor() {
    super("/auth/me", HTTPMethod.GET);

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
