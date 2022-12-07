import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchBook } from "../../store/books";
import { getCurrentUser } from "../../store/session";
import { fetchUsers, getUser, getUsers } from "../../store/users";
import "./BookShow.css";

import ChaptersIndex from "./chapters";

const BookShow = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector(getUsers)
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const books = useSelector((state) => state.books);
  const { bookId } = useParams();
  const book = books[bookId];

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(fetchUsers()).then(() => setUsersLoaded(true));
    dispatch(fetchBook(bookId)).then(() => setLoaded(true));
  }, []);

  const handleEdit = e => {
    history.push(`/books/${bookId}/edit`)
  }

  let authorName = "";

  return (
    loaded && usersLoaded && (
      <>
      <div className="book-show-container">
        <div
          className="create-book-cover"
          style={{ background: `linear-gradient(rgb(31, 32, 33), ${book.coverColor}, rgb(31, 32, 33))` }}
        >
          <div className="create-book-spine"></div>
          <div className="create-book-text-container">
            <div className="create-book-title">{book.title}</div>
            <div className="create-book-genre">genre: {book.genre}</div>
            {Object.keys(users).forEach((user) => {if (book.user === users[user]._id) {authorName = users[user].username}})}
            <div className="books-show-author" onClick={() => history.push(`/profile/${book.user}`)}>Author: {authorName}</div>

            {sessionUser && sessionUser._id === book.user ? 
              <div className="book-show-edit-button" onClick={handleEdit}>
                Edit Book
              </div> 
            : <></>} 

          </div>
        </div>
        <div className="create-book-form">
          <div className="create-book-title-bio-container">
            <div className="show-book-title-text">{book.title}</div>
            <div className="create-book-description-text"></div>
            <textarea
              className="show-book-description"
              spellCheck="false"
              value={book.description}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
      <ChaptersIndex />
      </>
    )
  );
};

export default BookShow;
