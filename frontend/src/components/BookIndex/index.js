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
  const [searchContent, setSearchContent] = useState('');
  const books = useSelector((state) => state.books);
  const testDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchBooks()).then(() => setLoaded(true));
  }, [searchContent]);

  let authorName = "";
  const publicBooks = [];
  Object.values(books).forEach((book) => {
    if (book.public) {
      if (searchContent === "") {
        publicBooks.push(book);
      } else {
        if (book.title.toLowerCase().includes(searchContent.toLowerCase())) {
          publicBooks.push(book);
        }
      }
    }
  })

  const booksList = publicBooks.map((book) => (
    <div className="all-books-container">
      <div className="books-index-div" key={book._id}>
        <div
          className="books-index-cover"
          style={{ background: `linear-gradient(rgb(31, 32, 33), ${book.coverColor}, rgb(31, 32, 33))` }}
          onClick={() => history.push(`/books/${book._id}`)}
        >
          <div className="books-index-spine"></div>
          <div className="books-index-text-container">
            <div className="books-index-title">{book.title}</div>
          </div>
        </div>
      </div>
      <div className="books-index-item-container">
        <div className="books-index-item-title">{book.title}</div>
        {Object.keys(users).forEach((user) => {if (book.user === users[user]._id) {authorName = users[user].username}})}
        <div className="books-index-author">Author: {authorName}</div>
        <div className="books-index-description">{testDesc}</div>
      </div>
    </div>
  ));

  const handleSearch = (e) => {
    e.preventDefault();
  }

  return (
    loaded && (
      <>
        <div className="books-index-search">
          <form className="books-index-search-form" onSubmit={handleSearch}>
            <input className="books-index-search-input" type="text" placeholder="Search for a book" value={searchContent} onChange={(e) => {setSearchContent(e.target.value)}} />
          </form>
        </div>
        <div className="books-index-container">{booksList}</div>
      </>
    )
  );
};

export default BooksIndex;
