import { HTTPMethod } from "../../enums/HTTPMethod";
import ImageResponse from "../../responses/ImageResponse";
import type { User } from "../../types/User";
import HTTPRequest from "../HTTPRequest";

export default class UserRequest extends HTTPRequest<ImageResponse> {
  constructor(userId: string) {
    super("/user/:userId/icon", HTTPMethod.GET);

    this.setCredentials("include");
    this.setPathParam("userId", userId);
    
    this.setHeader("Accept", "application/json");
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
