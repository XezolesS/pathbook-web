import { HTTPMethod } from "../../enums/HTTPMethod";
import type { PostResponse } from "../../responses/post/PostResponse";
import HTTPRequest from "../HTTPRequest";

export default class PostDetailRequest extends HTTPRequest<PostResponse> {
  constructor(postId: number) {
    super("/post/:postId", HTTPMethod.GET);
    this.setCredentials("include");
    this.setPathParam("postId", String(postId));
    this.setHeader("Accept", "application/json");
  }

  protected override async parseSuccessResponse(
    response: Response
  ): Promise<PostResponse> {
    const data = await response.json();
    return data;
  }
}
