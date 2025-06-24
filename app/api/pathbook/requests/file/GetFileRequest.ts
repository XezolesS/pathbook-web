import { HTTPMethod } from "../../enums/HTTPMethod";
import HTTPRequest from "../HTTPRequest";
import { File } from "../../types/File";

export default class GetFileRequest extends HTTPRequest<null> {
  constructor(filename: string) {
    super("/file/f/:filename", HTTPMethod.GET);

    this.setCredentials("include");
    this.setPathParam("filename", filename);
  }

  public resolveUrl(): string {
    return this.buildUrl();
  }

  protected override async parseSuccessResponse(
    response: Response
  ): Promise<null> {
    return null;
  }
}
