import React, { useEffect, useRef, useState } from 'react';
import './DetailsStyle.css';
import description_bubble_head from './assets/description-bubble-head.svg';

interface Props {
  title: string;
  text: string;
}

const DescriptionBubble: React.FC<Props> = ({ title, text }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          ref.current?.classList.add('show');
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) {
      ref.current.classList.add('hidden');
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <>
      <div ref={ref} className="description-bubble">
        <img src={description_bubble_head} alt="Head" />
        <div className="description-bubble-text">
          <h1>{title}</h1>
          {text}
        </div>
      </div>
      <div className="description-bubble-br"></div>
    </>
  );
};

export default DescriptionBubble;