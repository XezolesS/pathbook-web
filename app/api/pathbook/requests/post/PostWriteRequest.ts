import { HTTPMethod } from "../../enums/HTTPMethod";
import { NoResponse } from "../../responses/NoResponse";
import HTTPRequest from "../HTTPRequest";

export default class PostWriteRequest extends HTTPRequest<NoResponse> {
  constructor(
    contents: {
      title: string;
      tags: string[];
      content: string;
      path?: { pathPoints: { latitude: number; longitude: number }[] };
    },
    pathThumbnail?: Blob,
    attachments: File[] = []
  ) {
    function sanitizeFilename(filename: string): string {
      return filename.replace(/[^\w.\-]/g, "_");
    }
    super("/post/write", HTTPMethod.POST);

    this.setCredentials("include");
    this.setBodyType("multipart/form-data");
    this.setBody(
      "contents",
      new Blob([JSON.stringify(contents)], { type: "application/json" })
    );
    const uniqueName = (base: string, ext: string) =>
      `${base}_${Date.now()}.${ext}`;

    if (pathThumbnail && pathThumbnail.size > 0) {
      const ext = (pathThumbnail.type.split("/")[1] || "png").toLowerCase();
      const thumbFile = new File(
        [pathThumbnail],
        uniqueName("path_thumbnail", ext),
        { type: pathThumbnail.type }
      );
      this.setBody("path_thumbnail", thumbFile);
    }

    attachments
      .filter((f) => f.size > 0)
      .forEach((file) => {
        const safeName =
          sanitizeFilename(file.name) || uniqueName("file", "bin");
        this.setBody(
          "attachments",
          new File([file], safeName, { type: file.type })
        );
      });

    this.setHeader("Accept", "application/json");
  }

  protected async parseSuccessResponse(
    response: Response
  ): Promise<NoResponse> {
    const data = await response.json();
    console.debug(data.message);

    return;
  }
}
