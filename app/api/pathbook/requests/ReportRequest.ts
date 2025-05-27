export default class ReportRequest {
  type: "user" | "post";
  target: string;
  reason: string;
  content: string;

  constructor(type: "user" | "post", target: string, reason: string, content: string) {
    this.type = type;
    this.target = target;
    this.reason = reason;
    this.content = content;
  }

  async send(): Promise<any> {
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        type: this.type,
        target: this.target,
        reason: this.reason,
        content: this.content,
      }),
    });
    if (!response.ok) {
      throw new Error("신고 등록에 실패했습니다.");
    }
    return await response.json();
  }
}
