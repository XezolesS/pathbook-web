import React from 'react';
import './InfoContainerStyle.css';

//svg, png, jpg등 경로 수정은 다음 import 경로를 수정해주세요.
import arrow1_colored from './assets/arrow1_colored.svg';
import arrow2_colored from './assets/arrow2_colored.svg';
import description_bubble_head from './assets/description-bubble-head.svg';
import sample_pic1_a from './assets/image/samplepic1_a.jpg';
import sample_pic1_b from './assets/image/samplepic1.png';
import sample_pic2_a from './assets/image/samplepic2_a.jpg';
import sample_pic2_b from './assets/image/samplepic2.png';

const InfoContainer: React.FC = () => {
  return (
    <>
      <div className="description-bubble-container">
        <img src={arrow1_colored} alt="Arrow Top" className="arrow1" />
        <img src={arrow2_colored} alt="Arrow Bottom" className="arrow2" />

        <div className="description-bubble-br"></div>

        <div className="description-bubble">
          <img src={description_bubble_head} alt="Head" />
          <div className="description-bubble-text">
            <h1>나만이 아는 길을 모두에게</h1>
            내가 즐겨 다니는 산책로, 드라이브 코스, 맛집, 사진 명소 등 경로로 그릴 수 있는 모든 것을 모두와 공유해봐요.
          </div>
        </div>

        <div className="description-bubble-br"></div>

        <div className="description-bubble">
          <img src={description_bubble_head} alt="Head" />
          <div className="description-bubble-text">
            <h1>마음에 드는 코스를 책으로</h1>
            여러분이 기억하고 싶은 코스들을 골라 책처럼 기록해보세요.
          </div>
        </div>

        <div className="description-bubble-br"></div>

        <div className="description-bubble">
          <img src={description_bubble_head} alt="Head" />
          <div className="description-bubble-text">
            <h1>길을 그리고, 함께 나누세요. 쉽고 자유롭게!</h1>
            Pathbook에서는 누구나 지도를 따라 선을 그리듯, 쉽고 직관적으로 나만의 코스를 만들 수 있어요.
          </div>
        </div>

        {/* description-bubble 추가는 이 주석 밑으로 하면 됩니다. */}

      </div>
      <div className='sample-pic-container1'>
        <div className='sample-pic-a1' style={{backgroundImage: `url(${sample_pic1_a})`}}></div>
        <div className='sample-pic-b1' style={{backgroundImage: `url(${sample_pic1_b})`}}></div>
      </div>

      <div className='sample-pic-container2'>
        <div className='sample-pic-a2' style={{backgroundImage: `url(${sample_pic2_a})`}}></div>
        <div className='sample-pic-b2' style={{backgroundImage: `url(${sample_pic2_b})`}}></div>
      </div>
    </>
  );
};

export default InfoContainer;
