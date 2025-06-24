import { HTTPMethod } from "../../enums/HTTPMethod";
import type { Post } from "../../types/Post";
import HTTPRequest from "../HTTPRequest";

export default class GetPostList extends HTTPRequest<Post[]> {
  constructor(page = 0, size = 10, sort: string = "updatedat_desc") {
    const qs = `p=${page}&s=${size}&sort=${sort}`;
    super(`/post/list?${qs}`, HTTPMethod.GET);
    this.setHeader("Accept", "application/json");
  }

  // Page<Post> → Post[]
  protected override async parseSuccessResponse(res: Response): Promise<Post[]> {
    const { content } = await res.json();
    return content;
  }
}