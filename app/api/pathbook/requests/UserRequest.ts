import { HTTPMethod } from "../enums/HTTPMethod";
import HTTPRequest from "./HTTPRequest";
import type { User } from "../types/User";

export interface TabData {
  id: number;
  [key: string]: any;
}

export class FetchProfileRequest extends HTTPRequest<User> {
  constructor() {
    super("/api/profile", HTTPMethod.GET);
    this.setCredentials("include");
  }
  protected async parseSuccessResponse(response: Response): Promise<User> {
    return await response.json();
  }
}

export class UpdateProfileRequest extends HTTPRequest<User> {
  constructor(nickname: string, bio: string) {
    super("/api/profile", HTTPMethod.PUT);
    this.setCredentials("include");
    this.setHeader("Content-Type", "application/json");
    this.setBody("nickname", nickname);
    this.setBody("bio", bio);
  }
  protected async parseSuccessResponse(response: Response): Promise<User> {
    return await response.json();
  }
}

export class UploadProfileImageRequest extends HTTPRequest<{ url: string }> {
  constructor(file: File, type: "background" | "profile") {
    super("/api/profile/image", HTTPMethod.POST);
    this.setCredentials("include");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);
    this.setRawBody(formData);
  }
  protected async parseSuccessResponse(
    response: Response
  ): Promise<{ url: string }> {
    return await response.json();
  }
}

export class FetchTabDataRequest extends HTTPRequest<TabData[]> {
  constructor(tab: "posts" | "comments" | "likes" | "bookmarks") {
    const tabToEndpoint: Record<string, string> = {
      posts: "/api/profile/posts",
      comments: "/api/profile/comments",
      likes: "/api/profile/likes",
      bookmarks: "/api/profile/bookmarks",
    };
    super(tabToEndpoint[tab] || "/api/profile/posts", HTTPMethod.GET);
    this.setCredentials("include");
  }
  protected async parseSuccessResponse(response: Response): Promise<TabData[]> {
    return await response.json();
  }
  
}
