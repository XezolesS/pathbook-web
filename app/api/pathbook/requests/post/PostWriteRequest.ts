import { HTTPMethod } from "../../enums/HTTPMethod";
import { NoResponse } from "../../responses/NoResponse";
import HTTPRequest from "../HTTPRequest";

export default class PostWriteRequest extends HTTPRequest<NoResponse> {
  constructor(
    contents: {
      title: string;
      content: string;
      path: { pathPoints: { latitude: number; longitude: number }[] };
    },
    pathThumbnail?: Blob,
    attachments: File[] = []
  ) {
    super("/post/write", HTTPMethod.POST);
    this.setCredentials("include"); 
    this.setBodyType("multipart/form-data");
    this.setBody(
      "contents",
      new Blob([JSON.stringify(contents)], { type: "application/json" })
    );

    if (pathThumbnail) 
      this.setBody("path_thumbnail", pathThumbnail);
    attachments.forEach((file) => this.setBody("attachments", file));
    this.setHeader("Accept", "application/json");
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<NoResponse> {
    const data = await response.json();
    console.debug(data.message);

    return;
  }
}
