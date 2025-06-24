import { HTTPMethod } from "../../enums/HTTPMethod";
import type UserResponse from "../../responses/auth/UserProfileResponse";
import type { User } from "../../types/User";
import HTTPRequest from "../HTTPRequest";

export default class UpdateUserProfileRequest extends HTTPRequest<UserResponse> {
  constructor(user: User) {
    super("/user/update/data", HTTPMethod.PUT);

    this.setCredentials("include");
    this.setBody("id", user.id);
    this.setBody("email", user.email);
    this.setBody("username", user.username);
    this.setBody("sex", user.sex);
    this.setBody("birthDate", user.birthDate);
    this.setBody("bio", user.bio);
    
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
