import './SplashPage.css'

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
          <img src="../carouseltemp.png" />
        </div>
        <div className="spacing">
        </div>
      </div>

      <footer>
          <div className="footer-navbar-container">
              <div className="footer-navbar-column">
                  <div className="column">
                      david
                  </div>
                  <div className="column">
                      avisek
                  </div>
                  <div className="column">
                      ryan
                  </div>
                  <div className="column">
                      darian
                  </div>
              </div>
          </div>
      </footer>
    </>
  );
}

export default SplashPage;