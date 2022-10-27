import React from "react";
import Flickity from 'react-flickity-component'
import './carousel.css'

const flickityOptions = {
    initialIndex: 2
}

const Carousel= ()=> {
  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
    
      <div className="gallery-cell">hello</div>
      <div className="gallery-cell"></div>
      <div className="gallery-cell"></div>
      <div className="gallery-cell"></div>
      <div className="gallery-cell"></div>
    </Flickity>
  )
}

export default Carousel;