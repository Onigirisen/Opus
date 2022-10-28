import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBooks } from "../../store/books";
import { fetchUser, fetchUsers } from "../../store/users";
import './BookIndex.css'

const BooksIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const books = useSelector(state => state.books)

    useEffect(() => {
        dispatch(fetchBooks()).then(() => setLoaded(true));
    },[])

    console.log(loaded)

    const booksList = Object.values(books).map(book => 
        <div className="books-index-div">
            <div className="books-index-cover" style={{backgroundColor: book.coverColor}} onClick={() => history.push(`/books/${book._id}`)}>
                <div className="books-index-spine">

                </div>
                <div className="books-index-text-container">
                    <div className="books-index-title">
                        {book.title}
                    </div>
                    <div className="books-index-genre">
                        genre: {book.genre}
                    </div>
                    <div className="books-index-author">
                        Author: {book.user}
                    </div>
                </div>
            </div>
        </div>
    )

    return loaded && (
        <>
            <div className="books-index-container">
                {booksList}
            </div>
        </>
    );

}

export default BooksIndex