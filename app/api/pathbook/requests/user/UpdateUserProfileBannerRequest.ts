import { HTTPMethod } from "../../enums/HTTPMethod";
import type UserResponse from "../../responses/auth/UserProfileResponse";
import { File } from "../../types/File";
import type { User } from "../../types/User";
import HTTPRequest from "../HTTPRequest";

export default class UpdateUserProfileBannerRequest extends HTTPRequest<File> {
  constructor(file: Blob) {
    super("/user/update/banner", HTTPMethod.PUT);

    this.setCredentials("include");

    this.setBodyType("multipart/form-data");
    this.setBody("bannerFile", file);

    this.setHeader("Accept", "application/json");
  }

  protected override async parseSuccessResponse(
    response: Response
  ): Promise<File> {
    const data = await response.json();
    return data as File;
  }
}
