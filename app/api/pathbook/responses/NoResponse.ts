/**
 * 엔드포인트가 무의미한 데이터를 반환함을 명시합니다.
 *
 * @example
 * class MyRequest extends HTTPRequest<NoResponse> {}
 */
export type NoResponse = void | null
