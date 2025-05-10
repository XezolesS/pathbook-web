import './ArticleWriteStyle.css';
import RichTextEditor from '../components/RichTextEditor';

interface ArticleWriteDetailProps{
  cancelOnclick: () => void;
}

export default function ArticleWrite(Details: ArticleWriteDetailProps) {
  return (
    <>
      <div className="article-write-frame">
        <img className="draw-path" />
        <div className="frame">
          <input className="subject" placeholder="제목을 입력해 주세요"></input>
          <p></p>
          <input className="tag-list" placeholder="#태그_추가"></input>
          <RichTextEditor />
        </div>
        <div className="button-container">
            <button className="cancel" onClick={Details.cancelOnclick}>작성취소</button>
            <button className="submit">작성하기</button>
          </div>
      </div>
    </>
  )
}