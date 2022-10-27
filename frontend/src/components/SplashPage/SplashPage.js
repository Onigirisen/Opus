import './SplashPage.css'
import Carousel from '../Carousel';

function SplashPage() {
  return (
    <>
      <div className="spacing">
      </div>
      <div className="splash-body-container">
        <div className="splash-body-carousel">
          <img src="https://cdn.dribbble.com/users/1233499/screenshots/5048198/attachments/1122714/mountains.png" alt="" />
        </div>
        <div className="spacing">  
        </div>
        <div className="splash-featured-carousel">
          <img src="http://localhost:3000/static/media/carouseltemp.31398055deaebff73d15.png" />
        </div>
        
        <div className="spacing">
        </div>
      </div>

     
    </>
  );
}

export default SplashPage;