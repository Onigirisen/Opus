import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBooks } from "../../store/books";
import { fetchUsers, getUsers } from "../../store/users";
// import { fetchUser, fetchUsers } from "../../store/users";
import "./BookIndex.css";

const BooksIndex = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(getUsers);
  const [loaded, setLoaded] = useState(false);
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchBooks()).then(() => setLoaded(true));
  }, []);

  let authorName = "";
  const publicBooks = [];
  Object.values(books).forEach((book) => {
    if (book.public) {
      publicBooks.push(book);
    }
  })

  const booksList = publicBooks.map((book) => (
    <div className="books-index-div" key={book._id}>
      <div
        className="books-index-cover"
        style={{ backgroundColor: book.coverColor }}
        onClick={() => history.push(`/books/${book._id}`)}
      >
        <div className="books-index-spine"></div>
        <div className="books-index-text-container">
          <div className="books-index-title">{book.title}</div>
          <div className="books-index-genre">genre: {book.genre}</div>
          {Object.keys(users).forEach((user) => {if (book.user === users[user]._id) {authorName = users[user].username}})}
          <div className="books-index-author">Author: {authorName}</div>
        </div>
      </div>
    </div>
  ));

  return (
    loaded && (
      <>
        <div className="books-index-container">{booksList}</div>
      </>
    )
  );
};

export default BooksIndex;
