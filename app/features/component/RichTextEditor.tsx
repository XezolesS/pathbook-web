import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

export default function RichTextEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      const Delta = Quill.import("delta");

      if (!editorRef.current) return;

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "내용을 입력해주세요",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ['image'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],      
          ],
        },
      });
      
      // 에디터 초기값 (Delta로)
      const initialContent = new Delta()
        .insert("")

      quill.setContents(initialContent);
      quillRef.current = quill;
     
      const toolbar = document.querySelector(".ql-toolbar");
      if (toolbar) {
        (toolbar as HTMLElement).style.borderBottom = "1px solid #000";
        (toolbar as HTMLElement).style.borderTop = "none";
      }

      const container = document.querySelector(".ql-container");
      if (container) {
        (container as HTMLElement).style.border = "none";
      }
    });
  }, []);

  return (
    <>
      <div ref={editorRef} style={{ height: "200px" }} />
    </>
  );
}
