import { HTTPMethod } from "../../enums/HTTPMethod";
import type UserResponse from "../../responses/auth/UserResponse";
import HTTPRequest from "../HTTPRequest";

export default class UserRequest extends HTTPRequest<UserResponse> {
  constructor() {
    super("/auth/user", HTTPMethod.GET);

    this.credentials = "include";
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<UserResponse> {
    const data = await response.json();
    return data as UserResponse;
  }
}
