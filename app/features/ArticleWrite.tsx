import { useEffect, useRef } from "react";
import 'react-quill/dist/quill.snow.css';
import './ArticleWriteStyle.css';

export default function ArticleWrite() {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && editorRef.current) {
      import('quill').then((QuillModule) => {
        const Quill = QuillModule.default;
        
        const toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                'custom-color',
              ],
            },
            { background: [] },
          ],
          ['image'],
        ];
        
        new Quill(editorRef.current!, {
          modules: { toolbar: toolbarOptions },
          placeholder: '내용을 입력해 주세요...',
          theme: 'snow',
        });
      });
    }  
  }, []);

  return (
    <>
      <div className="article-write-frame">
        <img className="draw-path" />
        <div className="frame">
          <input className="subject" placeholder="제목을 입력해 주세요"></input>
          <p></p>
          <input className="tag-list" placeholder="#태그_추가"></input>
          <div id="editor" ref={editorRef} style={{ minHeight: '200px' }}></div>
        </div>
        <div className="button-container">
          <button className="submit">작성하기</button>
        </div>
      </div>
    </>
  )
}