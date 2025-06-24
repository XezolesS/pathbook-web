import { HTTPMethod } from "../../enums/HTTPMethod";
import type { Post } from "../../types/Post";
import HTTPRequest from "../HTTPRequest";

/** /post/{id} → PostDto */
export default class GetPostDetailRequest extends HTTPRequest<Post> {
  constructor(postId: number) {
    super(`/post/p/${postId}`, HTTPMethod.GET);
    this.setHeader("Accept", "application/json");
  }

  protected override async parseSuccessResponse(res: Response): Promise<Post> {
    return res.json();        // PostDto 그대로
  }
}