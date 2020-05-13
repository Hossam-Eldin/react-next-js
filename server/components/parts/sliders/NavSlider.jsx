import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";

class Gallery extends React.Component {
  renderThumbs = () =>
    <div className="row p-2">
      {
        this.props.posts.map((item, i) =>
          <div className="col-4 p-1" key={i} onMouseEnter={() => this.Carousel._onDotClick(i)}>
            <img src={item.image} alt="" className="img-fluid"  />
          </div>
        )
      }
    </div>;

  render() {
    return (
      <div className="mb-4 mt-4 p-0">
        {this.renderThumbs()}
{/*         <button onClick={() => this.Carousel._slidePrev()}>Prev button</button>
        <button onClick={() => this.Carousel._slideNext()}>Next button</button> */}
        <AliceCarousel
          dotsDisabled={true}
          buttonsDisabled={true}
          ref={el => this.Carousel = el}
        >
          {
            this.props.posts.map(el => {
              return (
                <div key={Math.random} >
                  <img src={el.image} className="img-fluid" alt="" />
                  <h4 className="mt-2 text-c">{el.title}</h4>
                </div>

              )
            })
          }
        </AliceCarousel>
      </div>
    );
  }
}

export default Gallery;