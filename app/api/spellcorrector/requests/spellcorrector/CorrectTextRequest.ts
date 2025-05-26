import { HTTPMethod } from "../../enums/HTTPMethod";
import HTTPRequest from "../HTTPRequest";

// 교정 요청 및 응답 타입 정의
export interface CorrectTextResponse {
  original: string;
  corrected: string;
}

export default class CorrectTextRequest extends HTTPRequest<CorrectTextResponse> {
  constructor(text: string) {
    super("/correct", HTTPMethod.POST);  //포트 설정 필요
    this.setHeader("Content-Type", "application/json");
    this.setHeader("Accept", "application/json");
    this.setBody("text", text);
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<CorrectTextResponse> {
    const data = await response.json();
    return {
      original: data.original,
      corrected: data.corrected,
    };
  }
}
