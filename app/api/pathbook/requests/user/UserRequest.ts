import { HTTPMethod } from "../../enums/HTTPMethod";
import type UserResponse from "../../responses/auth/UserResponse";
import type { User } from "../../types/User";
import HTTPRequest from "../HTTPRequest";

export default class UserRequest extends HTTPRequest<UserResponse> {
  constructor(userId: string) {
    super("/user/:userId", HTTPMethod.GET);

    this.setCredentials("include");
    this.setPathParam("userId", userId);
    
    this.setHeader("Accept", "application/json");
  }

  protected override async parseSuccessResponse(
    response: Response
  ): Promise<UserResponse> {
    const data = await response.json();
    return {
      user: data as User,
    };
  }
}
