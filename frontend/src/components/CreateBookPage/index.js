import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateBookPage.css'

const CreateBookPage = () => {
    const dispatch = useDispatch()
    const [coverColor, setCoverColor] = useState('#F8AAAA')
    const [bookTitle, setBookTitle] = useState('Insert Title')


    return  (
        <div className="create-book-container">
            <div className="create-book-cover" style={{backgroundColor: coverColor}}>
                <div className="create-book-spine">

                </div>
                <div className="create-book-text-container">
                    <div className="create-book-title">
                        {bookTitle}
                    </div>
                    <div className="create-book-author">
                        Author: Avisk
                    </div>
                    <div className="create-book-cc-txt">Cover Color : 
                        <input type="color" className="colorpicker" onChange={e => setCoverColor(e.target.value)} defaultValue={"#F8AAAA"} />
                    </div>
                </div>
            </div>
            <form className="create-book-form">
                <div className="create-book-title-bio-container">
                    <input type="text" className="create-book-title-text" spellCheck="false" value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
                    <div className="create-book-description-text">Description</div>
                    <textarea className="create-book-description" spellCheck="false"></textarea>
                </div>
                <button type="submit" className="create-book-button">Create Book</button>
            </form>
        </div>
    )
}

export default CreateBookPage;