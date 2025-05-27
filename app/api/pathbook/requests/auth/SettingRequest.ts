import { HTTPMethod } from "../../enums/HTTPMethod";
import HTTPRequest from "../HTTPRequest";

export class ChangeEmailRequest extends HTTPRequest<{ message: string }> {
  constructor(newEmail: string) {
    super("/api/user/email-change", HTTPMethod.POST);
    this.setCredentials("include");
    this.setHeader("Content-Type", "application/json");
    this.setBody("newEmail", newEmail);
  }
  protected async parseSuccessResponse(response: Response): Promise<{ message: string }> {
    return await response.json();
  }
}

export class ChangePasswordRequest extends HTTPRequest<{ message: string }> {
  constructor(currentPassword: string, newPassword: string) {
    super("/api/user/password-change", HTTPMethod.POST);
    this.setCredentials("include");
    this.setHeader("Content-Type", "application/json");
    this.setBody("currentPassword", currentPassword);
    this.setBody("newPassword", newPassword);
  }
  protected async parseSuccessResponse(response: Response): Promise<{ message: string }> {
    return await response.json();
  }
}

export class DeleteAccountRequest extends HTTPRequest<{ message: string }> {
  constructor() {
    super("/api/user/delete", HTTPMethod.DELETE);
    this.setCredentials("include");
  }
  protected async parseSuccessResponse(response: Response): Promise<{ message: string }> {
    return await response.json();
  }
}
