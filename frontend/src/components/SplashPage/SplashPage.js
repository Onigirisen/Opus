import "./SplashPage.css";
import React from "react";
import { ReactDOM } from "react";
import { useHistory } from "react-router-dom";

function SplashPage() {
  const history = useHistory();
  const placeholder =
    "Opus is an online book library where users can read already uploaded books or author their own. Users do not have to be logged in to read books. They can simply head over to the explore page where they can search for a specific book or browse the collection of public books. Upon clicking on a book, you will be led to a page where you can see all of the book’s information. You can click on the author’s name to visit their profile page to see what other books they’ve created. Users can also scroll down to the chapters section to read the book itself. There they can click on chapters to see all of the pages, and then click on pages to see all of the pages within a chapter. Upon clicking on read page, they will be led to a page where they can interactively read the book, while flipping pages or via the index on the left. Users can create an account, and navigate to their own profile page, where they can change their profile picture, bio, and see the books they authored. Users can also create their own books by inserting a title, genre of choice, and description. They can decide whether they want the book to be public or not. Upon creating a book, users can add/update/delete chapters, and pages for the corresponding book as they please. Opus was created by Avisek, David, Ryan, and Darian. To start, you can click below to read about their journey  as software engineers. ";

  return (
    <div className="splash-container">
      <div className="splash-opus-info">
        <div className="splash-index-cover">
          <div className="splash-index-spine"></div>
          <div className="splash-index-text-container">
            <div className="splash-index-title">Opus</div>
          </div>
        </div>
        <div className="splash-opus-info-container">
          <div className="splash-opus-info-title">Opus</div>
          <div className="splash-opus-info-text">{placeholder}</div>
          <div
            className="splash-opus-read-more"
            onClick={() => {
              history.push("/books/639736c58ebad937c1e8594e");
            }}
          >
            Read More About The Developers of Opus
          </div>
        </div>
      </div>
      <div className="splash-creator-info-container">
        <div className="splash-creator-title">Meet the Developers!</div>

        <div className="splash-creator-info">
          <div className="splash-dev-container">
            <div className="splash-dev-info">
              <div className="splash-avisek-pic"></div>
              <div className="splash-dev-bio">
                Avisek was the frontend lead for Opus. He drafted the design of
                each component of the application and brought the team's ideas
                to life. He worked with David, the other frontend engineer, to
                manipulate the data from the backend and style them accordingly.
              </div>
              <div className="splash-dev-links">
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/Av1sek"
                >
                  Github
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://angel.co/u/avisek-pandit"
                >
                  Wellfound
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/in/avisek-pandit-374096247"
                >
                  LinkedIn
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://avisekpandit.com"
                >
                  Porfolio
                </a>
              </div>
            </div>
          </div>

          <div className="splash-dev-container">
            <div className="splash-dev-info">
              <div className="splash-david-pic"></div>
              <div className="splash-dev-bio">
                David was the team lead for Opus. With his management skills, he
                directed the group to success. He outlined each step the group
                had to take while working on Opus. As a frontend engineer, he
                worked closely with Avisek on the design of the website.
              </div>
              <div className="splash-dev-links">
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/dlaucodes"
                >
                  Github
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://angel.co/u/chun-k-lau"
                >
                  Wellfound
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/in/dlaucodes/"
                >
                  LinkedIn
                </a>
                 <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://dlaucodes.github.io/Dlau/"
                >
                  Porfolio
                </a>
              </div>
            </div>
          </div>

          <div className="splash-dev-container">
            <div className="splash-dev-info">
              <div className="splash-ryan-pic"></div>
              <div className="splash-dev-bio">
                Ryan was the flex engineer for Opus. He worked closely with
                Darian to design and develop the backend. He helped Avisek and
                David with the utilization of data bridging the gap between the
                frontend and the backend.
              </div>
              <div className="splash-dev-links">
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/Onigirisen"
                >
                  Github
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://angel.co/u/ryan-kok"
                >
                  Wellfound
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/in/ryan-kok-6ab427b6/"
                >
                  LinkedIn
                </a>
                 <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://Onigirisen.github.io"
                >
                  Porfolio
                </a>
              </div>
            </div>
          </div>

          <div className="splash-dev-container">
            <div className="splash-dev-info">
              <div className="splash-darian-pic"></div>
              <div className="splash-dev-bio">
                Darian was the backend lead for Opus. He closely worked with
                Ryan on developing the backend and database. He also worked on a
                large majority of the frontend user profile.
              </div>
              <div className="splash-dev-links">
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/darianchen"
                >
                  Github
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://angel.co/u/darian-chen"
                >
                  Wellfound
                </a>
                <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/in/darianchen/"
                >
                  LinkedIn
                </a>
                 <a
                  className="dev-link"
                  target="_blank"
                  rel="noopener"
                  href="https://darianchen.github.io/"
                >
                  Porfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
