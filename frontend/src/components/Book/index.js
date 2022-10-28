import React, { useState } from "react";
import './book.css'

const BookComponent = () => {
    const [flip, setFlip] = useState(false)
    const [flipDir, setFlipDir] = useState("right")
    const [pageNum, setPageNum] = useState(1)
    const text1 = `October 26, 2022 

    Dear Diary, 
    
        Today was a rough day. We continued working on our project. I was tasked to create a book that would feel as real as it could be. The task was daunting, but I got to work. After countless failures, I had finally created what I thought was a masterpiece. 
         I turned to my right to see my team leader David. I got his attention and showed him the beautiful masterpiece I had created. He glanced at my screen and said "trash." I had to excuse myself from the room, and went outside to the bleachers to collect myself. 
         Maybe Ryan would like it. That's what I thoguht. I headed back into the room only to see Ryan already at my computer staring at my screen. He squinted, pointed at the screen and yelled across the room, "What is this?" I said to him, its a book, its our book. He started laughing uncontrollably. 
         On progress tracker, there were 2 anonymous reports made that day. `

    const text2 = `October 27, 2022

    Dear Diary,
    
        Today was another rough day. Kin only gave us a budget of $150 for our MERN stack project. Darian and I had already spent that on snacks. When our team leader David asked us where the budget went, Darian pointed at me. I was shocked. I couldn't believe it. 
        David chased me around with a broomstick demanding I cough up either the food or the money. I told him, I could do neither. Another progress tracker report was made today. Although I'm not sure if anything is being done. I hope we can finish this project soon, I don't know how much more I can take. `
    const [pageTxt, setPageTxt] = useState(text1)

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
                        <textarea className="book-page-content" spellCheck='false'>{pageTxt}</textarea>
                        <div className="book-page-number">{pageNum}</div>
                        <div className="prev-page" onClick={() => {nextPage(); setFlipDir("left"); setPageTxt(text1); setPageNum(1)}}>{"<"}</div>
                        <div className="next-page" onClick={() => {nextPage(); setFlipDir("right"); setPageTxt(text2); setPageNum(2)}}>{">"}</div>
                    </div>
                </div>
                {flip ? 
                    flipDir === "right" ? 
                        <>
                            <div className="fake-right-back-page"></div> 
                            <div className="fake-right-page">
                                <textarea className="book-page-content">{text2}</textarea>
                                <div className="book-page-number">1</div>
                                <div className="prev-page">{"<"}</div>
                                <div className="next-page">{">"}</div>
                            </div>
                        </> :  
                        <>
                        <div className="fake-left-back-page"></div> 
                        <div className="fake-left-page">
                            <textarea className="book-page-content">{text1}</textarea>
                            <div className="book-page-number">2</div>
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