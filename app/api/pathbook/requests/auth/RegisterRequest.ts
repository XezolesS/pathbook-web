import { HTTPMethod } from "../../enums/HTTPMethod";
import { NoResponse } from "../../responses/NoResponse";
import HTTPRequest from "../HTTPRequest";

export default class RegisterRequest extends HTTPRequest<NoResponse> {
  constructor(id: string, username: string, email: string, password: string) {
    super("/auth/register", HTTPMethod.POST);

    this.setHeader("Content-Type", "application/json");

    this.setBody("id", id);
    this.setBody("username", username);
    this.setBody("email", email);
    this.setBody("password", password);
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<NoResponse> {
    const data = await response.text();
    console.debug(data);

    return;
  }
}
