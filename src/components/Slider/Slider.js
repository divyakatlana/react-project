import { useEffect, useState } from 'react';
import React from 'react';


const Slider = ( {filmResultDTOList} ) => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        sliderTimer();
    }, []);

    const sliderTimer = () => {
        
            setInterval(() => {
                setCurrent(prevCurrent => (prevCurrent + 1) % filmResultDTOList.length);
            }, 5000);
        };
        
    

    return (
        <div className="hero">
                {filmResultDTOList.map((slider, i) => (
                  current == i  && (
                  <div className="slider" key={i}> 
                    <div className="backdrop">
                    <div className="lazyloaded">
                        <img alt={slider?.title} className="lazyload image" src={slider?.backdrop_path}/>
                    </div>
                </div>
                <div className="pane">
              <div>
                <h1 className="name" >
                  {slider?.title}
                </h1>
                <div className="meta">
                  <div className="info">
                    <span>{new Date(slider?.release_date).getFullYear()}</span>
                  </div>
                </div>
                <div className="desc">
                  {slider?.opening_crawl}
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </div >
    );
};

export default Slider;