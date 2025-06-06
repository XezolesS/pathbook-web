import { HTTPMethod } from "../../enums/HTTPMethod";
import type { GetPostListResponse } from "../../responses/post/PostResponse";
import HTTPRequest from "../HTTPRequest";

export default class PostListRequest extends HTTPRequest<GetPostListResponse> {
  constructor() {
    super("/post/list", HTTPMethod.GET);
    this.setHeader("Accept", "application/json");
  }

  protected override async parseSuccessResponse(
    response: Response
  ): Promise<GetPostListResponse> {
    const data = await response.json();
    return data;
  }
}