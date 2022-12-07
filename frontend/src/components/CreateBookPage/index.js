import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBook } from "../../store/books";
import "./CreateBookPage.css";

const CreateBookPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [coverColor, setCoverColor] = useState("rgb(9,6,6)");
  const [publicBook, setPublicBook] = useState(true);
  const [bookTitle, setBookTitle] = useState("");
  const [genre, setGenre] = useState("fiction");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {
      title: bookTitle,
      coverColor: coverColor,
      genre: genre,
      user: sessionUser._id,
      public: publicBook,
      description: desc,
    };
    dispatch(createBook(book)).then(() => {
      history.push(`/profile/${sessionUser._id}`)
    });
    setModalOpen(true);
  };

  return (
    <>
      <div className="create-book-container">
        <div
          className="create-book-cover"
          style={{ background: `linear-gradient(rgb(31, 32, 33), ${coverColor}, rgb(31, 32, 33))` }}
        >
          <div className="create-book-spine"></div>
          <div className="create-book-text-container">
            <div className="create-book-title">{bookTitle}</div>
            <div className="create-book-genre">Genre: {genre}</div>
            <div className="create-book-author">
              Author: {sessionUser.username}
            </div>
            <div className="create-book-cc-txt">
              Cover Color :
              <input
                type="color"
                className="colorpicker"
                onChange={(e) => setCoverColor(e.target.value)}
                defaultValue={"rgb(9,6,6)"}
              />
            </div>
          </div>
        </div>
        <form className="create-book-form" onSubmit={handleSubmit}>
          <div className="create-book-title-bio-container">
          <div className="create-book-genre-div">Title</div>
            <input
              type="text"
              className="create-book-title-text"
              spellCheck="false"
              placeholder="Insert title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <div className="create-book-genre-div">Genre</div>
            <input
              type="text"
              className="create-book-genre-text"
              spellCheck="false"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <div className="create-book-description-text">Description</div>
            <textarea
              className="create-book-description"
              spellCheck="false"
              placeholder="Enter a description here"
              value={desc}
              onChange={(e) => {setDesc(e.target.value)}}
            ></textarea>
            <div className="create-book-public-info">Public
              <input type="checkbox" className="create-book-public-checkbox" checked={publicBook} onChange={(e) => {setPublicBook(!publicBook)}}/>
            </div>
          </div>
          <button type="submit" className="create-book-button">
            Create Book
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBookPage;
