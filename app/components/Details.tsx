import DescriptionBubble from "./DescriptionBubble";
import "./Details.css";

//svg, png, jpg등 경로 수정은 다음 import 경로를 수정해주세요.
import arrow1_colored from "../assets/arrow1_colored.svg";
import arrow2_colored from "../assets/arrow2_colored.svg";
import sample_pic1_b from "../assets/image/samplepic1.png";
import sample_pic1_a from "../assets/image/samplepic1_a.jpg";
import sample_pic2_b from "../assets/image/samplepic2.png";
import sample_pic2_a from "../assets/image/samplepic2_a.jpg";

export default function DetailsComponent() {
  return (
    <>
      <div className="description-bubble-container">
        <img src={arrow1_colored} alt="Arrow Top" className="arrow1" />
        <img src={arrow2_colored} alt="Arrow Bottom" className="arrow2" />

        <div className="description-bubble-br"></div>
        {/*description-bubble 추가가 필요하면 아래를 참고하여 복사 붙여넣기 하세요.*/}
        <DescriptionBubble
          title="나만이 아는 길을 모두에게"
          text="내가 즐겨 다니는 산책로, 드라이브 코스, 맛집, 사진 명소 등 경로로 그릴 수 있는 모든 것을 모두와 공유해봐요."
        />

        <DescriptionBubble
          title="마음에 드는 코스를 책으로"
          text="여러분이 기억하고 싶은 코스들을 골라 책처럼 기록해보세요."
        />

        <DescriptionBubble
          title="길을 그리고, 함께 나누세요. 쉽고 자유롭게!"
          text="Pathbook에서는 누구나 지도를 따라 선을 그리듯, 쉽고 직관적으로 나만의 코스를 만들 수 있어요."
        />
      </div>
      <div className="sample-pic-container1">
        <div
          className="sample-pic-a1"
          style={{ backgroundImage: `url(${sample_pic1_a})` }}
        ></div>
        <div
          className="sample-pic-b1"
          style={{ backgroundImage: `url(${sample_pic1_b})` }}
        ></div>
      </div>

      <div className="sample-pic-container2">
        <div
          className="sample-pic-a2"
          style={{ backgroundImage: `url(${sample_pic2_a})` }}
        ></div>
        <div
          className="sample-pic-b2"
          style={{ backgroundImage: `url(${sample_pic2_b})` }}
        ></div>
      </div>
    </>
  );
}
