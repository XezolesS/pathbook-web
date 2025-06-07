import { HTTPMethod } from "../../enums/HTTPMethod";
import type UserResponse from "../../responses/auth/UserResponse";
import ImageResponse from "../../responses/ImageResponse";
import type { User } from "../../types/User";
import HTTPRequest from "../HTTPRequest";

export default class UserRequest extends HTTPRequest<ImageResponse> {
  constructor(userId: string) {
    super("/user/:userId/banner", HTTPMethod.GET);

    this.setCredentials("include");
    this.setPathParam("userId", userId);
    
    this.setHeader("Accept", "image");
  }

  protected override async parseSuccessResponse(
    response: Response
  ): Promise<ImageResponse> {
    const data = await response.blob();
    return {
      image: data,
    };
  }
}
