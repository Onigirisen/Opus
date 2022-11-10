import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import Modal from '../../Modal/Modal'
import { fetchBook } from "../../store/books";
import { getCurrentUser } from "../../store/session";
import { fetchUsers, getUser, getUsers } from "../../store/users";
import "./BookShow.css";

const BookShow = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector(getUsers)
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const books = useSelector((state) => state.books);
  const { bookId } = useParams();
  const book = books[bookId];

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(fetchBook(bookId)).then(() => setLoaded(true));
    dispatch(fetchUsers());
  }, []);

  let authorName = "";

  return (
    loaded && (
      <>
      <div className="create-book-container">
        <div
          className="create-book-cover"
          style={{ backgroundColor: book.coverColor }}
        >
          <div className="create-book-spine"></div>
          <div className="create-book-text-container">
            <div className="create-book-title">{book.title}</div>
            <div className="create-book-genre">genre: {book.genre}</div>
            {Object.keys(users).forEach((user) => {if (book.user === users[user]._id) {authorName = users[user].username}})}
            <div className="books-show-author" onClick={() => history.push(`/profile/${book.user}`)}>Author: {authorName}</div>

            {sessionUser._id === book.user ? 
              <div className="book-show-edit-button">
                Edit Book
              </div> 
            : <></>} 
            
          </div>
        </div>
        <div className="create-book-form">
          <div className="create-book-title-bio-container">
            <input
              type="text"
              className="create-book-title-text"
              spellCheck="false"
              value={book.title}
              readOnly
            />
            <div className="create-book-genre-div">genre</div>
            <input
              type="text"
              className="create-book-genre-text"
              spellCheck="false"
              value={book.genre}
              readOnly
            />
            <div className="create-book-description-text">Description</div>
            <textarea
              className="create-book-description"
              spellCheck="false"
              readOnly
            ></textarea>
          </div>
          <button
            className="book-show-read-button"
            onClick={() => history.push(`/books/read`)}
          >
            Read Book
          </button>
        </div>
      </div>
      </>
    )
  );
};

export default BookShow;
