import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

export interface RichTextEditorProps {
  initialHTML?: string;
  onChange?: (html: string) => void;
}

export default function RichTextEditor({
  initialHTML = "",
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    import("quill").then(({ default: Quill }) => {
      if (!mounted || !editorRef.current) return;

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "내용을 입력해주세요",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["image"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }, { size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
          ],
        },
      });

      if (initialHTML) {
        quill.clipboard.dangerouslyPasteHTML(initialHTML);
      }

      quill.on("text-change", () => {
        onChange?.(quill.root.innerHTML);
      });

      quillRef.current = quill;
    });

    return () => {
      mounted = false;
      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && initialHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(initialHTML);
    }
  }, [initialHTML]);

  return <div ref={editorRef} style={{ height: 400 }} />;
}
