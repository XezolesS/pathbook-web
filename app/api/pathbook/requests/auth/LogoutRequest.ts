import { HTTPMethod } from "../../enums/HTTPMethod";
import { NoResponse } from "../../responses/NoResponse";
import HTTPRequest from "../HTTPRequest";

export default class LogoutRequest extends HTTPRequest<NoResponse> {
  constructor() {
    super("/auth/logout", HTTPMethod.POST);

    this.credentials = "include";
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<NoResponse> {
    const data = await response.json();
    console.debug(data.message);

    return;
  }
}
