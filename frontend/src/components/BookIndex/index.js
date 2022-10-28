import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/books";
import './BookIndex.css'

const BooksIndex = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const books = useSelector(state => state.books)

    useEffect(() => {
        dispatch(fetchBooks()).then(() => setLoaded(true));
    },[])

    console.log(loaded)

    const booksList = Object.values(books).map(book => <p>{book.title}</p>)

    return loaded && (
        <>
            <div className="books-index-title">
                {booksList}
            </div>
        </>
    );

}

export default BooksIndex