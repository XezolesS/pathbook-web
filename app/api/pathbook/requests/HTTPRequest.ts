import { APIConfig } from "../APIConfig";
import { HTTPMethod } from "../enums/HTTPMethod";
import { HTTPRequestError } from "../errors/HTTPRequestError";

/**
 * HTTPRequest 추상 클래스
 * 
 * 생성자에서 API 엔드포인트 요청 정보를 설정합니다.
 *
 * @example
 * class MyAPIRequest extends HTTPRequest<MyAPIResponse> {
 *   constructor(username: string) {
 *     super("/my-request", HTTPMethod.GET);
 *
 *     this.setBody("username", string);
 *   }
 *
 *   protected async parseSuccessResponse(
 *     response: Response
 *   ): Promise<MyAPIResponse> {
 *     const data = await response.json();
 *     return data as MyAPIResponse;
 *   }
 * }
 */
export default abstract class HTTPRequest<ResponseType> {
  private path: string;
  private method: HTTPMethod;
  private header: Headers;
  private body: Record<string, any> | null;
  private queryParams: URLSearchParams | null;
  private pathParams: Array<string> | null;
  protected credentials: RequestCredentials | undefined;

  constructor(path: string, method: HTTPMethod) {
    this.path = path;
    this.method = method;
    this.header = new Headers(APIConfig.API_HEADER);
    this.body = null;
    this.queryParams = null;
    this.pathParams = null;
    this.credentials = undefined;
  }

  /**
   * HTTP 요청의 헤더 필드의 값을 설정합니다.
   *
   * @param name 헤더 필드의 이름
   * @param value 헤더 필드의 값
   */
  protected setHeader(name: string, value: string): void {
    this.header.set(name, value);
  }

  /**
   * HTTP 요청의 헤더 필드를 삭제합니다.
   *
   * @param name 헤더 필드의 이름
   */
  protected deleteHeader(name: string): void {
    this.header.delete(name);
  }

  /**
   * HTTP 요청의 바디 필드의 값을 설정합니다.
   *
   * @param name 바디 필드의 이름
   * @param value 바디 필드의 값
   */
  protected setBody(name: string, value: any): void {
    if (!this.body) {
      this.body = {};
    }

    this.body[name] = value;
  }

  /**
   * HTTP 요청의 바디 필드를 삭제합니다.
   *
   * @param name 바디 필드의 이름
   */
  protected deleteBody(name: string): void {
    if (!this.body) {
      console.warn("body is null");
      return;
    }

    delete this.body[name];
  }

  /**
   * HTTP 요청의 쿼리 필드를 설정합니다.
   *
   * @param params 쿼리 필드 레코드
   */
  protected setQueryParams(params: Record<string, string>): void {
    this.queryParams = new URLSearchParams(params);
  }

  /**
   * HTTP 요청의 쿼리 필드의 값을 설정합니다.
   *
   * @param name 쿼리 필드의 이름
   * @param value 쿼리 필드의 값
   */
  protected setQueryParam(name: string, value: string): void {
    if (!this.queryParams) {
      this.queryParams = new URLSearchParams();
    }

    this.queryParams.set(name, value);
  }

  /**
   * HTTP 요청의 쿼리 필드를 삭제합니다.
   *
   * @param name 쿼리 필드의 이름
   */
  protected deleteQueryParam(name: string): void {
    if (!this.queryParams) {
      console.warn("queryParam is null");
      return;
    }

    this.queryParams.delete(name);
  }

  /**
   * HTTP 요청의 패스 파라미터를 설정합니다.
   * 요청 URL에 순차적으로 적용됩니다.
   *
   * @param params 패스 파라미터 값의 배열
   */
  protected setPathParams(params: Array<string>): void {
    this.pathParams = params;
  }

  /**
   * 요청 URL을 빌드합니다.
   *
   * 필요한 경우 자식 클래스에서 오버라이드 합니다.
   *
   * 기본 사양:
   * 1. `APIConfig.API_Host`와 `path`로 URL을 구성합니다.
   * 2. `pathParams`가 존재할 경우, 순차적으로 적용합니다.
   * 3. `queryParams`가 존재할 경우, 적용합니다.
   *
   * @returns 최종 요청 URL
   */
  protected buildUrl(): string {
    let requestUrl = `${APIConfig.API_HOST}${this.path}`;

    // Path parameters 존재 시 순차 적용
    if (this.pathParams) {
      this.pathParams.forEach((param) => {
        requestUrl = `${requestUrl}/${param}`;
      });
    }

    // Query parameters 존재 시 적용
    if (this.queryParams) {
      requestUrl = `${requestUrl}?${this.queryParams.toString()}`;
    }

    return requestUrl;
  }

  /**
   * 성공적인 HTTP 응답을 파싱하는 추상 메서드
   *
   * 자식 클래스에서 반드시 구현해야 하며, 서버로부터 받은 성공 응답을
   * ResponseType으로 변환하는 로직을 포함해야 합니다.
   *
   * @param response - fetch API의 Response 객체
   * @returns Promise로 래핑된 ResponseType
   *
   * @example
   * protected async parseSuccessResponse(response: Response): Promise<User> {
   *   const data = await response.json();
   *   return {
   *     id: data.id,
   *     name: data.username
   *   };
   * }
   */
  protected abstract parseSuccessResponse(
    response: Response
  ): Promise<ResponseType>;

  protected async parseErrorResponse(response: Response): Promise<any> {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  }

  /**
   * HTTP 요청을 전송하고 응답을 처리합니다.
   *
   * - HTTPRequest 객체의 멤버 변수를 사용하여 헤더, 바디, 파라미터 등을 설정합니다.
   * - 성공 응답은 `parseSuccessResponse` 메서드로 파싱합니다.
   * - 실패 응답은 `parseErrorResponse` 메서드로 파싱합니다.
   *
   * @returns {Promise<ResponseType>} API 요청 결과 (ResponseType 타입으로 파싱된 데이터)
   * @throws {HTTPRequestError} 요청 실패 시 발생하는 오류 (상태 코드와 오류 데이터 포함)
   *
   * @example
   * const request = new MyAPIRequest('/user', HTTPMethod.GET);
   * try {
   *   const user = await request.send();
   *   console.log(user);
   * } catch (error) {
   *   console.error('요청 실패:', error.statusCode, error.responseData);
   * }
   */
  public async send(): Promise<ResponseType> {
    let requestUrl = this.buildUrl();

    // Request Option 설정
    const requestOption: RequestInit = {
      method: this.method,
      headers: this.header,
      credentials: this.credentials,
    };

    // GET/HEAD method가 아닌 경우 body 설정
    if (this.body) {
      if (this.method === HTTPMethod.GET || this.method === HTTPMethod.HEAD) {
        console.warn(`Ignore body because the method is ${this.method}`);
      } else {
        if (!this.header.has("Content-Type")) {
          this.header.set("Content-Type", "application/json");
        }
        requestOption.body = JSON.stringify(this.body);
      }
    }

    // API 요청
    try {
      const response = await fetch(requestUrl, requestOption);

      if (!response.ok) {
        const errorData = this.parseErrorResponse(response);
        throw new HTTPRequestError(
          `HTTP request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }

      return await this.parseSuccessResponse(response);
    } catch (error) {
      if (error instanceof HTTPRequestError) {
        throw error;
      }

      throw new HTTPRequestError(
        error instanceof Error ? error.message : "Unknown error",
        0,
        null
      );
    }
  }
}
