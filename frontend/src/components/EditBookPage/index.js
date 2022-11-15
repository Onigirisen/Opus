import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { fetchBook, deleteBook, updateBook } from "../../store/books";
import "./EditBookPage.css";

const EditBookPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { bookId } = useParams();
  const book = useSelector(state => state.books)[bookId]
  const sessionUser = useSelector((state) => state.session.user);
  const [loaded,setLoaded] = useState(false);
  const [coverColor, setCoverColor] = useState(" ");
  const [bookTitle, setBookTitle] = useState(" ");
  const [genre, setGenre] = useState(" ");
  const loadedBook = useRef();

  useEffect(() => {
    dispatch(fetchBook(bookId)).then(() => {
      setLoaded(true);
      loadedBook.current = true;
    });
  }, []) 

  useEffect(() => {
    dispatch(fetchBook(bookId));
    if (loadedBook.current) {
      setCoverColor(book.coverColor);
      setBookTitle(book.title);
      setGenre(book.genre);
    }
  }, [loadedBook.current])

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {
      _id: bookId,
      title: bookTitle,
      coverColor: coverColor,
      genre: genre,
      public: true,
    };
    dispatch(updateBook(book));
    history.push(`/books/${bookId}`);
  };

  const bookDelete = (e) => {
    dispatch(deleteBook(bookId));
    history.push(`/profile/${sessionUser._id}`);
  }

  return loaded && (
    <>
      <div className="create-book-container">
        <div
          className="create-book-cover"
          style={{ backgroundColor: coverColor }}
        >
          <div className="create-book-spine"></div>
          <div className="create-book-text-container">
            <div className="create-book-title">{bookTitle}</div>
            <div className="create-book-genre">genre: {genre}</div>
            <div className="create-book-author">
              Author: {sessionUser.username}
            </div>
            <div className="create-book-cc-txt">
              Cover Color :
              <input
                type="color"
                className="colorpicker"
                onChange={(e) => setCoverColor(e.target.value)}
                defaultValue={book.coverColor}
              />
            </div>
          </div>
        </div>
        <form className="create-book-form" onSubmit={handleSubmit}>
          <div className="create-book-title-bio-container">
            <input
              type="text"
              className="create-book-title-text"
              spellCheck="false"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <div className="create-book-genre-div">genre</div>
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
            ></textarea>
          </div>
          <button type="submit" className="edit-book-button">
            Edit Book
          </button>
          <button className="delete-book-button" onClick={bookDelete}>
            Delete Book
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBookPage;
