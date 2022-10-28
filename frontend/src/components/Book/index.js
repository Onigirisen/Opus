import React, { useState } from "react";
import './book.css'

const BookComponent = () => {
    const [flip, setFlip] = useState(false)
    const [flipDir, setFlipDir] = useState("right")

    const nextPage = () => {
        if (!flip) {
            setFlip(true);
            setTimeout(() => {
                setFlip(false);
            }, 900)
        }
    }

    return (
        <>
            <div className="book-container">
                <div className="book-cover">
                    <div className="left-page">

                    </div>
                    <div className="spine">

                    </div>
                    <div className="right-page">
                        <textarea className="book-page-content" spellCheck='false'></textarea>
                        <div className="book-page-number">50</div>
                        <div className="prev-page" onClick={() => {nextPage(); setFlipDir("left")}}>{"<"}</div>
                        <div className="next-page" onClick={() => {nextPage(); setFlipDir("right")}}>{">"}</div>
                    </div>
                </div>
                {flip ? 
                    flipDir === "right" ? 
                        <>
                            <div className="fake-right-back-page"></div> 
                            <div className="fake-right-page">
                                <textarea className="book-page-content"></textarea>
                                <div className="book-page-number">50</div>
                                <div className="prev-page">{"<"}</div>
                                <div className="next-page">{">"}</div>
                            </div>
                        </> :  
                        <>
                        <div className="fake-left-back-page"></div> 
                        <div className="fake-left-page">
                            <textarea className="book-page-content"></textarea>
                            <div className="book-page-number">50</div>
                            <div className="prev-page">{"<"}</div>
                            <div className="next-page">{">"}</div>
                        </div>
                        </>  : 
                    <></>
                }
            </div>
        </>
    );
}

export default BookComponent;