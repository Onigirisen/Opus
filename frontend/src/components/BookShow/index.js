import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Modal from '../../Modal/Modal'
import { fetchBook } from "../../store/books";
import './BookShow.css'

const BookShow = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [loaded, setLoaded] = useState(false)
    const books = useSelector(state => state.books)
    const { bookId } = useParams()
    const book = books[bookId];

    useEffect(() => {
        dispatch(fetchBook(bookId)).then(() => setLoaded(true))
    }, [])

    return loaded && (
        <div className="create-book-container">
            <div className="create-book-cover" style={{backgroundColor: book.coverColor}}>
                <div className="create-book-spine">

                </div>
                <div className="create-book-text-container">
                    <div className="create-book-title">
                        {book.title}
                    </div>
                    <div className="create-book-genre">
                        genre: {book.genre}
                    </div>
                    <div className="create-book-author">
                        Author: {book.user}
                    </div>
                </div>
            </div>
            <div className="create-book-form">
                <div className="create-book-title-bio-container">
                    <input type="text" className="create-book-title-text" spellCheck="false" value={book.title} readOnly/>
                    <div className="create-book-genre-div">genre</div>
                    <input type="text" className="create-book-genre-text" spellCheck="false" value={book.genre} readOnly/>
                    <div className="create-book-description-text">Description</div>
                    <textarea className="create-book-description" spellCheck="false" readOnly></textarea>
                </div>
                    <button className="book-show-read-button" onClick={() => history.push(`/books/read`)}>Read Book</button>
            </div>
        </div>
    )
}

export default BookShow;