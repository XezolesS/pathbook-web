import { HTTPMethod } from "../../enums/HTTPMethod";
import type { Post } from "../../types/Post";
import HTTPRequest from "../HTTPRequest";

export default class GetPostDetailRequest extends HTTPRequest<Post> {
  constructor(postId: string) {                         // 문자열 그대로
    super(`/post/p/${postId}`, HTTPMethod.GET);
    this.setCredentials("include");                     // 세션 쿠키 전송
    this.setHeader("Accept", "application/json");
  }

  protected override async parseSuccessResponse(res: Response): Promise<Post> {
    return res.json();
  }
}